"use client"

import React, { useState } from "react"
import { 
  IconUser, 
  IconHistory, 
  IconBell 
} from "@tabler/icons-react"

export function SettingsForm() {
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promoEmails, setPromoEmails] = useState(false)

  return (
    <div className="w-full bg-white max-w-4xl mx-auto px-4 py-8 space-y-12 text-[#111111] antialiased font-sans">
      
      {/* ================= SECTION 1: PERSONAL INFORMATION ================= */}
      <section className="pb-8 border-b border-gray-100">
        {/* Section Heading with Icon */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <IconUser size={20} stroke={1.5} className="text-gray-800" />
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Personal Information
          </h2>
        </div>

        {/* Input Elements Form Layout */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Full Name
              </label>
              <input 
                type="text" 
                defaultValue="Alexander Vane"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Phone Number
              </label>
              <input 
                type="text" 
                defaultValue="+1 (555) 000-0000"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Email Address
              </label>
              <input 
                type="email" 
                defaultValue="alexander.vane@domain.com"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Date of Birth
              </label>
              <input 
                type="text" 
                defaultValue="12 / 05 / 1992"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>

            {/* City, State, and Zip Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                  City
                </label>
                <input 
                  type="text" 
                  placeholder="City"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                  State / Province
                </label>
                <input 
                  type="text" 
                  placeholder="State"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                  Zip / Postal Code
                </label>
                <input 
                  type="text" 
                  placeholder="Zip Code"
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] transition-colors outline-none focus:border-gray-400"
                />
              </div>
            </div>

            {/* Country Dropdown */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Country
              </label>
              <div className="relative w-full">
                <select className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-900 rounded-[4px] outline-none appearance-none transition-colors focus:border-gray-400">
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

            {/* Checkbox */}
            <div className="pt-2 md:col-span-2">
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
          </div>

          {/* Action Save Button aligned directly to the right */}
          <div className="mt-6 flex justify-end">
            <button 
              type="submit"
              className="w-full sm:w-auto bg-[#2A0C00] hover:bg-[#1f0900] text-white text-[12px] font-bold tracking-wide py-3.5 px-8 rounded-[4px] transition-colors duration-150 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>


      {/* ================= SECTION 2: PASSWORD UPDATE ================= */}
      <section className="pb-8 border-b border-gray-100">
        {/* Section Heading with Icon */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <IconHistory size={20} stroke={1.5} className="text-gray-800" />
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Password Update
          </h2>
        </div>

        {/* Password Inputs Layout */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-5">
          {/* Current Password Spanning Full Width row matching image */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[11px] font-bold text-gray-500 tracking-wide">
              Current Password
            </label>
            <input 
              type="password" 
              defaultValue="••••••••••••"
              className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium text-gray-400 tracking-widest rounded-[4px] transition-colors outline-none focus:border-gray-400"
            />
          </div>

          {/* New and Confirm Side-by-Side row split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                New Password
              </label>
              <input 
                type="text" 
                placeholder="New Password"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium placeholder-gray-400 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-500 tracking-wide">
                Confirm New Password
              </label>
              <input 
                type="text" 
                placeholder="Confirm Password"
                className="w-full border border-gray-200 bg-white px-4 py-3.5 text-[13px] font-medium placeholder-gray-400 rounded-[4px] transition-colors outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Action Save Button */}
          <div className="mt-6 flex justify-end">
            <button 
              type="submit"
              className="w-full sm:w-auto bg-[#2A0C00] hover:bg-[#1f0900] text-white text-[12px] font-bold tracking-wide py-3.5 px-8 rounded-[4px] transition-colors duration-150 shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>


      {/* ================= SECTION 3: COMMUNICATION PREFERENCES ================= */}
      <section className="pb-4">
        {/* Section Heading with Icon */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <IconBell size={20} stroke={1.5} className="text-gray-800" />
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Communication Preferences
          </h2>
        </div>

        {/* Toggles Container List */}
        <div className="mt-6 space-y-6">
          {/* Order Updates preference row */}
          <div className="flex items-center justify-between gap-6 py-2">
            <div className="flex flex-col text-left">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900">
                ORDER UPDATES
              </h4>
              <p className="text-[12px] text-gray-500 font-medium mt-1 leading-snug">
                Receive SMS and email notifications about your order status.
              </p>
            </div>
            
            {/* Custom Toggle Switch */}
            <button
              type="button"
              onClick={() => setOrderUpdates(!orderUpdates)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:outline-none ${
                orderUpdates ? "bg-black" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  orderUpdates ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Promotional Emails preference row */}
          <div className="flex items-center justify-between gap-6 py-2">
            <div className="flex flex-col text-left">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900">
                PROMOTIONAL EMAILS
              </h4>
              <p className="text-[12px] text-gray-500 font-medium mt-1 leading-snug">
                Get exclusive access to new arrivals, events, and sales.
              </p>
            </div>
            
            {/* Custom Toggle Switch */}
            <button
              type="button"
              onClick={() => setPromoEmails(!promoEmails)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:outline-none ${
                promoEmails ? "bg-black" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  promoEmails ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}