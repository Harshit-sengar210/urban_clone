import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/backend/firebase";

export interface CurrentUser {
  uid: string;
  name: string;
  firstName: string;
  initials: string;
  email: string;
  phone: string;
  avatar?: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let firestoreUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Listen to Firestore doc for real-time profile updates
      firestoreUnsub = onSnapshot(
        doc(db, "users", firebaseUser.uid),
        (snap) => {
          const data = snap.data() || {};
          const name = data.name || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User";
          const nameParts = name.trim().split(" ");
          const initials = nameParts.length >= 2
            ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();

          setUser({
            uid: firebaseUser.uid,
            name,
            firstName: nameParts[0],
            initials,
            email: data.email || firebaseUser.email || "",
            phone: data.phone || "",
            avatar: data.avatar || data.photoURL || firebaseUser.photoURL || undefined,
          });
          setIsLoading(false);
        },
        () => {
          // Fallback to Firebase Auth data if Firestore read fails
          const name = firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User";
          setUser({
            uid: firebaseUser.uid,
            name,
            firstName: name.split(" ")[0],
            initials: name.slice(0, 2).toUpperCase(),
            email: firebaseUser.email || "",
            phone: "",
            avatar: firebaseUser.photoURL || undefined,
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

  return { user, isLoading };
}
