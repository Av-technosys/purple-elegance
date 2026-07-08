"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  IconArrowRight,
  IconFlower,
  IconRefresh,
  IconShieldLock,
  IconTruckDelivery,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"

const collections = [
  {
    title: "WEDDING EDIT",
    image: "/collection-1.png",
    className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]",
  },
  {
    title: "FESTIVE COLLECTION",
    image: "/collection-2.png",
    className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]",
  },
  {
    title: "PARTY WEAR",
    image: "/collection-3.png",
    className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]",
  },
  {
    title: "EVERYDAY WEAR",
    image: "/collection-4.png",
    className: "col-span-1 row-span-2 md:col-span-2 md:row-span-1 min-h-[334px] sm:min-h-[514px] md:min-h-[250px]",
  },
  {
    title: "SUMMER COLLECTION",
    image: "/collection-5.png",
    className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]",
  },
]

const benefits = [
  {
    title: "FREE SHIPPING",
    text: "On orders above ₹999",
    icon: IconTruckDelivery,
  },
  {
    title: "EASY RETURNS",
    text: "15-days return policy",
    icon: IconRefresh,
  },
  {
    title: "PREMIUM FABRICS",
    text: "Quality you can feel",
    icon: IconFlower,
  },
  {
    title: "SECURE PAYMENTS",
    text: "100% safe & trusted",
    icon: IconShieldLock,
  },
]

export default function ExploreCollection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (index: number) => {
    if (index < 0 || index >= benefits.length) return
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const children = Array.from(container.children) as HTMLElement[]
      const targetChild = children[index]
      if (targetChild) {
        const containerLeft = container.getBoundingClientRect().left
        const childLeft = targetChild.getBoundingClientRect().left
        const targetScrollLeft = childLeft - containerLeft + container.scrollLeft
        
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        })
        setActiveIndex(index)
      }
    }
  }

  const handleScrollState = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const containerLeft = container.getBoundingClientRect().left
      const children = Array.from(container.children) as HTMLElement[]
      
      let closestIndex = 0
      let minDistance = Infinity
      
      children.forEach((child, index) => {
        const childLeft = child.getBoundingClientRect().left
        const distance = Math.abs(childLeft - containerLeft)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })
      
      if (activeIndex !== closestIndex) {
        setActiveIndex(closestIndex)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#f8ecd8] px-5 py-9 text-[#2A0C00] sm:py-12 lg:py-[28px]">
      <Image
        src="/explore-collection.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-[1088px]">
        {/* Title Block with custom Lotus Flower logo */}
        <div className="text-center flex flex-col items-center">
          <svg
            className="h-7 w-7 text-[#7F5240] mb-3 opacity-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21c-2-2.5-5-5-5-8.5C7 9.5 9 8 12 8s5 1.5 5 4.5c0 3.5-3 6-5 8.5z" />
            <path d="M12 21c-1.5-3-3-6-3-8.5C9 10 10.5 9 12 9s3 1 3 3.5c0 2.5-1.5 5.5-3 8.5z" />
            <path d="M12 21c-3-2-6-4.5-6-7.5 0-2.5 1.5-4 4-4s3.5 1 4 3c.5-2 1.5-3 4-3s4 1.5 4 4c0 3-3 5.5-6 7.5z" />
          </svg>
          <p className="text-[11px] sm:text-[13px] font-semibold tracking-[0.14em] text-[#7F5240]">
            EXPLORE • OUR • COLLECTION
          </p>
          <h2 className="mt-2 text-[26px] leading-tight font-semibold text-[#2A0C00] sm:text-[38px] font-heading">
            Timeless Ethnic Styles, For Every You
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] text-[#7F5240] font-medium">
            Discover our most-loved pieces, crafted for every occasion.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="mt-7 grid grid-cols-2 gap-[14px] md:grid-cols-6">
          {collections.map((collection, index) => (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] as const }}
              key={collection.title}
              className={`group relative overflow-hidden rounded-[9px] bg-[#6f4b32] shadow-[0_8px_18px_rgba(42,12,0,0.18)] ${collection.className}`}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/22 to-transparent" />
              <div className="absolute top-1/2 left-6 max-w-[215px] -translate-y-1/2 text-white sm:left-7">
                <h3 className="text-[22px] leading-[1.05] font-semibold sm:text-[31px] font-heading">
                  {collection.title}
                </h3>
                <p className="mt-3 max-w-[180px] text-[12px] sm:text-[13px] leading-5 text-white/95">
                  Crafted for your most precious moments.
                </p>
                <Link
                  href="/product"
                  className="mt-4 inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-white hover:underline font-medium"
                >
                  Explore
                  <IconArrowRight size={14} stroke={2} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Benefits Carousel Bar */}
        <div className="mx-auto mt-7 max-w-[1030px]">
          <div className="relative">
            {/* Left Arrow (Mobile only) */}
            <button
              type="button"
              onClick={() => handleScroll(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-[-10px] sm:left-[-16px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#d6c2ab] bg-[#f4e7d6] text-[#7F5240] hover:bg-[#ebdcc7] transition shadow-sm disabled:opacity-20 disabled:cursor-not-allowed md:hidden"
              aria-label="Previous Benefit"
            >
              <IconChevronLeft size={16} stroke={2.5} />
            </button>

            {/* Swipe/Scroll Container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScrollState}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-[2px] bg-[#f4e7d6]/95 shadow-[0_10px_25px_rgba(42,12,0,0.08)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon

                return (
                  <div
                    key={benefit.title}
                    className={`w-full shrink-0 snap-center flex items-center gap-4 px-9 py-5.5 text-left md:w-auto md:justify-start ${
                      index !== 0 ? "border-[#d6c2ab] md:border-l" : ""
                    }`}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#7F5240] text-[#7F5240]">
                      <Icon size={24} stroke={1.5} />
                    </span>
                    <span>
                      <span className="block text-[12px] font-bold tracking-wide text-[#7F5240]">
                        {benefit.title}
                      </span>
                      <span className="mt-1 block text-[10px] text-[#5f5047]">
                        {benefit.text}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Right Arrow (Mobile only) */}
            <button
              type="button"
              onClick={() => handleScroll(activeIndex + 1)}
              disabled={activeIndex === benefits.length - 1}
              className="absolute right-[-10px] sm:right-[-16px] top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#d6c2ab] bg-[#f4e7d6] text-[#7F5240] hover:bg-[#ebdcc7] transition shadow-sm disabled:opacity-20 disabled:cursor-not-allowed md:hidden"
              aria-label="Next Benefit"
            >
              <IconChevronRight size={16} stroke={2.5} />
            </button>
          </div>

          {/* Indicators Dots (Mobile only) */}
          <div className="mt-4 flex justify-center gap-1.5 md:hidden">
            {benefits.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleScroll(index)}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  activeIndex === index ? "bg-[#7F5240]" : "bg-[#c5b5a2]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
