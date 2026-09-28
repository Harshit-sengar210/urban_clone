"use client";

import { useState } from "react";
import { Calendar, Download, ChevronDown, TrendingUp, TrendingDown, Minus, ArrowRight, BarChart3, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { adminReportsData, type ReportCategory, type ReportPeriod, type ComparisonPeriod } from "@/data/adminReportsData";

export default function AdminReportsPage() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>("overview");
  const [dateRange, setDateRange] = useState<ReportPeriod>("last_7_days");
  const [comparison, setComparison] = useState<ComparisonPeriod>("previous_period");

  const categories: { id: ReportCategory; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "marketplace", label: "Marketplace" },
    { id: "bookings", label: "Bookings" },
    { id: "revenue", label: "Revenue" },
    { id: "customers", label: "Customers" },
    { id: "vendors", label: "Vendors" },
    { id: "services", label: "Services" },
    { id: "offers", label: "Offers" },
    { id: "reviews", label: "Reviews" },
    { id: "support", label: "Support" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] mb-1">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Monitor marketplace performance, customer activity, vendor operations, revenue, and service trends.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Last 7 Days</span>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
            <span>Compare</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {Object.values(adminReportsData.kpis).map((kpi) => (
          <div key={kpi.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer group">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</p>
            <h3 className="text-2xl font-bold tracking-tight text-[#0A192F] mb-2">{kpi.formattedValue}</h3>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span className={`flex items-center ${
                kpi.direction === 'up' ? 'text-emerald-600' : 
                kpi.direction === 'down' ? 'text-rose-600' : 
                'text-slate-500'
              }`}>
                {kpi.direction === 'up' && <TrendingUp className="w-3 h-3 mr-0.5" />}
                {kpi.direction === 'down' && <TrendingDown className="w-3 h-3 mr-0.5" />}
                {kpi.direction === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
                {kpi.changePercentage}%
              </span>
              <span className="text-slate-400">vs prev</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Navigation */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeCategory === category.id ? "text-[var(--color-primary)]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {category.label}
            {activeCategory === category.id && (
              <motion.div 
                layoutId="reportCategoryTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]" 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Overview Workspace Content (Partial Implementation for Checkpoint) */}
      {activeCategory === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Placeholder Area (Spans 2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Bookings Trend</h3>
                  <p className="text-xs text-slate-500">Daily booking volume over selected period</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button className="px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded shadow-sm">Daily</button>
                  <button className="px-3 py-1 text-slate-500 hover:text-slate-700 text-xs font-bold rounded">Weekly</button>
                </div>
              </div>
              
              <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <BarChart3 className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-400">Chart Visualization Area</p>
                <p className="text-xs text-slate-400 max-w-xs text-center mt-1">(Implementation relies on existing project chart library if available)</p>
              </div>
            </div>

            {/* Operational Signals */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0A192F]">Operational Signals</h3>
              </div>
              <div className="p-0 flex-1 overflow-y-auto">
                {adminReportsData.operationalSignals.map((signal) => (
                  <div key={signal.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-full ${
                        signal.type === 'alert' ? 'bg-rose-100 text-rose-600' :
                        signal.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 leading-snug mb-1">{signal.description}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-bold">{signal.relatedArea}</span>
                          <span>•</span>
                          <span>{new Date(signal.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100">
                <button className="w-full py-2 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-colors flex items-center justify-center gap-1">
                  View All Signals <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
          </div>

          {/* Top Categories Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base font-bold text-[#0A192F]">Top Categories</h3>
              <button className="text-sm font-bold text-[var(--color-primary)] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-3 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Bookings</th>
                    <th className="py-3 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Revenue</th>
                    <th className="py-3 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {adminReportsData.topCategories.map((cat, idx) => (
                    <tr key={cat.categoryId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-400 w-4">{idx + 1}</span>
                          <span className="text-sm font-bold text-slate-800">{cat.categoryName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className="text-sm font-medium text-slate-700">{cat.bookings.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className="text-sm font-bold text-[#0A192F]">₹{(cat.revenue/100000).toFixed(2)}L</span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <span className="text-sm font-medium text-emerald-600">{cat.completionRate}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeCategory !== "overview" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
          <BarChart3 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0A192F] capitalize">{activeCategory} Analytics</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
            The detailed analytics workspace for {activeCategory} is being initialized. Change the category back to Overview to see the primary dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
