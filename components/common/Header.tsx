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

const mockUser: HeaderAccountUser = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  avatar: "/sample-insta.png",
};

const isMockLoggedIn = false;

const audienceTabs = ["Men", "Women", "Kids"];

const menuItems = [
  "Home",
  "Shop",
  "New Arrivals",
  "Best Sellers",
  "About Us",
  "Contact Us",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const accountUser = isMockLoggedIn ? mockUser : null;

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
      <header className="fixed inset-x-0 top-0 z-50 h-[60px] bg-transparent text-[#140A05] md:h-[68px] md:bg-white/30 md:shadow-[0_4px_18px_rgba(42,12,0,0.05)] md:backdrop-blur-sm">
        <div className="mx-auto grid h-full max-w-[1672px] grid-cols-3 items-center px-2 sm:px-5 md:px-[135px]">
          <nav className="flex h-full items-center gap-2 sm:gap-4">
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
            <button
              type="button"
              aria-label="Search"
              className="flex size-7 items-center justify-center md:size-8"
            >
              <IconSearch size={25} stroke={2} />
            </button>
          </nav>

          <a
            href="#"
            className="flex h-full items-center justify-center overflow-hidden"
            aria-label="Purple Elegance home"
          >
            <Image
              src="/main-logo.png"
              alt="Purple Elegance"
              width={192}
              height={128}
              priority
              className="h-[62px] w-[220px] object-contain sm:w-[220px] md:h-[130px] md:w-[350px]"
            />
          </a>

          <nav className="flex h-full items-center justify-end gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Wishlist"
              className="flex size-7 items-center justify-center md:size-8"
            >
              <IconHeart size={25} stroke={2} />
            </button>
            <button
              type="button"
              aria-label="Shopping bag"
              className="flex size-7 items-center justify-center md:size-8"
            >
              <IconShoppingBag size={25} stroke={2} />
            </button>
          </nav>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[70] flex" role="presentation">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMenu}
            className="absolute inset-0 z-0 bg-black/48"
          />
          <aside
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
              <div className="mt-5 divide-y divide-[#C9C0BA]">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-[9px] text-[12px] leading-none font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>

            <div className="mt-auto space-y-2 pb-3">
              <Button
                variant="outline"
                onClick={closeMenu}
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
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Header;
