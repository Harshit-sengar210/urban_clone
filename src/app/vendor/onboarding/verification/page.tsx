"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { VerificationVisual } from "@/components/vendor-onboarding/VerificationVisual";
import { DocumentTypeSelector, IdentityDocumentType, DocumentTypeOption, DocumentSide } from "@/components/vendor-onboarding/DocumentTypeSelector";
import { DocumentUploader, DocumentUploadState } from "@/components/vendor-onboarding/DocumentUploader";
import { VerificationReadiness } from "@/components/vendor-onboarding/VerificationReadiness";
import { PrivacyCard } from "@/components/vendor-onboarding/PrivacyCard";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem, shakeAnimation } from "@/components/vendor-onboarding/animations";
import { cn } from "@/lib/utils";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


interface VendorVerificationData {
  documentType: IdentityDocumentType | "";
  documentNumber: string;
  nameOnDocument: string;
  requiredSides: DocumentSide[];
  identityConfirmation: boolean;
  accuracyConfirmation: boolean;
}

const DEFAULT_STATE: VendorVerificationData = {
  documentType: "",
  documentNumber: "",
  nameOnDocument: "",
  requiredSides: [],
  identityConfirmation: false,
  accuracyConfirmation: false,
};

export default function VerificationPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorVerificationData>(DEFAULT_STATE);
  const { application, loading, saveVerification } = useVendorOnboarding();
  const [uploads, setUploads] = useState<Record<string, DocumentUploadState>>({});
  const [savedDocuments, setSavedDocuments] = useState<Record<string, { number: string, name: string, uploads: Record<string, DocumentUploadState> }>>({});
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (application?.verification) {
      setData(prev => ({
        ...prev,
        identityConfirmation: application.verification!.identityConfirmation || false,
        accuracyConfirmation: application.verification!.accuracyConfirmation || false,
      }));
      if (application.verification.documents) {
        setSavedDocuments(application.verification.documents as any);
      }
    }
  }, [application]);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof VendorVerificationData, boolean>>>({});



  const updateField = <K extends keyof VendorVerificationData>(field: K, value: VendorVerificationData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDocumentTypeChange = (option: DocumentTypeOption) => {
    updateField("documentType", option.id);
    updateField("requiredSides", option.requiredSides);
    setIsEditing(true);
    
    if (savedDocuments[option.id]) {
      const saved = savedDocuments[option.id];
      updateField("documentNumber", saved.number);
      updateField("nameOnDocument", saved.name);
      setUploads(saved.uploads);
    } else {
      updateField("documentNumber", "");
      updateField("nameOnDocument", "");
      // Reset uploads
      const newUploads: Record<string, DocumentUploadState> = {};
      option.requiredSides.forEach(side => {
        newUploads[side] = { side, status: "empty" };
      });
      setUploads(newUploads);
    }
  };

  const handleUploadChange = (side: string, state: DocumentUploadState) => {
    setUploads(prev => ({ ...prev, [side]: state }));
  };

  const handleSaveDocument = () => {
    if (!data.documentType || !data.documentNumber || !data.nameOnDocument) {
      setToastMessage("Please fill in document details first.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }
    setSavedDocuments(prev => ({
      ...prev,
      [data.documentType]: {
        number: data.documentNumber,
        name: data.nameOnDocument,
        uploads: { ...uploads }
      }
    }));
    
    const savedDocName = data.documentType.replace('_', ' ').toUpperCase();
    
    // Collapse back to normal form
    setIsEditing(false);
    updateField("documentType", "");
    
    setToastMessage(`${savedDocName} saved locally!`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const calculateReadiness = () => {
    let score = 0;
    const totalWeights = 100;
    
    if (data.documentType) score += 20;
    if (data.documentNumber && data.documentNumber.length > 4) score += 20;
    if (data.nameOnDocument && data.nameOnDocument.length > 2) score += 10;
    
    if (data.requiredSides.length > 0) {
      const uploadWeight = 50 / data.requiredSides.length;
      data.requiredSides.forEach(side => {
        if (uploads[side]?.status === "added") {
          score += uploadWeight;
        }
      });
    }

    return Math.min(score, totalWeights);
  };

  const readinessScore = calculateReadiness();
  const isReady = readinessScore === 100 && data.identityConfirmation && data.accuracyConfirmation;

  const handleSave = async () => {
    try {
      const saveData = {
        identityConfirmation: data.identityConfirmation,
        accuracyConfirmation: data.accuracyConfirmation,
        documents: savedDocuments,
      };
      await saveVerification(saveData);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    const isAadhaarSaved = !!savedDocuments["aadhaar"];
    const isPanSaved = !!savedDocuments["pan"];

    if (!isAadhaarSaved || !isPanSaved) {
      setToastMessage("Aadhaar and PAN Card are mandatory to continue.");
      setErrors({ documentType: true });
      document.getElementById('verification-documents-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setToastMessage(""), 3000);
      return false;
    }
    
    try {
      setToastMessage("Securing verification documents...");
      let finalDocuments = { ...savedDocuments };
      
      const { getStorage, ref, uploadString, getDownloadURL } = await import("firebase/storage");
      const { storage } = await import("@/backend/firebase");

      // Upload all base64 images to Firebase Storage
      for (const [docType, docData] of Object.entries(finalDocuments)) {
        for (const [side, uploadState] of Object.entries(docData.uploads)) {
          if (uploadState.previewUrl && uploadState.previewUrl.startsWith("data:image")) {
            const fileRef = ref(storage, `vendors/verification_${Date.now()}_${docType}_${side}`);
            await uploadString(fileRef, uploadState.previewUrl, 'data_url');
            finalDocuments[docType].uploads[side].previewUrl = await getDownloadURL(fileRef);
          }
        }
      }

      

      const saveData = {
        identityConfirmation: data.identityConfirmation,
        accuracyConfirmation: data.accuracyConfirmation,
        documents: finalDocuments,
      };
      
      await saveVerification(saveData);
      
      setToastMessage("Documents saved securely!");
      setTimeout(() => {
        router.push("/vendor/onboarding/bank");
      }, 1000);
    } catch (error) {
      console.error("Error saving verification details:", error);
      setToastMessage("Failed to save. Please try again.");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Visual Area (Desktop Only) */}
        <div className="hidden md:flex w-[40%] h-full relative order-1 bg-slate-50 border-r border-slate-100">
          <VerificationVisual 
            documentType={data.documentType}
            documentNumber={data.documentNumber}
            nameOnDocument={data.nameOnDocument}
            frontImage={uploads['front']?.previewUrl || uploads['photo_page']?.previewUrl}
            isEditing={isEditing}
          />
        </div>

        {/* Right Form Area */}
        <div className="w-full md:w-[60%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2">
          <motion.div 
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl pb-12"
          >
            {/* Mobile Visual replacement */}
            <div className="block md:hidden mb-8">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" /> Step 7 of 9
              </div>
            </div>

            <div className="hidden md:block mb-8">
              <OnboardingProgress currentStep={7} totalSteps={9} label="Identity Verification" />
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                Verify Your Identity
              </h1>
              <p className="text-slate-500 font-medium">
                Help us confirm your identity so customers can trust the professionals they book.
                <span className="block text-xs mt-1 text-slate-400">Identity verification is required before your vendor profile can be approved.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              


              {/* Document Type */}
              <motion.section id="verification-documents-section" variants={staggerItem} className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                    Select Identity Document
                  </h3>
                  <p className="text-xs text-slate-500">Choose the document you will use for identity verification.</p>
                </div>
                
                <motion.div animate={errors.documentType ? shakeAnimation : {}}>
                  <DocumentTypeSelector 
                    value={data.documentType} 
                    onChange={handleDocumentTypeChange} 
                    error={errors.documentType}
                    savedTypes={Object.keys(savedDocuments)}
                  />
                  {errors.documentType && <p className="text-xs font-bold text-red-500 mt-2">Please select a document type.</p>}
                </motion.div>
              </motion.section>



              <AnimatePresence mode="wait">
                {data.documentType && (
                  <motion.div
                    key="form-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-12 overflow-hidden"
                  >
                    {/* Document Information */}
                    <section className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                          Document Information
                        </h3>
                        <p className="text-xs text-slate-500">Enter the details exactly as they appear on your document.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div animate={errors.documentNumber ? shakeAnimation : {}} className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Document Number</label>
                          <input
                            type="text"
                            placeholder="e.g. •••• •••• 4821"
                            value={data.documentNumber}
                            onChange={(e) => updateField("documentNumber", e.target.value)}
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-semibold font-mono tracking-wider",
                              errors.documentNumber ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                          {errors.documentNumber && <p className="text-xs font-bold text-red-500 mt-1">Please enter a valid document number.</p>}
                        </motion.div>

                        <motion.div animate={errors.nameOnDocument ? shakeAnimation : {}} className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Name on Document</label>
                          <input
                            type="text"
                            placeholder="Full Legal Name"
                            value={data.nameOnDocument}
                            onChange={(e) => updateField("nameOnDocument", e.target.value)}
                            className={cn(
                              "w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm font-semibold",
                              errors.nameOnDocument ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100" : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                            )}
                          />
                          {errors.nameOnDocument && <p className="text-xs font-bold text-red-500 mt-1">Please enter your legal name.</p>}
                        </motion.div>
                      </div>
                    </section>

                    {/* Uploads */}
                    <section className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-1">
                          Upload Document
                        </h3>
                        <p className="text-xs text-slate-500">Add a clear photo or scan of your document.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.requiredSides.map((side) => (
                          <DocumentUploader 
                            key={side}
                            side={side}
                            uploadState={uploads[side] || { side, status: "empty" }}
                            onChange={(state) => handleUploadChange(side, state)}
                          />
                        ))}
                      </div>

                      {/* Local Save Button for current document */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleSaveDocument}
                          className="px-6 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm border border-slate-200"
                        >
                          Save {data.documentType ? data.documentType.replace('_', ' ') : 'Document'}
                        </button>
                      </div>
                    </section>

                    {/* Checklist */}
                    <section className="space-y-4 pt-6 border-t border-slate-100">
                      <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                        Before You Continue
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={cn("w-4 h-4 transition-colors", data.documentType ? "text-green-500" : "text-slate-300")} />
                          <span className={cn("text-xs font-medium", data.documentType ? "text-slate-700" : "text-slate-400")}>Document type selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={cn("w-4 h-4 transition-colors", data.documentNumber && data.nameOnDocument ? "text-green-500" : "text-slate-300")} />
                          <span className={cn("text-xs font-medium", data.documentNumber && data.nameOnDocument ? "text-slate-700" : "text-slate-400")}>Name and document details entered</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={cn("w-4 h-4 transition-colors", data.requiredSides.length > 0 && data.requiredSides.every(s => uploads[s]?.status === "added") ? "text-green-500" : "text-slate-300")} />
                          <span className={cn("text-xs font-medium", data.requiredSides.length > 0 && data.requiredSides.every(s => uploads[s]?.status === "added") ? "text-slate-700" : "text-slate-400")}>All required sides uploaded clearly</span>
                        </div>
                      </div>
                    </section>

                    {/* Consents */}
                    <section className="space-y-4 pt-6 border-t border-slate-100">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                          <input
                            type="checkbox"
                            checked={data.identityConfirmation}
                            onChange={(e) => updateField("identityConfirmation", e.target.checked)}
                            className="peer w-5 h-5 rounded border-2 border-slate-300 appearance-none checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] transition-all cursor-pointer"
                          />
                          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className={cn(
                          "text-xs font-medium leading-relaxed select-none transition-colors",
                          errors.identityConfirmation ? "text-red-500 font-bold" : "text-slate-600 group-hover:text-slate-900"
                        )}>
                          I confirm that the information and documents provided belong to me and are accurate.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                          <input
                            type="checkbox"
                            checked={data.accuracyConfirmation}
                            onChange={(e) => updateField("accuracyConfirmation", e.target.checked)}
                            className="peer w-5 h-5 rounded border-2 border-slate-300 appearance-none checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] transition-all cursor-pointer"
                          />
                          <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className={cn(
                          "text-xs font-medium leading-relaxed select-none transition-colors",
                          errors.accuracyConfirmation ? "text-red-500 font-bold" : "text-slate-600 group-hover:text-slate-900"
                        )}>
                          I understand that my vendor profile may require verification before I can receive bookings.
                        </span>
                      </label>
                    </section>

                    <VerificationReadiness percentage={readinessScore} isReady={isReady} />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            <motion.div variants={staggerItem} className="mt-8">
              <PrivacyCard />
            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/experience")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false} // Handles click internally
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
