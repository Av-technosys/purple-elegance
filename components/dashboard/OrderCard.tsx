interface OrderCardProps {
  order: {
    id: string
    date: string
    status: string
    statusTone: "emerald" | "amber" | "slate"
    title: string
    total: string
    items: string
  }
}

const statusColors = {
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-700",
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-[10px]border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-950">{order.id}</p>
          <p className="mt-1 text-xs text-zinc-500">{order.date}</p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusColors[order.statusTone]}`}>
          {order.status}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-700">{order.title}</p>
          <p className="mt-1 text-sm font-semibold text-zinc-950">{order.total}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
          <span className="rounded-2xl bg-zinc-100 px-3 py-2">{order.items}</span>
          <button type="button" className="rounded-2xl border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:border-zinc-500">
            Details
          </button>
        </div>
      </div>
    </div>
  )
}
