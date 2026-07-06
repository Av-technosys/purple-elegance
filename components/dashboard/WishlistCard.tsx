import Image from "next/image"
import { IconHeart } from "@tabler/icons-react"

interface WishlistCardProps {
  title: string
  price: string
  image: string
}

export function WishlistCard({ title, price, image }: WishlistCardProps) {
  return (
    <div className="group flex flex-col w-full relative">
      {/* Product Image Wrapper with Absolute Heart Icon Overlay Layer */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 rounded-[4px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
          priority
        />
        
        {/* Heart Icon Overlay aligned perfectly to the upper right corner */}
        <button 
          type="button"
          className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 bg-transparent p-1 transition-colors duration-150 outline-none focus:outline-none focus:ring-0"
        >
          <IconHeart size={20} stroke={1.5} />
        </button>
      </div>

      {/* Title and Pricing Typography */}
      <div className="mt-4 flex flex-col text-left select-none">
        <h4 className="text-[14px] font-bold text-zinc-900 tracking-tight leading-snug">
          {title}
        </h4>
        <p className="text-[14px] font-bold text-zinc-900 mt-1">
          {price}
        </p>
      </div>
    </div>
  )
}