"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckCircle2, Plus, Sparkles, ChevronDown, ChevronRight, Trash2 } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { ServiceCategoryCard } from "@/components/vendor-onboarding/ServiceCategoryCard";
import { ServiceConfigurationCard } from "@/components/vendor-onboarding/ServiceConfigurationCard";
import { SkillsSelector } from "@/components/vendor-onboarding/SkillsSelector";
import { VendorServiceSummary } from "@/components/vendor-onboarding/VendorServiceSummary";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem, expandCollapse, chipEnter } from "@/components/vendor-onboarding/animations";
import { serviceCategories, serviceCatalog, VendorService, CustomService } from "@/data/mockVendorServices";
import { cn } from "@/lib/utils";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
type ServiceConfiguration = {
  serviceId: string;
  experience: string;
  startingPrice: number | null;
  duration: string;
  serviceType: "customer_location" | "online" | "vendor_location" | "both";
};

type VendorServicesData = {
  selectedCategoryIds: string[];
  selectedServiceIds: string[];
  configurations: ServiceConfiguration[];
  skills: string[];
  customServices: CustomService[];
};

const DEFAULT_STATE: VendorServicesData = {
  selectedCategoryIds: [],
  selectedServiceIds: [],
  configurations: [],
  skills: [],
  customServices: [],
};

// ─────────────────────────────────────────────────────────────────
// Add-custom-service modal
// ─────────────────────────────────────────────────────────────────
interface AddCustomServiceModalProps {
  onClose: () => void;
  onAdd: (service: CustomService) => void;
  existingIds: string[];
}

