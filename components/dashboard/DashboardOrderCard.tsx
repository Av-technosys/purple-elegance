import Image from "next/image"

interface DashboardOrderCardProps {
  order: {
    id: string
    date: string
    status: string
    statusTone: "emerald" | "amber" | "slate"
    title: string
    total: string
    items: string
    estimate?: string
    description?: string
    image: string
    showTrack?: boolean
    downloadInvoice?: boolean
  }
}

const statusColors = {
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-700",
}

export function DashboardOrderCard({ order }: DashboardOrderCardProps) {
  return (
    <article className="rounded-[10px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
            <span>{order.id}</span>
            <span>{order.date}</span>
          </div>
          <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${statusColors[order.statusTone]}`}>
            {order.status}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {order.downloadInvoice && (
            <button
              type="button"
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-[#2A0C00] transition hover:border-zinc-400 hover:text-[#3A1400]"
            >
              Download Invoice
            </button>
          )}
          {/* {order.estimate && (
            <div className="rounded-3xl bg-[#F7F9EE] px-4 py-3 text-sm font-semibold text-zinc-950">
              Estimated delivery: <span className="font-semibold text-[#2A0C00]">{order.estimate}</span>
            </div>
          )} */}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-[26px] border border-zinc-200 bg-zinc-100">
            <Image src={order.image} alt={order.title} fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">{order.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{order.total} | {order.items}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {order.showTrack && (
            <button type="button" className="rounded-full bg-[#2A0C00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3A1400]">
              Track Order
            </button>
          )}
          <button type="button" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-500">
            View Details
          </button>
        </div>
      </div>

      {order.showTrack && (
        <div className="mt-6 border-t border-zinc-200 pt-6 text-left">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-800 mb-5">
            Estimated Delivery: {order.estimate || "Oct 19"}
          </div>
          
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-zinc-200">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="h-1 w-1 rounded-full bg-white"></span>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-[12px] font-bold text-zinc-900 uppercase tracking-wider">Shipped</h5>
                  <span className="text-[10px] text-zinc-400 font-medium font-sans">Oct 15, 14:30</span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 leading-normal">
                  {order.description || "In transit from Warehouse - Milan, IT"}
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="h-1 w-1 rounded-full bg-white"></span>
              </span>
              <div>
                <h5 className="text-[12px] font-bold text-zinc-900 uppercase tracking-wider">Out For Delivery</h5>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-normal">Expected Oct 19</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center"></span>
              <div>
                <h5 className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Delivered</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
