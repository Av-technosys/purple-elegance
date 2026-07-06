import Image from "next/image"
import React from "react"

export default function CraftSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Grayscale Image with precise drop shadow matching screenshot */}
        <div className="w-full max-w-[480px] justify-self-center lg:justify-self-start">
          <div className="relative aspect-[1.1/1] w-full bg-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <Image 
              src="/about-4.png" 
              alt="Meticulous craftsmanship under a sewing machine" 
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center grayscale contrast-[1.05]"
              priority
            />
          </div>
        </div>

        {/* Right Side: Header and Complete Multi-paragraph Layout */}
        <div className="flex flex-col text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-bold">
            CRAFTED WITH PURPOSE —
          </p>
          
          <h2 className="mt-5 text-[32px] font-bold leading-[1.2] text-black tracking-tight max-w-xl">
            Thoughtful design. Meticulous craftsmanship.
          </h2>
          
          <div className="mt-6 text-[13px] leading-[1.75] text-[#52525b] font-medium max-w-2xl space-y-5">
            <p className="text-neutral-500 font-semibold tracking-wide">
              From fabric sourcing to final stitching, every detail is carefully considered.
            </p>
            
            <p>
              From sourcing premium fabrics to perfecting every stitch, we pay attention to every detail 
              throughout the production process. Each garment is carefully crafted to deliver exceptional 
              comfort, durability, and style.
            </p>
            
            <p>
              We believe great clothing is built through thoughtful design, skilled craftsmanship, and 
              uncompromising quality standards. Every fabric, fit, and finish is intentionally chosen to create 
              pieces that not only look refined but are made to stand the test of time.
            </p>
            
            <p>
              By combining modern design with meticulous attention to detail, we create wardrobe essentials 
              that offer confidence, comfort, and lasting value with every wear.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}