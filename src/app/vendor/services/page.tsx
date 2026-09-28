"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { VendorLayout } from "@/components/vendor-dashboard/VendorLayout";
import { ServicesHeader } from "@/components/vendor-services/ServicesHeader";
import { ServiceStats } from "@/components/vendor-services/ServiceStats";
import { ServicesToolbar } from "@/components/vendor-services/ServicesToolbar";
import { ServiceGrid } from "@/components/vendor-services/ServiceGrid";
import { ServiceFormDrawer } from "@/components/vendor-services/ServiceFormDrawer";
import { ConfirmModal } from "@/components/vendor-services/ConfirmModal";

import { mockVendorServices } from "@/data/mockVendorData";
import { serviceCatalog, serviceCategories } from "@/data/mockVendorServices";
import { VendorService } from "@/types/vendor";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { db } from "@/backend/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function VendorServicesPage() {
  const { user } = useCurrentUser();
  const [services, setServices] = useState<VendorService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Modals & Drawers State
  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<VendorService | null>(null);
  
  const [deactivatingService, setDeactivatingService] = useState<VendorService | null>(null);
  const [deletingService, setDeletingService] = useState<VendorService | null>(null);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);

  // Global Toast
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    
    const unsub = onSnapshot(doc(db, "vendorApplications", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        const selectedIds = d.services?.selectedServiceIds || [];
        
        const mappedServices = selectedIds.map((id: string) => {
          const catalogService = serviceCatalog.find((s: any) => s.id === id);
          const category = catalogService ? serviceCategories.find((c: any) => c.id === catalogService.categoryId) : null;
          
          return {
            id,
            categoryId: catalogService?.categoryId || "custom",
            categoryName: category?.name || "Custom",
            serviceName: catalogService?.name || id,
            description: catalogService?.description || "Custom Service",
            startingPrice: catalogService?.basePriceHint || 0,
            duration: "45 mins",
            serviceType: "customer_location",
            skills: [],
            status: "active",
            featured: false,
            updatedAt: new Date().toISOString()
          };
        });
        
        // Preserve local state overrides (like status or featured if they were changed locally in this session)
        // In a real app, these changes would be saved back to Firestore
        setServices(prev => {
          if (prev.length === 0) return mappedServices;
          return mappedServices.map((ms: any) => {
            const existing = prev.find(p => p.id === ms.id);
            return existing ? { ...ms, status: existing.status, featured: existing.featured } : ms;
          });
        });
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, [user?.uid]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Derived State (Filtered & Sorted Services)
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.serviceName.toLowerCase().includes(q) || 
        s.categoryName.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.skills.some(skill => skill.toLowerCase().includes(q))
      );
    }

    // Category
    if (categoryFilter !== "all") {
      result = result.filter(s => s.categoryId === categoryFilter);
    }

    // Status
    if (statusFilter !== "all") {
      result = result.filter(s => s.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      // Always put featured service first, then sort by selected criteria
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      switch (sortBy) {
        case "name_asc":
          return a.serviceName.localeCompare(b.serviceName);
        case "name_desc":
          return b.serviceName.localeCompare(a.serviceName);
        case "price_asc":
          return a.startingPrice - b.startingPrice;
        case "price_desc":
          return b.startingPrice - a.startingPrice;
        case "recent":
        default:
          return 0; // Maintain original order (or chronological if we tracked actual dates)
      }
    });

    return result;
  }, [services, searchQuery, categoryFilter, statusFilter, sortBy]);

  // Handlers
  const handleSaveService = (serviceData: Partial<VendorService>) => {
    if (serviceToEdit) {
      // Update
      setServices(prev => prev.map(s => s.id === serviceData.id ? { ...s, ...serviceData } as VendorService : s));
      showToast("Service updated successfully.");
    } else {
      // Add
      setServices(prev => [serviceData as VendorService, ...prev]);
      showToast("Service added successfully.");
    }
  };

  const handleDeactivate = () => {
    if (!deactivatingService) return;
    setIsSubmittingModal(true);
    setTimeout(() => {
      setServices(prev => prev.map(s => s.id === deactivatingService.id ? { ...s, status: "inactive" } : s));
      setIsSubmittingModal(false);
      setDeactivatingService(null);
      showToast("Service deactivated successfully.");
    }, 600);
  };

  const handleActivate = (service: VendorService) => {
    setServices(prev => prev.map(s => s.id === service.id ? { ...s, status: "active" } : s));
    showToast("Service activated successfully.");
  };

  const handleDelete = () => {
    if (!deletingService) return;
    setIsSubmittingModal(true);
    setTimeout(() => {
      setServices(prev => prev.filter(s => s.id !== deletingService.id));
      setIsSubmittingModal(false);
      setDeletingService(null);
      showToast("Service deleted successfully.");
    }, 600);
  };

  const handleFeature = (service: VendorService) => {
    setServices(prev => prev.map(s => {
      if (s.id === service.id) {
        return { ...s, featured: !s.featured };
      }
      // Remove feature from others if making this one featured
      if (!service.featured && s.featured) {
        return { ...s, featured: false };
      }
      return s;
    }));
    showToast(service.featured ? "Featured status removed." : "Service marked as featured.");
  };

  const handleMoveUp = (service: VendorService) => {
    setServices(prev => {
      const index = prev.findIndex(s => s.id === service.id);
      if (index > 0) {
        const newArr = [...prev];
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
        return newArr;
      }
      return prev;
    });
    setSortBy("recent"); // Reset sort to view manual ordering
  };

  const handleMoveDown = (service: VendorService) => {
    setServices(prev => {
      const index = prev.findIndex(s => s.id === service.id);
      if (index >= 0 && index < prev.length - 1) {
        const newArr = [...prev];
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
        return newArr;
      }
      return prev;
    });
    setSortBy("recent"); // Reset sort to view manual ordering
  };

  return (
    <VendorLayout>
      {isLoading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
            <p className="text-sm font-medium text-slate-500">Loading your services...</p>
          </div>
        </div>
      ) : (
        <>
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
          
          <ServicesHeader onAddService={() => { setServiceToEdit(null); setIsFormDrawerOpen(true); }} />
        
        <ServiceStats services={services} />

        <ServicesToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ServiceGrid 
          services={filteredServices}
          onEdit={(s) => { setServiceToEdit(s); setIsFormDrawerOpen(true); }}
          onDeactivate={(s) => setDeactivatingService(s)}
          onActivate={handleActivate}
          onDelete={(s) => setDeletingService(s)}
          onFeature={handleFeature}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onClearFilters={() => {
            setSearchQuery("");
            setCategoryFilter("all");
            setStatusFilter("all");
          }}
        />

      </div>

      {/* Drawers & Modals */}
      <ServiceFormDrawer 
        isOpen={isFormDrawerOpen}
        onClose={() => setIsFormDrawerOpen(false)}
        serviceToEdit={serviceToEdit}
        onSave={handleSaveService}
      />

      <ConfirmModal 
        isOpen={!!deactivatingService}
        onClose={() => setDeactivatingService(null)}
        onConfirm={handleDeactivate}
        title="Deactivate Service?"
        message="This service will no longer be available for new customer bookings. Existing bookings will not be affected."
        confirmText="Deactivate Service"
        isDestructive={false}
        isSubmitting={isSubmittingModal}
      />

      <ConfirmModal 
        isOpen={!!deletingService}
        onClose={() => setDeletingService(null)}
        onConfirm={handleDelete}
        title="Delete Service?"
        message="Are you sure you want to permanently remove this service? This action cannot be undone."
        confirmText="Delete Service"
        isDestructive={true}
        isSubmitting={isSubmittingModal}
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
        </>
      )}
    </VendorLayout>
  );
}
