import Image from "next/image";
import { IconZoomIn } from "@tabler/icons-react";

import type { ProductDetail } from "@/components/product/product-data";

export default function ProductGallery({
  product,
}: {
  product: ProductDetail;
}) {
  const [primaryImage, ...thumbnailImages] = product.images;
  const thumbnails = [primaryImage, ...thumbnailImages];

  return (
    <div className="md:flex md:gap-5">
      <div className="hidden w-[124px] shrink-0 flex-col gap-4 md:flex">
        {thumbnails.map((image, index) => (
          <button
            key={`${image.alt}-${index}`}
            type="button"
            className="relative aspect-[124/154] overflow-hidden bg-[#E5C7A6]"
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
        ))}
      </div>

      <div className="relative aspect-[344/430] overflow-hidden bg-[#E5C7A6] md:h-[680px] md:w-[430px] md:aspect-auto">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt}
          fill
          priority
          className={`object-cover ${primaryImage.position}`}
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
        {thumbnails.map((image, index) => (
          <button
            key={`${image.alt}-mobile-${index}`}
            type="button"
            className="relative aspect-square overflow-hidden bg-[#E5C7A6]"
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
        ))}
      </div>
    </div>
  );
}
