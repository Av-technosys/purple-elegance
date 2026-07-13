"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Check, Truck, MapPin } from "lucide-react"

export default function OrderConfirmationPage() {
  const [items, setItems] = useState<any[]>([])
  const [address, setAddress] = useState<any>(null)
  const [orderNumber, setOrderNumber] = useState("")
  const [deliveryRange, setDeliveryRange] = useState("")

  useEffect(() => {
    // Load last order details
    const savedOrder = localStorage.getItem("purple-elegance-last-order")
    if (savedOrder) {
      try {
        setItems(JSON.parse(savedOrder))
      } catch (e) {
        console.error("Error parsing last order", e)
      }
    }

    // Load default address
    const savedAddresses = localStorage.getItem("purple-elegance-addresses")
    if (savedAddresses) {
      try {
        const list = JSON.parse(savedAddresses)
        const def = list.find((addr: any) => addr.isDefault) || list[0]
        setAddress(def)
      } catch (e) {
        console.error("Error parsing address for confirmation", e)
      }
    }

    // Generate random order number
    const num = "PE" + Math.floor(10000000 + Math.random() * 90000000)
    setOrderNumber(num)

    // Generate dynamic delivery range (3 to 6 days from today)
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }
    const start = new Date()
    start.setDate(start.getDate() + 3)
    const end = new Date()
    end.setDate(end.getDate() + 6)
    
    setDeliveryRange(`${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}, ${start.getFullYear()}`)
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = items.length > 0 ? Math.round(subtotal * 0.1) : 0
  const taxes = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + taxes
  return (
    <main className="bg-white px-4 pb-16 pt-24 md:px-33.75">
      <div className="mx-auto max-w-[1672px]">
        {/* Breadcrumbs and Page Title */}
        <div className="mb-8 flex flex-col gap-2 text-[11px] tracking-[0.16em] text-gray-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="transition hover:text-gray-900">
              Home
            </Link>
            <span>&gt;</span>
            <Link href="/cart" className="transition hover:text-gray-900">
              Shopping Cart
            </Link>
            <span>&gt;</span>
            <Link href="/checkout" className="transition hover:text-gray-900">
              Checkout
            </Link>
            <span>&gt;</span>
            <span className="font-medium text-gray-900">Order Confirmation</span>
          </div>
          <h1 className="mt-5 font-heading text-[32px] font-medium tracking-tight text-gray-900 md:text-[36px]">
            Order Confirmation
          </h1>
        </div>

        {/* Centered Success Details */}
        <div className="mx-auto flex max-w-[580px] flex-col items-center text-center">
          {/* Green Check Badge with Confetti dots */}
          <div className="relative mb-6">
            {/* Confetti dots */}
            <span className="absolute -top-2 left-4 h-1.5 w-1.5 rounded-full bg-emerald-300 opacity-80 animate-pulse"></span>
            <span className="absolute -top-3 right-5 h-1 w-1 rounded-full bg-emerald-200"></span>
            <span className="absolute top-4 -right-4 h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="absolute bottom-3 -left-3 h-2 w-2 rounded-full bg-emerald-300"></span>
            <span className="absolute top-4 -left-4 h-1.5 w-1.5 rounded-full bg-emerald-200"></span>
            
            {/* Main check circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F7ED]">
              <Check className="h-6 w-6 text-[#10B981]" strokeWidth={3} />
            </div>
          </div>

          <h2 className="font-heading text-[28px] font-medium text-slate-900 md:text-[32px]">
            Thank You, {address?.fullName || "Guest"}!
          </h2>
          <p className="mt-2 text-[13px] text-slate-500">
            Your order has been placed successfully.
          </p>

          <div className="mt-6 flex flex-col items-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              Order Number
            </span>
            <span className="mt-1 text-[18px] font-semibold text-[#10B981]">
              {orderNumber}
            </span>
          </div>

          <p className="mt-6 max-w-sm text-[12px] leading-relaxed text-slate-500">
            We've sent a confirmation email to your registered email address.
          </p>

          <Link
            href="/"
            className="mt-8 rounded-xs bg-[#1C1C1C] px-8 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-black"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="mx-auto mt-12 w-full max-w-[580px] rounded-xs border border-gray-200 bg-white p-6 md:p-8">
          <h3 className="mb-6 text-[15px] font-semibold text-slate-900">
            Order Summary
          </h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="relative h-20 w-16 overflow-hidden rounded-xs border border-gray-100 bg-slate-50 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <h4 className="text-[13px] font-medium text-slate-900">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {item.subtitle}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-slate-600">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-[13px] font-semibold text-slate-950">
                  ₹{item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Price Details
            </h4>
            <div className="space-y-3 text-[12px] text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} Items)</span>
                <span className="font-medium text-slate-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold">- ₹{discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-100 pt-5">
              <div className="flex justify-between items-baseline">
                <span className="text-[15px] font-bold text-slate-900">Total</span>
                <div className="text-right">
                  <span className="text-[20px] font-bold text-slate-900">
                    ₹{total.toLocaleString()}
                  </span>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-400">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery & Address Cards */}
        <div className="mx-auto mt-4 grid w-full max-w-[580px] grid-cols-1 gap-4 md:grid-cols-2">
          {/* Estimated Delivery Card */}
          <div className="flex items-start gap-3 rounded-xs border border-gray-200 bg-white p-5">
            <Truck className="mt-0.5 h-4.5 w-4.5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-[13px] font-semibold text-slate-900">
                Estimated Delivery
              </h4>
              <p className="mt-1 text-[12px] text-slate-500">
                {deliveryRange}
              </p>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="flex items-start gap-3 rounded-xs border border-gray-200 bg-white p-5">
            <MapPin className="mt-0.5 h-4.5 w-4.5 text-slate-700 flex-shrink-0" />
            <div>
              <h4 className="text-[13px] font-semibold text-slate-900">
                Shipping Address
              </h4>
              <div className="mt-1 text-[12px] leading-relaxed text-slate-500">
                {address ? (
                  <>
                    <p className="font-medium text-slate-700">{address.fullName}</p>
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} - {address.zip}</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">Mobile: {address.phone}</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-slate-700">John Doe</p>
                    <p>123 Park Street, Mumbai,</p>
                    <p>Maharashtra - 400001</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
