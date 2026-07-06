"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function MadeForYou() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5e8d8]">
      {/* Container aspect ratio dynamically shifted for mobile vs desktop */}
      <div className="relative w-full min-h-[720px] sm:min-h-0 sm:aspect-[16/9]">
        
        {/* Mobile Background Image (As per attached layout mockup) */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src="/madefor-mobile.png"
            alt="Rooted in tradition collection mobile"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>

        {/* Desktop Background Image (Web remains completely untouched) */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src="/madefor.png"
            alt="Rooted in tradition collection"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        
        {/* Light overlay */}
        <div className="absolute inset-0 bg-white/5 md:bg-transparent" />

        {/* Dynamic Content Wrapper */}
        <div className="absolute inset-0 mx-auto max-w-[1340px] p-6 sm:p-6 md:p-8">
          
          {/* Layout Content Alignment */}
          {/* Mobile par top-left text alignment diya hai taaki image features hide na hon */}
          <div className="flex h-full w-full items-start justify-start sm:items-center sm:justify-center md:justify-start">
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
              className="w-full max-w-[240px] text-left mt-4 sm:mt-0 sm:text-center sm:max-w-[400px] md:ml-[45%] md:max-w-[460px] lg:max-w-[520px]"
            >
              
              {/* Heading */}
              <h2 className="font-serif text-[26px] font-semibold leading-[1.1] tracking-tight text-[#8A3E25] sm:text-[36px] md:text-[46px] lg:text-[58px]">
                ROOTED IN
                <br />
                TRADITION,
              </h2>
              
              {/* Script Subheading */}
              <p className="mt-1 font-serif text-[26px] font-normal leading-none text-[#747960] italic sm:mt-2 sm:text-[34px] md:text-[44px] lg:text-[56px]">
                Made for You
              </p>

              {/* Decorative Top Divider (Mobile view par flex-start aur left-aligned layout) */}
              <div className="mr-auto ml-0 sm:mx-auto mt-4 flex w-[80px] items-center gap-2 text-[#b98568] sm:mt-5 sm:w-[150px]">
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
                <span className="text-[10px] sm:text-[14px]">✥</span>
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
              </div>
              
              {/* Sub-text */}
              <p className="mt-3 text-[9px] font-bold tracking-[0.12em] text-[#8A3E25] sm:mt-5 sm:text-[11px] md:text-[12px]">
                HANDPICKED STYLES FOR EVERY YOU
              </p>
              
              {/* Decorative Bottom Divider */}
              <div className="mr-auto ml-0 sm:mx-auto mt-3 flex w-[80px] items-center gap-2 text-[#b98568] sm:mt-5 sm:w-[150px]">
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
                <span className="text-[10px] sm:text-[14px]">✥</span>
                <span className="h-[1px] flex-1 bg-[#c79c78]/60" />
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}