import Image from "next/image";
import Link from "next/link";

import { products } from "@/components/product/product-data";

export default function RelatedProducts() {
  return (
    <section className="mx-auto max-w-[1290px] px-4 pb-12 md:px-8 md:pb-18">
      <h2 className="mb-4 text-center font-heading text-[16px] font-semibold text-[#160903] md:mb-7 md:text-[28px]">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
        {products.slice(0, 5).map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A0C00]"
          >
            <div className="relative aspect-[183/274] overflow-hidden bg-[#E8CCAA]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.imagePosition}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="pt-2 text-[#2A0C00]">
              <h3 className="text-[10px] leading-tight font-medium md:text-[12px]">
                {product.name}
              </h3>
              <p className="mt-1 text-[10px] md:text-[12px]">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
