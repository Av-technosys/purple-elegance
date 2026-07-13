"use client"

import Image from "next/image";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

import { Product, products } from "@/components/product/product-data";

export default function ProductGrid() {
  return (
    <Suspense fallback={<div className="flex-1 text-center py-12 text-[#2A0C00] text-sm">Loading products...</div>}>
      <ProductGridInner />
    </Suspense>
  );
}

const sizeOptions = ["38", "32", "34", "36", "38", "40", "42"];
const fitOptions = ["Regular", "Straight", "Boxy", "Slim", "Relaxed", "Tapered"];
const fabricOptions = ["Cotton", "Cotton Twill", "Linen", "Denim", "Polyester", "Linen Blend"];
const colorOptions = ["#2A0C00", "#3B6F8F", "#E7E1D2", "#C99466", "#672227", "#9D2646", "#C5507E"];

function getExtendedProduct(product: Product, index: number) {
  const sizes = [
    sizeOptions[index % sizeOptions.length],
    sizeOptions[(index + 2) % sizeOptions.length],
  ];
  const fit = fitOptions[index % fitOptions.length];
  const fabric = fabricOptions[index % fabricOptions.length];
  const color = colorOptions[index % colorOptions.length];
  const priceVal = parseInt(product.price.replace(/[^\d]/g, "")) || 1099;
  
  return {
    ...product,
    sizes,
    fit,
    fabric,
    color,
    priceVal,
  };
}

function ProductGridInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const filteredProducts = products.map((p, i) => getExtendedProduct(p, i)).filter((product) => {
    // 1. Category Filter
    if (activeCategory !== "All" && activeCategory !== "All Clothing") {
      if (activeCategory === "Anarkali Suits" && !product.name.toLowerCase().includes("anarkali")) {
        return false;
      }
      if (activeCategory === "Kurta Sets" && !product.name.toLowerCase().includes("co-ord") && !product.name.toLowerCase().includes("set") && !product.name.toLowerCase().includes("suit")) {
        return false;
      }
      if (activeCategory === "Ethnic Wear" && !product.name.toLowerCase().includes("suit") && !product.name.toLowerCase().includes("anarkali")) {
        return false;
      }
      if (activeCategory === "Sharara Sets" && !product.name.toLowerCase().includes("sharara") && !product.name.toLowerCase().includes("set")) {
        return false;
      }
      if (activeCategory === "Festive Collection" && !product.name.toLowerCase().includes("suit") && !product.name.toLowerCase().includes("anarkali")) {
        return false;
      }
      if (activeCategory === "Kurtis" && !product.name.toLowerCase().includes("kurti") && !product.name.toLowerCase().includes("suit")) {
        return false;
      }
    }

    // 2. Size Filter
    const filterSize = searchParams.get("size");
    if (filterSize && !product.sizes.includes(filterSize)) {
      return false;
    }

    // 3. Fit Filter
    const filterFit = searchParams.get("fit");
    if (filterFit && product.fit !== filterFit) {
      return false;
    }

    // 4. Fabric Filter
    const filterFabric = searchParams.get("fabric");
    if (filterFabric && product.fabric !== filterFabric) {
      return false;
    }

    // 5. Color Filter
    const filterColor = searchParams.get("color");
    if (filterColor && product.color !== filterColor) {
      return false;
    }

    // 6. Price Filter
    const minPrice = parseInt(searchParams.get("minPrice") || "500");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "2500");
    if (product.priceVal < minPrice || product.priceVal > maxPrice) {
      return false;
    }

    return true;
  });

  const PRODUCTS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const pageParam = Number(searchParams.get("page") || "1");
  const activePage = Math.min(Math.max(pageParam, 1), totalPages || 1);
  const startIndex = (activePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex-1">
      <div className="hidden items-start justify-between md:flex">
        <div>
          <p className="text-[10px] text-[#8B796D]">
            Home &gt; Category &gt; Ethnicwear
          </p>
          <h2 className="mt-2 text-[18px] font-medium text-[#2A0C00]">
            All Products ({filteredProducts.length} Products)
          </h2>
        </div>
      </div>

      <div className="mt-0 grid grid-cols-2 gap-x-3 gap-y-6 md:mt-4 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
        {paginatedProducts.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-medium">
          No products found matching this category.
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
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

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Product pagination"
      className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#2A0C00] md:justify-end select-none"
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 cursor-pointer ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:text-[#4A2313]"}`}
      >
        <IconChevronLeft size={14} stroke={1.6} />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={[
            "flex size-[20px] items-center justify-center rounded-[2px] border text-[10px] cursor-pointer transition-all",
            page === currentPage
              ? "border-[#2A0C00] bg-[#2A0C00] text-white"
              : "border-[#C8BBAE] bg-white text-[#2A0C00] hover:bg-[#F8EAD8]",
          ].join(" ")}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 cursor-pointer ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:text-[#4A2313]"}`}
      >
        <IconChevronRight size={14} stroke={1.6} />
      </button>
    </nav>
  );
}
