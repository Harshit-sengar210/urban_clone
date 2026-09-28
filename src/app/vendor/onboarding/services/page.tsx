"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckCircle2 } from "lucide-react";

import { VendorOnboardingHeader } from "@/components/vendor-onboarding/VendorOnboardingHeader";
import { OnboardingProgress } from "@/components/vendor-onboarding/OnboardingProgress";
import { ServiceCategoryCard } from "@/components/vendor-onboarding/ServiceCategoryCard";
import { ServiceConfigurationCard } from "@/components/vendor-onboarding/ServiceConfigurationCard";
import { SkillsSelector } from "@/components/vendor-onboarding/SkillsSelector";
import { VendorServiceSummary } from "@/components/vendor-onboarding/VendorServiceSummary";
import { ProfileCompletion } from "@/components/vendor-onboarding/ProfileCompletion";
import { OnboardingNavigation } from "@/components/vendor-onboarding/OnboardingNavigation";
import { onboardingPageVariants, staggerContainer, staggerItem, expandCollapse, chipEnter } from "@/components/vendor-onboarding/animations";
import { serviceCategories, serviceCatalog, VendorService, ServiceCategory } from "@/data/mockVendorServices";
import { cn } from "@/lib/utils";
import { useVendorOnboarding } from "@/contexts/vendor/VendorOnboardingProvider";


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
};

const DEFAULT_STATE: VendorServicesData = {
  selectedCategoryIds: [],
  selectedServiceIds: [],
  configurations: [],
  skills: [],
};

