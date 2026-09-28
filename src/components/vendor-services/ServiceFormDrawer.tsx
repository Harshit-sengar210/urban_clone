"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Save } from "lucide-react";
import { VendorService, ServiceStatus, ServiceType } from "@/types/vendor";
import { cn } from "@/lib/utils";

interface ServiceFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Partial<VendorService>) => void;
  serviceToEdit?: VendorService | null;
}

const CATEGORIES = [
  { id: "cleaning", name: "Cleaning", services: ["Home Cleaning", "Deep Cleaning", "Kitchen Cleaning", "Bathroom Cleaning", "Sofa Cleaning"] },
  { id: "ac_repair", name: "AC & Appliance Repair", services: ["AC Servicing", "AC Repair", "Washing Machine Repair", "Refrigerator Repair"] },
  { id: "electrician", name: "Electrician", services: ["Switch & Socket Installation", "Fan Installation", "MCB Box Repair", "Inverter Installation"] },
  { id: "plumbing", name: "Plumbing", services: ["Tap & Pipe Leak Repair", "Washbasin Repair", "Toilet Repair", "Water Tank Cleaning"] },
  { id: "painting", name: "Painting", services: ["Full Home Painting", "1 Room Painting", "Touch-up Painting", "Waterproofing"] },
];

const DURATIONS = ["30 mins", "45 mins", "1 hour", "1.5 hours", "2 hours", "3 hours", "4 hours", "5+ hours"];
const EXPERIENCES = ["Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"];

