import { ReactNode } from "react"

interface DashboardStatCardProps {
  label: string
  value: string
  icon: ReactNode
}

export function DashboardStatCard({ label, value, icon }: DashboardStatCardProps) {
  return (
    <div className="rounded-[10px] border border-zinc-200 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">{label}</div>
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-white shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-950">{value}</p>
    </div>
  )
}