function AddCustomServiceModal({ onClose, onAdd, existingIds }: AddCustomServiceModalProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<{ name?: string; category?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Enter a service name (min 2 chars).";
    if (!categoryId) e.category = "Please select a category.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const newService: CustomService = {
      id: `custom_${Date.now()}`,
      categoryId,
      name: name.trim(),
      description: description.trim(),
      basePriceHint: price ? Number(price) : undefined,
      isCustom: true,
    };
    onAdd(newService);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Add Custom Service</h3>
                <p className="text-xs text-slate-400">Add a service not listed in our catalog</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-5 space-y-4">
            {/* Service Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Swimming Pool Cleaning"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                className={cn(
                  "w-full h-11 px-4 rounded-xl border text-sm font-medium outline-none transition-all",
                  errors.name
                    ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100 bg-red-50"
                    : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10"
                )}
              />
              {errors.name && <p className="text-xs font-bold text-red-500">{errors.name}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value); setErrors(p => ({ ...p, category: undefined })); }}
                className={cn(
                  "w-full h-11 px-4 rounded-xl border text-sm font-medium outline-none transition-all appearance-none",
                  errors.category
                    ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100 bg-red-50"
                    : "border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 bg-white"
                )}
              >
                <option value="" disabled>Select a category...</option>
                {serviceCategories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                <option value="custom">Other / New Category</option>
              </select>
              {errors.category && <p className="text-xs font-bold text-red-500">{errors.category}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Short Description <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Describe what this service includes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 text-sm font-medium outline-none transition-all resize-none"
              />
            </div>

            {/* Starting Price Hint */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Starting Price (₹) <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm">₹</span>
                <input
                  type="number"
                  placeholder="999"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-11 pl-7 pr-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 text-sm font-semibold outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorServicesData>(DEFAULT_STATE);
  const { application, loading, saveServices } = useVendorOnboarding();
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<{ categories?: boolean; services?: boolean; configs?: string[] }>({});

  // Load saved data from context
  useEffect(() => {
    if (application?.services) {
      setData(prev => ({
        ...prev,
        ...application.services,
        customServices: (application.services as any).customServices || [],
      }));
    }
  }, [application]);

  // Auto-expand newly selected categories
  useEffect(() => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      data.selectedCategoryIds.forEach(id => next.add(id));
      return next;
    });
  }, [data.selectedCategoryIds]);

  // ── Derived ──────────────────────────────────────────────────
  const filteredCategories = useMemo(() =>
    serviceCategories.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  /** Merge catalog services with vendor's custom services */
  const allServices = useMemo(() =>
    [...serviceCatalog, ...data.customServices],
    [data.customServices]
  );

  /** Services visible under a specific category (catalog + custom) */
  const servicesForCategory = (catId: string) =>
    allServices.filter(s => s.categoryId === catId);

  // ── Category toggle ──────────────────────────────────────────
  const toggleCategory = (id: string) => {
    setErrors(prev => ({ ...prev, categories: false }));
    setData(prev => {
      const isSelected = prev.selectedCategoryIds.includes(id);
      if (isSelected) {
        const toRemove = new Set(allServices.filter(s => s.categoryId === id).map(s => s.id));
        return {
          ...prev,
          selectedCategoryIds: prev.selectedCategoryIds.filter(cid => cid !== id),
          selectedServiceIds: prev.selectedServiceIds.filter(sid => !toRemove.has(sid)),
          configurations: prev.configurations.filter(c => !toRemove.has(c.serviceId)),
        };
      }
      return { ...prev, selectedCategoryIds: [...prev.selectedCategoryIds, id] };
    });
  };

  // ── Service chip toggle ───────────────────────────────────────
  const toggleService = (service: VendorService | CustomService) => {
    setErrors(prev => ({ ...prev, services: false }));
    setData(prev => {
      const isSelected = prev.selectedServiceIds.includes(service.id);
      if (isSelected) {
        return {
          ...prev,
          selectedServiceIds: prev.selectedServiceIds.filter(sid => sid !== service.id),
          configurations: prev.configurations.filter(c => c.serviceId !== service.id),
        };
      }
      return {
        ...prev,
        selectedServiceIds: [...prev.selectedServiceIds, service.id],
        configurations: [
          ...prev.configurations,
          {
            serviceId: service.id,
            experience: "",
            startingPrice: service.basePriceHint || null,
            duration: "",
            serviceType: "customer_location",
          },
        ],
      };
    });
  };

  // ── Config update ─────────────────────────────────────────────
  const updateConfig = (config: ServiceConfiguration) => {
    setErrors(prev => ({
      ...prev,
      configs: prev.configs?.filter(id => id !== config.serviceId),
    }));
    setData(prev => ({
      ...prev,
      configurations: prev.configurations.map(c => c.serviceId === config.serviceId ? config : c),
    }));
  };

  // ── Add custom service ────────────────────────────────────────
  const handleAddCustomService = (service: CustomService) => {
    setData(prev => {
      // Auto-select the category if not already selected
      const cats = prev.selectedCategoryIds.includes(service.categoryId)
        ? prev.selectedCategoryIds
        : [...prev.selectedCategoryIds, service.categoryId];

      return {
        ...prev,
        customServices: [...prev.customServices, service],
        selectedCategoryIds: cats,
        selectedServiceIds: [...prev.selectedServiceIds, service.id],
        configurations: [
          ...prev.configurations,
          {
            serviceId: service.id,
            experience: "",
            startingPrice: service.basePriceHint || null,
            duration: "",
            serviceType: "customer_location",
          },
        ],
      };
    });
  };

  // ── Remove custom service ─────────────────────────────────────
  const removeCustomService = (serviceId: string) => {
    setData(prev => ({
      ...prev,
      customServices: prev.customServices.filter(s => s.id !== serviceId),
      selectedServiceIds: prev.selectedServiceIds.filter(sid => sid !== serviceId),
      configurations: prev.configurations.filter(c => c.serviceId !== serviceId),
    }));
  };

  // ── Toggle category accordion ─────────────────────────────────
  const toggleExpand = (catId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(catId) ? next.delete(catId) : next.add(catId);
      return next;
    });
  };

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    let isValid = true;
    const newErrors: { categories?: boolean; services?: boolean; configs?: string[] } = { configs: [] };

    if (data.selectedCategoryIds.length === 0) { newErrors.categories = true; isValid = false; }
    if (data.selectedServiceIds.length === 0) { newErrors.services = true; isValid = false; }

    const invalidConfigs = data.configurations.filter(c => !c.experience || !c.startingPrice || !c.duration);
    if (invalidConfigs.length > 0) {
      newErrors.configs = invalidConfigs.map(c => c.serviceId);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ── Save helpers ──────────────────────────────────────────────
  const handleSave = async () => {
    try {
      await saveServices(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch {
      setToastMessage("Could not save progress.");
    }
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleContinue = async () => {
    if (validate()) {
      try {
        setToastMessage("Saving services...");
        await saveServices(data);
        setToastMessage("Services saved successfully!");
        setTimeout(() => router.push("/vendor/onboarding/service-area"), 1000);
      } catch (error) {
        console.error("Error saving services:", error);
        setToastMessage("Failed to save. Please try again.");
      }
    } else {
      setTimeout(() => {
        if (data.selectedCategoryIds.length === 0) {
          document.getElementById("section-categories")?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (data.selectedServiceIds.length === 0) {
          document.getElementById("section-services")?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          document.getElementById("section-configs")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  const calculateCompletion = () => {
    let score = 50;
    if (data.selectedCategoryIds.length > 0) score += 5;
    if (data.selectedServiceIds.length > 0) score += 5;
    if (data.skills.length > 0) score += 5;
    if (data.selectedServiceIds.length > 0) {
      const validConfigs = data.configurations.filter(c => c.experience && c.startingPrice && c.duration).length;
      score += Math.round((validConfigs / data.selectedServiceIds.length) * 10);
    }
    return Math.min(score, 75);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">

        {/* ── Left form area ────────────────────────────────── */}
        <div
          id="onboarding-scroll-container"
          className="w-full md:w-[60%] lg:w-[65%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2 md:order-1 border-r border-slate-100"
        >
          <motion.div
            variants={onboardingPageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <OnboardingProgress currentStep={4} totalSteps={9} label="Services & Expertise" />

            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                What services do you provide?
              </h1>
              <p className="text-slate-500 font-medium">
                Choose the services you offer. Each category shows its sub-services — or add your own custom service below.
                <span className="block text-xs mt-1 text-slate-400">You can update your services later from your vendor dashboard.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">

              {/* ── 1. Category selection ─────────────────────── */}
              <motion.section id="section-categories" variants={staggerItem}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[var(--color-foreground)]">
                    1. Choose Categories{" "}
                    {data.selectedCategoryIds.length > 0 && (
                      <span className="text-[var(--color-primary)]">({data.selectedCategoryIds.length})</span>
                    )}
                  </h3>
                </div>

                {/* Search */}
                <div className="mb-4 relative">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm font-medium bg-slate-50"
                  />
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>

                {errors.categories && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-red-500 mb-3">
                    Please select at least one category.
                  </motion.p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {filteredCategories.length > 0 ? filteredCategories.map((category) => (
                      <motion.div key={category.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                        <ServiceCategoryCard
                          name={category.name}
                          description={category.description}
                          iconName={category.iconName}
                          selected={data.selectedCategoryIds.includes(category.id)}
                          onClick={() => toggleCategory(category.id)}
                        />
                      </motion.div>
                    )) : (
                      <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                        <p className="text-sm font-medium text-slate-500 mb-2">No categories found matching "{search}"</p>
                        <button onClick={() => setSearch("")} className="text-sm font-bold text-[var(--color-primary)]">Clear search</button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* ── 2. Sub-services per category ─────────────── */}
              <AnimatePresence>
                {data.selectedCategoryIds.length > 0 && (
                  <motion.section
                    id="section-services"
                    variants={expandCollapse}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-[var(--color-foreground)]">
                        2. Select Sub-Services{" "}
                        {data.selectedServiceIds.length > 0 && (
                          <span className="text-[var(--color-primary)]">({data.selectedServiceIds.length})</span>
                        )}
                      </h3>
                    </div>

                    {errors.services && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-red-500 mb-3">
                        Please select at least one service.
                      </motion.p>
                    )}

                    <div className="space-y-3">
                      {data.selectedCategoryIds.map(catId => {
                        const cat = serviceCategories.find(c => c.id === catId);
                        if (!cat) return null;
                        const catServices = servicesForCategory(catId);
                        const selectedCount = catServices.filter(s => data.selectedServiceIds.includes(s.id)).length;
                        const isExpanded = expandedCategories.has(catId);

                        return (
                          <motion.div
                            key={catId}
                            layout
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="rounded-2xl border border-slate-200 overflow-hidden"
                          >
                            {/* Accordion header */}
                            <button
                              type="button"
                              onClick={() => toggleExpand(catId)}
                              className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-800">{cat.name}</span>
                                {selectedCount > 0 && (
                                  <span className="text-[11px] font-bold bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">
                                    {selectedCount} selected
                                  </span>
                                )}
                              </div>
                              <motion.div
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </motion.div>
                            </button>

                            {/* Accordion body */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  variants={expandCollapse}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  className="px-4 py-4 bg-white border-t border-slate-100"
                                >
                                  {catServices.length === 0 ? (
                                    <p className="text-sm text-slate-400 italic py-2 text-center">
                                      No sub-services found. Add a custom service below.
                                    </p>
                                  ) : (
                                    <div className="flex flex-wrap gap-2">
                                      {catServices.map(service => {
                                        const isSelected = data.selectedServiceIds.includes(service.id);
                                        const isCustom = "isCustom" in service && service.isCustom;
                                        return (
                                          <motion.div
                                            key={service.id}
                                            variants={chipEnter}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="flex items-center gap-1"
                                          >
                                            <button
                                              type="button"
                                              onClick={() => toggleService(service)}
                                              className={cn(
                                                "flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold rounded-full transition-colors border",
                                                isSelected
                                                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm shadow-primary/20"
                                                  : "bg-white text-slate-700 border-slate-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                                                isCustom && !isSelected && "border-violet-200 text-violet-700 bg-violet-50 hover:border-violet-400 hover:text-violet-700"
                                              )}
                                            >
                                              {isCustom && <Sparkles className="w-3 h-3 opacity-70" />}
                                              {service.name}
                                              {isSelected && <X className="w-3 h-3 ml-1 opacity-70" />}
                                            </button>
                                            {/* Delete custom service */}
                                            {isCustom && (
                                              <button
                                                type="button"
                                                onClick={() => removeCustomService(service.id)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Remove custom service"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            )}
                                          </motion.div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* ── Add Custom Service CTA ────────────────── */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4"
                    >
                      <button
                        type="button"
                        onClick={() => setShowCustomModal(true)}
                        className="w-full h-14 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 flex items-center justify-center gap-2.5 text-sm font-bold text-violet-600 hover:border-violet-400 hover:bg-violet-100 transition-all group"
                      >
                        <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                          <Plus className="w-4 h-4 text-violet-600" />
                        </div>
                        Add a Service Not in the List
                        <span className="text-[10px] font-semibold text-violet-400 bg-violet-100 px-2 py-0.5 rounded-full">Custom</span>
                      </button>
                    </motion.div>

                    {/* ── Service Config cards ──────────────────── */}
                    <AnimatePresence>
                      {data.selectedServiceIds.length > 0 && (
                        <motion.div
                          id="section-configs"
                          variants={expandCollapse}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="space-y-4 mt-8"
                        >
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            3. Configure Each Service
                          </h4>
                          {data.selectedServiceIds.map(serviceId => {
                            const service = allServices.find(s => s.id === serviceId);
                            const config = data.configurations.find(c => c.serviceId === serviceId);
                            if (!service || !config) return null;
                            const hasError = errors.configs?.includes(serviceId);
                            return (
                              <ServiceConfigurationCard
                                key={serviceId}
                                name={service.name}
                                config={config}
                                onChange={updateConfig}
                                error={hasError}
                              />
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                )}
              </AnimatePresence>

              {/* ── Add Custom Service — also visible if no category selected yet ── */}
              {data.selectedCategoryIds.length === 0 && (
                <motion.div variants={staggerItem} className="mt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(true)}
                    className="w-full h-14 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 flex items-center justify-center gap-2.5 text-sm font-bold text-violet-600 hover:border-violet-400 hover:bg-violet-100 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                      <Plus className="w-4 h-4 text-violet-600" />
                    </div>
                    Add Your Own Custom Service
                    <span className="text-[10px] font-semibold text-violet-400 bg-violet-100 px-2 py-0.5 rounded-full">Custom</span>
                  </button>
                </motion.div>
              )}

              {/* ── Skills ────────────────────────────────────── */}
              <AnimatePresence>
                {data.selectedServiceIds.length > 0 && (
                  <motion.section variants={expandCollapse} initial="hidden" animate="visible" exit="hidden">
                    <h3 className="text-base font-bold text-[var(--color-foreground)] mb-4">
                      {data.selectedCategoryIds.length > 0 ? "4" : "3"}. Professional Skills{" "}
                      <span className="text-xs font-normal text-slate-400 ml-2">Optional</span>
                    </h3>
                    <SkillsSelector
                      selectedSkills={data.skills}
                      onChange={(skills) => setData(prev => ({ ...prev, skills }))}
                    />
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Profile completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation
                onBack={() => router.push("/vendor/onboarding/business")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Right summary ──────────────────────────────────── */}
        <div className="w-full md:w-[40%] lg:w-[35%] md:h-full z-10 bg-slate-50 order-1 md:order-2">
          <VendorServiceSummary
            selectedCategoryIds={data.selectedCategoryIds}
            selectedServiceIds={data.selectedServiceIds}
            skills={data.skills}
            configurations={data.configurations}
            customServices={data.customServices}
          />
        </div>

      </div>

      {/* Custom service modal */}
      {showCustomModal && (
        <AddCustomServiceModal
          onClose={() => setShowCustomModal(false)}
          onAdd={handleAddCustomService}
          existingIds={data.selectedServiceIds}
        />
      )}

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
