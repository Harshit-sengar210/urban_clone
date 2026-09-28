"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { AdminUser } from "@/data/adminUsersData";

const getStatusBadge = (status: AdminUser["status"]) => {
  switch (status) {
    case "active":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">Active</span>;
    case "suspended":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded-full border border-amber-100">Suspended</span>;
    case "disabled":
      return <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 rounded-full border border-rose-100">Disabled</span>;
    default:
      return null;
  }
};

export function UsersTable({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll, 
  onRowClick,
  onActionClick
}: { 
  users: AdminUser[];
  selectedUsers: Set<string>;
  onSelectUser: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (user: AdminUser) => void;
  onActionClick: (e: React.MouseEvent, user: AdminUser) => void;
}) {
  const allSelected = users.length > 0 && selectedUsers.size === users.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 w-12">
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Bookings</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Spend</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Active</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`border-b border-slate-50 transition-colors group ${
                  selectedUsers.has(user.id) ? 'bg-slate-50/80' : 'hover:bg-slate-50/50 cursor-pointer'
                }`}
                onClick={() => onRowClick(user)}
              >
                <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.has(user.id)}
                    onChange={() => onSelectUser(user.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A192F]">{user.name}</h4>
                      <p className="text-[11px] font-medium text-slate-500">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-slate-700">{user.email}</p>
                  <p className="text-[11px] text-slate-500">{user.phone}</p>
                </td>
                <td className="py-4 px-6">{getStatusBadge(user.status)}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{user.joinedAt}</td>
                <td className="py-4 px-6 text-sm font-bold text-center">{user.bookingCount}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700 text-right">₹{user.totalSpend.toLocaleString()}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{user.lastActiveAt}</td>
                <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={(e) => onActionClick(e, user)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col divide-y divide-slate-100">
        {users.map((user) => (
          <div key={user.id} className="p-4 hover:bg-slate-50 transition-colors" onClick={() => onRowClick(user)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={selectedUsers.has(user.id)}
                  onChange={(e) => { e.stopPropagation(); onSelectUser(user.id); }}
                  className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                  {user.avatar ? <Image src={user.avatar} alt={user.name} fill className="object-cover" /> : user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A192F]">{user.name}</h4>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              {getStatusBadge(user.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Bookings</p>
                <p className="font-medium text-slate-700">{user.bookingCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Spend</p>
                <p className="font-medium text-slate-700">₹{user.totalSpend.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <p className="text-xs text-slate-500">Active {user.lastActiveAt}</p>
              <button 
                onClick={(e) => onActionClick(e, user)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-2xl">🔍</div>
          <h3 className="font-bold text-[#0A192F] text-lg mb-1">No customers found</h3>
          <p className="text-slate-500 text-sm max-w-sm">Try changing your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
