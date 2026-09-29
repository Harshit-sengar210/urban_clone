import { collection, query, orderBy, onSnapshot, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { AdminSupportTicket, SupportMessage } from "@/data/adminSupportData";

// Maps raw firestore data to AdminSupportTicket
export const subscribeToAdminTickets = (onUpdate: (tickets: AdminSupportTicket[]) => void) => {
  const q = query(
    collection(db, "supportTickets"),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const loaded: AdminSupportTicket[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      
      const messages = (data.messages || []).map((m: any) => ({
        id: m.id,
        ticketId: docSnap.id,
        type: m.sender === "admin" ? "admin" : "vendor", // or customer if we have customers
        senderName: m.sender === "admin" ? "Admin" : (data.vendorName || "Vendor"),
        senderId: m.sender === "admin" ? "admin" : (data.vendorId || "vendor"),
        text: m.message,
        timestamp: m.createdAt,
      }));

      loaded.push({
        id: docSnap.id,
        subject: data.subject || "No Subject",
        description: data.description || "",
        requester: {
          id: data.vendorId || "unknown",
          name: data.vendorName || "Vendor", // We could fetch vendor data if needed, but for now fallback
          email: "",
          type: "vendor"
        },
        category: data.category || "other",
        priority: data.priority || "normal",
        status: data.status || "open",
        channel: "in_app",
        sla: "on_track",
        slaRemainingMinutes: 120,
        tags: [],
        messages,
        activities: [],
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastMessageAt: messages[messages.length - 1]?.timestamp || data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as AdminSupportTicket);
    });
    onUpdate(loaded);
  });
};

export const adminReplyToTicket = async (ticketId: string, text: string) => {
  const ticketRef = doc(db, "supportTickets", ticketId);
  const now = new Date().toISOString();
  
  const newMsg = {
    id: `msg-${Date.now()}`,
    sender: "admin",
    message: text,
    createdAt: now,
  };
  
  const { arrayUnion } = await import("firebase/firestore");
  await updateDoc(ticketRef, {
    messages: arrayUnion(newMsg),
    updatedAt: serverTimestamp(),
    status: "pending_vendor" // typical after admin replies
  });
};

export const updateAdminTicketStatus = async (ticketId: string, status: string) => {
  const ticketRef = doc(db, "supportTickets", ticketId);
  await updateDoc(ticketRef, {
    status,
    updatedAt: serverTimestamp(),
  });
};
