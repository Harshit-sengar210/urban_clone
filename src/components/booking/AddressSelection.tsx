"use client";

import { useState } from "react";
import { Plus, Check, MapPin, Loader2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Address = {
  id: string;
  type: string;
  fullAddress: string;
  city: string;
  name?: string;
  phone?: string;
};

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelect: (id: string) => void;
  onAddAddress: (address: Address) => void;
}

export function AddressSelection({ addresses, selectedAddressId, onSelect, onAddAddress }: AddressSelectionProps) {
  const [isAddingNew, setIsAddingNew] = useState(addresses.length === 0);
  
  // Form state for mock adding address
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    city: "New Delhi",
    pincode: "",
    type: "Home"
  });
  
  const [isLocating, setIsLocating] = useState(false);

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
            setFormData(prev => ({
              ...prev,
              house: data.address.house_number || data.address.building || "",
              street: data.address.road || data.address.suburb || data.address.neighbourhood || data.display_name || "",
              city: data.address.city || data.address.town || data.address.state_district || prev.city,
              pincode: data.address.postcode || prev.pincode
            }));
          } else if (data && data.display_name) {
            setFormData(prev => ({ ...prev, street: data.display_name }));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Could not fetch address details.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get your location. Please check browser permissions.");
        setIsLocating(false);
      }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.house || !formData.street) return;
    
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      type: formData.type,
      fullAddress: `${formData.house}, ${formData.street}`,
      city: `${formData.city}${formData.pincode ? ` - ${formData.pincode}` : ''}`,
      name: formData.name,
      phone: formData.phone
    };
    
    onAddAddress(newAddress);
    setIsAddingNew(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">Where should we provide the service?</h2>
      
      {!isAddingNew ? (
        <>
          <button 
            onClick={() => setIsAddingNew(true)}
            className="w-full py-4 border-2 border-dashed border-[var(--color-border)] rounded-2xl flex items-center justify-center gap-2 text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)]/5 transition-colors mb-6"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">Saved Addresses</h3>
            
            {addresses.map((address) => {
              const isSelected = selectedAddressId === address.id;
              
              return (
                <button
                  key={address.id}
                  onClick={() => onSelect(address.id)}
                  className={cn(
                    "w-full p-5 rounded-2xl border-2 text-left flex items-start gap-4 transition-all",
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-primary/5"
                      : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-hover)]"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors",
                    isSelected ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-muted)] bg-transparent"
                  )}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn("font-bold text-lg", isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]")}>
                        {address.type}
                      </h4>
                    </div>
                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                      {address.fullAddress}<br />
                      {address.city}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSave} 
          className="bg-[var(--color-surface)] p-6 rounded-3xl border border-[var(--color-border)]"
        >
          <div className="mb-6">
            <button 
              type="button" 
              onClick={fetchLiveLocation}
              disabled={isLocating}
              className="w-full py-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[var(--color-primary)]/20 transition-colors disabled:opacity-50"
            >
              {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
              {isLocating ? "Fetching Location..." : "Use Current Location"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Full Name</label>
              <input type="text" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Phone Number</label>
              <input type="tel" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">House / Flat / Building</label>
            <input type="text" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.house} onChange={e => setFormData({...formData, house: e.target.value})} />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Street / Area / Landmark</label>
            <input type="text" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">City</label>
              <input type="text" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-foreground)] mb-1">Pincode</label>
              <input type="text" required className="w-full p-3 rounded-xl border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Save Address As</label>
            <div className="flex gap-4">
              {['Home', 'Work', 'Other'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, type})}
                  className={cn(
                    "flex-1 py-2 rounded-xl border font-medium transition-colors",
                    formData.type === type ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-hover)]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddingNew(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90">
              Save Address
            </Button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}
