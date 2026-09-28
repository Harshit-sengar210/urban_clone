"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Receipt, Wallet, RotateCcw, Ticket, X, ChevronDown, ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";
import { Transaction, TransactionStatus, TransactionType } from "@/data/payments";
import { cn } from "@/lib/utils";

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<TransactionStatus, { label: string; cls: string }> = {
  completed: { label: "Completed",  cls: "bg-green-50 text-green-700" },
  pending:   { label: "Pending",    cls: "bg-amber-50 text-amber-700" },
  failed:    { label: "Failed",     cls: "bg-red-50 text-red-600" },
  refunded:  { label: "Refunded",   cls: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Cancelled",  cls: "bg-slate-50 text-slate-500" },
};

function TxnBadge({ status }: { status: TransactionStatus }) {
  const cfg = STATUS_CFG[status];
  return <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", cfg.cls)}>{cfg.label}</span>;
}

// ─── Transaction Row ──────────────────────────────────────────────────────────
function TxnIcon({ type }: { type: TransactionType }) {
  const map: Record<TransactionType, React.ReactNode> = {
    service_payment: <Receipt className="w-4 h-4 text-slate-600" />,
    wallet_topup:    <Wallet className="w-4 h-4 text-purple-600" />,
    refund:          <RotateCcw className="w-4 h-4 text-blue-600" />,
    credit:          <Ticket className="w-4 h-4 text-amber-600" />,
    adjustment:      <Receipt className="w-4 h-4 text-slate-400" />,
  };
  return <>{map[type]}</>;
}

function TxnRow({ txn, onClick }: { txn: Transaction; onClick: () => void }) {
  const dateStr = new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const isCredit = txn.direction === "credit";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50/80 transition-colors text-left"
    >
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", isCredit ? "bg-green-50" : "bg-slate-50")}>
        <TxnIcon type={txn.type} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--color-foreground)] truncate">{txn.title}</p>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">{dateStr} · {txn.paymentMethodLabel}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={cn("text-sm font-extrabold", isCredit ? "text-green-600" : "text-[var(--color-foreground)]")}>
          {isCredit ? "+" : "−"}₹{txn.amount.toLocaleString()}
        </p>
        <TxnBadge status={txn.status} />
      </div>
    </button>
  );
}

// ─── Transaction Details Drawer ───────────────────────────────────────────────
function TxnDetails({ txn, onClose }: { txn: Transaction; onClose: () => void }) {
  const dateStr = new Date(txn.date).toLocaleString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const isCredit = txn.direction === "credit";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white flex flex-col shadow-2xl"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)] flex-shrink-0">
            <h2 className="text-lg font-extrabold text-[var(--color-foreground)]">Transaction Details</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            {/* Amount hero */}
            <div className="flex flex-col items-center text-center py-6 border-b border-[var(--color-border)]">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4", isCredit ? "bg-green-50" : "bg-slate-50")}>
                {isCredit ? <ArrowDownLeft className="w-7 h-7 text-green-600" /> : <ArrowUpRight className="w-7 h-7 text-slate-600" />}
              </div>
              <p className={cn("text-3xl font-extrabold mb-2", isCredit ? "text-green-600" : "text-[var(--color-foreground)]")}>
                {isCredit ? "+" : "−"}₹{txn.amount.toLocaleString()}
              </p>
              <p className="font-semibold text-[var(--color-foreground)]">{txn.title}</p>
              <div className="mt-2">
                <TxnBadge status={txn.status} />
              </div>
            </div>

            {/* Details grid */}
            <div className="space-y-3">
              {[
                ["Transaction ID", txn.id],
                txn.bookingId ? ["Booking ID", txn.bookingId] : null,
                ["Date & Time", dateStr],
                ["Payment Method", txn.paymentMethodLabel],
                ["Amount", `₹${txn.amount.toLocaleString()}`],
                txn.refundReason ? ["Refund Reason", txn.refundReason] : null,
                txn.originalAmount ? ["Original Amount", `₹${txn.originalAmount.toLocaleString()}`] : null,
              ].filter(Boolean).map((row) => {
                const r = row as string[];
                return (
                  <div key={r[0]} className="flex items-start justify-between gap-4 py-2 border-b border-slate-50">
                    <span className="text-xs text-[var(--color-muted)] font-semibold">{r[0]}</span>
                    <span className="text-xs font-bold text-[var(--color-foreground)] text-right">{r[1]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-5 border-t border-[var(--color-border)] flex gap-3">
            {txn.bookingId && (
              <a href={`/dashboard/bookings/${txn.bookingId}`} className="flex-1 h-11 rounded-xl border border-[var(--color-border)] text-sm font-semibold flex items-center justify-center hover:bg-slate-50 transition-colors">
                View Booking
              </a>
            )}
            <button
              onClick={() => alert("Receipt is being prepared...")}
              className="flex-1 h-11 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" /> Receipt
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Transaction Filters ──────────────────────────────────────────────────────
type TxnFilter = "all" | "payments" | "topups" | "refunds";

const FILTERS: { key: TxnFilter; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "payments", label: "Payments" },
  { key: "topups",   label: "Top-ups" },
  { key: "refunds",  label: "Refunds" },
];

function filterTxns(txns: Transaction[], filter: TxnFilter, query: string): Transaction[] {
  let list = txns;
  if (filter === "payments") list = list.filter(t => t.type === "service_payment");
  if (filter === "topups")   list = list.filter(t => t.type === "wallet_topup");
  if (filter === "refunds")  list = list.filter(t => t.type === "refund");
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || (t.bookingId ?? "").toLowerCase().includes(q));
  }
  return list;
}

// ─── Transaction Section ──────────────────────────────────────────────────────
const PAGE_SIZE = 8;

export function TransactionSection({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState<TxnFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const filtered = filterTxns(transactions, filter, query);
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  return (
    <>
      <div id="transactions" className="bg-white border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <div>
            <h2 className="font-bold text-[var(--color-foreground)]">Recent Transactions</h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="px-5 py-3 border-b border-slate-50 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search transactions..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setPage(1); }}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                  filter === f.key
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center px-4">
            <Receipt className="w-10 h-10 text-slate-300 mb-3" />
            <p className="font-semibold text-[var(--color-foreground)] mb-1">No transactions found</p>
            <p className="text-xs text-[var(--color-muted)]">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            <AnimatePresence>
              {visible.map((txn, i) => (
                <motion.div key={txn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <TxnRow txn={txn} onClick={() => setSelected(txn)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="px-5 py-4 border-t border-[var(--color-border)]">
            <button
              onClick={() => setPage(p => p + 1)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-foreground)] hover:bg-slate-50 transition-colors"
            >
              <ChevronDown className="w-4 h-4" /> Load More
            </button>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && <TxnDetails txn={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
