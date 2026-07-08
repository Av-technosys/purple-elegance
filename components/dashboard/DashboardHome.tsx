import Link from "next/link"
import { IconBox, IconMapPin, IconHeart, IconTruck } from "@tabler/icons-react"

import { DashboardHeader } from "./DashboardHeader"
import { DashboardOrderCard } from "./DashboardOrderCard"
import { DashboardStatCard } from "./DashboardStatCard"

const stats = [
  { label: "Total Orders", value: "12", icon: <IconBox size={24} /> },
  { label: "In Transit", value: "02", icon: <IconTruck size={24} /> },
  { label: "Wish-listed", value: "08", icon: <IconHeart size={24} /> },
  { label: "Addresses", value: "02", icon: <IconMapPin size={24} /> },
]

type DashboardOrderSummary = {
  id: string
  date: string
  status: string
  statusTone: "emerald" | "slate" | "amber"
  title: string
  total: string
  items: string
  estimate?: string
  description?: string
  image: string
  showTrack?: boolean
  downloadInvoice?: boolean
}

const recentOrders: DashboardOrderSummary[] = [
  {
    id: "ORDER #PE-98412-M",
    date: "Placed on October 14, 2023",
    status: "Shipped",
    statusTone: "emerald",
    title: "Beige Embroidered Suit",
    total: "$1,250.00",
    items: "1",
    estimate: "Oct 19",
    description: "In transit from Warehouse — Milan, IT",
    image: "/sample-product.png",
    showTrack: true,
    downloadInvoice: true,
  },
  {
    id: "ORDER #PE-88412-M",
    date: "Aug 21, 2023",
    status: "Delivered",
    statusTone: "slate",
    title: "Red Embroidered Suit",
    total: "$890.00",
    items: "3 ITEMS",
    image: "/sample-product.png",
    downloadInvoice: true,
  },
]

export function DashboardHome() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Welcome back, Alexander. Here is a summary of your premium account activity and recent acquisitions."
      />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <section className="mt-10 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Recent Orders</p>
            
          </div>
          <Link
            href="/dashboard/order"
            className="text-sm font-semibold text-[#2A0C00] transition hover:text-[#3A1400]"
          >
            View All
          </Link>
        </div>

        <div className="space-y-5">
          {recentOrders.map((order) => (
            <DashboardOrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </>
  )
}
