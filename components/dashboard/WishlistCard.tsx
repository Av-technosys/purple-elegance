import Image from "next/image"
import Link from "next/link"
import { IconHeart } from "@tabler/icons-react"

interface WishlistCardProps {
  title: string
  price: string
  image: string
  slug: string
  onRemove?: () => void
}

export function WishlistCard({ title, price, image, slug, onRemove }: WishlistCardProps) {
  return (
    <div className="group flex flex-col w-full relative">
      {/* Product Image Wrapper with Absolute Heart Icon Overlay Layer */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 rounded-[4px]">
        <Link href={`/products/${slug}`} className="block w-full h-full relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-200 group-hover:scale-[1.02]"
            priority
          />
        </Link>
        
        {/* Heart Icon Overlay aligned perfectly to the upper right corner */}
        <button 
          type="button"
          onClick={onRemove}
          className="absolute top-4 right-4 text-red-500 hover:text-zinc-500 bg-transparent p-1 transition-colors duration-150 outline-none focus:outline-none focus:ring-0 cursor-pointer"
        >
          <IconHeart size={20} stroke={1.5} fill="currentColor" />
        </button>
      </div>

      {/* Title and Pricing Typography */}
      <div className="mt-4 flex flex-col text-left select-none">
        <Link href={`/products/${slug}`} className="hover:underline">
          <h4 className="text-[14px] font-bold text-zinc-900 tracking-tight leading-snug">
            {title}
          </h4>
        </Link>
        <p className="text-[14px] font-bold text-zinc-900 mt-1">
          {price}
        </p>
      </div>
    </div>
  )
}