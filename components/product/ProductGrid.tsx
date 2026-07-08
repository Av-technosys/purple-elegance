"use client"

import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { Product, products } from "@/components/product/product-data";

export default function ProductGrid() {
  return (
    <div className="flex-1">
      <div className="hidden items-start justify-between md:flex">
        <div>
          <p className="text-[10px] text-[#8B796D]">
            Home &gt; Category &gt; Ethnicwear
          </p>
          <h2 className="mt-2 text-[18px] font-medium text-[#2A0C00]">
            All Products (12 Products)
          </h2>
        </div>
      </div>

      <div className="mt-0 grid grid-cols-2 gap-x-3 gap-y-6 md:mt-4 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A0C00]"
      >
        <article>
          <div className="relative aspect-[183/274] overflow-hidden bg-[#E8CCAA]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.imagePosition}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 206px"
            />
          </div>
          <div className="pt-2 text-[#2A0C00] md:pt-3">
            <h3 className="text-[10px] leading-tight font-medium md:text-[12px]">
              {product.name}
            </h3>
            <p className="mt-1 text-[10px] leading-none md:text-[12px]">
              {product.price}
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function Pagination() {
  return (
    <nav
      aria-label="Product pagination"
      className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#2A0C00] md:justify-end"
    >
      <button type="button" aria-label="Previous page" className="p-1">
        <IconChevronLeft size={14} stroke={1.6} />
      </button>
      {[1, 2, 3, 4].map((page) => (
        <button
          key={page}
          type="button"
          className={[
            "flex size-[20px] items-center justify-center rounded-[2px] border text-[10px]",
            page === 1
              ? "border-[#2A0C00] bg-[#2A0C00] text-white"
              : "border-[#C8BBAE] bg-white text-[#2A0C00]",
          ].join(" ")}
        >
          {page}
        </button>
      ))}
      <span className="px-1 text-[#7C6B60]">...</span>
      <button
        type="button"
        className="flex h-[20px] min-w-[28px] items-center justify-center rounded-[2px] border border-[#C8BBAE] bg-white px-1 text-[10px]"
      >
        70
      </button>
      <button type="button" aria-label="Next page" className="p-1">
        <IconChevronRight size={14} stroke={1.6} />
      </button>
    </nav>
  );
}
