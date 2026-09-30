import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/backend/firebase";

export interface VendorProfileData {
  fullName: string;
  firstName: string;
  initials: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  professionalName: string;   // from business step
  displayName: string;        // professional name if set, else full name
}

/**
 * Returns live-synced vendor profile data from Firestore (vendorApplications collection).
 * Falls back to Firebase Auth metadata if Firestore is unavailable.
 */
export function useVendorProfile() {
  const [profile, setProfile] = useState<VendorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let firestoreUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      // Listen to vendorApplications/{uid} in real-time
      firestoreUnsub = onSnapshot(
        doc(db, "vendorApplications", firebaseUser.uid),
        (snap) => {
          const d = snap.data() || {};

          const fullName =
            d.personal?.fullName ||
            d.personal?.legalName ||
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "Partner";

          const professionalName =
            d.business?.professionalName ||
            d.business?.businessName ||
            "";

          const displayName = professionalName || fullName;

          const nameParts = displayName.trim().split(" ");
          const initials =
            nameParts.length >= 2
              ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
              : displayName.slice(0, 2).toUpperCase();

          setProfile({
            fullName,
            firstName: fullName.split(" ")[0],
            initials,
            email: d.email || firebaseUser.email || "",
            phone: d.personal?.phone || "",
            profilePhoto: d.personal?.profilePhoto || null,
            professionalName,
            displayName,
          });
          setIsLoading(false);
        },
        // Fallback: use Firebase Auth data if Firestore fails
        () => {
          const name = firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Partner";
          setProfile({
            fullName: name,
            firstName: name.split(" ")[0],
            initials: name.slice(0, 2).toUpperCase(),
            email: firebaseUser.email || "",
            phone: "",
            profilePhoto: firebaseUser.photoURL || null,
            professionalName: "",
            displayName: name,
          });
          setIsLoading(false);
        }
      );
    });

    return () => {
      authUnsub();
      firestoreUnsub?.();
    };
  }, []);

  return { profile, isLoading };
}
