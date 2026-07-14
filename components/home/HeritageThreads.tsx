"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useGenderTheme } from "@/helper/useGenderTheme"

export default function HeritageThreads() {
  const theme = useGenderTheme()

  return (
    <section className="relative w-full overflow-hidden bg-[#efd7bd]">
      {/* Container aspect ratio shifts dynamically for mobile vs desktop */}
      <div className="relative w-full aspect-[3/4.2] sm:aspect-[16/9] min-h-[580px] sm:min-h-0">
        
        {/* Mobile Background Image (block sm:hidden) */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src={theme.heritageBgMobile}
            alt="Heritage ethnic wear collection mobile"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Desktop Background Image (hidden sm:block) */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src={theme.heritageBgDesktop}
            alt="Heritage ethnic wear collection"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Content Overlay - Centered vertically and horizontally */}
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
          {/* mb-28 sm:mb-0 pulls text higher up on mobile to avoid overlap and match layout */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
            className="w-full max-w-[280px] text-center sm:max-w-[460px] md:max-w-[520px] lg:max-w-[620px] mb-28 sm:mb-0"
          >
            
            {/* Top Flourish Ornament (Mobile only, centered above text) */}
            <div className="block sm:hidden mx-auto mb-3">
              <svg className="mx-auto h-5 w-24 text-[#b98568]/80" viewBox="0 0 120 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20 12h30M100 12h-30" />
                <path d="M54 12c1-2.5 3-4 6-4s5 1.5 6 4-3 4-6 4-5-1.5-6-4z" />
              </svg>
            </div>
            
            {/* Main Heading (Wraps onto 2 lines permanently on both mobile & web) */}
            <h2 className="font-heading text-[26px] font-normal leading-[1.1] text-[#8A3E25] sm:text-[36px] md:text-[44px] lg:text-[56px] tracking-tight">
              Heritage in <br />
              Every Thread,
            </h2>
            
            {/* Script Style Sub-heading (Wraps onto 2 lines on mobile only) */}
            <p className="mt-1.5 font-heading italic text-[24px] font-normal leading-none text-[#5B6349] sm:mt-2.5 sm:text-[34px] md:text-[42px] lg:text-[52px]">
              Style in <br className="sm:hidden" /> Every Step
            </p>
            
            {/* Center Flourish Divider Ornament */}
            <div className="mx-auto mt-3 sm:mt-5">
              <svg className="mx-auto h-5 w-28 text-[#b98568]/80" viewBox="0 0 120 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10 12h35M110 12h-35" />
                <path d="M50 12c2-4 6-6 10-6s8 2 10 6-6 6-10 6-8-2-10-6z" />
                <path d="M54 12c2-2 4-3 6-3s4 1 6 3-4 3-6 3-4-1-6-3z" />
              </svg>
            </div>
            
            {/* Short Description (Wraps onto exactly 3 lines on mobile) */}
            <p className="mx-auto mt-3 max-w-[220px] text-[11px] leading-relaxed text-[#8A3E25]/90 sm:mt-5 sm:max-w-[340px] sm:text-[13px] md:max-w-[380px] md:text-[14px] font-sans font-medium">
              Beautifully crafted silhouettes <br className="sm:hidden" />
              for every celebration <br className="sm:hidden" />
              and every day.
            </p>
            
            {/* Bottom Diamond Dot */}
            <div className="mx-auto mt-4 h-1 w-1 rotate-45 bg-[#8A3E25]/50 sm:h-1.5 sm:w-1.5" />
            
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}