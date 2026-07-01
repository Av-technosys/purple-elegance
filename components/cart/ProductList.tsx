import Image from "next/image"
import { X } from "lucide-react"
import type { CartItemType } from "@/components/cart/CartItem"

interface ProductListProps {
  items: CartItemType[]
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export function ProductList({ items, onIncrease, onDecrease, onRemove }: ProductListProps) {
  const gridLayoutClass = "grid grid-cols-1 sm:grid-cols-[3.5fr_1fr_1fr_1.2fr_0.8fr_1fr] gap-4 items-center"

  return (
    <section className="overflow-hidden rounded-xs border border-gray-200 bg-white">
      <div className={`${gridLayoutClass} hidden border-b border-gray-200 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 sm:grid`}>
        <div>Product</div>
        <div className="text-center">Size</div>
        <div className="text-center">Color</div>
        <div className="text-center">Price</div>
        <div className="text-center">Qty</div>
        <div className="text-right pr-2">Total</div>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-14 text-center text-[12px] text-gray-400">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="px-6 py-5 transition hover:bg-gray-50/40">
              <div className={`${gridLayoutClass} text-gray-900`}>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xs border border-gray-100 bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading text-[15px] font-medium leading-snug text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] tracking-[0.08em] text-gray-500">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] text-gray-600 sm:justify-center">
                  <span className="sm:hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Size
                  </span>
                  <span className="font-medium text-gray-800">{item.size}</span>
                </div>

                <div className="flex items-center justify-between text-[12px] text-gray-600 sm:justify-center">
                  <span className="sm:hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Color
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-xs border border-gray-200"
                      style={{ backgroundColor: item.colorCode }}
                    />
                    <span className="text-[12px] text-gray-700">{item.colorLabel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] sm:justify-center">
                  <span className="sm:hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Price
                  </span>
                  <div className="text-right sm:text-center">
                    <div className="text-[13px] font-semibold text-gray-900">₹{item.price.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</div>
                    <div className="text-[10px] font-medium text-emerald-600">{item.discountLabel}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-center">
                  <span className="sm:hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Qty
                  </span>
                  <div className="flex h-16 w-6.5 flex-col items-center justify-between overflow-hidden rounded-xs border border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => onIncrease(item.id)}
                      className="flex h-5 w-full items-center justify-center text-[12px] text-gray-400 transition hover:text-gray-900"
                    >
                      +
                    </button>
                    <span className="text-[12px] font-medium leading-none text-gray-900">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onDecrease(item.id)}
                      className="flex h-5 w-full items-center justify-center pb-0.5 text-[14px] leading-none text-gray-400 transition hover:text-gray-900"
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="sm:hidden text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
                    Total
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold tracking-tight text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label="Remove item"
                      className="p-1 text-gray-400 transition hover:text-red-600"
                    >
                      <X className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}