import Image from "next/image"

interface WishlistCardProps {
  title: string
  price: string
  image: string
}

export function WishlistCard({ title, price, image }: WishlistCardProps) {
  return (
    <div className="rounded-[10px]border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
      <div className="relative h-64 overflow-hidden rounded-[26px] border border-zinc-100 bg-zinc-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
        <p className="text-sm text-zinc-600">{price}</p>
      </div>
    </div>
  )
}
