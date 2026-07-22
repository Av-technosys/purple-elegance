// ── DashboardCards ─────────────────────────────────────────────────────────
// Real data from the DB — shows order count, user count, and product count.
// Uses server-side fetching (no "use client").

import { db } from "@/server/db"
import { orders } from "@/server/modules/order/order.schema"
import { users } from "@/server/modules/user/user.schema"
import { products } from "@/server/modules/product/product.schema"
import { count, eq, sum } from "drizzle-orm"
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react"

async function getStats() {
  const [orderRows, userRows, productRows, revenueRows] = await Promise.all([
    db.select({ total: count() }).from(orders),
    db.select({ total: count() }).from(users),
    db.select({ total: count() }).from(products).where(eq(products.isActive, true)),
    db.select({ revenue: sum(orders.total) }).from(orders),
  ])

  return {
    orders: orderRows[0]?.total ?? 0,
    users: userRows[0]?.total ?? 0,
    products: productRows[0]?.total ?? 0,
    revenue: Number(revenueRows[0]?.revenue ?? 0),
  }
}

type StatCardProps = {
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
          <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
        </div>
        <div className={`rounded-xl p-3 border shrink-0 transition-transform duration-300 group-hover:scale-110 ${color}`}>
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  )
}

export async function DashboardCards() {
  const stats = await getStats()

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Orders"
        value={stats.orders.toLocaleString()}
        subtitle="All time orders placed"
        icon={ShoppingCart}
        color="bg-violet-50 text-violet-600 border-violet-100"
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.revenue)}
        subtitle="Sum of all order payments"
        icon={DollarSign}
        color="bg-emerald-50 text-emerald-600 border-emerald-100"
      />
      <StatCard
        title="Active Products"
        value={stats.products.toLocaleString()}
        subtitle="Active products in store"
        icon={Package}
        color="bg-amber-50 text-amber-600 border-amber-100"
      />
      <StatCard
        title="Total Users"
        value={stats.users.toLocaleString()}
        subtitle="Registered user base"
        icon={Users}
        color="bg-sky-50 text-sky-600 border-sky-100"
      />
    </div>
  )
}
