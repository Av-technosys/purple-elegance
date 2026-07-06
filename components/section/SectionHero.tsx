import Image from "next/image"
import React from "react"

export default function SectionHero() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:h-[640px] flex items-center bg-black overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/contact-banner.png"
          alt="About Us Hero Background"
          fill
          priority
          className="object-cover object-center pointer-events-none"
        />
        {/* Subtle left-heavy gradient overlay to ensure readable contrast for white typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:from-black/70" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-16">
        <div className="max-w-2xl text-left">
          {/* Subtitle with matching line accent */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#d4d4d8] uppercase">
              ABOUT US
            </span>
            <span className="w-10 h-[1px] bg-[#d4d4d8]/40" />
          </div>

          {/* Impact Header with specialized condensed font properties & custom script sub-heading */}
          <h1 className="mt-5 text-[44px] sm:text-[56px] lg:text-[72px] font-extrabold uppercase tracking-tight text-white leading-[0.95] font-sans">
            We don't just<br />sell clothes.
          </h1>
          
          {/* Script accent text below heading */}
          <p className="mt-3 text-[22px] sm:text-[28px] lg:text-[34px] font-normal tracking-wide text-[#ddb28c] italic font-serif">
            We Create Confidence.
          </p>

          {/* Minimal line separator */}
          <div className="w-12 h-[1px] bg-[#d4d4d8]/20 mt-6 mb-6" />

          {/* Paragraph Description */}
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#d4d4d8] max-w-sm tracking-wide font-medium opacity-90">
            We create pieces that blend confidence, comfort, and timeless style for everyday wear.
          </p>
        </div>
      </div>
    </section>
  )
}