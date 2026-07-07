"use client"

import React from "react"
import { motion } from "framer-motion"

const stats = [
  { value: "50,000+", label: "HAPPY CUSTOMERS" },
  { value: "100+", label: "PREMIUM STYLES" },
  { value: "15+", label: "CITIES SERVED" },
  { value: "4.8★", label: "CUSTOMER RATING" },
]

export default function StatsSection() {
  return (
    <section className="bg-[#2A0C00] text-[#fff2df] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {stats.map((s, index) => {
            // Precise cross-hair layout on mobile (2x2) and vertical borders on desktop (1x4)
            const borderClass = {
              0: "border-r border-b md:border-b-0 border-[#fff2df]/15",
              1: "border-b md:border-b-0 md:border-r border-[#fff2df]/15",
              2: "border-r border-[#fff2df]/15",
              3: "",
            }[index] || ""

            return (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center text-center py-6 px-4 ${borderClass}`}
              >
                <div className="text-[28px] sm:text-[36px] font-semibold tracking-tight font-heading">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] sm:text-[11px] font-medium tracking-[0.18em] text-[#fff2df]/80 uppercase">
                  {s.label}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
