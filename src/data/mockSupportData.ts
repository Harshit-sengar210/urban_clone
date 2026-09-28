import {
  SupportArticle,
  SupportTicket,
  SupportCategory,
} from "@/types/vendor";

// ─── Help Articles ─────────────────────────────────────────────────────────

export const mockSupportArticles: SupportArticle[] = [
  {
    id: "art-001",
    title: "How to manage booking requests",
    category: "booking",
    description: "Learn how to accept, reject, and manage incoming booking requests from customers.",
    readingTimeMinutes: 3,
    content: [
      "When a customer requests a booking, you will receive a notification in your Partner Panel.",
      "1. Navigate to the 'Bookings' section from the left sidebar.",
      "2. Select the 'Pending' tab to view all incoming requests.",
      "3. Review the customer details, service type, date, time, and estimated earnings.",
      "4. Tap 'Accept' to confirm the booking or 'Reject' to decline it.",
      "5. Once accepted, the booking moves to 'Confirmed' status and the customer is notified.",
      "Note: Consistently rejecting bookings without reason may affect your partner ranking. Always set your availability accurately to avoid unwanted requests.",
    ],
  },
  {
    id: "art-002",
    title: "How to cancel a confirmed booking",
    category: "booking",
    description: "Steps to cancel a booking you have already accepted, and what happens next.",
    readingTimeMinutes: 2,
    content: [
      "You can cancel a confirmed booking, but this should only be done when absolutely necessary.",
      "1. Go to 'Bookings' from the sidebar.",
      "2. Find the confirmed booking you need to cancel.",
      "3. Open the booking detail by clicking on it.",
      "4. Select 'Cancel Booking' from the action menu.",
      "5. Enter a reason for cancellation in the dialog that appears.",
      "6. Confirm the cancellation.",
      "Important: Frequent cancellations may negatively impact your partner rating and standing on the platform. Please update your availability regularly to minimise the need to cancel.",
    ],
  },
  {
    id: "art-003",
    title: "Understanding booking status",
    category: "booking",
    description: "Learn what each booking status means and how the booking lifecycle works.",
    readingTimeMinutes: 3,
    content: [
      "Each booking goes through several stages. Here is what each status means:",
      "Pending — Customer has placed a request. You have not yet responded.",
      "Confirmed — You have accepted the request. The customer is notified.",
      "In Progress — The service is currently underway.",
      "Completed — The service is finished. The booking is closed.",
      "Cancelled — Either you or the customer cancelled the booking.",
      "Rejected — You rejected the customer's initial request.",
      "Tip: You can filter your bookings list by status using the tabs in the Bookings page.",
    ],
  },
  {
    id: "art-004",
    title: "How payouts work",
    category: "earnings",
    description: "Understand how and when your earnings are transferred to your bank account.",
    readingTimeMinutes: 4,
    content: [
      "Your earnings from completed bookings are credited to your partner wallet.",
      "1. After a booking is marked 'Completed', the earnings are calculated.",
      "2. A platform fee is deducted from the gross booking amount.",
      "3. The net amount is credited to your Available Balance.",
      "4. You can request a payout to your registered bank account or UPI ID from the Earnings page.",
      "Note: This is a demo partner panel. No real financial transactions are performed in this environment.",
    ],
  },
  {
    id: "art-005",
    title: "How to update payout information",
    category: "earnings",
    description: "Steps to add or update your bank account and UPI details for payouts.",
    readingTimeMinutes: 2,
    content: [
      "1. Navigate to 'Profile' from the left sidebar.",
      "2. Scroll to the 'Payout Information' section.",
      "3. Click 'Manage Payout Details'.",
      "4. Update your bank account number, IFSC code, or UPI ID.",
      "5. Save your changes.",
      "For security, payout detail changes may trigger a verification step before becoming active.",
    ],
  },
  {
    id: "art-006",
    title: "Understanding your earnings breakdown",
    category: "earnings",
    description: "Learn how gross earnings, platform fees, and net earnings are calculated.",
    readingTimeMinutes: 3,
    content: [
      "Your earnings are broken down as follows:",
      "Gross Earnings — The total amount the customer pays for the service.",
      "Platform Fee — A percentage retained by UrbanClone for the platform.",
      "Net Earnings — The amount credited to your wallet (Gross minus Platform Fee).",
      "You can view a full earnings breakdown in the 'Earnings' section from the sidebar.",
      "Note: The percentage fee may vary by service category and partner tier.",
    ],
  },
  {
    id: "art-007",
    title: "How to add a new service",
    category: "services",
    description: "Step-by-step guide to adding a new service to your partner profile.",
    readingTimeMinutes: 3,
    content: [
      "1. Navigate to 'My Services' from the left sidebar.",
      "2. Click the '+ Add New Service' button in the top right.",
      "3. Select a service category and the specific service.",
      "4. Set your pricing and estimated duration.",
      "5. Write a clear description for customers.",
      "6. Add any relevant skills or qualifications.",
      "7. Save the service.",
      "Your new service will be listed as 'Active' and visible to customers in your area.",
    ],
  },
  {
    id: "art-008",
    title: "How to enable or disable a service",
    category: "services",
    description: "Quickly toggle a service on or off without deleting it.",
    readingTimeMinutes: 1,
    content: [
      "1. Go to 'My Services' from the sidebar.",
      "2. Find the service you want to toggle.",
      "3. Click the 'Active/Inactive' toggle switch on the service card.",
      "4. A disabled service will not appear in customer search results but remains saved in your profile.",
      "This is useful when you are temporarily not offering a specific service.",
    ],
  },
  {
    id: "art-009",
    title: "How to update your availability",
    category: "services",
    description: "Learn how to set your working hours and days in the Availability section.",
    readingTimeMinutes: 2,
    content: [
      "1. Navigate to 'Availability' from the left sidebar.",
      "2. Toggle individual days on or off to mark them as working days.",
      "3. Set your start and end time for each working day.",
      "4. You can add multiple time ranges per day (e.g., morning and evening shifts).",
      "5. Add break periods such as a lunch break.",
      "6. Save your schedule.",
      "Your availability determines which time slots customers can book you for.",
    ],
  },
  {
    id: "art-010",
    title: "How the partner verification process works",
    category: "verification",
    description: "Understand the steps to get your partner account approved.",
    readingTimeMinutes: 4,
    content: [
      "After completing your partner onboarding, your application goes through a review process.",
      "Stage 1: Profile Draft — You fill in your details during onboarding.",
      "Stage 2: Application Submitted — Your completed application is sent for review.",
      "Stage 3: Admin Review — The UrbanClone team reviews your documents and details.",
      "Stage 4: Verified Partner — Your account is approved and you can start accepting bookings.",
      "You can track your current status in the 'Profile' section under 'Verification & Application'.",
      "If changes are requested, you will receive a notification with specific details.",
    ],
  },
  {
    id: "art-011",
    title: "How to update your profile",
    category: "verification",
    description: "Edit your personal information, professional details, and work portfolio.",
    readingTimeMinutes: 2,
    content: [
      "1. Go to 'Profile' from the left sidebar.",
      "2. Click 'Edit' on any section you want to update.",
      "3. Make your changes in the form fields.",
      "4. Click 'Save' to apply the changes.",
      "5. For your work portfolio, click 'Add Image' in the portfolio section.",
      "Changes to verification documents may require re-review by the admin team.",
    ],
  },
  {
    id: "art-012",
    title: "How to manage your reviews",
    category: "verification",
    description: "Understand your ratings and reply to customer reviews.",
    readingTimeMinutes: 2,
    content: [
      "1. Navigate to 'Reviews' from the left sidebar.",
      "2. View your rating overview and individual customer reviews.",
      "3. Click on any review to open the detail view.",
      "4. Use the reply box to write a professional response.",
      "5. Click 'Post Reply' to publish your response.",
      "Responding to reviews — both positive and critical — demonstrates professionalism to future customers.",
    ],
  },
  {
    id: "art-013",
    title: "How to change your account password",
    category: "account",
    description: "Steps to update your login password.",
    readingTimeMinutes: 1,
    content: [
      "1. Go to 'Profile' from the sidebar.",
      "2. Scroll to the 'Account Actions' section at the bottom.",
      "3. Click 'Change Password'.",
      "4. Enter your current password.",
      "5. Enter and confirm your new password.",
      "6. Click 'Save'.",
    ],
  },
  {
    id: "art-014",
    title: "How to manage notification settings",
    category: "account",
    description: "Control which notifications you receive and how.",
    readingTimeMinutes: 2,
    content: [
      "1. Go to 'Profile' from the sidebar.",
      "2. Click 'Notification Settings' in the Account Actions section.",
      "3. Toggle on/off the types of notifications you want to receive.",
      "4. Choose between Push, SMS, or Email delivery.",
      "5. Save your preferences.",
    ],
  },
  {
    id: "art-015",
    title: "Platform is not loading correctly",
    category: "technical",
    description: "Troubleshoot common technical issues with the UrbanClone partner platform.",
    readingTimeMinutes: 3,
    content: [
      "If you are experiencing technical issues, try the following steps:",
      "1. Refresh the page (Ctrl+R or Cmd+R).",
      "2. Clear your browser cache and cookies.",
      "3. Try a different browser or device.",
      "4. Check your internet connection.",
      "5. Disable browser extensions that may interfere.",
      "If the issue persists, please create a support ticket and include details of what you were doing when the problem occurred.",
    ],
  },
];

