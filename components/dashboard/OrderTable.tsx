import { OrderCard } from "./OrderCard"

interface OrderRow {
  id: string
  date: string
  status: string
  statusTone: "emerald" | "amber" | "slate"
  title: string
  total: string
  items: string
}

interface OrderTableProps {
  orders: OrderRow[]
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="space-y-4">
      <div className="hidden overflow-hidden rounded-[10px]border border-zinc-200 bg-white shadow-sm sm:block">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-[0.32em] text-zinc-500">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-zinc-200">
                <td className="px-6 py-5 text-sm text-zinc-900">
                  <div className="font-semibold">{order.id}</div>
                  <div className="mt-1 text-xs text-zinc-500">{order.date}</div>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                      order.statusTone === "emerald"
                        ? "bg-emerald-50 text-emerald-700"
                        : order.statusTone === "amber"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-zinc-700">{order.items}</td>
                <td className="px-6 py-5 text-sm font-semibold text-zinc-950">{order.total}</td>
                <td className="px-6 py-5">
                  <button
                    type="button"
                    className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 sm:hidden">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
