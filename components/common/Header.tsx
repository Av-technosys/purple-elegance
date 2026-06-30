import Image from "next/image";
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
} from "@tabler/icons-react";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[42px] bg-transparent text-[#140A05] md:h-[68px] md:bg-[#F8EAD8]/58 md:shadow-[0_4px_18px_rgba(42,12,0,0.05)] md:backdrop-blur-sm">
      <div className="mx-auto grid h-full max-w-[1672px] grid-cols-3 items-center px-2 sm:px-5 md:px-[135px]">
        <nav className="flex h-full items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Open menu"
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
            className="h-[38px] w-[136px] object-contain sm:w-[170px] md:h-[130px] md:w-[350px]"
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
  );
};

export default Header;
