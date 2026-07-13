"use client"

import { useState, useEffect } from "react"
import { WishlistCard } from "./WishlistCard"
import { products } from "@/components/product/product-data"

export function WishlistGrid() {
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([])

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("purple-elegance-wishlist") || "[]")
    setWishlistSlugs(list)
  }, [])

  const handleRemove = (slug: string) => {
    const updated = wishlistSlugs.filter((s) => s !== slug)
    setWishlistSlugs(updated)
    localStorage.setItem("purple-elegance-wishlist", JSON.stringify(updated))
  }

  // Resolve matching product data for each slug in wishlist
  const likedProducts = wishlistSlugs
    .map((slug) => {
      // Find matches in products database
      const found = products.find((p) => p.slug === slug || p.slug.replace(/-\d+$/, "") === slug.replace(/-\d+$/, ""))
      if (found) {
        return {
          ...found,
          wishlistSlug: slug, // Keep unique slug
        }
      }
      return null
    })
    .filter((p) => p !== null) as any[]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
      {likedProducts.map((product) => (
        <WishlistCard
          key={product.wishlistSlug}
          title={product.name}
          price={product.price}
          image={product.image}
          slug={product.slug}
          onRemove={() => handleRemove(product.wishlistSlug)}
        />
      ))}
      {likedProducts.length === 0 && (
        <div className="col-span-full py-20 text-center text-zinc-400 text-sm font-medium">
          Your wishlist is currently empty.
        </div>
      )}
    </div>
  )
}