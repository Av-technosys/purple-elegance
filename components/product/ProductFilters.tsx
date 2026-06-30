import { IconAdjustmentsHorizontal, IconChevronDown } from "@tabler/icons-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { categories } from "@/components/product/product-data";

const sizeOptions = ["38", "32", "34", "36", "38", "40", "42"];
const fitOptions = [
  "Regular",
  "Straight",
  "Boxy",
  "Slim",
  "Regular",
  "Relaxed",
  "Tapered",
];
const fabricOptions = [
  "Cotton",
  "Cotton Twill",
  "Linen",
  "Denim",
  "Polyester",
  "Polyester",
  "Linen Blend",
];
const colorOptions = [
  "#2A0C00",
  "#3B6F8F",
  "#E7E1D2",
  "#C99466",
  "#672227",
  "#9D2646",
  "#C5507E",
];

export function ProductCategoryTabs() {
  return (
    <div className="border-b border-[#E6DED5] bg-white">
      <div className="mx-auto flex max-w-[1220px] gap-3 overflow-x-auto px-4 py-[18px] md:px-6">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            className={[
              "h-[24px] shrink-0 rounded-[2px] border px-5 text-[11px] leading-none transition-colors",
              index === 0
                ? "border-[#2A0C00] bg-[#2A0C00] text-white"
                : "border-[#2A0C00] bg-white text-[#2A0C00] hover:bg-[#F8EAD8]",
            ].join(" ")}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MobileFilterBar() {
  return (
    <div className="flex items-center justify-between border-b border-[#E6DED5] bg-white px-4 py-3 md:hidden">
      <button
        type="button"
        className="flex items-center gap-1 text-[12px] font-medium text-[#2A0C00]"
      >
        <IconAdjustmentsHorizontal size={14} stroke={1.6} />
        Filter
      </button>
      <SortSelect />
    </div>
  );
}

export function SortSelect() {
  return (
    <label className="flex items-center gap-2 text-[10px] text-[#2A0C00]">
      <span className="hidden sm:inline">Sort by:</span>
      <span className="relative">
        <select
          aria-label="Sort products"
          defaultValue="newest"
          className="h-[28px] appearance-none rounded-[2px] border border-[#B8AA9B] bg-white pr-7 pl-2 text-[10px] text-[#2A0C00] outline-none"
        >
          <option value="newest">Newest</option>
          <option value="popular">Popular</option>
          <option value="price-low">Price low</option>
          <option value="price-high">Price high</option>
        </select>
        <IconChevronDown
          size={12}
          stroke={1.6}
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
        />
      </span>
    </label>
  );
}

export default function ProductFilters() {
  return (
    <aside className="hidden w-[214px] shrink-0 text-[#2A0C00] md:block">
      <h2 className="mb-5 text-[15px] font-medium">Filters</h2>
      <FilterSection title="Size">
        <div className="grid grid-cols-4 gap-2">
          {sizeOptions.map((size, index) => (
            <FilterPill key={`${size}-${index}`}>{size}</FilterPill>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Fit">
        <div className="flex flex-wrap gap-2">
          {fitOptions.map((fit, index) => (
            <FilterPill key={`${fit}-${index}`}>{fit}</FilterPill>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Fabric">
        <div className="flex flex-wrap gap-2">
          {fabricOptions.map((fabric, index) => (
            <FilterPill active={index === 0} key={`${fabric}-${index}`}>
              {fabric}
            </FilterPill>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Colour">
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${color}`}
              className="size-[18px] rounded-full border border-[#C8BBAE]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Price">
        <div className="pt-2">
          <div className="relative h-1 rounded-full bg-[#E8D6C3]">
            <span className="absolute inset-x-0 h-full rounded-full bg-[#C18A48]" />
            <span className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full border border-[#C18A48] bg-white" />
            <span className="absolute top-1/2 right-0 size-3 -translate-y-1/2 rounded-full border border-[#C18A48] bg-white" />
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-[#5B4032]">
            <span>₹2,500</span>
            <span>₹5,500</span>
          </div>
        </div>
      </FilterSection>
      <FilterSection title="Availability">
        <div className="flex gap-2">
          <FilterPill>In Stock</FilterPill>
          <FilterPill>Out of Stock</FilterPill>
        </div>
      </FilterSection>
      <Button className="mt-4 h-[38px] w-full rounded-[2px] bg-[#2A0C00] text-[12px] font-semibold text-white hover:bg-[#4A2313]">
        Apply Filter
      </Button>
      <Button
        variant="outline"
        className="mt-3 h-[36px] w-full rounded-[2px] border-[#2A0C00] bg-white text-[12px] font-semibold text-[#2A0C00] hover:bg-[#F8EAD8]"
      >
        Clear Filter
      </Button>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#E7DED4] py-4 first:pt-0">
      <button
        type="button"
        className="mb-3 flex w-full items-center justify-between text-[12px] font-medium"
      >
        {title}
        <IconChevronDown size={14} stroke={1.5} />
      </button>
      {children}
      <button type="button" className="mt-3 text-[9px] text-[#6F574A]">
        View More +
      </button>
    </section>
  );
}

function FilterPill({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "min-h-[22px] rounded-[2px] border px-3 text-[9px] leading-none",
        active
          ? "border-[#2A0C00] bg-[#2A0C00] text-white"
          : "border-[#B8AA9B] bg-white text-[#2A0C00]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
