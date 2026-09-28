import { db, auth } from "@/backend/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { VendorApplication, VendorApplicationStatus } from "@/types/vendor/vendorApplication";

const COLLECTION = "vendorApplications";

export const getMyApplication = async (): Promise<VendorApplication | null> => {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;
  const docRef = doc(db, COLLECTION, uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as VendorApplication;
  }
  return null;
};

export const createDraftApplication = async (email: string): Promise<VendorApplication> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Must be authenticated");
  
  const draft: Partial<VendorApplication> = {
    applicationId: uid,
    vendorId: uid,
    email,
    status: "draft",
    progress: {
      currentStep: "personal",
      percentage: 0,
      completedSections: []
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, COLLECTION, uid), draft);
  
  // Return typed object (approximate for initial state)
  return draft as VendorApplication;
};

export const getOrCreateMyApplication = async (email: string): Promise<VendorApplication> => {
  const existing = await getMyApplication();
  if (existing) return existing;
  return createDraftApplication(email);
};

export const saveSection = async (section: keyof VendorApplication, data: any, stepName: string, uid?: string) => {
  const finalUid = uid || auth.currentUser?.uid;
  if (!finalUid) throw new Error("Must be authenticated");

  const docRef = doc(db, COLLECTION, finalUid);

  // Use JSON parse/stringify to guarantee stripping of all undefined values, functions, or complex objects
  const sanitizedData = JSON.parse(JSON.stringify(data));
  
  console.log(`[vendorOnboardingService] Saving section ${section}:`, sanitizedData);
  
  const payload = {
    [section]: sanitizedData,
    updatedAt: serverTimestamp(),
    "progress.currentStep": stepName
  };
  
  console.log(`[vendorOnboardingService] Final payload:`, payload);
  
  try {
    await setDoc(docRef, payload, { merge: true });
    console.log(`[vendorOnboardingService] Successfully saved section ${section}`);
  } catch (error) {
    console.error(`[vendorOnboardingService] Error saving section ${section}:`, error);
    throw error;
  }
};

export const submitApplication = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Must be authenticated");
  
  const docRef = doc(db, COLLECTION, uid);
  await updateDoc(docRef, {
    status: "submitted",
    submittedAt: serverTimestamp(),
    applicationSubmittedAt: serverTimestamp(), // Added to match admin mapping
    updatedAt: serverTimestamp(),
    "progress.percentage": 100
  });
};
