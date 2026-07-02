"use client"

import { useMemo, useState } from "react"

import { DashboardHeader } from "./DashboardHeader"
import { OrderFilters } from "./OrderFilters"
import { OrderTable } from "./OrderTable"
import { DashboardOrderCard } from "./DashboardOrderCard"

type OrderItem = {
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

const featuredOrder: OrderItem = {
  id: "ORDER #PE-98412-M",
  date: "Placed on October 14, 2023",
  status: "Shipped",
  statusTone: "emerald",
  title: "Beige Embroidered Suit",
  total: "$1,250.00",
  items: "1",
  estimate: "Oct 19",
  description: "Shipped in transit from Warehouse — Milan, IT. Expected Oct 19.",
  image: "/sample-product.png",
  showTrack: true,
  downloadInvoice: true,
}

const orders: OrderItem[] = [
  {
    id: "ORDER #PE-88412-M",
    date: "Aug 21, 2023",
    status: "Delivered",
    statusTone: "slate",
    title: "Red Embroidered Suit",
    total: "$890.00",
    items: "3 ITEMS",
    image: "/sample-product.png",
  },
  {
    id: "ORDER #PE-74125-L",
    date: "Jul 05, 2023",
    status: "Cancelled",
    statusTone: "amber",
    title: "Pink Floral Co-ord Set",
    total: "$980.00",
    items: "2 ITEMS",
    image: "/sample-product.png",
  },
]

export function DashboardOrders() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filteredOrders = useMemo(() => {
    if (selectedFilter === "All") {
      return orders
    }

    return orders.filter((order) => order.status === selectedFilter)
  }, [selectedFilter])

  return (
    <>
      <DashboardHeader
        title="My Order"
        description="Manage your recent purchases and track your shipments."
      />
      <div className="space-y-8">
        <DashboardOrderCard order={featuredOrder} />
        <div>
          <div className="mb-6">
            <OrderFilters selected={selectedFilter} onChange={setSelectedFilter} />
          </div>
          <OrderTable orders={filteredOrders} />
        </div>
      </div>
    </>
  )
}
