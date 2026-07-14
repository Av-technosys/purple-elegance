"use client"

import Image from "next/image"
import {
  IconArrowRight,
  IconFlower,
  IconHanger,
  IconLeaf,
  IconRefresh,
  IconShieldLock,
} from "@tabler/icons-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useGenderTheme } from "@/helper/useGenderTheme"

const benefits = [
  {
    title: "LIGHT & BREATHABLE",
    text: "Fabrics that keep you comfortable all day",
    icon: IconLeaf,
  },
  {
    title: "BEAUTIFUL DETAILS",
    text: "Finishes that add elegance to every piece",
    icon: IconFlower,
  },
  {
    title: "MADE FOR YOU",
    text: "Easy silhouettes that fit your every mood",
    icon: IconHanger,
  },
  {
    title: "EASY RETURNS",
    text: "Hassle-free returns within 7 days",
    icon: IconRefresh,
  },
  {
    title: "SECURE PAYMENTS",
    text: "Safe, trusted & encrypted payment options",
    icon: IconShieldLock,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
}

export default function HeroBanner() {
  const theme = useGenderTheme()

  return (
    <section className="relative overflow-hidden bg-[#f7ead8] text-[#2A0C00]">
      <div className="relative hidden aspect-[1672/941] min-h-[610px] md:block">
        <Image
          src={theme.heroBannerDesktop}
          alt="Purple Elegance everyday ethnic collection"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <HeroCopy theme={theme} className="absolute top-[18.5%] left-1/2 w-[520px] -translate-x-1/2" />
        <BenefitStrip className="absolute right-[6.6%] bottom-[3.2%] left-[6.6%]" />
      </div>

      <div className="relative block md:hidden">
        <div className="relative h-[302px]">
          <Image
            src={theme.heroBannerMobile}
            alt="Purple Elegance everyday ethnic collection"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-[#fbf2e7]" />
        </div>

        <div className="-mt-px bg-[#fbf2e7] px-6 pb-7 pt-3 text-center">
          <HeroCopy theme={theme} />
          <BenefitStrip />
        </div>
      </div>
    </section>
  )
}

function HeroCopy({ theme, className = "" }: { theme: any; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`text-center ${className}`}
    >
      <motion.p variants={itemVariants} className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.08em] text-[#5F4B35] sm:text-[12px] uppercase">
        <IconArrowRight size={14} stroke={1.4} />
        {theme.gender === "kids" ? "KIDS FESTIVE SPECIAL" : "EFFORTLESS ELEGANCE"}
        <IconArrowRight size={14} stroke={1.4} className="rotate-180" />
      </motion.p>
      <motion.span variants={itemVariants} className="mx-auto mt-3 block size-1.5 rounded-full bg-[#2A0C00]" />
      
      {theme.gender === "women" ? (
        <>
          <motion.h1 variants={itemVariants} className="mt-3 text-[38px] leading-[0.98] font-semibold tracking-[-0.025em] text-[#3A1A12] sm:text-[58px] lg:text-[76px]">
            Effortless Style,
            <br />
            <span className="text-[#A8484D]">Everyday You.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto mt-5 max-w-[360px] text-[12px] leading-5 text-[#4E3E34] sm:text-[14px] sm:leading-6">
            Thoughtfully designed prints and silhouettes that bring comfort, charm
            and confidence to every moment.
          </motion.p>
        </>
      ) : (
        <>
          <motion.h1 variants={itemVariants} className="mt-3 text-[38px] leading-[0.98] font-semibold tracking-[-0.025em] text-[#3A1A12] sm:text-[58px] lg:text-[76px] uppercase">
            {theme.heroTitle}
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto mt-5 max-w-[360px] text-[12px] leading-5 text-[#4E3E34] sm:text-[14px] sm:leading-6">
            {theme.heroSubtitle} {theme.heroDesc}
          </motion.p>
        </>
      )}

      <motion.div variants={itemVariants}>
        <Link href="product">
          <Button className="mt-7 h-[42px] w-full max-w-[230px] rounded-[3px] bg-[#A8484D] px-8 text-[11px] font-semibold tracking-[0.04em] text-white hover:bg-[#913d42] sm:h-[50px] sm:max-w-[318px] sm:text-[14px] cursor-pointer">
            SHOP NEW ARRIVALS
            <IconArrowRight size={17} stroke={1.7} />
          </Button>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="mx-auto mt-7 hidden w-[86px] items-center gap-3 text-[#b8896e] md:flex">
        <span className="h-px flex-1 bg-[#d2ad95]" />
        <span className="text-[13px] leading-none">✤</span>
        <span className="h-px flex-1 bg-[#d2ad95]" />
      </motion.div>
    </motion.div>
  )
}

function BenefitStrip({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] as const }}
      className={`mt-8 grid grid-cols-5 gap-0 rounded-none border-0 bg-transparent px-0 py-0 shadow-none backdrop-blur-none md:mt-0 md:rounded-[14px] md:border md:border-[#ead8c8] md:bg-[#fbf3e9]/78 md:px-6 md:py-5 md:shadow-[0_10px_24px_rgba(42,12,0,0.06)] md:backdrop-blur-[2px] ${className}`}
    >
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon

        return (
          <div
            key={benefit.title}
            className={[
              "flex flex-col items-center border-l border-[#ead8c8] text-center first:border-l-0 md:border-l md:border-[#d8c4b5]",
              index === 0 ? "md:border-l-0" : "",
            ].join(" ")}
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-[#B6655B] text-[#9A4A43] md:size-8 lg:size-10">
              <Icon size={18} stroke={1.4} />
            </span>
            <h2 className="mt-2 text-[7px] leading-tight font-bold text-[#3E2418] md:mt-3 md:text-[10px] lg:text-[11px]">
              {benefit.title}
            </h2>
            <p className="mt-1 max-w-[58px] text-[5px] leading-[1.45] text-[#3E2418] md:mt-2 md:max-w-[110px] md:text-[8px] lg:text-[9px]">
              {benefit.text}
            </p>
          </div>
        )
      })}
    </motion.div>
  )
}
