"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight, FileText, UploadCloud, AlertCircle } from "lucide-react";
import Image from "next/image";
import type { AdminVendor } from "@/data/adminVendorsData";
import { serviceCategories, serviceCatalog } from "@/data/mockVendorServices";
export function VendorApplicationDrawer({
  vendor,
  onClose,
  onApprove,
  onRequestChanges,
  onReject,
  onSuspend,
  onRestore,
  onBlock,
  onDownload
}: {
  vendor: AdminVendor | null;
  onClose: () => void;
  onApprove: (v: AdminVendor) => void;
  onRequestChanges: (v: AdminVendor) => void;
  onReject: (v: AdminVendor) => void;
  onSuspend?: (v: AdminVendor) => void;
  onRestore?: (v: AdminVendor) => void;
  onBlock?: (v: AdminVendor) => void;
  onDownload?: (v: AdminVendor) => void;
}) {
  const [activeSection, setActiveSection] = useState<string>("overview");

  if (!vendor) return null;

  const steps = [
    { id: "overview", label: "Overview", completed: true },
    { id: "personal", label: "Personal Information", completed: true },
    { id: "business", label: "Business Profile", completed: true },
    { id: "services", label: "Services", completed: true },
    { id: "service_area", label: "Service Area", completed: true },
    { id: "experience", label: "Experience", completed: true },
    { id: "verification", label: "Verification", completed: true },
    { id: "bank", label: "Bank & Payout", completed: true },
    { id: "availability", label: "Availability", completed: true },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
        onClick={onClose}
      >
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 flex flex-col md:h-full">
            <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0A192F] uppercase tracking-wider">
                  {(vendor.status === "pending" || vendor.status === "needs_changes") ? "Application Review" : "Vendor Profile"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{vendor.name}</p>
              </div>
              <button onClick={onClose} className="md:hidden p-2 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1 hidden md:block">
              {steps.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveSection(step.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                    activeSection === step.id ? "bg-white text-[var(--color-primary)] shadow-sm border border-slate-100" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    )}
                    <span>{step.label}</span>
                  </div>
                  {activeSection === step.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
            
            {/* Mobile Horizontal Nav */}
            <div className="flex overflow-x-auto hide-scrollbar p-3 gap-2 md:hidden border-b border-slate-100">
              {steps.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveSection(step.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeSection === step.id ? "bg-[var(--color-primary)] text-white" : "bg-white border border-slate-200 text-slate-600"
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full bg-white relative">
            <div className="hidden md:flex p-4 border-b border-slate-100 items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <h3 className="font-bold text-[#0A192F] capitalize">
                {steps.find(s => s.id === activeSection)?.label}
              </h3>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {activeSection === "overview" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      {vendor.avatar ? <Image src={vendor.avatar} alt={vendor.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-300">{vendor.name.charAt(0)}</div>}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0A192F]">{vendor.businessName}</h3>
                      <p className="text-sm font-medium text-slate-600 mb-2">{vendor.name} &bull; {vendor.city}</p>
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                        vendor.status === "approved" ? "text-emerald-700 bg-emerald-50 border-emerald-100" :
                        vendor.status === "suspended" ? "text-amber-700 bg-amber-50 border-amber-100" :
                        vendor.status === "needs_changes" ? "text-blue-700 bg-blue-50 border-blue-100" :
                        "text-blue-700 bg-blue-50 border-blue-100"
                      }`}>
                        {vendor.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Completion</p>
                      <p className="text-lg font-bold text-[#0A192F]">{vendor.applicationProgress}%</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1.5">{vendor.submittedAt}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Primary Category</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1.5">{vendor.primaryCategory}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Type</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1.5 capitalize">{vendor.businessType}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#0A192F] mb-4">Application Progress</h4>
                    <div className="relative pl-4 space-y-4">
                      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-100" />
                      {steps.map((step, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={step.id} 
                          className="relative pl-6 flex items-center justify-between"
                        >
                          <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${step.completed ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            {step.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm font-medium ${step.completed ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
                          {step.completed && <span className="text-xs font-bold text-emerald-600">Complete</span>}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "verification" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-800">Pending Review</h4>
                      <p className="text-sm text-amber-700 mt-1">Please review the submitted identification documents below. Ensure they are clear and match the applicant's details.</p>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#0A192F]">Identity Documents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {vendor.rawData?.verification?.documents ? (
                      Object.entries(vendor.rawData.verification.documents).map(([docId, docData]: [string, any]) => (
                        <div key={docId} className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0A192F] capitalize">{docId.replace('_', ' ')}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{docData.number || "Document Uploaded"}</p>
                          </div>
                          {docData.uploads && Object.entries(docData.uploads).map(([side, upload]: [string, any]) => (
                            <a 
                              key={side}
                              href={upload.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-4 py-2 rounded-lg w-full mt-2 block"
                            >
                              View {side}
                            </a>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full p-4 text-center text-sm text-slate-500 border border-dashed rounded-xl">
                        No verification documents uploaded.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeSection === "bank" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Payout Information</h4>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-sm font-medium text-slate-500">Account Holder</span>
                      <span className="text-sm font-bold text-[#0A192F]">{vendor.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-sm font-medium text-slate-500">Bank Name</span>
                      <span className="text-sm font-bold text-[#0A192F]">{vendor.rawData?.payouts?.bank?.bankName || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-sm font-medium text-slate-500">Account Number</span>
                      <span className="text-sm font-bold text-[#0A192F]">{vendor.rawData?.payouts?.bank?.accountNumber ? vendor.rawData.payouts.bank.accountNumber.replace(/.(?=.{4})/g, '•') : "Not provided"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-sm font-medium text-slate-500">IFSC Code</span>
                      <span className="text-sm font-bold text-[#0A192F]">{vendor.rawData?.payouts?.bank?.ifscCode ? `••••${vendor.rawData.payouts.bank.ifscCode.slice(-4)}` : "Not provided"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-500">UPI ID</span>
                      <span className="text-sm font-bold text-[#0A192F]">{vendor.rawData?.payouts?.upi?.upiId || "Not provided"}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 text-center">Sensitive information is masked for security.</p>
                </div>
              )}

              {activeSection === "personal" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.personal?.fullName || vendor.rawData?.name || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.personal?.email || vendor.rawData?.email || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.personal?.phone || vendor.rawData?.phone || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">DOB</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.personal?.dateOfBirth || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "business" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Professional Profile</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Business Name</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.business?.businessName || vendor.rawData?.businessName || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Profile Type</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1 capitalize">{vendor.rawData?.business?.profileType || vendor.rawData?.businessType || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl col-span-2">
                      <p className="text-xs font-bold text-slate-400 uppercase">Description</p>
                      <p className="text-sm text-slate-700 mt-1">{vendor.rawData?.business?.description || vendor.rawData?.description || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "services" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Services & Expertise</h4>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {vendor.rawData?.services?.selectedCategoryIds?.length ? vendor.rawData.services.selectedCategoryIds.map((c: string) => {
                        const cat = serviceCategories.find(sc => sc.id === c);
                        return (
                          <span key={c} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {cat ? cat.name : c}
                          </span>
                        );
                      }) : vendor.rawData?.primaryCategory ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {vendor.rawData.primaryCategory}
                        </span>
                      ) : <span className="text-sm">Not provided</span>}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Specific Services</p>
                    <div className="flex flex-wrap gap-2">
                      {vendor.rawData?.services?.selectedServiceIds?.length ? vendor.rawData.services.selectedServiceIds.map((s: string) => {
                        const srv = serviceCatalog.find(ss => ss.id === s);
                        return (
                          <span key={s} className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs font-medium">
                            {srv ? srv.name : s}
                          </span>
                        );
                      }) : Array.isArray(vendor.rawData?.services) && vendor.rawData.services.length > 0 ? vendor.rawData.services.map((s: string) => {
                        const srv = serviceCatalog.find(ss => ss.id === s);
                        return (
                          <span key={s} className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs font-medium">
                            {srv ? srv.name : s}
                          </span>
                        );
                      }) : <span className="text-sm">Not provided</span>}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "service_area" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Service Area</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Cities</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.serviceArea?.city || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Travel Radius</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.serviceArea?.radiusKm || "Not provided"} km</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "experience" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Experience & Portfolio</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Experience Level</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1 capitalize">{vendor.rawData?.experience?.experienceLevel?.replace('_', ' ') || "Not provided"}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase">Years of Experience</p>
                      <p className="text-sm font-bold text-[#0A192F] mt-1">{vendor.rawData?.experience?.years || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "availability" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-sm font-bold text-[#0A192F]">Availability</h4>
                  <div className="space-y-2">
                    {vendor.rawData?.availability?.weeklySchedule?.map((day: any) => (
                      <div key={day.day} className="flex justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <span className="text-sm font-medium text-slate-600 capitalize">{day.day}</span>
                        <span className="text-sm font-bold text-[#0A192F]">{day.enabled ? `${day.startTime} - ${day.endTime}` : "Unavailable"}</span>
                      </div>
                    )) || <p className="text-sm text-slate-500">Not provided</p>}
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-end gap-3 sticky bottom-0">
              {(vendor.status === "pending" || vendor.status === "needs_changes") ? (
                <>
                  <button 
                    onClick={() => onReject(vendor)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => onRequestChanges(vendor)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors"
                  >
                    Request Changes
                  </button>
                  <button 
                    onClick={() => onApprove(vendor)} 
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 shadow-sm transition-colors"
                  >
                    Approve Vendor
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onDownload && onDownload(vendor)} 
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Download PDF
                  </button>
                  {vendor.status !== "suspended" && (
                    <button 
                      onClick={() => onSuspend && onSuspend(vendor)} 
                      className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors"
                    >
                      Suspend
                    </button>
                  )}
                  {vendor.status === "suspended" && (
                    <button 
                      onClick={() => onRestore && onRestore(vendor)} 
                      className="w-full sm:w-auto px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-colors"
                    >
                      Restore
                    </button>
                  )}
                  <button 
                    onClick={() => onBlock && onBlock(vendor)} 
                    className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 shadow-sm transition-colors"
                  >
                    Block Vendor
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
