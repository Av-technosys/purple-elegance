"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import HeaderAccount, { HeaderAccountUser } from "@/components/common/HeaderAccount";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const mockUser: HeaderAccountUser = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  avatar: "/sample-insta.png",
};

const isMockLoggedIn = false;

const audienceTabs = ["Men", "Women", "Kids"];

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/product" },
  { name: "New Arrivals", href: "/product" },
  { name: "Best Sellers", href: "/product" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const accountUser = isMockLoggedIn ? mockUser : null;

  const closeMenu = () => {
    if (allowClose) {
      setIsMenuOpen(false);
      setAllowClose(false);
    }
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setTimeout(() => {
        setAllowClose(true);
      }, 150);
    } else {
      setIsMenuOpen(false);
      setAllowClose(false);
    }
  };

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 h-[60px] transition-all duration-300 text-[#140A05] md:h-[68px] ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-md shadow-[0_4px_18px_rgba(42,12,0,0.05)] border-b border-white/20" 
          : "bg-transparent md:bg-white/20 md:backdrop-blur-sm"
      }`}>
        <div className="mx-auto grid h-full max-w-[1672px] grid-cols-3 items-center px-4 sm:px-6 md:px-[135px]">
          <nav className="relative z-10 flex h-full items-center gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Open menu"
              aria-controls="mobile-menu-drawer"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
              className="flex size-7 items-center justify-center md:size-8"
            >
              <IconMenu2 size={25} stroke={2} />
            </button>
            <div className="relative flex items-center">
              <div className={`relative flex items-center transition-all duration-300 ${
                isSearchOpen ? "w-[150px] xs:w-[220px]" : "w-7 md:w-8"
              }`}>
                <input
                  type="text"
                  placeholder="Search products..."
                  aria-hidden={!isSearchOpen}
                  className={`w-full rounded-3xl border bg-white py-1.5 text-[12px] font-sans text-[#2A0C00] outline-none transition-all duration-300 ${
                    isSearchOpen
                      ? "border-gray-200 pl-3 pr-8 opacity-100 pointer-events-auto"
                      : "w-0 pl-0 pr-0 border-transparent opacity-0 pointer-events-none"
                  }`}
                />
                <button
                  type="button"
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                  onClick={toggleSearch}
                  className={`absolute flex size-7 items-center justify-center cursor-pointer md:size-8 transition-all duration-300 ${
                    isSearchOpen ? "right-1.5" : "left-0"
                  }`}
                >
                  <IconSearch size={22} stroke={2} />
                </button>
              </div>
            </div>
          </nav>

          <a
            href="/"
            className="flex h-full items-center justify-center overflow-hidden"
            aria-label="Purple Elegance home"
          >
            <Image
              src="/main-logo.png"
              alt="Purple Elegance"
              width={192}
              height={128}
              priority
              className="h-[60px] w-[200px] object-contain sm:h-[62px] sm:w-[220px] md:h-[130px] md:w-[350px]"
            />
          </a>

          <nav className="relative z-10 flex h-full items-center justify-end gap-2 sm:gap-4">
            <Link
              href="/dashboard/wishlist"
              aria-label="Wishlist"
              className="flex size-7 items-center justify-center md:size-8 cursor-pointer text-[#140A05]"
            >
              <IconHeart size={25} stroke={2} />
            </Link>

            <Link href="/cart" aria-label="Shopping bag" className="flex size-7 items-center justify-center md:size-8">
              <IconShoppingBag size={25} stroke={2} />
            </Link>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[70] flex" role="presentation">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={closeMenu}
              className="absolute inset-0 z-0 bg-black/40 cursor-pointer"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              id="mobile-menu-drawer"
              aria-label="Mobile menu"
              className="relative z-10 flex h-full w-[296px] max-w-[calc(100vw-28px)] flex-col bg-white px-4 py-5 text-[#140A05] shadow-[14px_0_34px_rgba(0,0,0,0.12)]"
            >
            <HeaderAccount user={accountUser} />

            <div className="mt-7 grid grid-cols-3 gap-7">
              {audienceTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={[
                    "h-[26px] rounded-[3px] border border-[#351300] text-[11px] font-semibold",
                    index === 0
                      ? "bg-[#351300] text-white"
                      : "bg-white text-[#140A05]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              ))}
            </div>

            <nav className="mt-8" aria-label="Drawer navigation">
              <h2 className="font-heading text-[20px] leading-none tracking-[0.42em]">
                SHOP
              </h2>
              <span className="mt-4 block h-px w-[48px] bg-[#351300]" />
              <div className="mt-7 divide-y divide-[#C9C0BA]">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setAllowClose(false);
                    }}
                    className="block py-6 text-[16px] leading-none font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="mt-auto space-y-2 pb-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsMenuOpen(false);
                  setAllowClose(false);
                }}
                className="h-[36px] w-full rounded-none border-[#351300] bg-white text-[12px] font-semibold text-[#140A05] hover:bg-[#F8EAD8]"
              >
                Close
              </Button>
              {accountUser ? (
                <Button className="h-[36px] w-full rounded-none bg-[#351300] text-[12px] font-semibold text-white hover:bg-[#4A1B04]">
                  Logout
                </Button>
              ) : null}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Header;
