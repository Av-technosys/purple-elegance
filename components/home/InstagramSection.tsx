"use client"

import Image from "next/image";
import { IconBrandInstagram } from "@tabler/icons-react";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[13px] leading-none text-black">@purplelegance</p>
          <h2 className="mt-3 text-[31px] leading-none font-semibold tracking-normal sm:text-[36px]">
            STYLED BY YOU
          </h2>
          <p className="mt-3 text-[14px] leading-5 text-[#666]">
            Share your looks with #PurpleElegance for a chance to be featured on
            our page.
          </p>
        </motion.div>

        {/* Swipeable container on mobile, grid layout on sm/desktop */}
        <div className="mt-7 flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 md:grid-cols-5 sm:overflow-visible sm:pb-0">
          {instagramPosts.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              key={`${post.alt}-${index}`}
              className="relative flex-shrink-0 w-[204px] sm:w-auto snap-center aspect-[204/161] overflow-hidden rounded-[10px] bg-[#ead0b0]"
            >
              <Image
                src={post.source}
                alt={post.alt}
                fill
                className={`object-cover ${post.position}`}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 204px"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button className="mt-7 h-[46px] rounded-[4px] bg-[#2A0C00] px-8 text-[14px] font-semibold text-white shadow-[0_4px_8px_rgba(42,12,0,0.28)] hover:bg-[#3A1403]">
            <IconBrandInstagram size={18} stroke={1.8} />
            Follow us on Instagram
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
