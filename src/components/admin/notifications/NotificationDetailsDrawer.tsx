"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, ShieldAlert, Calendar, Tag, ExternalLink, Mail, MessageSquare, Smartphone, MoreHorizontal, CheckSquare, Trash2 } from "lucide-react";
import type { AdminNotification, NotificationChannel } from "@/data/adminNotificationsData";

export function NotificationDetailsDrawer({
  notification,
  onClose,
  onMarkRead,
  onDelete
}: {
  notification: AdminNotification | null;
  onClose: () => void;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  if (!notification) return null;

  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5" />;
      case 'push': return <Smartphone className="w-3.5 h-3.5" />;
      case 'sms': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'whatsapp': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'in_app': return <Bell className="w-3.5 h-3.5" />;
      default: return <Bell className="w-3.5 h-3.5" />;
    }
  };

  return (
    <AnimatePresence>
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
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-[#0A192F]">Notification Details</h2>
                {notification.readStatus === 'unread' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border bg-blue-50 text-blue-700 border-blue-200">
                    Unread
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">ID: {notification.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Main Message Card */}
            <div className={`rounded-xl border p-5 ${
              notification.priority === 'urgent' ? 'bg-rose-50 border-rose-100' :
              notification.priority === 'high' ? 'bg-amber-50 border-amber-100' :
              'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${
                  notification.type === 'security' ? 'bg-rose-100 text-rose-600' :
                  notification.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                  'bg-white border text-slate-600'
                }`}>
                  {notification.type === 'security' ? <ShieldAlert className="w-5 h-5" /> :
                   notification.type === 'booking' ? <Calendar className="w-5 h-5" /> :
                   <Bell className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${
                      notification.priority === 'urgent' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                      notification.priority === 'high' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {notification.priority}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(notification.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A192F] mb-2 leading-tight">{notification.title}</h3>
                  <p className={`text-sm leading-relaxed ${
                    notification.priority === 'urgent' ? 'text-rose-900' :
                    notification.priority === 'high' ? 'text-amber-900' :
                    'text-slate-700'
                  }`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Meta Data */}
            <div className="border border-slate-100 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Delivery Information</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Type / Category</p>
                  <p className="text-sm font-bold text-slate-800 capitalize">{notification.type}</p>
                </div>
                {notification.deliveryStatus && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Delivery Status</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{notification.deliveryStatus.replace('_', ' ')}</p>
                  </div>
                )}
                {notification.audience && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Target Audience</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{notification.audience.replace(/_/g, ' ')}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-xs text-slate-500 mb-2">Channels Used</p>
                  <div className="flex flex-wrap gap-2">
                    {notification.channels.map(channel => (
                      <span key={channel} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-700 capitalize">
                        {getChannelIcon(channel)}
                        {channel.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Entity Link */}
            {notification.relatedEntity && (
              <div className="border border-slate-100 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Related Reference</p>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <p className="font-bold text-[#0A192F]">{notification.relatedEntity.label}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] bg-[var(--color-primary)]/10 px-4 py-2 rounded-lg transition-colors">
                  View <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sticky bottom-0">
            <button 
              onClick={() => onDelete && onDelete(notification.id)}
              className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              {notification.readStatus === 'unread' && (
                <button 
                  onClick={() => onMarkRead && onMarkRead(notification.id)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Mark as Read</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
