"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminCatalogData } from "@/data/adminCatalogData";
import { ALL_SERVICES } from "@/data/services";
import { CatalogSummary } from "@/components/admin/services/CatalogSummary";
import { AddServiceDrawer } from "@/components/admin/services/AddServiceDrawer";
import { useEffect } from "react";
import { db } from "@/backend/firebase";
import { collection, onSnapshot, addDoc, setDoc, doc } from "firebase/firestore";

export default function AdminServicesPage() {
  const [activeTab, setActiveTab] = useState<"Categories" | "Services" | "Packages">("Categories");
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const [isAddServiceDrawerOpen, setIsAddServiceDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const unsubS = onSnapshot(collection(db, "services"), (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubC = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubS(); unsubC(); };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Services & Catalog</h1>
          <p className="text-sm text-slate-500">Manage marketplace categories, services, pricing packages, and customer offerings.</p>
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
                    onClick={() => { setIsMoreActionsOpen(false); showToast("Exporting catalog..."); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Export Catalog
                  </button>
                  <button 
                    onClick={async () => { 
                      setIsMoreActionsOpen(false); 
                      showToast("Importing services...");
                      try {
                        for (const s of ALL_SERVICES) {
                          await setDoc(doc(db, "services", s.id), {
                            ...s,
                            createdAt: new Date().toISOString()
                          });
                        }
                        showToast("Import completed!");
                      } catch (e) {
                        showToast("Failed to import.");
                        console.error(e);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Import Dummy Services
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    onClick={() => { setIsMoreActionsOpen(false); showToast("Bulk edit mode enabled."); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Bulk Edit Pricing
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={async () => {
              const name = window.prompt("Enter new category name:");
              if (name) {
                try {
                  await addDoc(collection(db, "categories"), { name, createdAt: new Date().toISOString() });
                  showToast("Category added successfully.");
                } catch(e) {
                  showToast("Failed to add category.");
                }
              }
            }}
            className="flex justify-center items-center gap-2 px-4 h-10 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Category</span>
          </button>
          <button 
            onClick={() => setIsAddServiceDrawerOpen(true)}
            className="flex flex-1 sm:flex-none justify-center items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      <CatalogSummary summary={{
        categories: categories.length,
        services: services.length,
        packages: services.reduce((acc, s) => acc + (s.packages?.length || s.variants?.length || 0), 0),
        drafts: 0
      }} />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 relative">
        {(["Categories", "Services", "Packages"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="catalogTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A192F] mb-4">{activeTab}</h3>
        
        {activeTab === "Services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <div key={s.id} className="p-4 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-800">{s.name || s.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{s.description || "No description"}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-600">
                    ₹{s.price || s.basePrice || s.variants?.[0]?.price || 0}
                  </span>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-600">
                    {s.category || s.categoryName || "General"}
                  </span>
                </div>
              </div>
            ))}
            {services.length === 0 && <p className="text-slate-500 text-sm">No services found.</p>}
          </div>
        )}
        
        {activeTab === "Categories" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map(c => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-xl font-bold text-slate-800">
                {c.name || c.title}
              </div>
            ))}
            {categories.length === 0 && <p className="text-slate-500 text-sm">No categories found.</p>}
          </div>
        )}

        {activeTab === "Packages" && (
          <p className="text-slate-500 text-sm text-center">Packages are managed inside individual services.</p>
        )}
      </div>

      <AddServiceDrawer 
        isOpen={isAddServiceDrawerOpen} 
        onClose={() => setIsAddServiceDrawerOpen(false)} 
        onSave={async (data) => {
          setIsAddServiceDrawerOpen(false);
          try {
            await addDoc(collection(db, "services"), {
              ...data,
              createdAt: new Date().toISOString()
            });
            showToast(`Service "${data.name}" added successfully.`);
          } catch(e) {
            showToast("Error saving service.");
          }
        }}
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
