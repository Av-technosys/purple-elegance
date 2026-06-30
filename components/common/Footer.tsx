import React from "react";

const footerColumns = [
  {
    title: "SHOP",
    links: ["New Arrivals", "Best Sellers", "Women", "Men"],
  },
  {
    title: "COLLECTION",
    links: [
      "Kurti",
      "Co-ord Set",
      "Anarkali Suit",
      "Everyday Elegance",
      "Embroidered Suit",
    ],
  },
  {
    title: "COMPANY",
    links: ["About Us", "Contact Us"],
  },
  {
    title: "SUPPORT",
    links: [
      "Track Order",
      "Shipping & Delivery",
      "Return & Exchanges",
      "Privacy Policy",
      "Terms & Conditions",
      "FAQs",
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
                // Clean center vertical border between columns
                index !== 0 ? "lg:border-l lg:border-[#D1C2BA]" : "",
              ].join(" ")}
            >
              {/* Title */}
              <h2 className="text-[16px] font-semibold tracking-[0.3em] text-[#2A0C00]">
                {column.title}
              </h2>
              {/* Border line under title */}
              <div className="mt-2 h-[1px] w-[32px] bg-[#2A0C00]" />
              
              {/* Links List */}
              <ul className="mt-6 space-y-[12px]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] tracking-[0.08em] text-[#7F5240] transition-colors hover:text-[#2A0C00]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#EAE1DA] pt-8">
          <div className="grid gap-4 text-center text-[12px] tracking-[0.05em] text-[#7F5240] md:grid-cols-3 md:text-left">
            <p className="opacity-90">© 2026 Purple Elegance. All rights reserved.</p>
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