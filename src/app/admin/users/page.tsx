"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { UsersSummaryCards } from "@/components/admin/users/UsersSummaryCards";
import { UsersToolbar } from "@/components/admin/users/UsersToolbar";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UserDetailsDrawer } from "@/components/admin/users/UserDetailsDrawer";
import { UserModals } from "@/components/admin/users/UserModals";
import { adminUsersData, AdminUser } from "@/data/adminUsersData";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [drawerUser, setDrawerUser] = useState<AdminUser | null>(null);
  
  const [modalType, setModalType] = useState<"suspend" | "restore" | "disable" | "add" | null>(null);
  const [modalUser, setModalUser] = useState<AdminUser | null>(null);

  const { users, isLoading } = useAdminUsers();

  const filteredUsers = useMemo(() => {
    let result = users;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q) || 
        u.phone.includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, users]);

  const handleSelectUser = (id: string) => {
    setSelectedUsers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const handleActionClick = (e: React.MouseEvent, user: AdminUser) => {
    e.stopPropagation();
    // In a real app this would open a dropdown menu. 
    // For demo, we just open the drawer since it has the actions inside it too.
    setDrawerUser(user);
  };

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleConfirmModal = () => {
    let msg = "";
    if (modalType === "add") msg = "Demo customer added.";
    else if (modalType === "suspend") msg = "User marked as suspended.";
    else if (modalType === "restore") msg = "Customer restored.";
    else if (modalType === "disable") msg = "Account disabled.";

    showToast(msg);
    setModalType(null);
    setModalUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Users</h1>
          <p className="text-sm text-slate-500">Manage customer accounts, activity, and access.</p>
        </div>
        
        <button 
          onClick={() => setModalType("add")}
          className="flex items-center gap-2 px-4 h-10 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <UsersSummaryCards summary={[
        { id: "total", label: "Total Users", value: users.length.toString(), change: 0, trend: "up" as const, icon: "Users" },
        { id: "active", label: "Active Users", value: users.filter(u => u.status === "active").length.toString(), change: 0, trend: "up" as const, icon: "UserCheck" },
        { id: "new", label: "New This Month", value: users.filter(u => new Date(u.joinedAt).getMonth() === new Date().getMonth()).length.toString(), change: 0, trend: "up" as const, icon: "UserPlus" },
        { id: "suspended", label: "Suspended", value: users.filter(u => u.status === "suspended").length.toString(), change: 0, trend: "down" as const, icon: "UserMinus" }
      ]} />
      
      <UsersToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCount={0}
        onExport={() => showToast("Export ready for backend integration.")}
      />

      {selectedUsers.size > 0 && (
        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg p-3 flex items-center justify-between animate-in slide-in-from-top-2">
          <span className="text-sm font-bold text-[var(--color-primary-dark)]">
            {selectedUsers.size} users selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors">Suspend</button>
            <button className="px-3 py-1.5 text-xs font-bold text-[var(--color-primary-dark)] bg-white hover:bg-slate-50 rounded-md transition-colors">Export</button>
            <button onClick={() => { setSelectedUsers(new Set()); showToast("Selection cleared."); }} className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors">Clear</button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
        </div>
      ) : (
        <UsersTable 
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAll={handleSelectAll}
          onRowClick={(u) => setDrawerUser(u)}
          onActionClick={handleActionClick}
        />
      )}

      <UserDetailsDrawer 
        user={drawerUser}
        onClose={() => setDrawerUser(null)}
        bookings={adminUsersData.demoBookings}
        activities={adminUsersData.demoActivity}
        reviews={adminUsersData.demoReviews}
        onSuspend={(u) => { setModalType("suspend"); setModalUser(u); }}
        onRestore={(u) => { setModalType("restore"); setModalUser(u); }}
        onDisable={(u) => { setModalType("disable"); setModalUser(u); }}
      />

      <UserModals 
        modalType={modalType}
        selectedUser={modalUser}
        onClose={() => { setModalType(null); setModalUser(null); }}
        onConfirmAction={handleConfirmModal}
      />

      {/* Mock Toast System */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in slide-in-from-bottom-2 z-[200]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
