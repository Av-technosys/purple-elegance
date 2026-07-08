"use client"

import React from "react"

export function AddressForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full bg-white max-w-4xl mx-auto space-y-5 text-[#111111] antialiased font-sans">
      
      {/* Full Name & Phone Number Input Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-900 tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Julian Vane"
            className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-900 tracking-wide">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
          />
        </div>
      </div>

      {/* Address Line 1 */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-bold text-gray-900 tracking-wide">
          Address Line 1
        </label>
        <input
          type="text"
          placeholder="Street address, P.O. box, company name"
          className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
        />
      </div>

      {/* Address Line 2 (Optional) */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-bold text-gray-900 tracking-wide">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          placeholder="Apartment, suite, unit, building, floor, etc."
          className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
        />
      </div>

      {/* City, State, and Zip Code Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-900 tracking-wide">
            City
          </label>
          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-900 tracking-wide">
            State / Province
          </label>
          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-gray-900 tracking-wide">
            Zip / Postal Code
          </label>
          <input
            type="text"
            placeholder="Zip Code"
            className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] placeholder-gray-400/80 outline-none transition-colors focus:border-gray-900"
          />
        </div>
      </div>

      {/* Country Select Dropdown Layout */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-[12px] font-bold text-gray-900 tracking-wide">
          Country
        </label>
        <div className="relative w-full">
          <select className="w-full border border-gray-400 bg-white px-3 py-3 text-[13px] font-medium text-gray-900 rounded-[4px] outline-none appearance-none transition-colors focus:border-gray-900">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>India</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Set as Default Address Checkbox Action */}
      <div className="pt-2">
        <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
          <input 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0 focus:ring-offset-0 accent-black cursor-pointer" 
          />
          <span className="text-[12px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
            Set as Default Address
          </span>
        </label>
      </div>

      {/* Action Buttons: Save Address & Cancel */}
      <div className="pt-4 flex flex-row items-center gap-4">
        <button
          type="submit"
          className="bg-black hover:bg-zinc-900 text-white text-[13px] font-bold py-3 px-8 rounded-[4px] transition-colors duration-150"
        >
          Save Address
        </button>
        <button
          type="button"
          className="border border-[#4c4454]/60 bg-white hover:bg-zinc-50 text-black text-[13px] font-bold py-3 px-10 rounded-[4px] transition-colors duration-150"
        >
          Cancel
        </button>
      </div>

    </form>
  )
}