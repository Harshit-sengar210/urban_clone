export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-slate-200 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-lg" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-200" />
              <div className="w-16 h-6 rounded-md bg-slate-200" />
            </div>
            <div>
              <div className="h-4 w-24 bg-slate-200 rounded-lg mb-2" />
              <div className="h-8 w-32 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 h-80">
          <div className="h-6 w-32 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-48 bg-slate-200 rounded-lg mb-8" />
          <div className="h-48 w-full bg-slate-100 rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 h-80">
          <div className="h-6 w-32 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-48 bg-slate-200 rounded-lg mb-8" />
          <div className="h-10 w-full bg-slate-200 rounded-lg mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-6 w-full bg-slate-100 rounded-lg" />)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        <div className="lg:col-span-2 space-y-6 xl:space-y-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 h-96">
            <div className="h-6 w-48 bg-slate-200 rounded-lg mb-6" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-16 w-full bg-slate-100 rounded-lg" />)}
            </div>
          </div>
        </div>
        
        <div className="space-y-6 xl:space-y-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 h-72">
            <div className="h-6 w-48 bg-slate-200 rounded-lg mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-slate-100 rounded-lg" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
