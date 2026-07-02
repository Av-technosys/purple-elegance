import { ReactNode } from "react"

interface DashboardContentProps {
  children: ReactNode
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <main className="rounded-[32px] bg-white p-6 sm:p-8">
      {children}
    </main>
  )
}
