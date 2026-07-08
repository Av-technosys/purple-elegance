"use client"

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
  return (
    <section className="bg-white px-5 py-16 text-black sm:py-20 lg:py-[72px]">
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
          {products.map((product, index) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
              key={`${product.name}-${index}`}
              className="group"
            >
              <div className="relative aspect-[236/331] overflow-hidden bg-[#ead0b0]">
                <Image
                  src="/sample-product.png"
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 216px"
                />
                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="absolute top-3 right-3 text-[#7A7A7A] transition-colors hover:text-[#2A0C00]"
                >
                  <IconHeart size={21} stroke={1.4} />
                </button>
              </div>
              <div className="pt-3">
                <h3 className="text-[15px] leading-tight font-medium text-black">
                  {product.name}
                </h3>
                <p className="mt-1 text-[14px] leading-none text-black">
                  ₹1,099
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
