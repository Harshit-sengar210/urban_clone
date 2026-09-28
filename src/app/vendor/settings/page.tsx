"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Settings2 } from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { SettingsNav, SettingsSection } from "@/components/vendor-settings/SettingsNav";

import { AccountSection } from "@/components/vendor-settings/sections/AccountSection";
import { SecuritySection } from "@/components/vendor-settings/sections/SecuritySection";
import { NotificationsSection } from "@/components/vendor-settings/sections/NotificationsSection";
import { PrivacySection } from "@/components/vendor-settings/sections/PrivacySection";
import { BookingPreferencesSection } from "@/components/vendor-settings/sections/BookingPreferencesSection";
import { PayoutPreferencesSection } from "@/components/vendor-settings/sections/PayoutPreferencesSection";
import { VerificationSection } from "@/components/vendor-settings/sections/VerificationSection";
import { DangerZoneSection } from "@/components/vendor-settings/sections/DangerZoneSection";

import {
  VendorAccountSettings, VendorSecuritySettings, VendorNotificationSettings,
  VendorNotificationChannels, VendorPrivacySettings, VendorCustomerContactPreferences,
  VendorBookingPreferences,
} from "@/types/vendor";

// ─── Default Settings State ────────────────────────────────────────────────

const DEFAULT_ACCOUNT: VendorAccountSettings = {
  email: "harsh.sharma@example.com",
  phone: "+91 98765 43210",
  language: "en",
  region: "IN",
  timezone: "Asia/Kolkata",
  currency: "INR",
  accountId: "UC-PARTNER-DEMO-001",
};

const DEFAULT_SECURITY: VendorSecuritySettings = {
  loginAlerts: true,
  trustedDevice: false,
};

const DEFAULT_NOTIFICATIONS: VendorNotificationSettings = {
  bookingRequests: true,
  bookingAccepted: true,
  bookingCancelled: true,
  bookingReminders: true,
  serviceUpdates: true,
  verificationUpdates: true,
  accountUpdates: false,
  earningsUpdates: true,
  payoutUpdates: true,
  supportUpdates: true,
};

const DEFAULT_CHANNELS: VendorNotificationChannels = {
  inApp: true,
  email: true,
  push: false,
};

const DEFAULT_PRIVACY: VendorPrivacySettings = {
  showProfessionalProfile: true,
  showPortfolio: true,
  showServiceArea: true,
  showAvailability: true,
  showExperience: true,
};

const DEFAULT_CONTACT: VendorCustomerContactPreferences = {
  allowMessages: true,
  allowCalls: true,
  allowServiceMessages: true,
};

const DEFAULT_BOOKING: VendorBookingPreferences = {
  autoAccept: false,
  allowSameDayBookings: true,
  maxBookingsPerDay: 6,
  minimumNoticeHours: 2,
};

// ─── Section Metadata ──────────────────────────────────────────────────────

const SECTION_TITLES: Record<SettingsSection, string> = {
  account: "Account",
  security: "Security",
  notifications: "Notifications",
  privacy: "Privacy",
  booking: "Booking Preferences",
  payout: "Payout Preferences",
  verification: "Verification",
  danger: "Danger Zone",
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function VendorSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [toastMessage, setToastMessage] = useState("");

  const [account, setAccount] = useState<VendorAccountSettings>(DEFAULT_ACCOUNT);
  const [security, setSecurity] = useState<VendorSecuritySettings>(DEFAULT_SECURITY);
  const [notifications, setNotifications] = useState<VendorNotificationSettings>(DEFAULT_NOTIFICATIONS);
  const [channels, setChannels] = useState<VendorNotificationChannels>(DEFAULT_CHANNELS);
  const [privacy, setPrivacy] = useState<VendorPrivacySettings>(DEFAULT_PRIVACY);
  const [contact, setContact] = useState<VendorCustomerContactPreferences>(DEFAULT_CONTACT);
  const [booking, setBooking] = useState<VendorBookingPreferences>(DEFAULT_BOOKING);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSectionChange = (s: SettingsSection) => setActiveSection(s);

  const sectionContent: Record<SettingsSection, React.ReactNode> = {
    account: <AccountSection data={account} onChange={setAccount} onToast={showToast} />,
    security: <SecuritySection data={security} onChange={setSecurity} onToast={showToast} />,
    notifications: <NotificationsSection data={notifications} channels={channels} onChange={setNotifications} onChannelsChange={setChannels} />,
    privacy: <PrivacySection privacy={privacy} contact={contact} onPrivacyChange={setPrivacy} onContactChange={setContact} />,
    booking: <BookingPreferencesSection data={booking} onChange={setBooking} onToast={showToast} />,
    payout: <PayoutPreferencesSection onToast={showToast} />,
    verification: <VerificationSection />,
    danger: <DangerZoneSection onToast={showToast} />,
  };

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Settings2 className="w-6 h-6 text-indigo-500" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
          </div>
          <p className="text-slate-500 font-medium text-sm">Manage your account, security, notifications, privacy, and partner preferences.</p>
        </motion.div>

        {/* ── Layout — SettingsNav handles mobile/desktop internally ── */}
        <div className="flex gap-8 items-start">
          <SettingsNav active={activeSection} onChange={handleSectionChange} />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Section title */}
            <motion.div
              key={activeSection + "-title"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5"
            >
              <h2 className="text-lg font-extrabold text-slate-900">{SECTION_TITLES[activeSection]}</h2>
            </motion.div>

            {/* Animated section content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {sectionContent[activeSection]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[200] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap pointer-events-none"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </VendorLayout>
  );
}
