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
  if (!uid) throw new Error("Must be authenticated to create application");

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
    createdAt: serverTimestamp() as any,
    updatedAt: serverTimestamp() as any,
  };

  await setDoc(doc(db, COLLECTION, uid), draft, { merge: true });
  return draft as VendorApplication;
};

export const getOrCreateMyApplication = async (email: string): Promise<VendorApplication> => {
  const existing = await getMyApplication();
  if (existing) return existing;
  return createDraftApplication(email);
};

/**
 * Saves a single onboarding section (e.g. "personal", "business") to Firestore.
 *
 * Uses updateDoc so that "progress.currentStep" is treated as a nested path,
 * not a literal field name with a dot. Falls back to setDoc if the doc doesn't
 * exist yet (first save after signup edge case).
 */
export const saveSection = async (
  section: keyof VendorApplication,
  data: any,
  stepName: string,
  uid?: string
): Promise<void> => {
  const finalUid = uid || auth.currentUser?.uid;
  if (!finalUid) throw new Error("Must be authenticated to save data");

  const docRef = doc(db, COLLECTION, finalUid);

  // Sanitize: strip undefined values, functions, etc.
  // null values are preserved (needed for optional fields like profilePhoto)
  let sanitizedData: any;
  try {
    sanitizedData = JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(`[saveSection] Failed to sanitize data for section ${section}:`, e);
    throw new Error("Data could not be serialized for saving.");
  }

  console.log(`[saveSection] Saving "${section}" for uid=${finalUid}:`, sanitizedData);

  // updateDoc correctly resolves dot-notation keys as nested field paths.
  // e.g. "progress.currentStep" updates progress.currentStep, not a literal key.
  const updatePayload: Record<string, any> = {
    [section]: sanitizedData,
    updatedAt: serverTimestamp(),
    "progress.currentStep": stepName,
  };

  try {
    // Try updateDoc first (doc must already exist)
    await updateDoc(docRef, updatePayload);
    console.log(`[saveSection] ✅ updateDoc succeeded for section "${section}"`);
  } catch (err: any) {
    if (err?.code === "not-found") {
      // Doc doesn't exist yet — create it first, then retry
      console.warn(`[saveSection] Doc not found, creating draft first...`);
      await setDoc(docRef, {
        applicationId: finalUid,
        vendorId: finalUid,
        email: auth.currentUser?.email || "",
        status: "draft",
        progress: { currentStep: stepName, percentage: 0, completedSections: [] },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        [section]: sanitizedData,
      });
      console.log(`[saveSection] ✅ setDoc (first write) succeeded for section "${section}"`);
    } else {
      console.error(`[saveSection] ❌ Failed to save section "${section}":`, err);
      throw err;
    }
  }
};

/**
 * Marks the application as submitted so the admin panel picks it up.
 * Sets status = "submitted" and records the submission timestamp.
 */
export const submitApplication = async (): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Must be authenticated to submit application");

  const docRef = doc(db, COLLECTION, uid);
  await updateDoc(docRef, {
    status: "submitted",
    submittedAt: serverTimestamp(),
    applicationSubmittedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    "progress.percentage": 100,
    "progress.currentStep": "review",
  });
  console.log(`[submitApplication] ✅ Application ${uid} submitted successfully`);
};
