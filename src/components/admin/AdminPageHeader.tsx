import { CalendarDays, ChevronDown } from "lucide-react";

export function AdminPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Good morning, Admin</h1>
        <p className="text-sm text-slate-500">Here's what's happening across UrbanClone today.</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
          <CalendarDays className="w-4 h-4 text-slate-400" />
          <span>Today</span>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>
    </div>
  );
}
