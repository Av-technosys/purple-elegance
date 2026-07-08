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
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="size-5 text-white" />
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Orders"
        value={stats.orders.toLocaleString()}
        subtitle="All time orders"
        icon={ShoppingCart}
        color="bg-violet-500"
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.revenue)}
        subtitle="Sum of all order totals"
        icon={DollarSign}
        color="bg-emerald-500"
      />
      <StatCard
        title="Active Products"
        value={stats.products.toLocaleString()}
        subtitle="Published in store"
        icon={Package}
        color="bg-amber-500"
      />
      <StatCard
        title="Total Users"
        value={stats.users.toLocaleString()}
        subtitle="Registered customers"
        icon={Users}
        color="bg-sky-500"
      />
    </div>
  )
}
