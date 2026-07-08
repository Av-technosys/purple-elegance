import Image from "next/image"
import React from "react"

export default function StorySection() {
  return (
    <section className="w-full bg-white">
      {/* 2-Column Split Layout spanning perfectly left-to-right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[500px]">
        
        {/* Left Side: Content Wrapper with exact responsive padding and paragraph spacing */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 lg:px-24 max-w-2xl justify-self-end w-full">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#71717a] font-bold">
            OUR STORY
          </p>
          
          <h2 className="mt-5 text-[32px] font-bold leading-[1.25] text-black tracking-tight">
            Built on passion. Driven by<br className="hidden sm:inline" /> purpose.
          </h2>
          
          <div className="mt-6 text-[13px] leading-[1.75] text-[#52525b] font-medium space-y-5">
            <p>
              Purple Elegance started with a simple idea — fashion should feel premium 
              without being complicated.
            </p>
            
            <p>
              We noticed that modern wardrobes were filled with trends that lasted a season 
              but rarely stood the test of time.
            </p>
            
            <p className="pt-2">
              Our goal became clear:
            </p>
            
            <p>
              Create elevated essentials that combine comfort, quality, and effortless style 
              for everyday life.
            </p>
            
            <p>
              Every collection is designed to help you look confident, feel comfortable, and 
              express yourself without compromise.
            </p>
          </div>
        </div>

        {/* Right Side: Completely flat, square-edge full bleed image with grayscale applied */}
        <div className="relative w-full h-[400px] lg:h-auto min-h-[450px]">
          <Image 
            src="/about-2.png" 
            alt="Man looking back out over concrete structure" 
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center grayscale contrast-[1.05]"
            priority
          />
        </div>

      </div>
    </section>
  )
}