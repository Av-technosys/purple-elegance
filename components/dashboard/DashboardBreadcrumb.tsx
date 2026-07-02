"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const breadcrumbMap: Record<string, { label: string; href: string }> = {
  "/dashboard": { label: "Dashboard", href: "/dashboard" },
  "/dashboard/order": { label: "My Orders", href: "/dashboard/order" },
  "/dashboard/address": { label: "Saved Address", href: "/dashboard/address" },
  "/dashboard/address/add": { label: "Add New Address", href: "/dashboard/address/add" },
  "/dashboard/wishlist": { label: "Wishlist", href: "/dashboard/wishlist" },
  "/dashboard/setting": { label: "Account Settings", href: "/dashboard/setting" },
}

export function DashboardBreadcrumb() {
  const pathname = usePathname()

  const items = [
    { label: "Home", href: "/" },
    { label: "Account", href: "/dashboard" },
  ]

  if (pathname === "/dashboard") {
    items.push(breadcrumbMap[pathname])
  } else if (pathname.startsWith("/dashboard/address/add")) {
    items.push(breadcrumbMap["/dashboard/address"])
    items.push(breadcrumbMap["/dashboard/address/add"])
  } else if (pathname.startsWith("/dashboard/address")) {
    items.push(breadcrumbMap["/dashboard/address"])
  } else if (pathname.startsWith("/dashboard/order")) {
    items.push(breadcrumbMap["/dashboard/order"])
  } else if (pathname.startsWith("/dashboard/wishlist")) {
    items.push(breadcrumbMap["/dashboard/wishlist"])
  } else if (pathname.startsWith("/dashboard/setting")) {
    items.push(breadcrumbMap["/dashboard/setting"])
  }

  return (
    <nav aria-label="Breadcrumb" className=" px-5 py-4  sm:px-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#5F5E5E]">
        {items.map((item, index) => (
          <li key={`${item.href}-${index}`} className="flex items-center gap-2">
            <Link href={item.href} className="transition hover:text-zinc-900">
              {item.label}
            </Link>
            {index < items.length - 1 ? <span aria-hidden="true">›</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
