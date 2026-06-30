import Image from "next/image";
import { IconBrandInstagram } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const instagramPosts = [
  {
    alt: "Yellow floral outfit",
    source: "/sample-product.png",
    position: "object-[center_58%]",
  },
  {
    alt: "Pink co-ord outfit",
    source: "/sample-insta.png",
    position: "object-[center_38%]",
  },
  {
    alt: "Red embroidered outfit",
    source: "/sample-product.png",
    position: "object-[center_22%]",
  },
  {
    alt: "Beige embroidered outfit",
    source: "/sample-product.png",
    position: "object-[center_48%]",
  },
  {
    alt: "Pink co-ord outfit",
    source: "/sample-insta.png",
    position: "object-[center_38%]",
  },
];

export default function InstagramSection() {
  return (
    <section className="bg-white px-5 py-16 text-center text-black sm:py-20 lg:py-[74px]">
      <div className="mx-auto max-w-[1080px]">
        <p className="text-[13px] leading-none text-black">@purplelegance</p>
        <h2 className="mt-3 text-[31px] leading-none font-semibold tracking-normal sm:text-[36px]">
          STYLED BY YOU
        </h2>
        <p className="mt-3 text-[14px] leading-5 text-[#666]">
          Share your looks with #PurpleElegance for a chance to be featured on
          our page.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {instagramPosts.map((post, index) => (
            <div
              key={`${post.alt}-${index}`}
              className="relative aspect-[204/161] overflow-hidden rounded-[10px] bg-[#ead0b0]"
            >
              <Image
                src={post.source}
                alt={post.alt}
                fill
                className={`object-cover ${post.position}`}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 204px"
              />
            </div>
          ))}
        </div>

        <Button className="mt-7 h-[46px] rounded-[4px] bg-[#2A0C00] px-8 text-[14px] font-semibold text-white shadow-[0_4px_8px_rgba(42,12,0,0.28)] hover:bg-[#3A1403]">
          <IconBrandInstagram size={18} stroke={1.8} />
          Follow us on Instagram
        </Button>
      </div>
    </section>
  );
}
