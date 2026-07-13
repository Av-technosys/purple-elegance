"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconBolt,
  IconHeart,
  IconShoppingBag,
  IconStarFilled,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import type { ProductDetail } from "@/components/product/product-data";

const colors = ["#6E1718", "#244E78", "#222528"];
const colorNames: Record<string, string> = {
  "#6E1718": "Maroon Red",
  "#244E78": "Royal Blue",
  "#222528": "Midnight Black",
};

export default function ProductInfo({
  product,
}: {
  product: ProductDetail;
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  
  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("purple-elegance-wishlist") || "[]");
    setIsInWishlist(list.includes(product.slug));
  }, [product.slug]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.slug}-${selectedSize || "38"}-${selectedColor.replace("#", "")}`,
      title: product.name,
      subtitle: product.subtitle,
      size: selectedSize || "38",
      colorLabel: colorNames[selectedColor] || "Custom",
      colorCode: selectedColor,
      price: parseInt(product.price.replace(/[^\d]/g, "")) || 1999,
      originalPrice: parseInt(product.originalPrice.replace(/[^\d]/g, "")) || 2399,
      discountLabel: product.discount,
      quantity: 1,
      image: product.images[0]?.src || "/sample-product.png",
    };

    const existingCart = JSON.parse(localStorage.getItem("purple-elegance-cart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === cartItem.id);
    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem("purple-elegance-cart", JSON.stringify(existingCart));
    window.location.href = "/cart"; // Redirect to cart
  };

  const toggleWishlist = () => {
    const list = JSON.parse(localStorage.getItem("purple-elegance-wishlist") || "[]");
    const updated = list.includes(product.slug)
      ? list.filter((s: string) => s !== product.slug)
      : [...list, product.slug];
    setIsInWishlist(!isInWishlist);
    localStorage.setItem("purple-elegance-wishlist", JSON.stringify(updated));
  };

  return (
    <section className="text-[#160903]">
      <p className="hidden text-[11px] text-[#4D4038] md:block select-none">
        <Link href="/" className="hover:underline transition-all">Home</Link>
        <span className="mx-1.5">&gt;</span>
        <Link href="/product" className="hover:underline transition-all">Women</Link>
        <span className="mx-1.5">&gt;</span>
        <Link href="/product" className="hover:underline transition-all">Ethnic Wear</Link>
        <span className="mx-1.5">&gt;</span>
        <span className="text-[#160903] font-medium">{product.name}</span>
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
          <span className="font-normal text-[#3F322B]">{colorNames[selectedColor] || product.color}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {colors.map((color, index) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${index + 1}`}
              className={[
                "flex size-8 items-center justify-center border md:size-11 cursor-pointer transition-all",
                selectedColor === color ? "border-[#2A0C00] ring-2 ring-[#C18A48] scale-105" : "border-transparent",
              ].join(" ")}
              style={{ backgroundColor: color }}
            >
              {selectedColor === color ? (
                <span className="h-3 w-1.5 rotate-45 border-r border-b border-white" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between text-[12px] md:text-[14px]">
          <p className="font-semibold">
            Size: <span className="font-normal">{selectedSize || "Select Size"}</span>
          </p>
          <button type="button" className="text-[10px] font-semibold underline">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(isSelected ? "" : size)}
                className={[
                  "h-8 rounded-[2px] border text-[11px] font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "border-[#2A0C00] bg-[#2A0C00] text-white"
                    : "border-[#A49386] bg-white text-[#160903] hover:bg-slate-50",
                ].join(" ")}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    <div className="mt-7 space-y-3">
      <Button 
        onClick={handleAddToCart}
        className="h-11 w-full rounded-[2px] bg-[#6600C8] text-[13px] font-semibold text-white hover:bg-[#5700AB] cursor-pointer"
      >
        <IconBolt size={17} stroke={1.7} />
        Buy Now
      </Button>
      <Button 
        onClick={handleAddToCart}
        className="h-11 w-full rounded-[2px] bg-[#3A1400] text-[13px] font-semibold text-white hover:bg-[#4B1B05] cursor-pointer"
      >
        <IconShoppingBag size={17} stroke={1.7} />
        Add to Cart
      </Button>
      <Button
        variant="outline"
        onClick={toggleWishlist}
        className={`h-11 w-full rounded-[2px] text-[13px] font-semibold cursor-pointer transition-all ${
          isInWishlist 
            ? "bg-[#B91C1C] text-white border-[#B91C1C] hover:bg-[#991B1B]" 
            : "bg-white text-[#2A0C00] border-[#2A0C00] hover:bg-[#F8EAD8]"
        }`}
      >
        <IconHeart size={17} stroke={1.7} fill={isInWishlist ? "currentColor" : "none"} />
        {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
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
