"use client";

import { useState } from "react";
import { User, Shield, Laptop, Activity, Settings, Mail, Phone, Calendar, Clock, Edit2, ShieldCheck, CheckCircle2, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { adminProfileData } from "@/data/adminProfileData";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "personal" | "security" | "sessions" | "activity" | "preferences">("overview");
  
  const { profile, securityPreferences } = adminProfileData;

  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "personal", label: "Personal Information", icon: <Mail className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "sessions", label: "Sessions", icon: <Laptop className="w-4 h-4" /> },
    { id: "activity", label: "Activity", icon: <Activity className="w-4 h-4" /> },
    { id: "preferences", label: "Preferences", icon: <Settings className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Admin Profile</h1>
          <p className="text-sm text-slate-500">Manage your administrator account, security, sessions, and personal preferences.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Top Summary Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-3xl font-bold flex-shrink-0 relative group cursor-pointer overflow-hidden">
          {profile.firstName[0]}{profile.lastName[0]}
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
            <span className="text-white text-xs font-medium">Change</span>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
            <h2 className="text-2xl font-bold text-[#0A192F]">{profile.displayName}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider inline-block w-fit mx-auto md:mx-0">
              {profile.status}
            </span>
          </div>
          <p className="text-slate-600 font-medium mb-3">{profile.jobTitle}</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> {profile.email}</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> {profile.phone}</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> Last login: {new Date(profile.lastLoginAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-3 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
           <button onClick={() => setActiveTab("security")} className="p-2 text-slate-400 hover:text-[var(--color-primary)] rounded-lg hover:bg-slate-50 transition-colors">
             <Shield className="w-5 h-5" />
           </button>
           <button onClick={() => setActiveTab("sessions")} className="p-2 text-slate-400 hover:text-[var(--color-primary)] rounded-lg hover:bg-slate-50 transition-colors">
             <Laptop className="w-5 h-5" />
           </button>
           <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="profileTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Tab Content Workspace */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-base font-bold text-[#0A192F]">Personal Information</h3>
                   <button onClick={() => setActiveTab("personal")} className="text-sm font-bold text-[var(--color-primary)] hover:underline">Edit</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">First Name</p>
                     <p className="text-sm font-medium text-slate-800">{profile.firstName}</p>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Name</p>
                     <p className="text-sm font-medium text-slate-800">{profile.lastName}</p>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                     <p className="text-sm font-medium text-slate-800">{profile.email}</p>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                     <p className="text-sm font-medium text-slate-800">{profile.phone}</p>
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                     <p className="text-sm font-medium text-slate-800">{profile.department}</p>
                   </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-base font-bold text-[#0A192F]">Recent Activity</h3>
                   <button onClick={() => setActiveTab("activity")} className="text-sm font-bold text-[var(--color-primary)] hover:underline">View All</button>
                 </div>
                 <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                   {adminProfileData.activity.map((act) => (
                     <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                         {act.category === 'security' ? <Shield className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                           <h4 className="text-sm font-bold text-slate-800">{act.title}</h4>
                           <span className="text-[10px] font-bold text-slate-400">{new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                         </div>
                         <p className="text-xs text-slate-500">{act.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-base font-bold text-[#0A192F] mb-4">Account Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Account ID</span>
                    <span className="text-sm font-bold text-slate-800">{profile.id}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Role</span>
                    <span className="text-sm font-medium text-slate-800 capitalize">{profile.role.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Created On</span>
                    <span className="text-sm font-medium text-slate-800">{new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Last Updated</span>
                    <span className="text-sm font-medium text-slate-800">{new Date(profile.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-base font-bold text-[#0A192F]">Account Security</h3>
                   <button onClick={() => setActiveTab("security")} className="text-sm font-bold text-[var(--color-primary)] hover:underline">Manage</button>
                 </div>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${securityPreferences.twoFactorEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                       {securityPreferences.twoFactorEnabled ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800">2FA Authentication</p>
                       <p className="text-xs text-slate-500">{securityPreferences.twoFactorEnabled ? 'Enabled and protecting account' : 'Not enabled'}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                       <CheckCircle2 className="w-4 h-4" />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800">Password</p>
                       <p className="text-xs text-slate-500">Recently updated</p>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
            
          </div>
        )}
        
        {/* Placeholder for other tabs */}
        {activeTab !== "overview" && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-300">
              {tabs.find(t => t.id === activeTab)?.icon}
            </div>
            <h3 className="text-lg font-bold text-[#0A192F] capitalize">{tabs.find(t => t.id === activeTab)?.label} Workspace</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
              The detailed configuration workspace for {activeTab} is being initialized. Change the tab back to Overview to see the primary profile.
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}
