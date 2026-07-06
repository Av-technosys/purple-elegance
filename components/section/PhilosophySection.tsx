import React from "react"

const items = [
  { title: "Design", desc: "Minimal. Timeless. Intentional." },
  { title: "Quality", desc: "Premium fabrics built for everyday wear." },
  { title: "Comfort", desc: "Fashion that moves with your lifestyle." },
]

export default function PhilosophySection() {
  return (
    <section className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-background">Our Philosophy</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full border border-background flex items-center justify-center">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2L22 8L18 22L10 22L6 8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-wide">{it.title}</h3>
              <p className="mt-3 text-sm max-w-xs mx-auto text-background/80">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
