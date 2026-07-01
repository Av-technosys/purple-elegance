"use client"

import Link from "next/link"
import Image from "next/image"

const checkoutItems = [
  {
    id: "red-embroidered-suit",
    title: "Red Embroidered Suit",
    subtitle: "Ethnic Suit",
    price: 2648,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "beige-embroidered-suit",
    title: "Beige Embroidered Suit",
    subtitle: "Ethnic Suit",
    price: 2648,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
  },
]

const page = () => {
  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxes = Math.round(subtotal * 0.05)
  const shipping = 0
  const total = subtotal + taxes + shipping

  return (
    <main className="bg-white px-4 pb-16 pt-24 md:px-33.75">
      <div className="mx-auto max-w-[1672px]">
        <div className="mb-8 flex flex-col gap-2 text-[11px] tracking-[0.16em] text-gray-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="transition hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/cart" className="transition hover:text-gray-900">
              Shopping Cart
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Checkout</span>
          </div>
          <h1 className="mt-5 text-[32px] font-medium tracking-tight text-gray-900 md:text-[36px]">Checkout</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[3fr_1.1fr] items-start">
          <section className="space-y-6">
            <div className="rounded-xs border border-gray-200 bg-white p-4 text-[13px] text-slate-900">
              <div className="mb-3 flex items-center gap-3 text-[13px] font-medium text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-xs border border-gray-200 bg-slate-50 text-[11px]">
                  1
                </span>
                Delivery Address
              </div>
              <div className="rounded-xs border border-gray-200 bg-white p-3 text-[12px] text-slate-700">
                <div className="flex items-center gap-2 text-[12px] text-slate-700">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-200 bg-slate-50 text-[9px]">●</span>
                  Use Saved Address
                </div>
                <div className="mt-3 rounded-xs border border-gray-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-800">
                  John Doe, 123 Park Street, Mumbai, Maharashtra - 400001
                </div>
                <button type="button" className="mt-3 text-[12px] font-medium text-slate-700 transition hover:text-slate-950">
                  + Add New Address
                </button>
              </div>
            </div>

            <div className="rounded-xs border border-gray-200 bg-white p-4 text-[13px] text-slate-900">
              <div className="mb-3 flex items-center gap-3 text-[13px] font-medium text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-xs border border-gray-200 bg-slate-50 text-[11px]">
                  2
                </span>
                Shipping Method
              </div>
              <div className="space-y-3">
                <label className="block rounded-xs border border-gray-200 bg-slate-50 p-3 text-[12px] text-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-200 bg-white text-[9px]">●</span>
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-[11px] text-slate-500">(3-5 Business Days)</div>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-slate-900">FREE</span>
                  </div>
                </label>
                <label className="block rounded-xs border border-gray-200 bg-white p-3 text-[12px] text-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-200 bg-white text-[9px]">○</span>
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-[11px] text-slate-500">(1-2 Business Days)</div>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-slate-900">₹149</span>
                  </div>
                </label>
              </div>
            </div>

          
          </section>
        
          <aside className="space-y-6 p-4  border  border-gray-200">
            <div className="rounded-xs bg-white ">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em]  text-slate-500">Order Summary</div>
              <div className="space-y-4 border-t border-gray-100 pt-3">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xs border border-gray-100 bg-slate-50">
                      <Image src={item.image} alt={item.title} fill className="object-cover object-center" sizes="64px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-slate-950">{item.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{item.subtitle}</p>
                      <p className="mt-2 text-[11px] font-medium text-slate-950">Qty: {item.quantity}</p>
                    </div>
                    <div className="ml-auto text-[13px] font-bold text-slate-950">₹{item.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xs border-t border-gray-100 pt-3">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Price Details</div>
              <div className="space-y-2.5 text-[12px] text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Subtotal ({checkoutItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>- ₹1,199</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Taxes</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-3 flex h-9.5 items-center rounded-xs border border-gray-200 px-2.5 text-[12px] text-slate-700">
                <input
                  type="text"
                  placeholder="Apply coupon"
                  className="w-full border-none bg-transparent px-1.5 text-[12px] outline-none"
                />
                <button type="button" className="ml-2 rounded-xs bg-[#2A0C00] px-2.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-[#220a00]">
                  Apply
                </button>
              </div>

              <div className="mt-4   text-[12px]">
                <div className="flex items-center justify-between text-[14px] font-bold text-slate-950">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">Inclusive of all taxes</p>
              </div>
            </div>

            <button className="h-8.5 w-full rounded-xs bg-[#2A0C00] px-4 text-[13px] font-medium text-white transition hover:bg-[#220a00]">
              Place Order
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default page
