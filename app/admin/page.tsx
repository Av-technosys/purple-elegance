import { DashboardCards } from "@/components/admin/dashboardCard"

export default async function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-1">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-sm border border-slate-800">
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30 backdrop-blur-xs">
            Purple Elegance Console
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
            Dashboard Overview
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed mt-2">
            Welcome back! Here is what is happening with your store today. Manage products, edit categories, review orders, and trace payment gateways.
          </p>
        </div>
        {/* Decorative gradient glowing spheres */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 size-80 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 size-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
          Store Analytics Overview
        </h2>
        <DashboardCards />
      </div>

    </div>
  )
}
