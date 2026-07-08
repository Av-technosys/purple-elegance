import Image from "next/image"
import React from "react"

const members = [
  { 
    title: "DESIGN TEAM", 
    img: "/about-3.png", 
    desc: "Focused on creating timeless designs that define style." 
  },
  { 
    title: "PRODUCT TEAM", 
    img: "/about-3.png", 
    desc: "Ensuring the best quality in every single piece." 
  },
  { 
    title: "CUSTOMER EXPERIENCE TEAM", 
    img: "/about-3.png", 
    desc: "Here to support you at every step of the way." 
  },
]

export default function TeamSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12 py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2.9fr] gap-12 lg:gap-8 items-start">
        
        {/* Left Side Header Text */}
        <div className="max-w-xs">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-semibold whitespace-nowrap">
            THE PEOPLE BEHIND THE BRAND —
          </p>
          <h2 className="mt-5 text-[32px] font-bold leading-[1.15] text-black tracking-tight">
            Passionate Minds,<br />Creative Hearts.
          </h2>
          <p className="mt-6 text-[13px] leading-relaxed text-[#52525b]">
            Behind every collection is a passionate team of designers, creators, and fashion enthusiasts working to bring timeless style to your wardrobe.
          </p>
        </div>

        {/* Right Side Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((m, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container with precise aspect-ratio and grayscale filtering */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image 
                  src={m.img} 
                  alt={m.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center grayscale contrast-[1.05]"
                  priority
                />
              </div>
              
              {/* Card Meta Content */}
              <h4 className="mt-5 text-[13px] font-bold tracking-wide text-black uppercase">
                {m.title}
              </h4>
              <p className="mt-3 text-[12px] leading-relaxed text-[#71717a] max-w-[240px]">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}