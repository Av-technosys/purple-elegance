import { ReactNode } from "react"

interface DashboardStatCardProps {
  label: string
  value: string
  icon: ReactNode
}

export function DashboardStatCard({ label, value, icon }: DashboardStatCardProps) {
  return (
    <div className="rounded-[6px] border border-zinc-200 bg-white p-4 flex flex-col justify-between">
      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-400">
        <span className="text-zinc-500 shrink-0 select-none">{icon}</span>
        <span className="truncate select-none">{label}</span>
      </div>
      <p className="mt-3.5 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-sans select-none">{value}</p>
    </div>
  )
}
