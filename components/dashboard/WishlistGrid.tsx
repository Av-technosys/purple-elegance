import { WishlistCard } from "./WishlistCard"

const items = [
  {
    title: "Red Embroidered Suit",
    price: "$1,099",
    image: "/collection-1.png",
  },
  {
    title: "Beige Embroidered Suit",
    price: "$1,099",
    image: "/collection-2.png",
  },
  {
    title: "Golden Evening Saree",
    price: "$1,299",
    image: "/collection-3.png",
  },
]

export function WishlistGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <WishlistCard key={item.title} title={item.title} price={item.price} image={item.image} />
      ))}
    </div>
  )
}
