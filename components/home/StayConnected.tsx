"use client"

import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconMailFilled,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useGenderTheme } from "@/helper/useGenderTheme";

const socialLinks = [
  {
    label: "Instagram",
    icon: IconBrandInstagram,
  },
  {
    label: "Facebook",
    icon: IconBrandFacebook,
  },
  {
    label: "Email",
    icon: IconMailFilled,
  },
  {
    label: "X",
    icon: IconBrandX,
  },
];

export default function StayConnected() {
  const theme = useGenderTheme()

  return (
    <section className="relative min-h-[780px] sm:min-h-[340px] lg:min-h-[360px] overflow-hidden bg-[#f7eadb] px-5 py-12 text-center text-[#2A0C00] sm:py-12">
      <div className="block sm:hidden absolute inset-0">
        <Image
          src={theme.stayConnectedBgMobile || theme.stayConnectedBg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="hidden sm:block absolute inset-0">
        <Image
          src={theme.stayConnectedBg}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>
      
      <div className="absolute inset-0 bg-white/10 md:bg-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative mx-auto flex max-w-[520px] flex-col items-center pt-[300px] sm:pt-0"
      >
        {/* Logo */}
        <Image
          src="/main-logo.png"
          alt="Purple Elegance"
          width={284}
          height={190}
          className="h-auto w-[248px] object-contain sm:w-[282px]"
        />

        <div className="my-2 opacity-80 sm:hidden">
          <span className="text-[#7F5240] text-xs tracking-widest">♦ ⚜ ♦</span>
        </div>

        <h2 className="mt-2 sm:-mt-3 max-w-[360px] text-[20px] sm:text-[18px] leading-[1.35] font-semibold tracking-[0.18em] text-[#5C3A21] sm:text-[#7F5240]">
          WEAR CONFIDENCE. <br className="sm:hidden" /> WEAR PURPLE ELEGANCE
        </h2>
        
        <p className="mt-4 max-w-[320px] sm:max-w-[385px] text-[13px] leading-5 text-[#6b5b51]">
          Contemporary fashion crafted for those who appreciate style, quantity
          &amp; timeless elegance.
        </p>

        <h3 className="mt-8 sm:mt-4 text-[14px] sm:text-[17px] leading-none font-medium sm:font-semibold tracking-[0.2em] text-[#7F5240]">
          STAY CONNECTED FOR UPDATES
        </h3>

        <form className="mt-5 flex h-[46px] sm:h-[39px] w-full max-w-[396px] overflow-hidden rounded-[8px] bg-[#e1cbb5]/80 sm:bg-[#efd7b7] p-1">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-[#2A0C00] outline-none placeholder:text-[#8b6d59]"
          />
          <Button className="h-full rounded-[6px] bg-[#220c04] px-6 text-[13px] font-normal text-white hover:bg-[#3A1403]">
            Submit
          </Button>
        </form>

        <div className="mt-8 sm:mt-7 flex items-center justify-center gap-5">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                className="flex size-11 sm:size-10 items-center justify-center rounded-full border border-[#5C3A21]/40 sm:border-[#2A0C00] bg-transparent text-[#2A0C00] transition-colors hover:bg-white/25"
              >
                <Icon size={18} stroke={1.5} />
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}