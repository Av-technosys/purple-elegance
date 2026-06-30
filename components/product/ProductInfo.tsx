import {
  IconBolt,
  IconHeart,
  IconShoppingBag,
  IconStarFilled,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { ProductDetail } from "@/components/product/product-data";

const colors = ["#6E1718", "#244E78", "#222528"];

export default function ProductInfo({
  product,
}: {
  product: ProductDetail;
}) {
  return (
    <section className="text-[#160903]">
      <p className="hidden text-[11px] text-[#4D4038] md:block">
        Home &gt; Men &gt; Category &gt; Bottomwear &gt; Jeans &gt; Levi&apos;s
        528 Jeans
      </p>

      <div className="mt-4 md:mt-8">
        <h1 className="font-heading text-[20px] leading-tight font-semibold md:text-[34px]">
          {product.name}
        </h1>
        <p className="mt-1 text-[11px] md:text-[15px]">{product.subtitle}</p>
      </div>

      <div className="mt-4 flex items-center gap-3 text-[12px] md:text-[15px]">
        <span className="flex items-center gap-1 text-[#F7A600]">
          {Array.from({ length: 5 }).map((_, index) => (
            <IconStarFilled key={index} size={18} />
          ))}
        </span>
        <span>{product.rating}</span>
        <span className="h-4 w-px bg-[#C7B9AE]" />
        <span>{product.reviews} reviews</span>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[22px] leading-none font-bold md:text-[28px]">
            {product.price}
          </span>
          <span className="text-[13px] text-[#6F625C] line-through md:text-[15px]">
            {product.originalPrice}
          </span>
          <span className="text-[12px] font-semibold text-[#22A332] md:text-[14px]">
            {product.discount}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-[#4D4038] md:text-[13px]">
          Inclusive of all taxes
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <p className="text-[12px] font-semibold md:text-[14px]">
          Colour:{" "}
          <span className="font-normal text-[#3F322B]">{product.color}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {colors.map((color, index) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${index + 1}`}
              className={[
                "flex size-8 items-center justify-center border md:size-11",
                index === 0 ? "border-[#2A0C00]" : "border-transparent",
              ].join(" ")}
              style={{ backgroundColor: color }}
            >
              {index === 0 ? (
                <span className="h-3 w-1.5 rotate-45 border-r border-b border-white" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between text-[12px] md:text-[14px]">
          <p className="font-semibold">
            Size: <span className="font-normal">Select Size</span>
          </p>
          <button type="button" className="text-[10px] font-semibold underline">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              className="h-8 rounded-[2px] border border-[#A49386] bg-white text-[11px] font-medium"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-3">
        <Button className="h-11 w-full rounded-[2px] bg-[#6600C8] text-[13px] font-semibold text-white hover:bg-[#5700AB]">
          <IconBolt size={17} stroke={1.7} />
          Buy Now
        </Button>
        <Button className="h-11 w-full rounded-[2px] bg-[#3A1400] text-[13px] font-semibold text-white hover:bg-[#4B1B05]">
          <IconShoppingBag size={17} stroke={1.7} />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          className="h-11 w-full rounded-[2px] border-[#2A0C00] bg-white text-[13px] font-semibold text-[#2A0C00] hover:bg-[#F8EAD8]"
        >
          <IconHeart size={17} stroke={1.7} />
          Add to Wishlist
        </Button>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          aria-label="Enter pincode"
          placeholder="Enter your Pincode"
          className="h-10 min-w-0 flex-1 rounded-[2px] border border-[#2A0C00] px-4 text-[11px] outline-none"
        />
        <Button className="h-10 w-[112px] rounded-[2px] bg-[#3A1400] text-[12px] font-semibold text-white hover:bg-[#4B1B05]">
          Check
        </Button>
      </div>
    </section>
  );
}
