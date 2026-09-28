"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_ADDRESSES, Address, AddressFormData } from "@/data/addresses";
import { AddressesPageHeader } from "@/components/addresses/AddressesPageHeader";
import { AddressCard } from "@/components/addresses/AddressCard";
import { AddressDrawer } from "@/components/addresses/AddressDrawer";
import { DeleteAddressModal, DefaultAddressProtectModal } from "@/components/addresses/AddressModals";
import { AddressSkeleton, AddressEmptyState } from "@/components/addresses/AddressEmptyState";
import { ToastContainer, useToast } from "@/components/bookings/Toast";

// Sort addresses: default first, then home→work→other, then createdAt
const TYPE_ORDER = { home: 0, work: 1, other: 2 };
function sortAddresses(list: Address[]): Address[] {
  return [...list].sort((a, b) => {
    if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
    const typeSort = TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
    if (typeSort !== 0) return typeSort;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Address | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null);
  const [defaultProtectTarget, setDefaultProtectTarget] = useState<Address | null>(null);
  const [saving, setSaving] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => { setAddresses(sortAddresses(DEMO_ADDRESSES)); setLoading(false); }, 600);
    return () => clearTimeout(t);
  }, []);

  // ── Drawer actions ──────────────────────────────────────────────────────
  const openAdd = () => { setEditTarget(null); setDrawerOpen(true); };
  const openEdit = (a: Address) => { setEditTarget(a); setDrawerOpen(true); };
  const closeDrawer = () => { setDrawerOpen(false); setEditTarget(null); };

  const handleSave = (data: AddressFormData) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setAddresses((prev) => {
        let updated: Address[];
        if (editTarget) {
          updated = prev.map((a) => a.id === editTarget.id ? { ...a, ...data } : a);
        } else {
          const newAddr: Address = {
            ...data,
            id: `addr_${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          updated = [...prev, newAddr];
        }
        // Enforce single default
        if (data.isDefault) {
          updated = updated.map((a) =>
            a.id === (editTarget?.id ?? updated[updated.length - 1]?.id)
              ? { ...a, isDefault: true }
              : { ...a, isDefault: false }
          );
        }
        return sortAddresses(updated);
      });
      closeDrawer();
      showToast(editTarget ? "Address updated successfully." : "Address added successfully.");
    }, 800);
  };

  // ── Default ─────────────────────────────────────────────────────────────
  const handleSetDefault = (a: Address) => {
    setAddresses((prev) => sortAddresses(prev.map((x) => ({ ...x, isDefault: x.id === a.id }))));
    showToast("Default address updated.");
  };

  // ── Delete ──────────────────────────────────────────────────────────────
  const requestDelete = (a: Address) => {
    if (a.isDefault) { setDefaultProtectTarget(a); return; }
    setDeleteTarget(a);
  };

  const confirmDelete = (id: string) => {
    setAddresses((prev) => sortAddresses(prev.filter((a) => a.id !== id)));
    showToast("Address deleted successfully.");
  };

  const sorted = sortAddresses(addresses);

  return (
    <>
      <div className="px-4 md:px-6 py-6 max-w-screen-xl mx-auto">
        <AddressesPageHeader count={sorted.length} onAdd={openAdd} />

        {/* Section header with count */}
        {!loading && sorted.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[var(--color-foreground)]">Saved Addresses</h2>
              <p className="text-xs text-[var(--color-muted)] font-medium mt-0.5">{sorted.length} location{sorted.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <AddressSkeleton />
        ) : sorted.length === 0 ? (
          <AddressEmptyState onAdd={openAdd} />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            <AnimatePresence>
              {sorted.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  onEdit={openEdit}
                  onDelete={requestDelete}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quick Booking CTA */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[var(--color-primary)]/6 via-purple-50/40 to-white border border-[var(--color-primary)]/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="font-bold text-[var(--color-foreground)] mb-0.5">Ready to book a service?</p>
              <p className="text-sm text-[var(--color-muted)]">
                Choose a saved address and book your next service in seconds.
              </p>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-bold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all flex-shrink-0 shadow-md shadow-primary/20"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Drawer */}
      <AddressDrawer
        open={drawerOpen}
        editTarget={editTarget}
        onClose={closeDrawer}
        onSave={handleSave}
        loading={saving}
      />

      {/* Delete Modal */}
      <DeleteAddressModal
        address={deleteTarget}
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Default-protection Modal */}
      <DefaultAddressProtectModal
        address={defaultProtectTarget}
        open={!!defaultProtectTarget}
        onClose={() => setDefaultProtectTarget(null)}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
