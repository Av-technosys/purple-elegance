"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OrderSummary } from "@/components/cart/OrderSummary"
import { ProductList } from "@/components/cart/ProductList"
import type { CartItemType } from "@/components/cart/CartItem"

const initialItems: CartItemType[] = [
  {
    id: "red-embroidered-suit",
    title: "Red Embroidered Suit",
    subtitle: "Ethnic Suit",
    size: "32",
    colorLabel: "Red",
    colorCode: "#B91C1C",
    price: 1999,
    originalPrice: 2499,
    discountLabel: "(20% OFF)",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "beige-embroidered-suit",
    title: "Beige Embroidered Suit",
    subtitle: "Ethnic Suit",
    size: "32",
    colorLabel: "Beige",
    colorCode: "#D9B99B",
    price: 1999,
    originalPrice: 2499,
    discountLabel: "(20% OFF)",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
  },
]

const Page = () => {
  const [items, setItems] = useState<CartItemType[]>(initialItems)

  const handleIncrease = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleDecrease = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    )
  }

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const handleApplyCoupon = () => {
    alert("Coupon applied")
  }

  return (
    <main className="pt-24 px-4 pb-16 sm:px-6 md:px-[135px] bg-white">
      <div className="mx-auto max-w-[1672px]">
        
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-[12px] text-gray-500 tracking-wide">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <span className="mx-2"> {">"} </span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <h1 className="mt-5 text-[32px] md:text-[36px] font-medium tracking-tight text-gray-900">
            Your Shopping Cart
          </h1>
        </div>

        {/* 3fr to 1.1fr makes listing wider and summary smaller */}
        <div className="grid gap-7 lg:grid-cols-[3.5fr_1.1fr] items-start">
          <ProductList
            items={items}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
          <OrderSummary items={items} onApplyCoupon={handleApplyCoupon} />
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex h-[42px] items-center justify-center rounded-[2px] border border-gray-200 bg-white px-5 text-[13px] font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <ChevronLeft className="mr-1.5 h-4 w-4 stroke-[1.8]" />
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  )
}

export default Page;