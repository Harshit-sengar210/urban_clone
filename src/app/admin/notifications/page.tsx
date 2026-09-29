"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Plus, Settings, Mail, Bell, Shield, Calendar, Tag, MoreHorizontal, CheckSquare, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { adminNotificationsData, type AdminNotification } from "@/data/adminNotificationsData";
import { useAdminLiveNotifications } from "@/hooks/admin/useAdminLiveNotifications";
import { NotificationDetailsDrawer } from "@/components/admin/notifications/NotificationDetailsDrawer";

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "history" | "templates" | "scheduled" | "preferences">("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null);
  
  const liveNotifications = useAdminLiveNotifications();
  
  const filteredInbox = useMemo(() => {
    let result = liveNotifications.length > 0 ? liveNotifications : adminNotificationsData.inbox;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.message.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, liveNotifications]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Notifications</h1>
          <p className="text-sm text-slate-500">Manage admin alerts, notification history, templates, announcements, and delivery settings.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Notification Settings</span>
          </button>
          <button className="flex items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span>Create Notification</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Notifications", value: adminNotificationsData.summary.total.toLocaleString() },
          { label: "Unread", value: adminNotificationsData.summary.unread, highlight: "text-[var(--color-primary)]" },
          { label: "Sent Today", value: adminNotificationsData.summary.sentToday.toLocaleString() },
          { label: "Scheduled", value: adminNotificationsData.summary.scheduled },
          { label: "Failed", value: adminNotificationsData.summary.failed, highlight: "text-rose-600" },
          { label: "Delivery Rate", value: `${adminNotificationsData.summary.deliveryRate}%`, highlight: "text-emerald-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <h3 className={`text-2xl font-bold tracking-tight ${stat.highlight || 'text-[#0A192F]'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {(["inbox", "history", "templates", "scheduled", "preferences"] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize whitespace-nowrap transition-colors relative ${
              activeTab === tab ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="notificationsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Inbox Workspace Content (Partial Checkpoint Implementation) */}
      {activeTab === "inbox" && (
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full pl-9 pr-4 h-10 bg-white border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <button className="flex items-center gap-2 px-3 h-10 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm whitespace-nowrap">
                  <CheckSquare className="w-4 h-4" /> Mark All as Read
                </button>
              </div>
            </div>
          </div>

          {/* Inbox List */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {filteredInbox.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {filteredInbox.map((notification) => (
                  <div 
                    key={notification.id} 
                    onClick={() => setSelectedNotification(notification)}
                    className={`p-4 sm:p-5 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer group ${notification.readStatus === 'unread' ? 'bg-blue-50/20' : ''}`}
                  >
                    <div className="pt-1 hidden sm:block">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'security' ? 'bg-rose-100 text-rose-600' :
                        notification.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {notification.type === 'security' ? <ShieldAlert className="w-5 h-5" /> :
                         notification.type === 'booking' ? <Calendar className="w-5 h-5" /> :
                         <Bell className="w-5 h-5" />}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          {notification.readStatus === 'unread' && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                          <h3 className={`text-sm truncate ${notification.readStatus === 'unread' ? 'font-bold text-[#0A192F]' : 'font-medium text-slate-700'}`}>
                            {notification.title}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                          {new Date(notification.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-3 line-clamp-2 ${notification.readStatus === 'unread' ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        {notification.relatedEntity && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-600">
                            <Tag className="w-3 h-3" /> {notification.relatedEntity.label}
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          notification.priority === 'urgent' ? 'bg-rose-50 text-rose-700' :
                          notification.priority === 'high' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-50 text-slate-600'
                        }`}>
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 pt-1">
                       <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-0 group-hover:opacity-100">
                         <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0A192F]">No new notifications</h3>
                <p className="text-sm text-slate-500 mt-1">You're all caught up.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeTab !== "inbox" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <Mail className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0A192F] capitalize">{activeTab} Workspace</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
            The detailed workspace for {activeTab} is being initialized. Change the tab back to Inbox to see the primary alerts.
          </p>
        </div>
      )}

      <NotificationDetailsDrawer
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onMarkRead={(id) => {
          console.log(`Marking notification ${id} as read`);
          setSelectedNotification(null);
        }}
        onDelete={(id) => {
          console.log(`Deleting notification ${id}`);
          setSelectedNotification(null);
        }}
      />
    </div>
  );
}
