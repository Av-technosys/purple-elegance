"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  IconLayoutDashboard,
  IconPackage,
  IconMapPin,
  IconHeart,
  IconSettings,
} from "@tabler/icons-react"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
  { title: "Orders", href: "/dashboard/order", icon: IconPackage },
  { title: "Saved Address", href: "/dashboard/address", icon: IconMapPin },
  { title: "Wishlist", href: "/dashboard/wishlist", icon: IconHeart },
  { title: "Settings", href: "/dashboard/setting", icon: IconSettings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full max-w-none xl:w-[320px] xl:max-w-[320px] mx-auto xl:mx-0 rounded-[8px] border border-zinc-200 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col">
      {/* User Info Header Block */}
      <div className="flex items-center gap-4 pt-2 pb-6">
        {/* Profile Avatar Wrapper */}
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-zinc-100 bg-zinc-50 shrink-0">
          <Image
            src="/about-3.png" // You can substitute this path with your direct user profile asset link
            alt="John Doe profile photo"
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="flex flex-col min-w-0">
          <h3 className="text-[20px] font-bold text-[#2A0C00] font-serif tracking-tight leading-tight">
            John Doe
          </h3>
          <p className="text-[12px] text-zinc-500 mt-1 truncate">
            john.doe@gmail.com
          </p>
        </div>
      </div>

      {/* Decorative Minimal Divider Line */}
      <div className="w-full h-[1px] bg-zinc-200/80 mb-4" />

      {/* Navigation Links Area */}
      <nav className="-mx-5 flex flex-col">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3.5 px-6 py-3.5 text-[14px] font-semibold transition-colors duration-150 ${
                isActive
                  ? "bg-[#f5f3f2] text-[#2A0C00] border-l-[3px] border-[#2A0C00]"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 border-l-[3px] border-transparent"
              }`}
            >
              <Icon 
                size={20} 
                stroke={1.5} 
                className={isActive ? "text-[#2A0C00]" : "text-zinc-400"} 
              />
              <span className="tracking-wide">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Compact Action Area */}
      <div className="mt-6 pt-2">
        <button
          type="button"
          className="w-full bg-[#2A0C00] hover:bg-[#1f0900] text-white text-[14px] font-bold py-3 px-4 rounded-[6px] transition-colors duration-150 shadow-sm"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}