import React from "react"

const stats = [
  { value: "50,000+", label: "HAPPY CUSTOMERS" },
  { value: "100+", label: "PREMIUM STYLES" },
  { value: "15+", label: "CITIES SERVED" },
  { value: "4.8★", label: "CUSTOMER RATING" },
]

export default function StatsSection() {
  return (
    <section className="bg-foreground text-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-r last:border-r-0 text-center py-6">
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="mt-2 text-sm tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
