import Image from "next/image"
import { Heart, X } from "lucide-react"

export interface CartItemType {
  id: string
  title: string
  subtitle: string
  size: string
  colorLabel: string
  colorCode: string
  price: number
  originalPrice: number
  discountLabel: string
  quantity: number
  image: string
}

interface CartItemProps {
  item: CartItemType
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    // Grid columns layout exact responsive styling ke saath mapping karta hai
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[3.8fr_1fr_1fr_1.3fr_0.8fr_1fr] sm:gap-2 items-center text-gray-900 py-2">
      
      {/* 1. Product Info Column (Image + Info) */}
      <div className="flex gap-4 items-center">
        <div className="relative h-24 w-20 flex-shrink-0 border border-gray-100 bg-gray-50">
          {/* <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center"
            sizes="80px"
        
          /> */}
        </div>
        <div className="space-y-0.5">
          <h3 className="font-serif text-[15px] font-medium leading-snug text-gray-900">{item.title}</h3>
          <p className="text-[11px] text-gray-400 tracking-wide">{item.subtitle}</p>
          
          <button 
            type="button"
            className="flex items-center gap-1.5 pt-2 text-[11px] text-gray-400 hover:text-gray-900 transition"
          >
            <Heart className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>Move to Wishlist</span>
          </button>
        </div>
      </div>

      {/* 2. Size Column */}
      <div className="flex justify-between sm:justify-center items-center text-[13px] text-gray-600">
        <span className="sm:hidden font-medium text-[11px] text-gray-400 uppercase tracking-wider">Size:</span>
        <span className="font-mono text-gray-800">{item.size}</span>
      </div>

      {/* 3. Color Column */}
      <div className="flex justify-between sm:justify-center items-center text-[13px] text-gray-600">
        <span className="sm:hidden font-medium text-[11px] text-gray-400 uppercase tracking-wider">Color:</span>
        <div className="flex items-center gap-2">
          <span 
            className="h-3 w-3 border border-gray-200" 
            style={{ backgroundColor: item.colorCode }}
          />
          <span className="text-gray-700 text-[12px]">{item.colorLabel}</span>
        </div>
      </div>

      {/* 4. Price Breakdown Column */}
      <div className="flex justify-between sm:justify-center items-center text-center">
        <span className="sm:hidden font-medium text-[11px] text-gray-400 uppercase tracking-wider">Price:</span>
        <div className="space-y-0.5 sm:text-center text-right">
          <div className="text-[14px] font-bold text-gray-900">₹{item.price.toLocaleString()}</div>
          <div className="text-[11px] text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</div>
          <div className="text-[10px] font-medium text-emerald-600 tracking-tight">{item.discountLabel}</div>
        </div>
      </div>

      {/* 5. 200iq Vertical Compact Quantity Box Style */}
      <div className="flex justify-between sm:justify-center items-center">
        <span className="sm:hidden font-medium text-[11px] text-gray-400 uppercase tracking-wider">Qty:</span>
        <div className="flex flex-col items-center justify-between border border-gray-200 bg-white w-[26px] h-[64px]">
          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            className="flex w-full items-center justify-center text-gray-400 hover:text-black transition text-[12px] h-5"
          >
            +
          </button>
          <span className="font-medium text-gray-900 text-[12px] leading-none">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            className="flex w-full items-center justify-center text-gray-400 hover:text-black transition text-[14px] h-5 leading-none pb-0.5"
          >
            -
          </button>
        </div>
      </div>

      {/* 6. Total Box + Right Aligned Minimal Cross Icon */}
      <div className="flex justify-between sm:justify-end items-center gap-4 sm:pr-2">
        <span className="sm:hidden font-medium text-[11px] text-gray-400 uppercase tracking-wider">Total:</span>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold tracking-tight text-gray-900">
            ₹{(item.price * item.quantity).toLocaleString()}
          </span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="text-gray-400 hover:text-red-600 transition p-1"
          >
            <X className="h-4 w-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

    </div>
  )
}