export default function ServicesPage() {
  const router = useRouter();
  const [data, setData] = useState<VendorServicesData>(DEFAULT_STATE);
  const { application, loading, saveServices } = useVendorOnboarding();
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (application?.services) {
      setData(prev => ({
        ...prev,
        ...application.services
      }));
    }
  }, [application]);

  const [errors, setErrors] = useState<{ categories?: boolean, services?: boolean, configs?: string[] }>({});



  

  const filteredCategories = useMemo(() => {
    return serviceCategories.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleCategory = (id: string) => {
    setErrors(prev => ({ ...prev, categories: false }));
    setData(prev => {
      const isSelected = prev.selectedCategoryIds.includes(id);
      let newCats = [];
      let newServs = [...prev.selectedServiceIds];
      let newConfigs = [...prev.configurations];
      
      if (isSelected) {
        newCats = prev.selectedCategoryIds.filter(cid => cid !== id);
        // Remove services belonging to this category
        const catsToRemove = serviceCatalog.filter(s => s.categoryId === id).map(s => s.id);
        newServs = newServs.filter(sid => !catsToRemove.includes(sid));
        newConfigs = newConfigs.filter(c => !catsToRemove.includes(c.serviceId));
      } else {
        newCats = [...prev.selectedCategoryIds, id];
      }
      return { ...prev, selectedCategoryIds: newCats, selectedServiceIds: newServs, configurations: newConfigs };
    });
  };

  const toggleService = (service: VendorService) => {
    setErrors(prev => ({ ...prev, services: false }));
    setData(prev => {
      const isSelected = prev.selectedServiceIds.includes(service.id);
      let newServs = [];
      let newConfigs = [...prev.configurations];
      
      if (isSelected) {
        newServs = prev.selectedServiceIds.filter(sid => sid !== service.id);
        newConfigs = newConfigs.filter(c => c.serviceId !== service.id);
      } else {
        newServs = [...prev.selectedServiceIds, service.id];
        // Add default config
        newConfigs.push({
          serviceId: service.id,
          experience: "",
          startingPrice: service.basePriceHint || null,
          duration: "",
          serviceType: "customer_location"
        });
      }
      return { ...prev, selectedServiceIds: newServs, configurations: newConfigs };
    });
  };

  const updateConfig = (config: ServiceConfiguration) => {
    setErrors(prev => ({ 
      ...prev, 
      configs: prev.configs?.filter(id => id !== config.serviceId) 
    }));
    setData(prev => ({
      ...prev,
      configurations: prev.configurations.map(c => c.serviceId === config.serviceId ? config : c)
    }));
  };

  const validate = () => {
    let isValid = true;
    let newErrors: { categories?: boolean, services?: boolean, configs?: string[] } = { configs: [] };

    if (data.selectedCategoryIds.length === 0) {
      newErrors.categories = true;
      isValid = false;
    }

    if (data.selectedServiceIds.length === 0) {
      newErrors.services = true;
      isValid = false;
    }

    const invalidConfigs = data.configurations.filter(c => !c.experience || !c.startingPrice || !c.duration);
    if (invalidConfigs.length > 0) {
      newErrors.configs = invalidConfigs.map(c => c.serviceId);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    try {
      await saveServices(data);
      setToastMessage("Your onboarding progress has been saved.");
    } catch (e) {
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

        setTimeout(() => {
          // Point to step 5, even if it doesn't exist yet
          router.push("/vendor/onboarding/service-area");
        }, 1000);
      } catch (error) {
        console.error("Error saving services:", error);
        setToastMessage("Failed to save. Please try again.");
      }
    } else {
      // Scroll to top to see errors ideally, or rely on visual feedback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateCompletion = () => {
    let score = 50; // Assume Step 1-3 got us to 50%
    if (data.selectedCategoryIds.length > 0) score += 5;
    if (data.selectedServiceIds.length > 0) score += 5;
    if (data.skills.length > 0) score += 5;
    
    if (data.selectedServiceIds.length > 0) {
      const validConfigs = data.configurations.filter(c => c.experience && c.startingPrice && c.duration).length;
      score += Math.round((validConfigs / data.selectedServiceIds.length) * 10);
    }
    
    return Math.min(score, 75); // Cap this step at 75% total
  };

  if (loading) return null;

  const availableServices = serviceCatalog.filter(s => data.selectedCategoryIds.includes(s.categoryId));

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-white flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <VendorOnboardingHeader />

      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">
        
        {/* Left Form Area */}
        <div className="w-full md:w-[60%] lg:w-[65%] md:h-full md:overflow-y-auto bg-white p-6 md:p-12 lg:p-16 flex items-start justify-center order-2 md:order-1 border-r border-slate-100">
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
                Choose the services you offer so customers can discover the right professional for their needs.
                <span className="block text-xs mt-1 text-slate-400">You can update your services later from your vendor dashboard.</span>
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Category Selection */}
              <motion.section variants={staggerItem}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[var(--color-foreground)]">
                    1. Choose Categories {data.selectedCategoryIds.length > 0 && <span className="text-[var(--color-primary)]">({data.selectedCategoryIds.length})</span>}
                  </h3>
                </div>
                
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
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <motion.div key={category.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                          <ServiceCategoryCard
                            name={category.name}
                            description={category.description}
                            iconName={category.iconName}
                            selected={data.selectedCategoryIds.includes(category.id)}
                            onClick={() => toggleCategory(category.id)}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                        <p className="text-sm font-medium text-slate-500 mb-2">No categories found matching "{search}"</p>
                        <button onClick={() => setSearch("")} className="text-sm font-bold text-[var(--color-primary)]">Clear search</button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* Service Selection */}
              <AnimatePresence>
                {data.selectedCategoryIds.length > 0 && (
                  <motion.section variants={expandCollapse} initial="hidden" animate="visible" exit="hidden">
                    <h3 className="text-base font-bold text-[var(--color-foreground)] mb-4">
                      2. Select Services {data.selectedServiceIds.length > 0 && <span className="text-[var(--color-primary)]">({data.selectedServiceIds.length})</span>}
                    </h3>
                    
                    {errors.services && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-red-500 mb-3">
                        Please select at least one service.
                      </motion.p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      <AnimatePresence>
                        {availableServices.map((service) => {
                          const isSelected = data.selectedServiceIds.includes(service.id);
                          return (
                            <motion.button
                              key={service.id}
                              variants={chipEnter}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              onClick={() => toggleService(service)}
                              className={cn(
                                "flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full transition-colors border",
                                isSelected 
                                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm shadow-primary/20" 
                                  : "bg-white text-slate-700 border-slate-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                              )}
                            >
                              {service.name}
                              {isSelected && <X className="w-3 h-3 ml-1 opacity-70" />}
                            </motion.button>
                          );
                        })}
                        {availableServices.length === 0 && (
                          <div className="w-full text-center py-6 text-sm font-medium text-slate-400">
                            No services available for the selected categories.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Service Configurations */}
                    <AnimatePresence>
                      {data.selectedServiceIds.length > 0 && (
                        <motion.div variants={expandCollapse} initial="hidden" animate="visible" exit="hidden" className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Configure Services</h4>
                          {data.selectedServiceIds.map((serviceId) => {
                            const service = serviceCatalog.find(s => s.id === serviceId);
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

              {/* Skills Section */}
              <AnimatePresence>
                {data.selectedServiceIds.length > 0 && (
                  <motion.section variants={expandCollapse} initial="hidden" animate="visible" exit="hidden">
                    <h3 className="text-base font-bold text-[var(--color-foreground)] mb-4">
                      3. Professional Skills <span className="text-xs font-normal text-slate-400 ml-2">Optional</span>
                    </h3>
                    <SkillsSelector 
                      selectedSkills={data.skills} 
                      onChange={(skills) => setData(prev => ({ ...prev, skills }))} 
                    />
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Profile Completion */}
              <motion.div variants={staggerItem}>
                <ProfileCompletion percentage={calculateCompletion()} />
              </motion.div>

            </motion.div>

            <div className="mt-12">
              <OnboardingNavigation 
                onBack={() => router.push("/vendor/onboarding/business")}
                onSave={handleSave}
                onContinue={handleContinue}
                isNextDisabled={false} // validation handles click
              />
            </div>
          </motion.div>
        </div>

        {/* Right Visual Summary Area (Sticky on Desktop) */}
        <div className="w-full md:w-[40%] lg:w-[35%] md:h-full z-10 bg-slate-50 order-1 md:order-2">
          <VendorServiceSummary 
            selectedCategoryIds={data.selectedCategoryIds}
            selectedServiceIds={data.selectedServiceIds}
            skills={data.skills}
            configurations={data.configurations}
          />
        </div>

      </div>

      {/* Toast Notification */}
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
