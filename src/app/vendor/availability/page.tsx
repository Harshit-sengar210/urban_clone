"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { AvailabilityHeader } from "@/components/vendor-availability/AvailabilityHeader";
import { AvailabilitySummaries } from "@/components/vendor-availability/AvailabilitySummaries";
import { WeeklySchedule } from "@/components/vendor-availability/WeeklySchedule";
import { BookingPolicies } from "@/components/vendor-availability/BookingPolicies";
import { ExceptionsManager } from "@/components/vendor-availability/ExceptionsManager";
import { CustomerPreview } from "@/components/vendor-availability/CustomerPreview";
import { UnsavedChangesModal } from "@/components/vendor-availability/UnsavedChangesModal";

import { mockAvailabilitySettings } from "@/data/mockVendorData";
import { AvailabilitySettings, DayAvailability } from "@/types/vendor";

export default function VendorAvailabilityPage() {
  
  // Base state from "backend"
  const [baseSettings, setBaseSettings] = useState<AvailabilitySettings>(mockAvailabilitySettings);
  
  // Current working state
  const [settings, setSettings] = useState<AvailabilitySettings>(mockAvailabilitySettings);
  
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Navigation guard state
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Check if dirty
  const hasChanges = JSON.stringify(baseSettings) !== JSON.stringify(settings);

  // Global Toast
  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToastMessage(customEvent.detail);
      setTimeout(() => setToastMessage(""), 3000);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  // Browser reload/close guard
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Hacky intercept for internal links to show our custom modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!hasChanges) return;
      
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.href.includes('/vendor/availability')) {
        e.preventDefault();
        e.stopPropagation();
        setPendingAction(() => () => window.location.href = link.href);
        setShowUnsavedModal(true);
      }
    };
    
    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [hasChanges]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate network delay
    setTimeout(() => {
      setBaseSettings(settings); // commit changes
      setIsSaving(false);
      setToastMessage("Availability updated successfully.");
      setTimeout(() => setToastMessage(""), 3000);
    }, 1200);
  };

  const handleResetRequest = () => {
    if (hasChanges) {
      setPendingAction(() => () => setSettings(baseSettings));
      setShowUnsavedModal(true);
    }
  };

  const executePendingDiscard = () => {
    setShowUnsavedModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const cancelPendingDiscard = () => {
    setShowUnsavedModal(false);
    setPendingAction(null);
  };

  return (
    <VendorLayout>
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">
        
        <AvailabilityHeader 
          acceptingBookings={settings.acceptingBookings}
          onToggleAccepting={(val) => setSettings({ ...settings, acceptingBookings: val })}
          onSave={handleSave}
          onReset={handleResetRequest}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />

        <AvailabilitySummaries settings={settings} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            
            <WeeklySchedule 
              schedule={settings.weeklySchedule} 
              onChange={(newSchedule: DayAvailability[]) => setSettings({ ...settings, weeklySchedule: newSchedule })} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              <BookingPolicies 
                settings={settings} 
                onChange={setSettings} 
              />
              <ExceptionsManager 
                settings={settings} 
                onChange={setSettings} 
              />
            </div>
            
          </div>

          <div className="lg:col-span-1 h-[800px] lg:h-auto lg:sticky lg:top-24">
            <CustomerPreview settings={settings} />
          </div>

        </div>
      </div>

      <UnsavedChangesModal 
        isOpen={showUnsavedModal}
        onStay={cancelPendingDiscard}
        onDiscard={executePendingDiscard}
      />

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2 border border-slate-700 whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </VendorLayout>
  );
}
