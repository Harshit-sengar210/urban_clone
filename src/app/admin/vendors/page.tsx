"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, ChevronDown, Loader2 } from "lucide-react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { VendorSummaryCards } from "@/components/admin/vendors/VendorSummaryCards";
import { VendorStatusTabs, type VendorTabFilter } from "@/components/admin/vendors/VendorStatusTabs";
import { VendorToolbar } from "@/components/admin/vendors/VendorToolbar";
import { VendorTable } from "@/components/admin/vendors/VendorTable";
import { VendorProfileDrawer } from "@/components/admin/vendors/VendorProfileDrawer";
import { VendorApplicationDrawer } from "@/components/admin/vendors/VendorApplicationDrawer";
import { VendorModals, type VendorModalType } from "@/components/admin/vendors/VendorModals";
import { adminVendorsData, type AdminVendor, type VendorStatus } from "@/data/adminVendorsData";
import { useAdminVendors } from "@/hooks/admin/useAdminVendors";

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState<VendorTabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());

  const { pendingVendors, approvedVendors, isLoading } = useAdminVendors();

  useEffect(() => {
    const fixMissingAvatars = async () => {
      try {
        const { getDoc, doc, updateDoc, collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/backend/firebase");

        const vendorsSnap = await getDocs(collection(db, "vendors"));
        for (const vDoc of vendorsSnap.docs) {
          const vData = vDoc.data();
          if (!vData.avatar && vData.applicationId) {
            const appSnap = await getDoc(doc(db, "vendorApplications", vData.applicationId));
            if (appSnap.exists()) {
              const appData = appSnap.data();
              if (appData.personal?.profilePhoto) {
                await updateDoc(vDoc.ref, { avatar: appData.personal.profilePhoto });
              }
            }
          }
        }
      } catch (e) {
        console.error("Avatar sync error:", e);
      }
    };
    fixMissingAvatars();
  }, []);

  const realVendors = useMemo(() => {
    // Deduplicate vendors by ID to prevent React duplicate key errors 
    // during the split-second race condition between Firestore collections updates
    const all = [...pendingVendors, ...approvedVendors];
    const unique = new Map();
    all.forEach(v => unique.set(v.id, v));
    return Array.from(unique.values());
  }, [pendingVendors, approvedVendors]);
  // Drawer States
  const [profileDrawerVendor, setProfileDrawerVendor] = useState<AdminVendor | null>(null);
  const [appDrawerVendor, setAppDrawerVendor] = useState<AdminVendor | null>(null);

  // Modal States
  const [modalType, setModalType] = useState<VendorModalType>(null);
  const [modalVendor, setModalVendor] = useState<AdminVendor | null>(null);

  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const counts = useMemo(() => {
    return {
      all: realVendors.length,
      pending: realVendors.filter(v => v.status === "pending").length,
      approved: realVendors.filter(v => v.status === "approved").length,
      needs_changes: realVendors.filter(v => v.status === "needs_changes").length,
      suspended: realVendors.filter(v => v.status === "suspended").length,
      rejected: realVendors.filter(v => v.status === "rejected").length,
    };
  }, [realVendors]);

  const summaryData = useMemo(() => [
    { id: "1", title: "Total Vendors", value: counts.all.toString(), trend: "up", change: "", icon: "Users" },
    { id: "2", title: "Pending Approval", value: counts.pending.toString(), trend: "neutral", change: "", icon: "Clock" },
    { id: "3", title: "Approved Vendors", value: counts.approved.toString(), trend: "up", change: "", icon: "CheckCircle" },
    { id: "4", title: "Needs Attention", value: (counts.needs_changes + counts.suspended + counts.rejected).toString(), trend: "down", change: "", icon: "AlertCircle" },
  ], [counts]);

  const filteredVendors = useMemo(() => {
    // Only use real vendors from Firestore. Do not use dummy data.
    let result = realVendors;

    // Tab Filter
    if (activeTab !== "all") {
      result = result.filter(v => v.status === activeTab);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.businessName.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.primaryCategory.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery, realVendors]);

  const handleSelectVendor = (id: string) => {
    setSelectedVendors(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedVendors.size === filteredVendors.length && filteredVendors.length > 0) {
      setSelectedVendors(new Set());
    } else {
      setSelectedVendors(new Set(filteredVendors.map(v => v.id)));
    }
  };

  const handleRowClick = (vendor: AdminVendor) => {
    if (vendor.status === "approved" || vendor.status === "suspended") {
      setProfileDrawerVendor(vendor);
    } else {
      setAppDrawerVendor(vendor);
    }
  };

  const handleActionClick = (e: React.MouseEvent, vendor: AdminVendor) => {
    e.stopPropagation();
    handleRowClick(vendor);
  };

  const handleConfirmModal = async (payload?: any) => {
    let msg = "";

    if (modalVendor) {
      if (modalType === "approve") {
        try {
          const { approveVendorApplication } = await import("@/services/admin/adminVendorsService");
          await approveVendorApplication(modalVendor.id);
          msg = "Vendor approved successfully.";
        } catch (e) {
          console.error(e);
          showToast("Approval failed");
          return;
        }
      } else if (modalType === "suspend" || modalType === "restore" || modalType === "remove") {
        try {
          const { updateVendorStatus } = await import("@/services/admin/adminVendorsService");
          const status = modalType === "suspend" ? "suspended" : modalType === "restore" ? "active" : "removed";
          await updateVendorStatus(modalVendor.id, status, payload?.reason);

          if (modalType === "remove") {
            const { deleteDoc, doc } = await import("firebase/firestore");
            const { db } = await import("@/backend/firebase");
            await deleteDoc(doc(db, "vendors", modalVendor.id));
            msg = "Vendor permanently removed.";
          } else {
            msg = modalType === "suspend" ? "Vendor suspended." : "Vendor restored.";
          }
        } catch (error) {
          console.error("Failed to update vendor", error);
          showToast("Error updating vendor status");
          return;
        }
      } else {
        let newStatus = "";
        if (modalType === "reject") newStatus = "rejected";
        else if (modalType === "request_changes") newStatus = "needs_changes";

        if (newStatus) {
          try {
            await updateDoc(doc(db, "vendorApplications", modalVendor.id), {
              status: newStatus,
              updatedAt: new Date()
            });
            msg = modalType === "reject" ? "Vendor application rejected." : "Changes requested from vendor.";
          } catch (error) {
            console.error("Failed to update status", error);
            showToast("Error updating vendor status");
            return;
          }
        }
      }
    }

    if (modalType === "add") msg = "Demo vendor added.";

    showToast(msg);
    setModalType(null);
    setModalVendor(null);
    setAppDrawerVendor(null);
    setProfileDrawerVendor(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Vendors</h1>
          <p className="text-sm text-slate-500">Manage service professionals, applications, verification, and marketplace access.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsMoreActionsOpen(!isMoreActionsOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors"
            >
              <span>More Actions</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isMoreActionsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMoreActionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50"
                >
                  <button
                    onClick={() => { setIsMoreActionsOpen(false); showToast("Exporting vendors list..."); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Export All Vendors
                  </button>
                  <button
                    onClick={() => { setIsMoreActionsOpen(false); showToast("Opening import dialog..."); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Import Vendors
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => { setIsMoreActionsOpen(false); showToast("Vendor reports compiling..."); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    View Vendor Reports
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setModalType("add")}
            className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vendor</span>
          </button>
        </div>
      </div>

      <VendorStatusTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />

      <VendorSummaryCards summary={summaryData as any} />

      <VendorToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCount={0}
        onExport={() => showToast("Export ready for backend integration.")}
      />

      {selectedVendors.size > 0 && (
        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg p-3 flex items-center justify-between animate-in slide-in-from-top-2">
          <span className="text-sm font-bold text-[var(--color-primary-dark)]">
            {selectedVendors.size} vendors selected
          </span>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {activeTab === "pending" && (
              <button className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors shadow-sm">Approve Selected</button>
            )}
            {activeTab === "approved" && (
              <button className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors">Suspend</button>
            )}
            <button className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-[var(--color-primary-dark)] bg-white hover:bg-slate-50 rounded-md transition-colors">Export</button>
            <button onClick={() => { setSelectedVendors(new Set()); showToast("Selection cleared."); }} className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors">Clear</button>
          </div>
        </div>
      )}

      <VendorTable
        vendors={filteredVendors}
        selectedVendors={selectedVendors}
        onSelectVendor={handleSelectVendor}
        onSelectAll={handleSelectAll}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
        activeTab={activeTab}
      />

      {/* Drawers */}
      <VendorProfileDrawer
        vendor={profileDrawerVendor}
        onClose={() => setProfileDrawerVendor(null)}
        services={[]}
        bookings={[]}
        reviews={[]}
        earnings={{ total: 0, thisMonth: 0, pending: 0, completedPayouts: 0 }}
        onSuspend={(v) => { setModalType("suspend"); setModalVendor(v); }}
        onRestore={(v) => { setModalType("restore"); setModalVendor(v); }}
        onRemove={(v) => { setModalType("remove"); setModalVendor(v); }}
        onViewApplication={async (v) => {
          const { getAdminVendorApplication } = await import("@/services/admin/adminVendorsService");
          // Try applicationId first, then fall back to the vendor's own id
          const appId = v.rawData?.applicationId || v.rawData?.vendorId || v.id;
          const app = await getAdminVendorApplication(appId);
          if (app) {
            setAppDrawerVendor(app);
          } else {
            // Last resort: open the drawer with the vendor's own data
            // rawData already contains personal/business/etc if approved post-fix
            setAppDrawerVendor(v);
          }
        }}
      />

      <VendorApplicationDrawer
        vendor={appDrawerVendor}
        onClose={() => setAppDrawerVendor(null)}
        onApprove={(v) => { setModalType("approve"); setModalVendor(v); }}
        onRequestChanges={(v) => { setModalType("request_changes"); setModalVendor(v); }}
        onReject={(v) => { setModalType("reject"); setModalVendor(v); }}
        onSuspend={(v) => { setModalType("suspend"); setModalVendor(v); }}
        onRestore={(v) => { setModalType("restore"); setModalVendor(v); }}
        onBlock={(v) => { showToast("Vendor blocked successfully."); setAppDrawerVendor(null); }}
        onDownload={(v) => { showToast("Downloading vendor PDF report..."); }}
      />

      {/* Modals */}
      <VendorModals
        modalType={modalType}
        selectedVendor={modalVendor}
        onClose={() => { setModalType(null); setModalVendor(null); }}
        onConfirmAction={handleConfirmModal}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in slide-in-from-bottom-2 z-[300]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
