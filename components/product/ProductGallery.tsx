"use client";

import { useState } from "react";
import Image from "next/image";
import { IconZoomIn } from "@tabler/icons-react";

import type { ProductDetail } from "@/components/product/product-data";

export default function ProductGallery({
  product,
}: {
  product: ProductDetail;
}) {
  const thumbnails = product.images;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = thumbnails[activeImageIndex] || thumbnails[0];

  return (
    <div className="md:flex md:gap-5 select-none">
      <div className="hidden w-[124px] shrink-0 flex-col gap-4 md:flex">
        {thumbnails.map((image, index) => {
          const isSelected = activeImageIndex === index;
          return (
            <button
              key={`${image.alt}-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={`relative aspect-[124/154] overflow-hidden bg-[#E5C7A6] cursor-pointer transition-all border ${
                isSelected ? "border-[#2A0C00] ring-2 ring-[#C18A48] scale-102" : "border-transparent"
              }`}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${image.position}`}
                sizes="124px"
              />
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[344/430] overflow-hidden bg-[#E5C7A6] md:h-[680px] md:w-[430px] md:aspect-auto">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          className={`object-cover ${activeImage.position}`}
          sizes="(max-width: 768px) 100vw, 430px"
        />
        <button
          type="button"
          aria-label="Zoom product image"
          className="absolute right-3 bottom-3 hidden size-8 items-center justify-center rounded-full bg-white/90 text-[#2A0C00] shadow-sm md:flex"
        >
          <IconZoomIn size={17} stroke={1.6} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2 md:hidden">
        {thumbnails.map((image, index) => {
          const isSelected = activeImageIndex === index;
          return (
            <button
              key={`${image.alt}-mobile-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={`relative aspect-square overflow-hidden bg-[#E5C7A6] cursor-pointer border ${
                isSelected ? "border-[#2A0C00] scale-102" : "border-transparent"
              }`}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${image.position}`}
                sizes="25vw"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
