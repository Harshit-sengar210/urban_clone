"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Plus, MoreHorizontal, MessageSquare, AlertCircle, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { adminSupportData, type AdminSupportTicket, type SupportTicketStatus } from "@/data/adminSupportData";
import { SupportTicketDrawer } from "@/components/admin/support/SupportTicketDrawer";

export default function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState<SupportTicketStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<AdminSupportTicket | null>(null);
  
  const filteredTickets = useMemo(() => {
    let result = adminSupportData.tickets;
    if (activeTab !== "all") {
      result = result.filter(t => t.status === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.id.toLowerCase().includes(q) || 
        t.requester.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.relatedBooking?.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Support & Tickets</h1>
          <p className="text-sm text-slate-500">Manage customer and vendor support requests, assignments, escalations, and resolutions.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Tickets", value: adminSupportData.summary.total.toLocaleString() },
          { label: "Open", value: adminSupportData.summary.open, highlight: "text-[var(--color-primary)]" },
          { label: "Pending", value: adminSupportData.summary.pending },
          { label: "Urgent", value: adminSupportData.summary.urgent, highlight: "text-rose-600" },
          { label: "Resolved", value: adminSupportData.summary.resolved.toLocaleString() },
          { label: "SLA At Risk", value: adminSupportData.summary.slaAtRisk, highlight: "text-amber-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-[var(--color-primary)] transition-colors cursor-pointer">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className={`text-xl font-bold tracking-tight ${stat.highlight || 'text-[#0A192F]'}`}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {(["all", "open", "in_progress", "pending_customer", "pending_vendor", "resolved", "closed"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize whitespace-nowrap transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.replace(/_/g, ' ')}
            {activeTab === tab && (
              <motion.div 
                layoutId="supportTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket ID, customer, vendor, subject..."
              className="w-full pl-9 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" /> Sort
            </button>
          </div>
        </div>
      </div>

      {/* Table Shell */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">Ticket & Subject</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Requester</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority / SLA</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Assignee</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket)}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#0A192F]">{ticket.id}</p>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium uppercase">{ticket.category}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 line-clamp-1">{ticket.subject}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-slate-700">{ticket.requester.name}</p>
                    <p className="text-[10px] uppercase text-slate-400 font-bold">{ticket.requester.type}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className={`w-3.5 h-3.5 ${
                          ticket.priority === 'urgent' ? 'text-rose-500' :
                          ticket.priority === 'high' ? 'text-orange-500' :
                          'text-slate-400'
                        }`} />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          ticket.priority === 'urgent' ? 'text-rose-700' :
                          ticket.priority === 'high' ? 'text-orange-700' :
                          'text-slate-600'
                        }`}>{ticket.priority}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${ticket.sla === 'at_risk' ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span className={`text-xs font-medium ${ticket.sla === 'at_risk' ? 'text-amber-600' : 'text-slate-500'}`}>
                          {Math.floor(ticket.slaRemainingMinutes / 60)}h {ticket.slaRemainingMinutes % 60}m
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-slate-700 font-medium">{ticket.assigneeName || 'Unassigned'}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${
                      ticket.status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      ticket.status === 'in_progress' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {ticket.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/5 border border-transparent hover:border-[var(--color-primary)]/20 transition-all opacity-0 group-hover:opacity-100">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Mobile Cards (Visible only on small screens) */}
      <div className="md:hidden space-y-4">
        {filteredTickets.map((ticket) => (
          <div 
            key={ticket.id} 
            onClick={() => setSelectedTicket(ticket)}
            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-[#0A192F]">{ticket.id}</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                ticket.status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                'bg-slate-50 text-slate-700 border-slate-200'
              }`}>
                {ticket.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800 mb-3">{ticket.subject}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-600">
                <Tag className="w-3 h-3" /> {ticket.category}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${
                ticket.priority === 'urgent' ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-600'
              }`}>
                <AlertCircle className="w-3 h-3" /> {ticket.priority}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-xs">
              <span className="text-slate-500">{ticket.requester.name}</span>
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {Math.floor(ticket.slaRemainingMinutes / 60)}h
              </span>
            </div>
          </div>
        ))}
      </div>

      <SupportTicketDrawer
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onUpdateStatus={(status) => {
          console.log(`Update support ticket status to ${status}`);
          setSelectedTicket(null);
        }}
      />
    </div>
  );
}
