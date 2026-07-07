import { ReactNode } from "react"

interface DashboardContentProps {
  children: ReactNode
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <main className="rounded-[32px] bg-white pt-0 px-6 pb-6 sm:px-8 sm:pb-8">
      {children}
    </main>
  )
}
