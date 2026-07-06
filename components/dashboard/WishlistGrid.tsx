import { WishlistCard } from "./WishlistCard"

const items = [
  {
    title: "Red Embroidered Suit",
    price: "₹1,099",
    image: "/collection-1.png",
  },
  {
    title: "Beige Embroidered Suit",
    price: "₹1,099",
    image: "/collection-2.png",
  },
]

export function WishlistGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <WishlistCard 
          key={item.title} 
          title={item.title} 
          price={item.price} 
          image={item.image} 
        />
      ))}
    </div>
  )
}