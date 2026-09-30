import { collection, query, where, onSnapshot, getDocs, doc, getDoc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { AdminVendor, VendorStatus } from "@/data/adminVendorsData";
import { VendorApplication } from "@/types/vendor/vendorApplication";
import { serviceCategories, serviceCatalog } from "@/data/mockVendorServices";

export const subscribeToPendingApplications = (onUpdate: (vendors: AdminVendor[]) => void) => {
  const q = query(
    collection(db, "vendorApplications"),
    where("status", "in", ["submitted", "pending_approval", "needs_changes"]) // Include needs_changes so it shows up for admin to review again
  );

  return onSnapshot(q, (snapshot) => {
    const loaded: AdminVendor[] = [];
    snapshot.forEach((docSnap) => {
      const d = docSnap.data() as any;
      loaded.push(mapApplicationToAdminVendor(docSnap.id, d, "pending"));
    });
    onUpdate(loaded);
  });
};

export const subscribeToApprovedVendors = (onUpdate: (vendors: AdminVendor[]) => void) => {
  const q = query(
    collection(db, "vendors"),
    where("status", "in", ["active", "suspended"])
  );

  return onSnapshot(q, (snapshot) => {
    const loaded: AdminVendor[] = [];
    snapshot.forEach((docSnap) => {
      const d = docSnap.data() as any;
      loaded.push(mapVendorProfileToAdminVendor(docSnap.id, d));
    });
    onUpdate(loaded);
  });
};

export const getApplicationById = async (applicationId: string) => {
  const docRef = doc(db, "vendorApplications", applicationId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data() as VendorApplication;
  }
  return null;
};

export const getAdminVendorApplication = async (applicationId: string): Promise<AdminVendor | null> => {
  const docRef = doc(db, "vendorApplications", applicationId);
  const snap = await getDoc(docRef);
  
  if (snap.exists()) {
    const appData = snap.data();
    
    // If the application data has the nested personal section, use it directly
    if (appData.personal) {
      return mapApplicationToAdminVendor(snap.id, appData, "pending");
    }
    
    // Otherwise, try to enrich with data from the vendors collection
    // (vendors collection has all nested sections embedded since approval)
    const vendorId = appData.vendorId || appData.userId || applicationId;
    const vendorRef = doc(db, "vendors", vendorId);
    const vendorSnap = await getDoc(vendorRef);
    
    if (vendorSnap.exists()) {
      const vendorData = vendorSnap.data();
      // Merge: application doc takes priority for status/timing, vendors doc fills in nested sections
      const mergedData = {
        ...appData,
        personal: vendorData.personal || appData.personal || null,
        business: vendorData.business || appData.business || null,
        services: vendorData.services_data || appData.services || null,
        serviceArea: vendorData.serviceArea || appData.serviceArea || null,
        experience: vendorData.experience || appData.experience || null,
        verification: vendorData.verification || appData.verification || null,
        payouts: vendorData.payouts || appData.payouts || null,
        availability: vendorData.availability || appData.availability || null,
      };
      return mapApplicationToAdminVendor(snap.id, mergedData, "pending");
    }
    
    return mapApplicationToAdminVendor(snap.id, appData, "pending");
  }
  
  // If no application doc found at all, try vendors collection directly
  const vendorRef = doc(db, "vendors", applicationId);
  const vendorSnap = await getDoc(vendorRef);
  if (vendorSnap.exists()) {
    return mapVendorProfileToAdminVendor(vendorSnap.id, vendorSnap.data());
  }
  
  return null;
};

export const approveVendorApplication = async (applicationId: string) => {
  const appRef = doc(db, "vendorApplications", applicationId);
  const snap = await getDoc(appRef);
  if (!snap.exists()) throw new Error("Application not found");
  
  const appData = snap.data();
  const vendorId = appData.vendorId || appData.userId || applicationId;
  
  // Create vendor profile in 'vendors' collection
  // IMPORTANT: embed all nested application sections so the admin drawer can read
  // vendor.rawData?.personal?.fullName, vendor.rawData?.experience, etc.
  const vendorProfileRef = doc(db, "vendors", vendorId);
  const vendorProfile = {
    vendorId,
    applicationId,
    status: "active",
    approvedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    // Flat fields for quick access in listings
    email: appData.email || "",
    name: appData.personal?.fullName || appData.personal?.legalName || "N/A",
    phone: appData.personal?.phone || "",
    avatar: appData.personal?.profilePhoto || "",
    businessName: appData.business?.businessName || "",
    businessType: appData.business?.profileType || "individual",
    services: appData.services?.selectedServiceIds || [],
    primaryCategory: appData.services?.selectedCategoryIds?.[0] || "General",
    city: appData.serviceArea?.city || "",
    rating: 0,
    reviewCount: 0,
    bookingCount: 0,
    totalEarnings: 0,
    // Full nested application sections — required by admin drawers for detail views
    personal: appData.personal || null,
    business: appData.business || null,
    services_data: appData.services || null,
    serviceArea: appData.serviceArea || null,
    experience: appData.experience || null,
    verification: appData.verification || null,
    payouts: appData.payouts || null,
    availability: appData.availability || null,
  };
  
  await setDoc(vendorProfileRef, vendorProfile);
  
  // Update application status
  await updateDoc(appRef, {
    status: "approved",
    approvedAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateVendorStatus = async (vendorId: string, status: "active" | "suspended" | "removed", reason?: string) => {
  const vendorRef = doc(db, "vendors", vendorId);
  
  const updates: any = {
    status,
    updatedAt: serverTimestamp()
  };
  
  if (status === "suspended" && reason) {
    updates.suspensionReason = reason;
  }
  
  if (status === "active") {
    updates.suspensionReason = null; // Clear reason
  }

  await updateDoc(vendorRef, updates);
};

// Map raw Firestore application data to the Admin UI model
const mapApplicationToAdminVendor = (id: string, d: any, fallbackStatus: VendorStatus): AdminVendor => {
  let mappedStatus: VendorStatus = fallbackStatus;
  if (d.status === "approved") mappedStatus = "approved";
  else if (d.status === "rejected") mappedStatus = "rejected";
  else if (d.status === "needs_changes") mappedStatus = "needs_changes";

  let progress = 10;
  if (d.personal?.fullName) progress += 15;
  if (d.business?.businessName) progress += 15;
  if (d.services?.selectedServiceIds?.length) progress += 15;
  if (d.serviceArea?.city) progress += 15;
  if (d.experience?.years) progress += 10;
  if (d.verification?.documents) progress += 10;
  if (d.payouts?.bank?.bankName) progress += 10;

  return {
    id,
    name: d.personal?.legalName || d.personal?.fullName || d.email || "Unknown",
    email: d.email || "",
    phone: d.personal?.phone || "",
    avatar: d.personal?.profilePhoto || undefined,
    businessName: d.business?.businessName || "N/A",
    businessType: d.business?.profileType || "individual",
    services: (d.services?.selectedServiceIds || []).map((id: string) => {
      const s = serviceCatalog.find(s => s.id === id);
      return s ? s.name : id;
    }),
    primaryCategory: (() => {
      const catId = d.services?.selectedCategoryIds?.[0];
      const cat = serviceCategories.find(c => c.id === catId);
      return cat ? cat.name : (catId || "General");
    })(),
    city: d.serviceArea?.city || "N/A",
    status: mappedStatus,
    rating: 0,
    reviewCount: 0,
    bookingCount: 0,
    totalEarnings: 0,
    joinedAt: d.createdAt ? new Date(d.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
    lastActiveAt: d.updatedAt ? new Date(d.updatedAt.seconds * 1000).toISOString() : new Date().toISOString(),
    applicationProgress: Math.min(progress, 100),
    submittedAt: d.applicationSubmittedAt ? new Date(d.applicationSubmittedAt.seconds * 1000).toISOString() : undefined,
    rawData: d,
  };
};

const mapVendorProfileToAdminVendor = (id: string, d: any): AdminVendor => {
  return {
    id,
    name: d.name || d.email || "Unknown",
    email: d.email || "",
    phone: d.phone || "",
    avatar: d.avatar || undefined,
    businessName: d.businessName || "N/A",
    businessType: d.businessType || "individual",
    services: (d.services || []).map((id: string) => {
      const s = serviceCatalog.find(s => s.id === id);
      return s ? s.name : id;
    }),
    primaryCategory: d.primaryCategory || "General",
    city: d.city || "N/A",
    status: (d.status as VendorStatus) || "approved",
    rating: d.rating || 0,
    reviewCount: d.reviewCount || 0,
    bookingCount: d.bookingCount || 0,
    totalEarnings: d.totalEarnings || 0,
    joinedAt: d.createdAt ? new Date(d.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
    lastActiveAt: d.updatedAt ? new Date(d.updatedAt.seconds * 1000).toISOString() : new Date().toISOString(),
    applicationProgress: 100,
    rawData: d,
  };
};

// Only the backend endpoint does the actual approval, but the client can request changes or reject directly if it's less privileged or we just want to stub it for now as per instructions (wait, instructions say: rejectApplication, requestChanges can be here)

export const requestChanges = async (applicationId: string, requestedChanges: string[], adminUid: string) => {
  const docRef = doc(db, "vendorApplications", applicationId);
  await updateDoc(docRef, {
    status: "needs_changes",
    requestedChanges,
    requestedChangesAt: new Date(),
    requestedChangesBy: adminUid,
    updatedAt: new Date()
  });
};

export const rejectApplication = async (applicationId: string, rejectionReason: string, adminUid: string) => {
  const docRef = doc(db, "vendorApplications", applicationId);
  await updateDoc(docRef, {
    status: "rejected",
    rejectionReason,
    rejectedAt: new Date(),
    rejectedBy: adminUid,
    updatedAt: new Date()
  });
};
