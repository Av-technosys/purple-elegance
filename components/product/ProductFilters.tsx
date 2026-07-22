"use client";

import { IconAdjustmentsHorizontal, IconChevronDown } from "@tabler/icons-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { categories } from "@/components/product/product-data";

const sizeOptions = ["32", "34", "36", "38", "40", "42"];
const fitOptions = [
  "Regular",
  "Straight",
  "Boxy",
  "Slim",
  "Relaxed",
  "Tapered",
];
const fabricOptions = [
  "Cotton",
  "Cotton Twill",
  "Linen",
  "Denim",
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

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function ProductCategoryTabs() {
  return (
    <Suspense fallback={<div className="h-[60px] bg-white border-b border-[#E6DED5]" />}>
      <ProductCategoryTabsInner />
    </Suspense>
  );
}

function ProductCategoryTabsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-b border-[#E6DED5] bg-white">
      <div className="mx-auto flex max-w-[1220px] gap-3 overflow-x-auto px-4 py-[18px] md:px-6">
        {categories.map((category) => {
          const isSelected = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={[
                "h-[24px] shrink-0 rounded-[2px] border px-5 text-[11px] leading-none transition-colors cursor-pointer",
                isSelected
                  ? "border-[#2A0C00] bg-[#2A0C00] text-white"
                  : "border-[#2A0C00] bg-white text-[#2A0C00] hover:bg-[#F8EAD8]",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
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

import { useState, useEffect } from "react";

export default function ProductFilters() {
  return (
    <Suspense fallback={<div className="hidden w-[214px] shrink-0 text-[#2A0C00] md:block">Loading filters...</div>}>
      <ProductFiltersInner />
    </Suspense>
  );
}

function ProductFiltersInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for filters
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFit, setSelectedFit] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(2500);

  // Sync state with URL parameters on mount/change
  useEffect(() => {
    setSelectedSize(searchParams.get("size") || "");
    setSelectedFit(searchParams.get("fit") || "");
    setSelectedFabric(searchParams.get("fabric") || "");
    setSelectedColor(searchParams.get("color") || "");
    setMinPrice(Number(searchParams.get("minPrice") || "500"));
    setMaxPrice(Number(searchParams.get("maxPrice") || "2500"));
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedSize) params.set("size", selectedSize); else params.delete("size");
    if (selectedFit) params.set("fit", selectedFit); else params.delete("fit");
    if (selectedFabric) params.set("fabric", selectedFabric); else params.delete("fabric");
    if (selectedColor) params.set("color", selectedColor); else params.delete("color");
    params.set("minPrice", String(minPrice));
    params.set("maxPrice", String(maxPrice));
    
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedSize("");
    setSelectedFit("");
    setSelectedFabric("");
    setSelectedColor("");
    setMinPrice(500);
    setMaxPrice(2500);
    
    const params = new URLSearchParams();
    const cat = searchParams.get("category");
    if (cat) params.set("category", cat);
    
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className="hidden w-[214px] shrink-0 text-[#2A0C00] md:block select-none">
      <h2 className="mb-5 text-[15px] font-medium">Filters</h2>
      
      <FilterSection title="Size">
        <div className="grid grid-cols-4 gap-2">
          {Array.from(new Set(sizeOptions)).map((size) => (
            <FilterPill 
              key={size} 
              active={selectedSize === size} 
              onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
            >
              {size}
            </FilterPill>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fit">
        <div className="flex flex-wrap gap-2">
          {fitOptions.map((fit) => (
            <FilterPill 
              key={fit} 
              active={selectedFit === fit} 
              onClick={() => setSelectedFit(selectedFit === fit ? "" : fit)}
            >
              {fit}
            </FilterPill>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fabric">
        <div className="flex flex-wrap gap-2">
          {fabricOptions.map((fabric) => (
            <FilterPill 
              key={fabric} 
              active={selectedFabric === fabric} 
              onClick={() => setSelectedFabric(selectedFabric === fabric ? "" : fabric)}
            >
              {fabric}
            </FilterPill>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colour">
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => {
            const isSelected = selectedColor === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(isSelected ? "" : color)}
                aria-label={`Select color ${color}`}
                className={`size-[18px] rounded-full border cursor-pointer transition-all ${
                  isSelected ? "border-[#2A0C00] ring-2 ring-[#C18A48] scale-110" : "border-[#C8BBAE]"
                }`}
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="pt-2">
          <div className="relative flex flex-col gap-2">
            <input
              type="range"
              min="500"
              max="2500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-[#E8D6C3] rounded-lg appearance-none cursor-pointer accent-[#C18A48]"
            />
            <div className="mt-2 flex justify-between text-[10px] text-[#5B4032] font-medium">
              <span>Min: ₹500</span>
              <span>Max: ₹{maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </FilterSection>

      <Button 
        onClick={applyFilters}
        className="mt-4 h-[38px] w-full rounded-[2px] bg-[#2A0C00] text-[12px] font-semibold text-white hover:bg-[#4A2313] cursor-pointer"
      >
        Apply Filter
      </Button>
      <Button
        variant="outline"
        onClick={clearFilters}
        className="mt-3 h-[36px] w-full rounded-[2px] border-[#2A0C00] bg-white text-[12px] font-semibold text-[#2A0C00] hover:bg-[#F8EAD8] cursor-pointer"
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
      <h3 className="mb-3 text-[12px] font-medium text-[#2A0C00]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function FilterPill({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-[22px] rounded-[2px] border px-3 text-[9px] leading-none cursor-pointer transition-all",
        active
          ? "border-[#2A0C00] bg-[#2A0C00] text-white"
          : "border-[#B8AA9B] bg-white text-[#2A0C00] hover:bg-[#F8EAD8]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
