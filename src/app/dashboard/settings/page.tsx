"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, Search } from "lucide-react";
import { SettingsSection } from "@/data/settings";
import { SettingsSidebar, SettingsMobileNav } from "@/components/settings/SettingsSidebar";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AppearanceSettingsSection } from "@/components/settings/AppearanceSettings";
import { LanguageRegionSettings } from "@/components/settings/LanguageRegionSettings";
import { PaymentSettings } from "@/components/settings/PaymentSettings";
import { CommunicationSettings } from "@/components/settings/CommunicationSettings";
import { PreferenceSettings } from "@/components/settings/PreferenceSettings";
import { AccountManagement } from "@/components/settings/AccountManagement";
import { ChangePasswordModal, DeleteAccountModal } from "@/components/settings/SettingsModals";
import { ToastContainer, useToast } from "@/components/bookings/Toast";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [passModalOpen, setPassModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { toasts, showToast, removeToast } = useToast();

  const renderContent = () => {
    switch (activeSection) {
      case "account": return <AccountSettings />;
      case "notifications": return <NotificationSettings />;
      case "privacy": return <PrivacySettings />;
      case "security": return <SecuritySettings onOpenPasswordModal={() => setPassModalOpen(true)} onOpen2FAModal={() => showToast("2FA setup initiated")} onOpenLogoutModal={() => showToast("Signed out of all other sessions")} />;
      case "appearance": return <AppearanceSettingsSection />;
      case "language": return <LanguageRegionSettings />;
      case "payments": return <PaymentSettings onAddPaymentMethod={() => showToast("Add payment method modal")} />;
      case "communication": return <CommunicationSettings />;
      case "preferences": return <PreferenceSettings />;
      case "account-management": return <AccountManagement onOpenDeactivate={() => showToast("Account deactivated")} onOpenDelete={() => setDeleteModalOpen(true)} />;
      default: return <AccountSettings />;
    }
  };

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-medium mb-3">
            <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" /> Dashboard
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[var(--color-foreground)]">Settings</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-1">Settings</h1>
              <p className="text-sm text-[var(--color-muted)] font-medium">Manage your account, preferences, notifications, and privacy.</p>
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search settings..."
                className="w-full h-11 pl-9 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all bg-white shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start relative pt-4">
          <SettingsMobileNav activeSection={activeSection} onSectionChange={setActiveSection} />
          <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <div className="flex-1 w-full min-w-0">
            {searchQuery ? (
              <div className="py-12 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-[var(--color-foreground)] mb-1">No settings found</h3>
                <p className="text-xs text-[var(--color-muted)]">Try searching for another keyword or browse the categories.</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

      </div>

      <ChangePasswordModal open={passModalOpen} onClose={() => setPassModalOpen(false)} />
      <DeleteAccountModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
