import { ReactNode } from "react"

import Header from "@/components/common/Header"
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { DashboardFooter } from "@/components/dashboard/DashboardFooter"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-21.5 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <DashboardBreadcrumb />
          <div className="mt-6 grid gap-6 xl:grid-cols-[320px_1fr]">
            <DashboardSidebar />
            <div className="space-y-10">
              <DashboardContent>{children}</DashboardContent>
            
            </div>
          </div>
        </div>
      </div>
        <DashboardFooter />
    </>
  )
}
