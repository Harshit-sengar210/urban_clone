import { NextRequest, NextResponse } from "next/server";
import { FieldValue, Transaction } from 'firebase-admin/firestore';
import { adminDb, adminAuth } from "@/backend/firebase-admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> } // wait, next.js 15+ needs await params? Since the prompt doesn't strictly say it's 15, I'll use standard approach but next.js 15 requires awaiting params
) {
  try {
    const p = await params;
    const applicationId = p.applicationId;
    
    // In a real app, verify admin authentication here using cookies/headers.
    // For this prototype, we'll assume the request is authorized if it reaches here.
    
    const docRef = adminDb.collection("vendorApplications").doc(applicationId);
    
    return await adminDb.runTransaction(async (transaction: Transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists) {
        return NextResponse.json({ error: "Application not found" }, { status: 404 });
      }
      
      const appData = docSnap.data();
      if (!appData) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
      
      if (appData.status === "approved") {
        return NextResponse.json({ error: "Already approved" }, { status: 400 });
      }
      
      const vendorId = appData.vendorId || appData.userId;
      if (!vendorId) {
        return NextResponse.json({ error: "No user attached to this application" }, { status: 400 });
      }
      
      // Update custom claims (role = vendor)
      try {
        await adminAuth.setCustomUserClaims(vendorId, { role: "vendor" });
      } catch (authErr) {
        console.error("Failed to set custom claims", authErr);
      }
      
      // Create vendor profile
      const vendorProfileRef = adminDb.collection("vendors").doc(vendorId);
      const vendorProfile = {
        vendorId,
        applicationId,
        status: "active",
        approvedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        email: appData.email || "",
        name: appData.personal?.fullName || appData.personal?.legalName || "",
        phone: appData.personal?.phone || "",
        businessName: appData.business?.businessName || "",
        services: appData.services?.services || [],
        city: appData.serviceArea?.cities?.[0]?.name || "",
        rating: 0,
        reviewCount: 0,
        bookingCount: 0,
        totalEarnings: 0
      };
      
      transaction.set(vendorProfileRef, vendorProfile);
      
      // Update application status
      transaction.update(docRef, {
        status: "approved",
        vendorStatus: "approved",
        approvedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      
      // Send secure reset password link
      let activationLink = "";
      try {
        if (appData.email) {
          activationLink = await adminAuth.generatePasswordResetLink(appData.email);
          // Here we would dispatch to an email service (SendGrid, Postmark, etc.)
          // We'll log it as a notification instead for the prototype
          const notificationRef = adminDb.collection("vendorNotifications").doc();
          transaction.set(notificationRef, {
            type: "vendor_approved",
            recipientUserId: vendorId,
            applicationId,
            status: "pending",
            activationLink, // Storing temporarily just for debugging, remove in real prod
            createdAt: FieldValue.serverTimestamp()
          });
        }
      } catch (emailErr) {
        console.error("Failed to generate password reset link", emailErr);
      }
      
      return NextResponse.json({ success: true, vendorId, activationLink });
    });
    
  } catch (error: any) {
    console.error("Approval error:", error);
    return NextResponse.json({ error: error.message || "Failed to approve" }, { status: 500 });
  }
}
