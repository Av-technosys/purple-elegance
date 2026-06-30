import Image from "next/image";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";

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

export default function BestSeller() {
  return (
    <section className="bg-white px-5 py-16 text-black sm:py-20 lg:py-[72px]">
      <div className="mx-auto max-w-[1080px]">
        <div className="relative text-center">
          <h2 className="text-[32px] leading-none font-semibold sm:text-[38px]">
            Best Seller
          </h2>
          <p className="mt-3 text-[14px] text-[#5B5B5B]">
            Shop our most-loved styles, trusted and chosen by thousands of
            customers.
          </p>
          <Link
            href="#"
            className="mt-4 inline-block text-[13px] font-bold underline underline-offset-2 sm:absolute sm:top-3 sm:right-0 sm:mt-0"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-[10px] gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, index) => (
            <article key={`${product.name}-${index}`} className="group">
              <div className="relative aspect-[236/331] overflow-hidden bg-[#ead0b0]">
                <Image
                  src="/sample-product.png"
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.position}`}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
