"use client"

import Image from "next/image"
import {
  IconArrowRight,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandWhatsapp,
  IconTruck,
  IconHeadset,
  IconPackage,
  IconUser,
  IconPencil,
} from "@tabler/icons-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased text-[#111111]">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#f4e9de] sm:min-h-[480px] lg:min-h-[650px]">
        <Image
          src="/contact-banner.png"
          alt="Contact Us Background Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="relative z-10 flex max-w-xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
          <div className="flex items-center gap-3 text-[#3d2e24] opacity-80">
            <span className="text-xs font-light">➔</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.25em]">
              We're Here To Help
            </span>
            <span className="text-xs font-light">✦</span>
          </div>

          <div className="mt-3 mb-1 h-[5px] w-[5px] rounded-full bg-[#3d2e24]" />

          <h1 className="font-heading text-[3rem] leading-[0.95] tracking-[0.01em] text-[#231a16] sm:text-[4rem] md:text-[5rem]">
            Contact <span className="font-normal italic text-[#844b4b]">Us</span>
          </h1>

          <div className="my-2 text-xs tracking-[0.35em] text-[#3d2e24] opacity-50">
            ❖
          </div>

          <p className="max-w-md text-sm leading-7 text-[#4a3b32] sm:text-[0.95rem]">
            Have a question or need assistance? <br />
            We'd love to hear from you.
          </p>

          <button className="mt-8 flex items-center gap-2 rounded-sm bg-[#7a4444] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-md transition duration-200 hover:bg-[#633535]">
            Get In Touch
            <IconArrowRight size={14} stroke={2.5} />
          </button>

          <div className="mt-4 text-xs tracking-[0.35em] text-[#3d2e24] opacity-40">
            ❖
          </div>
        </div>
      </section>

      {/* SECTION 2: LET'S TALK & CONTACT METHODS (Responsive 4-column layout) */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:px-8 md:pb-16 md:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 gap-y-8 md:gap-y-0">
          {/* Column 1: Let's Talk */}
          <div className="pb-6 md:pb-0 md:pr-6 text-left">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b98568]">
              GET IN TOUCH
            </span>
            <h2 className="font-heading text-[1.75rem] leading-tight text-black sm:text-[2.1rem] md:text-[2.4rem]">
              Let's Talk
            </h2>
            {/* Small decorative line under Let's Talk */}
            <span className="mt-2 mb-4 block h-[2px] w-[36px] bg-[#2A0C00]" />
            <p className="text-xs leading-6 text-gray-500 max-w-xs">
              Whether you have a question about our products, orders, or anything else — our team is ready to help you.
            </p>
          </div>

          {/* Column 2: Email */}
          <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-6">
            <div className="w-12 h-12 bg-[#2A0C00] rounded-full flex items-center justify-center text-white mb-3">
              <IconMail size={20} stroke={1.5} />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-black mb-1">
              EMAIL US
            </span>
            <a href="mailto:hello@purpleelegance.com" className="text-xs font-bold text-gray-800 underline break-all">
              hello@purpleelegance.com
            </a>
            <span className="text-[11px] text-gray-400 mt-1">We reply within 24 hours</span>
          </div>

          {/* Column 3: Telefoon */}
          <div className="flex flex-col items-center text-center py-6 md:py-0 md:px-6">
            <div className="w-12 h-12 bg-[#2A0C00] rounded-full flex items-center justify-center text-white mb-3">
              <IconPhone size={20} stroke={1.5} />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-black mb-1">
              CALL US
            </span>
            <a href="tel:+919876543210" className="text-xs font-bold text-gray-800">
              +91 98765 43210
            </a>
            <span className="text-[11px] text-gray-400 mt-1">Mon - Sat | 10AM - 7PM</span>
          </div>

          {/* Column 4: Adres */}
          <div className="flex flex-col items-center text-center pt-6 md:pt-0 md:pl-6">
            <div className="w-12 h-12 bg-[#2A0C00] rounded-full flex items-center justify-center text-white mb-3">
              <IconMapPin size={20} stroke={1.5} />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-black mb-1">
              VISIT US
            </span>
            <p className="text-xs font-bold text-gray-800 leading-tight max-w-[180px]">
              123 Purple Elegance Lane, Mumbai, Maharashtra 400001, India
            </p>
            <span className="text-[11px] text-gray-400 mt-1">Mon - Sat | 10AM - 7PM</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORM, MAP & WHATSAPP */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8 md:py-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Left Form Card */}
          <div className="rounded-md border border-gray-100 bg-[#fcfcff] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] md:p-8">
            <h3 className="mb-6 font-heading text-[1.25rem] font-semibold tracking-tight text-black">
              Send Us A Message
            </h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name with inline Icon */}
                <div className="relative flex items-center w-full">
                  <IconUser size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-[#f4f5f8] text-xs pl-10 pr-4 py-3.5 rounded-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
                  />
                </div>
                {/* Email with inline Icon */}
                <div className="relative flex items-center w-full">
                  <IconMail size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-[#f4f5f8] text-xs pl-10 pr-4 py-3.5 rounded-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Phone with inline Icon */}
              <div className="relative flex items-center w-full">
                <IconPhone size={16} className="absolute left-4 text-gray-400 pointer-events-none" />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full bg-[#f4f5f8] text-xs pl-10 pr-4 py-3.5 rounded-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
                />
              </div>

              {/* Subject Select */}
              <div className="relative">
                <select className="w-full bg-[#f4f5f8] text-xs px-4 py-3.5 rounded-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-400 appearance-none">
                  <option>Subject</option>
                  <option>Order inquiry</option>
                  <option>Shipping question</option>
                  <option>Returns & exchange</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

              {/* Message text area with inline Icon */}
              <div className="relative flex items-start w-full">
                <IconPencil size={16} className="absolute left-4 top-[14px] text-gray-400 pointer-events-none" />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-[#f4f5f8] text-xs pl-10 pr-4 py-3.5 rounded-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400 resize-none"
                />
              </div>

              <button className="bg-[#2A0C00] hover:bg-[#1f0900] text-white text-xs font-semibold tracking-widest uppercase py-3.5 px-6 rounded-sm flex items-center gap-2 transition duration-150">
                Send Message ➔
              </button>
            </form>
          </div>

          {/* Right Map Card & WhatsApp */}
          <div className="space-y-4">
            {/* Google Maps Embed container with overlay address bar */}
            <div className="relative w-full h-[320px] rounded-md overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.8058296996655!2d72.8231!3d18.9389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e7e5555555%3A0x86842e47c1f83c7b!2sMumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Google Maps address overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-[#2A0C00]/95 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <IconMapPin size={16} className="text-white mt-0.5 shrink-0" />
                  <p className="text-[11px] font-medium tracking-wide text-gray-200 leading-snug">
                    123 Purple Elegance Lane, Mumbai, Maharashtra 400001, India
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold tracking-wider uppercase border-b border-white pb-0.5 whitespace-nowrap hover:text-gray-300 hover:border-gray-300 transition shrink-0"
                >
                  VIEW ON GOOGLE MAPS ➔
                </a>
              </div>
            </div>

            {/* WhatsApp Block */}
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#d1fae5] rounded-md p-4 flex items-center justify-between transition duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center text-white">
                  <IconBrandWhatsapp size={22} fill="currentColor" stroke={1} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black">Chat on WhatsApp</h4>
                  <p className="text-[11px] text-gray-500">Get instant support via WhatsApp</p>
                </div>
              </div>
              <IconArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition duration-150" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 4: FOOTER BENEFITS (White badge icons) */}
      <footer className="mt-16 w-full bg-black text-white sm:mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-6 divide-y divide-gray-800 md:grid-cols-3 md:gap-4 md:divide-y-0 md:divide-x">
            
            {/* Free Shipping */}
            <div className="flex items-center justify-center gap-4 pb-4 md:pb-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <IconTruck size={24} stroke={1.5} />
              </div>
              <div className="text-left">
                <h5 className="text-sm font-bold uppercase tracking-wider">Free Shipping</h5>
                <p className="text-[11px] text-gray-400 mt-0.5">on orders above ₹999</p>
              </div>        
            </div>

            {/* Customer Support */}
            <div className="flex items-center justify-center gap-4 py-4 md:py-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <IconHeadset size={24} stroke={1.5} />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold uppercase tracking-wider">24 X 7 Customer Support</h5>
                <p className="text-[11px] text-gray-400 mt-0.5">Get instant help anytime</p>
              </div>
            </div>

            {/* Returns */}
            <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <IconPackage size={24} stroke={1.5} />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold uppercase tracking-wider">15-Days Returns</h5>
                <p className="text-[11px] text-gray-400 mt-0.5">Easy exchanges, no questions</p>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </main>
  )
}