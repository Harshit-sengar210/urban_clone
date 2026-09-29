import { collection, doc, setDoc, getDocs, query, where, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { SupportTicket, SupportMessage } from "@/types/vendor";

export const createSupportTicket = async (vendorId: string, ticket: SupportTicket) => {
  const ticketRef = doc(db, "supportTickets", ticket.id);
  await setDoc(ticketRef, {
    ...ticket,
    vendorId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const subscribeToVendorTickets = (vendorId: string, onUpdate: (tickets: SupportTicket[]) => void) => {
  const q = query(
    collection(db, "supportTickets"),
    where("vendorId", "==", vendorId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const loaded: SupportTicket[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      loaded.push({
        ...data,
        id: docSnap.id,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as SupportTicket);
    });
    onUpdate(loaded);
  });
};

export const addTicketMessage = async (ticketId: string, message: SupportMessage) => {
  const ticketRef = doc(db, "supportTickets", ticketId);
  // Need to get the document first to append the message, or use arrayUnion
  // But since we want to be safe and `SupportTicket` has `messages` array
  // we can use arrayUnion if we imported it, or just transaction.
  const { getDoc, updateDoc, arrayUnion } = await import("firebase/firestore");
  await updateDoc(ticketRef, {
    messages: arrayUnion(message),
    updatedAt: serverTimestamp(),
  });
};

export const subscribeToAllTickets = (onUpdate: (tickets: SupportTicket[]) => void) => {
  const q = query(
    collection(db, "supportTickets"),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const loaded: SupportTicket[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      loaded.push({
        ...data,
        id: docSnap.id,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as SupportTicket);
    });
    onUpdate(loaded);
  });
};

export const updateTicketStatus = async (ticketId: string, status: string) => {
  const ticketRef = doc(db, "supportTickets", ticketId);
  const { updateDoc } = await import("firebase/firestore");
  await updateDoc(ticketRef, {
    status,
    updatedAt: serverTimestamp(),
  });
};
