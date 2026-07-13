"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Red Embroidered Suit",
    position: "object-[center_18%]",
  },
  {
    name: "Pink Floral Co-ord Set",
    position: "object-[center_34%]",
  },
  {
    name: "Beige Embroidered Suit",
    position: "object-[center_50%]",
  },
  {
    name: "Yellow Floral Anarkali",
    position: "object-[center_66%]",
  },
  {
    name: "Cocktail Midi Dress",
    position: "object-[center_24%]",
  },
  {
    name: "Pink Floral Co-ord Set",
    position: "object-[center_38%]",
  },
  {
    name: "Cocktail Midi Dress",
    position: "object-[center_22%]",
  },
  {
    name: "Yellow Floral Anarkali",
    position: "object-[center_62%]",
  },
  {
    name: "Beige Embroidered Suit",
    position: "object-[center_52%]",
  },
  {
    name: "Red Embroidered Suit",
    position: "object-[center_20%]",
  },
];

export default function NewArrival() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("purple-elegance-wishlist") || "[]"));
  }, []);

  const toggleWishlist = (slug: string) => {
    const updated = wishlist.includes(slug)
      ? wishlist.filter((s) => s !== slug)
      : [...wishlist, slug];
    setWishlist(updated);
    localStorage.setItem("purple-elegance-wishlist", JSON.stringify(updated));
  };

  return (
    <section id="new-arrivals" className="bg-white px-5 py-16 text-black sm:py-20 lg:py-[72px] scroll-mt-20">
      <div className="mx-auto max-w-[1080px]">
        <div className="relative text-center">
          <h2 className="text-[32px] leading-none font-semibold sm:text-[38px]">
            New Arrival
          </h2>
          <p className="mt-3 text-[14px] text-[#5B5B5B]">
            Fresh styles just dropped — discover the latest trends before everyone else.
          </p>
          <Link
            href="/product"
            className="mt-4 block w-full text-right text-[13px] font-bold underline underline-offset-2 sm:absolute sm:top-3 sm:right-0 sm:w-auto sm:mt-0"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-[10px] gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, index) => {
            const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            const isLiked = wishlist.includes(productSlug);
            return (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
                key={`${product.name}-${index}`}
                className="group"
              >
                <div className="relative aspect-[236/331] overflow-hidden bg-[#ead0b0]">
                  <Link href={`/products/${productSlug}`} className="block w-full h-full relative">
                    <Image
                      src="/sample-product.png"
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 216px"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(productSlug)}
                    aria-label={`Add ${product.name} to wishlist`}
                    className={`absolute top-3 right-3 transition-colors cursor-pointer ${
                      isLiked ? "text-[#B91C1C]" : "text-[#7A7A7A] hover:text-[#2A0C00]"
                    }`}
                  >
                    <IconHeart size={21} stroke={1.4} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              <div className="pt-3">
                <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}`} className="block">
                  <h3 className="text-[15px] leading-tight font-medium text-black">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-1 text-[14px] leading-none text-black">
                  ₹1,099
                </p>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
