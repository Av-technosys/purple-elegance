"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import HeaderAccount from "@/components/common/HeaderAccount";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { logoutAction } from "@/server/modules/auth/auth.actions";

interface HeaderProps {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
}

const audienceTabs = ["Men", "Women", "Kids"];

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/product" },
  { name: "New Arrivals", href: "/#new-arrivals" },
  { name: "Best Sellers", href: "/#best-sellers" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("purple-elegance-cart") || "[]");
      const totalQty = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      setCartCount(totalQty);

      const wishlist = JSON.parse(localStorage.getItem("purple-elegance-wishlist") || "[]");
      setWishlistCount(wishlist.length);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    const interval = setInterval(updateCounts, 1000);
    return () => {
      window.removeEventListener("storage", updateCounts);
      clearInterval(interval);
    };
  }, []);

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

  const accountUser = user ? {
    name: `${user.firstName} ${user.lastName}`.trim() || user.email.split("@")[0],
    email: user.email,
    avatar: null,
  } : null;

  const finalMenuItems = [...menuItems];
  if (user) {
    const dashboardHref = user.role === "admin" ? "/admin" : "/dashboard";
    finalMenuItems.push({ name: "Dashboard", href: dashboardHref });
  }

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

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

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
              <div className="relative">
                <IconHeart size={25} stroke={2} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#351300] text-[8px] font-bold text-white shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            <Link 
              href="/cart" 
              aria-label="Shopping bag" 
              className="flex size-7 items-center justify-center md:size-8 text-[#140A05]"
            >
              <div className="relative">
                <IconShoppingBag size={25} stroke={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#B91C1C] text-[8px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {user ? (
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="ml-1 hidden items-center justify-center rounded-[3px] bg-[#351300] px-4.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#4A1B04] transition-all sm:flex"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-1 hidden items-center justify-center rounded-[3px] border border-[#351300] px-4.5 py-1.5 text-[12px] font-semibold text-[#140A05] hover:bg-[#F8EAD8] transition-all sm:flex"
              >
                Login
              </Link>
            )}
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
              className="relative z-10 flex h-full w-[310px] max-w-[calc(100vw-28px)] flex-col bg-white px-6 py-8 text-[#140A05] shadow-[14px_0_34px_rgba(0,0,0,0.12)]"
            >
              <HeaderAccount user={accountUser} />

            <div className="mt-7 grid grid-cols-3 gap-2.5">
              {audienceTabs.map((tab) => {
                const targetPath = tab === "Women" ? "/" : `/${tab.toLowerCase()}`;
                const isActive = pathname === targetPath;
                return (
                  <Link
                    key={tab}
                    href={targetPath}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setAllowClose(false);
                    }}
                    className={[
                      "h-[34px] rounded-[3px] border border-[#351300] text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer",
                      isActive
                        ? "bg-[#351300] text-white"
                        : "bg-white text-[#140A05] hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {tab}
                  </Link>
                );
              })}
            </div>

            <nav className="mt-8" aria-label="Drawer navigation">
              <h2 className="font-heading text-[18px] leading-none tracking-[0.3em] font-semibold text-[#351300]">
                SHOP
              </h2>
              <span className="mt-3.5 block h-px w-[36px] bg-[#351300]" />
              <div className="mt-6 divide-y divide-[#EADECB]">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setAllowClose(false);
                    }}
                    className="block py-4 text-[15px] leading-none font-medium text-[#2A0C00] hover:text-[#C18A48] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <nav className="mt-8" aria-label="Drawer navigation">
                <h2 className="font-heading text-[20px] leading-none tracking-[0.42em]">
                  SHOP
                </h2>
                <span className="mt-4 block h-px w-[48px] bg-[#351300]" />
                <div className="mt-7 divide-y divide-[#C9C0BA]">
                  {finalMenuItems.map((item) => (
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
                  <Button
                    onClick={handleLogout}
                    disabled={isPending}
                    className="h-[36px] w-full rounded-none bg-[#351300] text-[12px] font-semibold text-white hover:bg-[#4A1B04]"
                  >
                    {isPending ? "Logging out..." : "Logout"}
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