export function ServiceFormDrawer({ isOpen, onClose, onSave, serviceToEdit }: ServiceFormDrawerProps) {
  const isEditing = !!serviceToEdit;

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("customer_location");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<ServiceStatus>("active");
  const [currentSkill, setCurrentSkill] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or initialize form
  useEffect(() => {
    if (isOpen) {
      if (serviceToEdit) {
        setCategoryId(serviceToEdit.categoryId);
        setCategoryName(serviceToEdit.categoryName);
        setServiceName(serviceToEdit.serviceName);
        setDescription(serviceToEdit.description);
        setStartingPrice(serviceToEdit.startingPrice.toString());
        setDuration(serviceToEdit.duration);
        setServiceType(serviceToEdit.serviceType);
        setExperienceLevel(serviceToEdit.experienceLevel || "");
        setSkills(serviceToEdit.skills);
        setStatus(serviceToEdit.status);
      } else {
        setCategoryId("");
        setCategoryName("");
        setServiceName("");
        setDescription("");
        setStartingPrice("");
        setDuration("");
        setServiceType("customer_location");
        setExperienceLevel("");
        setSkills([]);
        setStatus("active");
      }
      setErrors({});
    }
  }, [isOpen, serviceToEdit]);

  // Handle Category Change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setCategoryId(id);
    const cat = CATEGORIES.find(c => c.id === id);
    setCategoryName(cat?.name || "");
    setServiceName(""); // Reset service name when category changes
    if (errors.categoryId) setErrors(prev => ({ ...prev, categoryId: "" }));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!categoryId) newErrors.categoryId = "Category is required";
    if (!serviceName) newErrors.serviceName = "Service name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!startingPrice || isNaN(Number(startingPrice))) newErrors.startingPrice = "Valid price is required";
    if (!duration) newErrors.duration = "Duration is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      // Small shake animation could be triggered here on error fields
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API save
    setTimeout(() => {
      onSave({
        id: isEditing ? serviceToEdit.id : `svc_${Date.now()}`,
        categoryId,
        categoryName,
        serviceName,
        description: description.trim(),
        startingPrice: Number(startingPrice),
        duration,
        serviceType,
        experienceLevel,
        skills,
        status,
        featured: isEditing ? serviceToEdit.featured : false,
        updatedAt: "Just now"
      });
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  const availableServicesForCategory = CATEGORIES.find(c => c.id === categoryId)?.services || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {isEditing ? "Edit Service" : "Add New Service"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {isEditing ? "Update your service details" : "Add a service customers can book"}
                </p>
              </div>
              <button 
                onClick={onClose}
                disabled={isSubmitting}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar bg-slate-50/50">
              
              {/* Basic Details */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Basic Details</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Category *</label>
                  <select 
                    value={categoryId}
                    onChange={handleCategoryChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all appearance-none bg-white",
                      errors.categoryId ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    )}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-red-500 text-xs mt-1 font-medium">{errors.categoryId}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Name *</label>
                  <select
                    disabled={!categoryId}
                    value={serviceName}
                    onChange={(e) => {
                      setServiceName(e.target.value);
                      if (errors.serviceName) setErrors(prev => ({ ...prev, serviceName: "" }));
                    }}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all appearance-none bg-white",
                      errors.serviceName ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
                      !categoryId && "bg-slate-50 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <option value="">Select a service</option>
                    {availableServicesForCategory.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.serviceName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.serviceName}</p>}
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">Description *</label>
                    <span className={cn(
                      "text-[10px] font-bold",
                      description.length > 500 ? "text-red-500" : "text-slate-400"
                    )}>{description.length}/500</span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) setDescription(e.target.value);
                      if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                    }}
                    rows={4}
                    placeholder="Describe what is included in this service..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none bg-white",
                      errors.description ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    )}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
                </div>
              </section>

              {/* Pricing & Duration */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Pricing & Duration</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Starting Price (₹) *</label>
                    <input
                      type="number"
                      value={startingPrice}
                      onChange={(e) => {
                        setStartingPrice(e.target.value);
                        if (errors.startingPrice) setErrors(prev => ({ ...prev, startingPrice: "" }));
                      }}
                      placeholder="e.g. 1200"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all bg-white",
                        errors.startingPrice ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      )}
                    />
                    {errors.startingPrice && <p className="text-red-500 text-xs mt-1 font-medium">{errors.startingPrice}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Duration *</label>
                    <select
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                        if (errors.duration) setErrors(prev => ({ ...prev, duration: "" }));
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all appearance-none bg-white",
                        errors.duration ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      )}
                    >
                      <option value="">Select duration</option>
                      {DURATIONS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.duration && <p className="text-red-500 text-xs mt-1 font-medium">{errors.duration}</p>}
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Skills & Expertise</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Skills (Press Enter to add)</label>
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="e.g. Deep Cleaning, Stain Removal"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {skills.map(skill => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          key={skill} 
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100"
                        >
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)} className="hover:bg-indigo-200 rounded-full p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none bg-white"
                  >
                    <option value="">Select experience level (Optional)</option>
                    {EXPERIENCES.map(e => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Status */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Availability</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Service Status</label>
                  <div className="flex gap-4">
                    <label className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all",
                      status === "active" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    )}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="active"
                        checked={status === "active"}
                        onChange={() => setStatus("active")}
                        className="sr-only" 
                      />
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        status === "active" ? "border-emerald-500" : "border-slate-300"
                      )}>
                        {status === "active" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                      </div>
                      <span className="font-bold text-sm">Active</span>
                    </label>

                    <label className={cn(
                      "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all",
                      status === "inactive" ? "border-slate-500 bg-slate-100 text-slate-700" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    )}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="inactive"
                        checked={status === "inactive"}
                        onChange={() => setStatus("inactive")}
                        className="sr-only" 
                      />
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        status === "inactive" ? "border-slate-500" : "border-slate-300"
                      )}>
                        {status === "inactive" && <div className="w-2 h-2 rounded-full bg-slate-500" />}
                      </div>
                      <span className="font-bold text-sm">Inactive</span>
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {status === "active" ? "This service will appear to customers and can receive bookings." : "This service is hidden and will not receive new bookings."}
                  </p>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <button 
                onClick={handleSave}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> {isEditing ? "Save Changes" : "Add Service"}
                  </>
                )}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