// ─── Mock Tickets ─────────────────────────────────────────────────────────

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "UC-DEMO-1001",
    subject: "Unable to update my availability schedule",
    category: "services",
    description:
      "I am trying to set my Wednesday hours to 9 AM - 6 PM but the save button is not responding. This is happening consistently since yesterday.",
    priority: "normal",
    status: "in_progress",
    createdAt: "2026-09-18T10:30:00Z",
    updatedAt: "2026-09-19T14:00:00Z",
    messages: [
      {
        id: "msg-001",
        sender: "partner",
        message:
          "I am trying to set my Wednesday hours to 9 AM - 6 PM but the save button is not responding. This is happening consistently since yesterday.",
        createdAt: "2026-09-18T10:30:00Z",
      },
      {
        id: "msg-002",
        sender: "support",
        message:
          "Hello! Thank you for reaching out. This is a demo support response. Our demo team has received your report and will look into the availability save issue. As a workaround, please try clearing your browser cache or using a different browser. We will update you shortly.",
        createdAt: "2026-09-19T14:00:00Z",
      },
    ],
  },
  {
    id: "UC-DEMO-1002",
    subject: "Payout not reflecting in my bank account",
    category: "earnings",
    description: "I requested a payout 5 days ago and it still hasn't appeared in my bank account.",
    priority: "high",
    status: "waiting_for_response",
    createdAt: "2026-09-15T09:00:00Z",
    updatedAt: "2026-09-16T11:00:00Z",
    messages: [
      {
        id: "msg-003",
        sender: "partner",
        message:
          "I requested a payout 5 days ago and it still hasn't appeared in my bank account. My bank details are correct.",
        createdAt: "2026-09-15T09:00:00Z",
      },
      {
        id: "msg-004",
        sender: "support",
        message:
          "Hi! This is a demo support response. Payout processing timelines vary by bank. In this demo environment, no real transactions are performed. If this were a real issue, our finance team would investigate the transfer within 2-3 business days. Could you please confirm your bank account details are up to date?",
        createdAt: "2026-09-16T11:00:00Z",
      },
    ],
  },
  {
    id: "UC-DEMO-1003",
    subject: "Booking was auto-cancelled unexpectedly",
    category: "booking",
    description:
      "A booking with ID BK-4521 was cancelled automatically without my action. The customer says they did not cancel it either.",
    priority: "high",
    status: "resolved",
    bookingId: "BK-4521",
    createdAt: "2026-09-10T15:00:00Z",
    updatedAt: "2026-09-12T09:00:00Z",
    messages: [
      {
        id: "msg-005",
        sender: "partner",
        message:
          "A booking with ID BK-4521 was cancelled automatically without my action. The customer says they did not cancel it either.",
        createdAt: "2026-09-10T15:00:00Z",
      },
      {
        id: "msg-006",
        sender: "support",
        message:
          "Thank you for reporting this. This is a demo support response. Our demo team has investigated. In a real scenario, bookings may auto-cancel if neither party confirms within the response window. We will clarify the exact trigger and update our documentation.",
        createdAt: "2026-09-11T10:00:00Z",
      },
      {
        id: "msg-007",
        sender: "support",
        message:
          "Demo update: This has been reviewed and resolved on our end. The booking cancellation policy is now documented in the Help Center under 'Understanding booking status'. We apologise for the inconvenience.",
        createdAt: "2026-09-12T09:00:00Z",
      },
    ],
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const mockFAQItems = [
  {
    id: "faq-1",
    question: "How do I accept a booking?",
    answer:
      "Go to Bookings → Pending tab. Review the booking details and click 'Accept'. The customer will be notified immediately.",
  },
  {
    id: "faq-2",
    question: "How do I update my services?",
    answer:
      "Navigate to 'My Services' from the sidebar. You can add new services, edit existing ones, change pricing, or disable any service temporarily.",
  },
  {
    id: "faq-3",
    question: "How can I change my availability?",
    answer:
      "Go to the 'Availability' section. Set your working days and time ranges. You can add multiple time ranges per day and configure break periods.",
  },
  {
    id: "faq-4",
    question: "Where can I view my earnings?",
    answer:
      "Click 'Earnings' in the left sidebar. You'll see your total earnings, available balance, payout history, and a breakdown by service.",
  },
  {
    id: "faq-5",
    question: "How do I update my profile?",
    answer:
      "Go to 'Profile' from the sidebar. Click 'Edit' on any section to update your personal information, professional details, or work portfolio.",
  },
  {
    id: "faq-6",
    question: "What happens after I submit my verification?",
    answer:
      "Your application enters admin review. You can track progress in the Profile page under 'Verification & Application'. You will be notified when your status changes.",
  },
  {
    id: "faq-7",
    question: "How do I contact support?",
    answer:
      "Scroll to the bottom of this page and click 'Create Support Request'. Fill in the category, subject, and description. You can track your tickets in the 'My Support Requests' section.",
  },
];

// ─── Category Metadata ─────────────────────────────────────────────────────

export const supportCategoryMeta: Record<
  SupportCategory,
  { label: string; articleCount: number }
> = {
  booking: { label: "Bookings", articleCount: 12 },
  earnings: { label: "Earnings & Payouts", articleCount: 8 },
  services: { label: "Services & Availability", articleCount: 9 },
  verification: { label: "Profile & Verification", articleCount: 7 },
  account: { label: "Account & Security", articleCount: 6 },
  technical: { label: "Technical Issues", articleCount: 5 },
  other: { label: "Other", articleCount: 3 },
};
