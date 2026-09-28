"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Upload, Tag, FileText, IndianRupee, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export function AddServiceDrawer({
  isOpen,
  onClose,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
  });

  const [packages, setPackages] = useState([
    { id: 1, name: "Basic", price: "", description: "" }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageChange = (id: number, field: string, value: string) => {
    setPackages(packages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addPackage = () => {
    setPackages([...packages, { id: Date.now(), name: "", price: "", description: "" }]);
  };

  const removePackage = (id: number) => {
    if (packages.length > 1) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, packages });
    setFormData({ name: "", category: "", price: "", duration: "", description: "" });
    setPackages([{ id: Date.now(), name: "Basic", price: "", description: "" }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div>
                <h2 className="text-lg font-bold text-[#0A192F]">Add New Service</h2>
                <p className="text-xs text-slate-500 mt-1">Create a new service offering for the marketplace.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <form id="add-service-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Image Upload Dummy */}
                <div>
                  <label className="text-sm font-bold text-[#0A192F] mb-2 block">Service Image</label>
                  <div className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-colors">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Click to upload cover image</span>
                    <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Service Name</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="e.g. Deep Home Cleaning"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Category</label>
                    <select 
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="AC & Appliances">AC & Appliances</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Beauty">Beauty & Salon</option>
                      <option value="Electrician">Electrician</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Base Price (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="number" 
                          name="price"
                          required
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                          placeholder="499"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Duration (mins)</label>
                      <input 
                        type="number" 
                        name="duration"
                        required
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#0A192F] mb-1.5 block">Description</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <textarea 
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all resize-none"
                        placeholder="Describe what is included in this service..."
                      />
                    </div>
                  </div>

                  {/* Packages Section */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-[#0A192F]">Service Packages</h3>
                        <p className="text-xs text-slate-500">Define tiered packages (e.g., Basic, Premium) for this service.</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={addPackage}
                        className="text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] flex items-center gap-1 bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add Package
                      </button>
                    </div>

                    <div className="space-y-4">
                      {packages.map((pkg, index) => (
                        <div key={pkg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                          {packages.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removePackage(pkg.id)}
                              className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <label className="text-xs font-bold text-slate-600 mb-1 block">Package Name</label>
                              <input 
                                type="text"
                                required
                                value={pkg.name}
                                onChange={(e) => handlePackageChange(pkg.id, 'name', e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                placeholder="e.g., Basic"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 mb-1 block">Package Price (₹)</label>
                              <input 
                                type="number"
                                required
                                value={pkg.price}
                                onChange={(e) => handlePackageChange(pkg.id, 'price', e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                placeholder="499"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 mb-1 block">Package Inclusions (comma separated)</label>
                            <input 
                              type="text"
                              required
                              value={pkg.description}
                              onChange={(e) => handlePackageChange(pkg.id, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                              placeholder="e.g., Dry Vacuuming, Wet Wiping, Surface Polish"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 sticky bottom-0">
              <button 
                type="button"
                onClick={onClose} 
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="add-service-form"
                className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Service</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
