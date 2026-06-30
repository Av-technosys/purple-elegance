"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const collections = [
  {
    title: "Festive Collection",
    description: "Celebrate in style with prints that speak elegance",
    image: "/sample-product.png",
    position: "object-[center_34%]",
  },
  {
    title: "Co-ord Sets",
    description: "Celebrate in style with prints that speak elegance",
    image: "/sample-product.png",
    position: "object-[center_18%]",
  },
  {
    title: "Floral Anarkali",
    description: "Celebrate in style with prints that speak elegance",
    image: "/sample-product.png",
    position: "object-[center_28%]",
    featured: true,
  },
  {
    title: "Embroidered Suit",
    description: "Celebrate in style with prints that speak elegance",
    image: "/sample-product.png",
    position: "object-[center_42%]",
  },
  {
    title: "Everyday Elegance",
    description: "Celebrate in style with prints that speak elegance",
    image: "/sample-product.png",
    position: "object-[center_55%]",
  },
];

const getWrappedOffset = (index: number, activeIndex: number) => {
  const count = collections.length;
  const rawOffset = (index - activeIndex + count) % count;

  return rawOffset > Math.floor(count / 2) ? rawOffset - count : rawOffset;
};

export default function FeaturedCollection() {
  const [activeIndex, setActiveIndex] = useState(2);

  const move = (direction: "next" | "previous") => {
    setActiveIndex((current) => {
      if (direction === "next") {
        return (current + 1) % collections.length;
      }

      return (current - 1 + collections.length) % collections.length;
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#faead4] py-16 sm:py-20 lg:py-[70px]">
      <Image
        src="/featured-collection.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-[1220px] px-5">
        <div className="text-center">
          <h2 className="text-[32px] leading-none font-semibold text-black sm:text-[38px]">
            Featured Collection
          </h2>
          <p className="mt-3 text-[14px] text-[#5B5148]">
            Discover our most-loved pieces, crafted for every occasion.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-9 lg:mt-8">
          <Button
            type="button"
            aria-label="Previous collection"
            onClick={() => move("previous")}
            className="absolute top-1/2 left-0 z-20 size-12 -translate-y-1/2 rounded-full bg-[#e4c9a8] p-0 text-[#2A0C00] shadow-[0_5px_12px_rgba(42,12,0,0.18)] hover:bg-[#dabb95] sm:left-2"
          >
            <IconArrowLeft size={22} stroke={1.8} />
          </Button>

          <div className="relative mx-auto h-[360px] max-w-[1040px] overflow-hidden sm:h-[438px]">
            {collections.map((collection, index) => {
              const offset = getWrappedOffset(index, activeIndex);
              const isActive = offset === 0;
              const isInnerCard = Math.abs(offset) === 1;
              const xPositionByOffset = {
                "-2": "-470px",
                "-1": "-285px",
                "0": "0px",
                "1": "285px",
                "2": "470px",
              }[String(offset)];
              const mobileXPositionByOffset = {
                "-2": "-360px",
                "-1": "-208px",
                "0": "0px",
                "1": "208px",
                "2": "360px",
              }[String(offset)];

              return (
                <article
                  key={collection.title}
                  className={[
                    "absolute top-1/2 left-1/2 overflow-hidden rounded-[8px] bg-[#cda985] shadow-[0_9px_18px_rgba(42,12,0,0.34)] transition-[height,width,transform,opacity] duration-500 ease-out [transform:translate(calc(-50%+var(--card-x-mobile)),-50%)] sm:[transform:translate(calc(-50%+var(--card-x)),-50%)]",
                    isActive
                      ? "z-10 h-[330px] w-[245px] sm:h-[438px] sm:w-[352px]"
                      : isInnerCard
                        ? "z-5 h-[286px] w-[156px] sm:h-[350px] sm:w-[194px]"
                        : "z-0 h-[252px] w-[138px] sm:h-[310px] sm:w-[150px]",
                  ].join(" ")}
                  style={
                    {
                      "--card-x": xPositionByOffset,
                      "--card-x-mobile": mobileXPositionByOffset,
                    } as CSSProperties
                  }
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className={`object-cover ${collection.position}`}
                    sizes={
                      isActive
                        ? "(max-width: 640px) 245px, 352px"
                        : "(max-width: 640px) 150px, 194px"
                    }
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/12 to-transparent" />

                  <div
                    className={[
                      "absolute inset-x-0 bottom-0 text-center text-white",
                      isActive ? "px-8 pb-7" : "px-4 pb-7",
                    ].join(" ")}
                  >
                    <h3
                      className={
                        isActive
                          ? "text-[28px] leading-none font-semibold"
                          : "text-[14px] leading-tight font-semibold"
                      }
                    >
                      {collection.title}
                    </h3>
                    <p
                      className={
                        isActive
                          ? "mx-auto mt-2 max-w-[210px] text-[10px] leading-4 text-white/85"
                          : "mx-auto mt-1 max-w-[125px] text-[6px] leading-3 text-white/70"
                      }
                    >
                      {collection.description}
                    </p>

                    {isActive ? (
                      <Button className="mt-7 h-[42px] rounded-[4px] bg-[#fff2df] px-7 text-[10px] font-semibold text-[#2A0C00] hover:bg-white">
                        EXPLORE COLLECTION
                        <IconArrowRight size={14} stroke={1.8} />
                      </Button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <Button
            type="button"
            aria-label="Next collection"
            onClick={() => move("next")}
            className="absolute top-1/2 right-0 z-20 size-12 -translate-y-1/2 rounded-full bg-[#e4c9a8] p-0 text-[#2A0C00] shadow-[0_5px_12px_rgba(42,12,0,0.18)] hover:bg-[#dabb95] sm:right-2"
          >
            <IconArrowRight size={22} stroke={1.8} />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {collections.map((collection, index) => (
            <button
              key={collection.title}
              type="button"
              aria-label={`Show ${collection.title}`}
              onClick={() => setActiveIndex(index)}
              className={[
                "size-2.5 rounded-full transition-colors",
                index === activeIndex ? "bg-[#2A0C00]" : "bg-[#b9b9b9]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
