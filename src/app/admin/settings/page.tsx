"use client";

import { useState } from "react";
import { 
  Settings, Store, Calendar, CreditCard, Users, 
  UserSquare2, Bell, Shield, Globe, Calculator, 
  Link, ToggleLeft, Search
} from "lucide-react";
import { defaultAdminSettings, type SettingSection } from "@/data/adminSettingsData";

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [settings, setSettings] = useState(defaultAdminSettings);

  const sections: { id: SettingSection; label: string; icon: React.ReactNode; description: string }[] = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" />, description: "Platform identity and basic configuration" },
    { id: "marketplace", label: "Marketplace", icon: <Store className="w-4 h-4" />, description: "Marketplace behavior and customer experience" },
    { id: "booking_rules", label: "Booking Rules", icon: <Calendar className="w-4 h-4" />, description: "Booking lifecycle and scheduling rules" },
    { id: "payments", label: "Payments", icon: <CreditCard className="w-4 h-4" />, description: "Payment and refund configuration" },
    { id: "vendor_rules", label: "Vendor Rules", icon: <UserSquare2 className="w-4 h-4" />, description: "Partner onboarding and operational requirements" },
    { id: "customer_rules", label: "Customer Rules", icon: <Users className="w-4 h-4" />, description: "Customer account and booking policies" },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, description: "Platform notification behavior" },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" />, description: "Authentication and administrative security" },
    { id: "localization", label: "Localization", icon: <Globe className="w-4 h-4" />, description: "Language, currency, timezone, regional settings" },
    { id: "tax_fees", label: "Tax & Fees", icon: <Calculator className="w-4 h-4" />, description: "Platform fees and tax configuration" },
    { id: "integrations", label: "Integrations", icon: <Link className="w-4 h-4" />, description: "External services and API connections" },
    { id: "feature_flags", label: "Feature Flags", icon: <ToggleLeft className="w-4 h-4" />, description: "Gradual feature activation" }
  ];

  const handleSettingChange = (section: keyof typeof settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Admin Settings</h1>
          <p className="text-sm text-slate-500">Configure marketplace rules, booking behavior, payments, vendors, and platform preferences.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${hasUnsavedChanges ? 'text-amber-600' : 'text-slate-400'}`}>
            {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <button 
            disabled={!hasUnsavedChanges}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Changes
          </button>
          <button 
            disabled={!hasUnsavedChanges}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-6">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search settings..."
                className="w-full pl-8 pr-3 h-8 bg-slate-50 border border-slate-200 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]"
              />
            </div>
          </div>
          <nav className="p-2 flex flex-row md:flex-col overflow-x-auto hide-scrollbar">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 w-full p-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap md:whitespace-normal text-left ${
                  activeSection === section.id 
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`${activeSection === section.id ? 'text-[var(--color-primary)]' : 'text-slate-400'}`}>
                  {section.icon}
                </div>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full space-y-6">
          
          {/* General Settings Section */}
          {activeSection === "general" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">General Settings</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'general')?.description}</p>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Platform Identity */}
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Platform Identity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Platform Name</label>
                      <input 
                        type="text" 
                        value={settings.general.platformName}
                        onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Platform Short Name</label>
                      <input 
                        type="text" 
                        value={settings.general.platformShortName}
                        onChange={(e) => handleSettingChange('general', 'platformShortName', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700">Platform Description</label>
                      <input 
                        type="text" 
                        value={settings.general.platformDescription}
                        onChange={(e) => handleSettingChange('general', 'platformDescription', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Support Email</label>
                      <input 
                        type="email" 
                        value={settings.general.supportEmail}
                        onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                      <p className="text-[10px] text-slate-400">Demo field — no actual emails sent to this address.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Support Phone</label>
                      <input 
                        type="text" 
                        value={settings.general.supportPhone}
                        onChange={(e) => handleSettingChange('general', 'supportPhone', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </section>

                {/* Platform Status */}
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Platform Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-800">Platform Enabled</p>
                        <p className="text-xs text-slate-500">Allow customers to access the marketplace.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.general.platformEnabled}
                          onChange={(e) => handleSettingChange('general', 'platformEnabled', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                      <div>
                        <p className="text-sm font-bold text-slate-800">Maintenance Mode</p>
                        <p className="text-xs text-slate-500">Show maintenance page to all non-admin users.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.general.maintenanceMode}
                          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    {settings.general.maintenanceMode && (
                      <div className="space-y-1.5 mt-2 animate-in slide-in-from-top-2 duration-300">
                        <label className="text-xs font-bold text-slate-700">Maintenance Message</label>
                        <input 
                          type="text" 
                          value={settings.general.maintenanceMessage}
                          onChange={(e) => handleSettingChange('general', 'maintenanceMessage', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Marketplace Settings Section */}
          {activeSection === "marketplace" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Marketplace Settings</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'marketplace')?.description}</p>
              </div>
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Feature Toggles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'enableCustomerBookings', label: 'Customer Bookings' },
                      { id: 'enableVendorMarketplace', label: 'Vendor Marketplace' },
                      { id: 'enableServiceSearch', label: 'Service Search' },
                      { id: 'enablePackageSelection', label: 'Package Selection' },
                      { id: 'enableReviews', label: 'Reviews & Ratings' },
                      { id: 'enableOffers', label: 'Promotional Offers' },
                      { id: 'enableWallet', label: 'Digital Wallet' },
                    ].map(feature => (
                      <div key={feature.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={settings.marketplace[feature.id as keyof typeof settings.marketplace] as boolean}
                            onChange={(e) => handleSettingChange('marketplace', feature.id, e.target.checked)}
                          />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Search & Discovery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Default Service Sort</label>
                      <select 
                        value={settings.marketplace.defaultServiceSort}
                        onChange={(e) => handleSettingChange('marketplace', 'defaultServiceSort', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="popular">Popular</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Max Search Results</label>
                      <input 
                        type="number" 
                        value={settings.marketplace.maxSearchResults}
                        onChange={(e) => handleSettingChange('marketplace', 'maxSearchResults', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Booking Rules Section */}
          {activeSection === "booking_rules" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Booking Rules</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'booking_rules')?.description}</p>
              </div>
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Scheduling Constraints</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Minimum Lead Time (Hours)</label>
                      <input 
                        type="number" 
                        value={settings.bookingRules.minLeadTimeHours}
                        onChange={(e) => handleSettingChange('bookingRules', 'minLeadTimeHours', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Max Advance Booking (Days)</label>
                      <input 
                        type="number" 
                        value={settings.bookingRules.maxAdvanceBookingDays}
                        onChange={(e) => handleSettingChange('bookingRules', 'maxAdvanceBookingDays', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Confirmation Mode</label>
                      <select 
                        value={settings.bookingRules.confirmationMode}
                        onChange={(e) => handleSettingChange('bookingRules', 'confirmationMode', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      >
                        <option value="automatic">Automatic</option>
                        <option value="vendor_confirmation">Vendor Must Confirm</option>
                        <option value="admin_confirmation">Admin Must Confirm</option>
                      </select>
                    </div>
                  </div>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Cancellations & Rescheduling</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Customer Cancel Window (Hours)</label>
                      <input 
                        type="number" 
                        value={settings.bookingRules.customerCancelWindowHours}
                        onChange={(e) => handleSettingChange('bookingRules', 'customerCancelWindowHours', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Max Reschedules Allowed</label>
                      <input 
                        type="number" 
                        value={settings.bookingRules.maxReschedules}
                        onChange={(e) => handleSettingChange('bookingRules', 'maxReschedules', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Payments Section */}
          {activeSection === "payments" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Payments</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'payments')?.description}</p>
              </div>
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Payment Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Allowed Payment Modes</label>
                      <select 
                        value={settings.payments.paymentMode}
                        onChange={(e) => handleSettingChange('payments', 'paymentMode', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      >
                        <option value="online">Online Only</option>
                        <option value="cash">Cash Only</option>
                        <option value="online_cash">Online & Cash</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Require Payment Before Confirmation</p>
                      <p className="text-xs text-slate-500">Bookings stay pending until paid.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={settings.payments.requirePaymentBeforeConfirmation}
                        onChange={(e) => handleSettingChange('payments', 'requirePaymentBeforeConfirmation', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>
                </section>
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Refund Processing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Refund Mode</label>
                      <select 
                        value={settings.payments.refundProcessing}
                        onChange={(e) => handleSettingChange('payments', 'refundProcessing', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      >
                        <option value="automatic">Automatic via Gateway</option>
                        <option value="manual">Manual Admin Review</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Default Refund Window (Hours)</label>
                      <input 
                        type="number" 
                        value={settings.payments.defaultRefundWindowHours}
                        onChange={(e) => handleSettingChange('payments', 'defaultRefundWindowHours', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Vendor Rules Section */}
          {activeSection === "vendor_rules" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Vendor Rules</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'vendor_rules')?.description}</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'requireAdminApproval', label: 'Require Admin Approval' },
                    { id: 'allowSelfRegistration', label: 'Allow Self Registration' },
                    { id: 'requireIdentityVerify', label: 'Require Identity Verify' },
                    { id: 'requireBusinessVerify', label: 'Require Business Verify' },
                    { id: 'requireBankDetails', label: 'Require Bank Details' },
                    { id: 'requireServiceArea', label: 'Require Service Area' },
                    { id: 'requireExperience', label: 'Require Experience Info' },
                    { id: 'autoFlagLowPerformers', label: 'Auto Flag Low Performers' },
                  ].map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-sm font-medium text-slate-700">{rule.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.vendorRules[rule.id as keyof typeof settings.vendorRules] as boolean}
                          onChange={(e) => handleSettingChange('vendorRules', rule.id, e.target.checked)}
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Min Rating Required</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={settings.vendorRules.minRating}
                      onChange={(e) => handleSettingChange('vendorRules', 'minRating', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Min Completion Rate %</label>
                    <input 
                      type="number" 
                      value={settings.vendorRules.minCompletionRate}
                      onChange={(e) => handleSettingChange('vendorRules', 'minCompletionRate', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Rules Section */}
          {activeSection === "customer_rules" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Customer Rules</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'customer_rules')?.description}</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'allowRegistration', label: 'Allow Registration' },
                    { id: 'requireEmailVerify', label: 'Require Email Verify' },
                    { id: 'requirePhoneVerify', label: 'Require Phone Verify' },
                    { id: 'allowSocialLogin', label: 'Allow Social Login' },
                    { id: 'allowGuestBrowsing', label: 'Allow Guest Browsing' },
                    { id: 'allowReviews', label: 'Allow Writing Reviews' },
                  ].map(rule => (
                    <div key={rule.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-sm font-medium text-slate-700">{rule.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={settings.customerRules[rule.id as keyof typeof settings.customerRules] as boolean}
                          onChange={(e) => handleSettingChange('customerRules', rule.id, e.target.checked)}
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0A192F]">Security Settings</h2>
                <p className="text-sm text-slate-500 mt-1">{sections.find(s => s.id === 'security')?.description}</p>
              </div>
              <div className="p-6 space-y-8">
                <section>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Authentication Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Min Password Length</label>
                      <input 
                        type="number" 
                        value={settings.security.minPasswordLength}
                        onChange={(e) => handleSettingChange('security', 'minPasswordLength', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Session Timeout (Minutes)</label>
                      <input 
                        type="number" 
                        value={settings.security.sessionTimeoutMinutes}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeoutMinutes', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Max Failed Logins</label>
                      <input 
                        type="number" 
                        value={settings.security.maxFailedLoginAttempts}
                        onChange={(e) => handleSettingChange('security', 'maxFailedLoginAttempts', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </section>
                <section>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Require 2FA</p>
                      <p className="text-xs text-slate-500">Require Two-Factor Authentication for all Admin users.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={settings.security.require2FA}
                        onChange={(e) => handleSettingChange('security', 'require2FA', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {!["general", "marketplace", "booking_rules", "payments", "vendor_rules", "customer_rules", "security"].includes(activeSection) && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-300">
                {sections.find(s => s.id === activeSection)?.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0A192F] capitalize">{sections.find(s => s.id === activeSection)?.label}</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
              <p className="text-xs text-slate-400 mt-4 bg-slate-50 py-1.5 px-3 rounded-full inline-block">
                This configuration module is not yet implemented.
              </p>
            </div>
          )}

        </div>
      </div>
      
      {/* Sticky Save Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-full flex justify-center md:justify-end md:pr-12 lg:pr-24">
          <div className="flex items-center gap-4 bg-slate-50 p-2 pl-4 rounded-xl border border-slate-200">
            <span className="text-sm font-bold text-slate-700">You have unsaved changes</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setSettings(defaultAdminSettings); setHasUnsavedChanges(false); }}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Discard
              </button>
              <button 
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
