import { type CartItemType } from "@/components/cart/CartItem"
import Link from "next/link"

interface OrderSummaryProps {
  items: CartItemType[]
  onApplyCoupon?: () => void
}

export function OrderSummary({ items, onApplyCoupon }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = items.length ? 1199 : 0
  const total = Math.max(subtotal - discount, 0)

  return (
    // Crisp container styling exactly matching the mockup screenshot 
    <aside className="border border-gray-200 bg-white p-8 text-gray-900">
      <h2 className="font-serif text-[20px] font-medium tracking-wide">Order Summary</h2>

      {/* Row breakdown spacing */}
      <div className="mt-6 space-y-4 text-[13px] text-gray-500">
        <div className="flex items-center justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-medium text-emerald-600">- ₹{discount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated Shipping</span>
          <span className="font-medium text-emerald-600 uppercase text-[12px] tracking-wider">Free</span>
        </div>
      </div>

      {/* Total Block Integration */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-[18px] font-medium">Total</span>
          <div className="text-right">
            <span className="text-[22px] font-bold tracking-tight text-gray-900">
              ₹{total.toLocaleString()}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5 font-light">Inclusive of all taxes</p>
          </div>
        </div>
      </div>

      {/* Coupon Actions box container */}
      <div className="mt-6 space-y-2">
        <label htmlFor="coupon" className="block text-[12px] font-medium text-gray-500">
          Have a coupon code?
        </label>
        <div className="flex h-[38px] overflow-hidden border border-gray-200 rounded-[2px]">
          <input
            id="coupon"
            name="coupon"
            type="text"
            placeholder="Enter coupon code"
            className="w-full bg-white px-3 text-[13px] text-gray-900 outline-none placeholder:text-gray-300"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className="bg-[#2A0C00] px-6 text-[12px] font-medium text-white transition hover:bg-[#3d1605]"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Execution Command */}
      <Link href={"/checkout"}>
      <button
        type="button"
        className="mt-6 flex h-[46px] w-full items-center justify-center rounded-[2px] bg-[#2A0C00] text-[13px] font-medium tracking-wide text-white transition hover:bg-[#3d1605]"
      >
        Proceed to Checkout
      </button></Link>
    </aside>
  )
}