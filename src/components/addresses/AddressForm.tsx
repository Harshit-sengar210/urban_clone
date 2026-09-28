"use client";

import { useState, useEffect } from "react";
import { Home, Briefcase, MapPin } from "lucide-react";
import { AddressFormData, AddressType } from "@/data/addresses";
import { LocationSearch } from "./LocationSearch";
import { cn } from "@/lib/utils";

interface AddressFormProps {
  initial?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
  loading?: boolean;
}

const TYPE_OPTS: { value: AddressType; label: string; icon: typeof Home }[] = [
  { value: "home",  label: "Home",  icon: Home },
  { value: "work",  label: "Work",  icon: Briefcase },
  { value: "other", label: "Other", icon: MapPin },
];

const STATES = ["Uttar Pradesh", "Delhi", "Maharashtra", "Karnataka", "Telangana", "West Bengal", "Tamil Nadu", "Gujarat", "Rajasthan", "Haryana"];

const EMPTY: AddressFormData = {
  type: "home", label: "Home", name: "", phone: "",
  flat: "", building: "", street: "", area: "", city: "", state: "", pincode: "",
  landmark: "", instructions: "", isDefault: false,
};

type Errors = Partial<Record<keyof AddressFormData, string>>;

function validate(data: AddressFormData): Errors {
  const e: Errors = {};
  if (!data.name.trim()) e.name = "Full name is required.";
  if (!data.phone.trim()) e.phone = "Phone number is required.";
  else if (!/^[+]?[\d\s-]{10,14}$/.test(data.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!data.flat.trim()) e.flat = "House / flat number is required.";
  if (!data.area.trim()) e.area = "Area / locality is required.";
  if (!data.city.trim()) e.city = "City is required.";
  if (!data.state.trim()) e.state = "State is required.";
  if (!data.pincode.trim()) e.pincode = "PIN code is required.";
  else if (!/^\d{6}$/.test(data.pincode.trim())) e.pincode = "PIN code must be 6 digits.";
  return e;
}

interface FieldProps { label: string; id: string; error?: string; children: React.ReactNode; required?: boolean }
function Field({ label, id, error, children, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  cn("w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all",
    err ? "border-red-300 focus:border-red-400" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"
  );

export function AddressForm({ initial, onSubmit, onCancel, submitLabel = "Save Address", loading = false }: AddressFormProps) {
  const [data, setData] = useState<AddressFormData>({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  // Auto-set label when type changes
  useEffect(() => {
    if (data.type !== "other") {
      setData((d) => ({ ...d, label: data.type === "home" ? "Home" : "Work" }));
    }
  }, [data.type]);

  const set = (k: keyof AddressFormData, v: string | boolean) =>
    setData((d) => ({ ...d, [k]: v }));

  const handleSubmit = () => {
    const errs = validate(data);
    setErrors(errs);
    setTouched(true);
    if (Object.keys(errs).length === 0) onSubmit(data);
  };

  const handleLocationSelect = (loc: { area: string; city: string; state: string; pincode: string }) => {
    setData((d) => ({ ...d, area: loc.area, city: loc.city, state: loc.state, pincode: loc.pincode }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Address Type */}
        <div>
          <p className="text-xs font-bold text-[var(--color-foreground)] mb-2 uppercase tracking-wider">Address Type</p>
          <div className="flex gap-2">
            {TYPE_OPTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set("type", opt.value)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-semibold transition-all",
                  data.type === opt.value
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/8 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-slate-500 hover:border-slate-300"
                )}
              >
                <opt.icon className="w-4 h-4" /> {opt.label}
              </button>
            ))}
          </div>
          {data.type === "other" && (
            <input
              type="text"
              value={data.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="Label (e.g. Family Home)"
              className={cn(inputCls(), "mt-2")}
            />
          )}
        </div>

        {/* Location Search */}
        <LocationSearch onSelect={handleLocationSelect} />

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" id="name" error={touched ? errors.name : undefined} required>
            <input id="name" type="text" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Ravi Kumar" className={inputCls(touched ? errors.name : undefined)} />
          </Field>
          <Field label="Phone Number" id="phone" error={touched ? errors.phone : undefined} required>
            <input id="phone" type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 9876543210" className={inputCls(touched ? errors.phone : undefined)} />
          </Field>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="House / Flat No." id="flat" error={touched ? errors.flat : undefined} required>
            <input id="flat" type="text" value={data.flat} onChange={(e) => set("flat", e.target.value)} placeholder="Flat 4B / House 42" className={inputCls(touched ? errors.flat : undefined)} />
          </Field>
          <Field label="Building / Apartment" id="building" error={undefined}>
            <input id="building" type="text" value={data.building} onChange={(e) => set("building", e.target.value)} placeholder="Green Residency" className={inputCls()} />
          </Field>
          <Field label="Street / Road" id="street" error={undefined}>
            <input id="street" type="text" value={data.street} onChange={(e) => set("street", e.target.value)} placeholder="Sector 62" className={inputCls()} />
          </Field>
          <Field label="Area / Locality" id="area" error={touched ? errors.area : undefined} required>
            <input id="area" type="text" value={data.area} onChange={(e) => set("area", e.target.value)} placeholder="Sector 62" className={inputCls(touched ? errors.area : undefined)} />
          </Field>
          <Field label="City" id="city" error={touched ? errors.city : undefined} required>
            <input id="city" type="text" value={data.city} onChange={(e) => set("city", e.target.value)} placeholder="Noida" className={inputCls(touched ? errors.city : undefined)} />
          </Field>
          <Field label="State" id="state" error={touched ? errors.state : undefined} required>
            <select id="state" value={data.state} onChange={(e) => set("state", e.target.value)} className={cn(inputCls(touched ? errors.state : undefined), "appearance-none cursor-pointer")}>
              <option value="">Select state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="PIN Code" id="pincode" error={touched ? errors.pincode : undefined} required>
            <input id="pincode" type="text" maxLength={6} value={data.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} placeholder="201309" className={inputCls(touched ? errors.pincode : undefined)} />
          </Field>
          <Field label="Landmark (Optional)" id="landmark" error={undefined}>
            <input id="landmark" type="text" value={data.landmark} onChange={(e) => set("landmark", e.target.value)} placeholder="Near City Mall" className={inputCls()} />
          </Field>
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions" className="block text-xs font-bold text-[var(--color-foreground)] mb-1.5 uppercase tracking-wider">Service Instructions (Optional)</label>
          <textarea
            id="instructions"
            rows={2}
            value={data.instructions}
            onChange={(e) => set("instructions", e.target.value)}
            placeholder="e.g. Call me when you reach the building gate."
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-none"
          />
        </div>

        {/* Set as Default */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.isDefault}
            onChange={(e) => set("isDefault", e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]/20 cursor-pointer"
          />
          <span className="text-sm font-semibold text-[var(--color-foreground)]">Set as my default address</span>
        </label>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-6 py-5 border-t border-[var(--color-border)] bg-white">
        <button onClick={onCancel} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
