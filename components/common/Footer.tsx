import React from "react";
import Link from "next/link";

const footerColumns = [
  {
    title: "SHOP",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Women", href: "/" },
      { label: "Men", href: "/men" },
    ],
  },
  {
    title: "COLLECTION",
    links: [
      { label: "Kurti", href: "/collection/kurti" },
      { label: "Co-ord Set", href: "/collection/co-ord-set" },
      { label: "Anarkali Suit", href: "/collection/anarkali-suit" },
      { label: "Everyday Elegance", href: "/collection/everyday-elegance" },
      { label: "Embroidered Suit", href: "/collection/embroidered-suit" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Return & Exchanges", href: "/return-exchange" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-of-use" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#FAF7F5] px-6 py-12 text-[#5E2A1A] sm:py-16">
      <div className="mx-auto max-w-[1200px]">
        {/* Columns Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {footerColumns.map((column, index) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={[
                "min-h-[200px] flex flex-col items-start lg:px-12",
                index === 0 ? "lg:pl-0" : "",
                index === footerColumns.length - 1 ? "lg:pr-0" : "",
                index !== 0 ? "lg:border-l lg:border-[#D1C2BA]" : "",
              ].join(" ")}
            >
              <h2 className="text-[16px] font-semibold tracking-[0.3em] text-[#2A0C00]">
                {column.title}
              </h2>

              <div className="mt-2 h-[1px] w-[32px] bg-[#2A0C00]" />
              <ul className="mt-6 space-y-[12px]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] tracking-[0.08em] text-[#7F5240] transition-colors hover:text-[#2A0C00]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#EAE1DA] pt-8">
          <div className="grid gap-4 text-center text-[12px] tracking-[0.05em] text-[#7F5240] md:grid-cols-3 md:text-left">
            <p className="opacity-90">
              © 2026 Purple Elegance. All rights reserved.
            </p>
            <p className="font-medium text-[#2A0C00] md:text-center">
              • CRAFTED WITH PASSION •
            </p>
            <p className="opacity-90 md:text-right">
              Designed &amp; Developed by AV Technosys
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
