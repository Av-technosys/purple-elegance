"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Orders", href: "/dashboard/order" },
  { title: "Saved Address", href: "/dashboard/address" },
  { title: "Wishlist", href: "/dashboard/wishlist" },
  { title: "Settings", href: "/dashboard/setting" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="rounded-[30px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2A0C00] text-lg font-semibold text-white">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-950">John Doe</p>
            <p className="mt-1 text-sm text-zinc-500">john.doe@gmail.com</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-zinc-600">
          Manage your account, track orders, save shipping details, and update preferences.
        </p>
      </div>

      <nav className="mt-6 flex  flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#2A0C00] text-white"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>

      <button
        type="button"
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#2A0C00] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3A1400]"
      >
        Logout
      </button>
    </aside>
  )
}
