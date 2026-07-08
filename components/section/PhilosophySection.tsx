"use client"

import React from "react"
import { IconPalette, IconCrown, IconFeather } from "@tabler/icons-react"
import { motion } from "framer-motion"

const items = [
  { 
    title: "Design", 
    desc: "Minimal. Timeless. Intentional.",
    icon: IconPalette
  },
  { 
    title: "Quality", 
    desc: "Premium fabrics built for everyday wear.",
    icon: IconCrown
  },
  { 
    title: "Comfort", 
    desc: "Fashion that moves with your lifestyle.",
    icon: IconFeather
  },
]

export default function PhilosophySection() {
  return (
    <section className="bg-[#2A0C00] text-[#fff2df] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#fff2df]/60 text-center"
        >
          Our Philosophy
        </motion.p>
        
        <div className="mt-12 grid grid-cols-1 gap-12 sm:gap-10 md:grid-cols-3">
          {items.map((it, index) => {
            const Icon = it.icon

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] as const }}
                key={it.title} 
                className="text-center group"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#fff2df]/20 bg-[#fff2df]/5 text-[#fff2df] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} stroke={1.5} />
                </div>
                <h3 className="mt-6 text-[18px] sm:text-[21px] font-semibold tracking-wide font-heading">
                  {it.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed max-w-xs mx-auto text-[#fff2df]/80">
                  {it.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
