"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqSections = [
  {
    category: "General",
    items: [
      {
        question: "What is your customer support email?",
        answer:
          "You can reach our support team at hello@purpleelegance.com. We aim to respond within 24 hours on business days.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, we will send you a tracking link by email so you can follow its delivery in real time.",
      },
      {
        question: "Do you ship across India?",
        answer:
          "Yes, we deliver across India with reliable carriers and provide tracking details for every shipment.",
      },
      {
        question: "How can I create an account?",
        answer:
          "Tap Register in the navigation, enter your details, and you'll have access to faster checkout and order history.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "You can email us, call +91 98765 43210, or chat with us on WhatsApp for quick assistance.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery usually takes 4-7 business days depending on your location and product availability.",
      },
      {
        question: "What are the shipping charges?",
        answer:
          "Shipping is free on orders above ₹999. For smaller orders, standard shipping rates apply at checkout.",
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer:
          "If your order has not shipped yet, we can update the address. Please contact support as soon as possible.",
      },
      {
        question: "Do you offer express delivery?",
        answer:
          "Express delivery is available for select products and locations. Check the shipping options during checkout.",
      },
      {
        question: "What happens if my order is delayed?",
        answer:
          "If there is a delay, we will notify you with an updated timeline and support you until the order arrives.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 15 days of delivery for eligible items in original condition with tags attached.",
      },
      {
        question: "How do I request an exchange?",
        answer:
          "Simply contact our support team with your order number and preferred exchange item or size.",
      },
      {
        question: "How long does the return process take?",
        answer:
          "Refunds are usually processed within 5-7 business days after the returned item is received.",
      },
      {
        question: "Can I return a product purchased during a sale?",
        answer:
          "Yes, sale items are eligible for return or exchange as long as they meet our policy conditions.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Refunds are issued after quality inspection and typically appear in your account within 5-7 business days.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    items: [
      {
        question: "How do I choose the right size?",
        answer:
          "Refer to our size chart on each product page and compare measurements to your own for the best fit.",
      },
      {
        question: "What if the kurti feels loose or tight?",
        answer:
          "We recommend exchanging for a different size and our team can advise on the best option for your body type.",
      },
    ],
  },
  {
    category: "Product & Fabric Care",
    items: [
      {
        question: "How should I care for my kurti?",
        answer:
          "Wash gently by hand or on a delicate cycle, avoid harsh detergents, and air dry to preserve the fabric.",
      },
      {
        question: "Are your fabrics suitable for everyday wear?",
        answer:
          "Yes, our collections are designed with breathable, comfortable fabrics meant for everyday styling.",
      },
      {
        question: "Do you offer styling recommendations?",
        answer:
          "Absolutely. Contact our team for suggestions on matching pieces, accessories, and outfit combinations.",
      },
    ],
  },
  {
    category: "Payments & Offers",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, UPI, and net banking for secure online checkout.",
      },
      {
        question: "Can I use promo codes on sale items?",
        answer:
          "Promo codes may be applied to select products. Please refer to the offer terms at checkout.",
      },
    ],
  },
]

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("General")
  // Tracks open accordion indexes using key structure: "Category-Index"
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleAccordion = (itemKey: string) => {
    setOpenItems((prev) =>
      prev.includes(itemKey) ? prev.filter((key) => key !== itemKey) : [...prev, itemKey]
    )
  }

  const scrollToCategory = (category: string) => {
    setActiveCategory(category)
    const element = document.getElementById(category.replace(/\s+/g, "-").toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="bg-white min-h-screen font-sans antialiased text-[#111111] pb-24 selection:bg-transparent">
      {/* HEADER SECTION */}
      <header className="pt-24 sm:pt-28 pb-10 text-center border-b border-gray-100 px-4">
        <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl leading-tight select-none">
          Frequently Asked Question
        </h1>
        <p className="mt-3 text-xs text-gray-500 tracking-wide font-medium select-none">
          Effective Date: October 2, 2024
        </p>
      </header>

      {/* CATEGORY NAV BAR */}
      <div className="w-full border-b border-gray-50">
        <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x">
          {faqSections.map((section) => {
            const isSelected = activeCategory === section.category
            return (
              <button
                key={section.category}
                onClick={() => scrollToCategory(section.category)}
                className={`px-5 py-2 text-[12px] font-semibold tracking-wide rounded-full border transition duration-150 whitespace-nowrap snap-ml-4 outline-none ring-0 focus:outline-none ${
                  isSelected
                    ? "bg-[#04112e] text-white border-[#04112e]"
                    : "bg-white text-gray-800 border-gray-300 hover:border-black"
                }`}
              >
                {section.category}
              </button>
            )
          })}
        </nav>
      </div>

      {/* ACCORDION LIST */}
      <section className="max-w-4xl mx-auto px-6 mt-12 space-y-16">
        {faqSections.map((section) => (
          <div
            key={section.category}
            id={section.category.replace(/\s+/g, "-").toLowerCase()}
            className="scroll-mt-6"
          >
            {/* Centered Category Title */}
            <h2 className="text-center text-sm font-extrabold tracking-[0.18em] uppercase text-[#04112e] mb-6 select-none">
              {section.category}
            </h2>

            <div className="w-full border-t border-gray-200">
              {section.items.map((item, index) => {
                const itemKey = `${section.category}-${index}`
                const isOpen = openItems.includes(itemKey)

                return (
                  <div
                    key={itemKey}
                    className="border-b border-gray-200 py-1.5 transition-all duration-150"
                  >
                    {/* CUSTOM TRIGGER BUTTON - Completely free of Shadcn/Radix wrappers */}
                    <button
                      onClick={() => toggleAccordion(itemKey)}
                      className="w-full flex items-center justify-between text-left py-4 text-[13px] sm:text-[14px] font-bold text-gray-900 bg-transparent transition-colors outline-none border-none select-none focus:outline-none focus:ring-0 active:bg-transparent"
                      style={{ outline: "none", boxShadow: "none" }}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`size-4.5 text-slate-800 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {/* RENDERING THE CONTENT AREA */}
                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed pt-1 pb-5 pr-4 select-text">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}