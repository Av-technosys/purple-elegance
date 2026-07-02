import Link from "next/link"

export function DashboardFooter() {
  return (
    <footer className="bg-[#2A0C00] px-6 py-6 text-white shadow-sm sm:px-8 sm:py-8">
      <div className="mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm font-medium uppercase tracking-[0.24em] text-[#F8E8DA]">
          <p className="text-[15px] font-semibold">PURPLE ELEGANCE</p>
          <p className="text-[13px] text-[]">© 2026 PURPLE ELEGANCE. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[12px] uppercase tracking-[0.3em] text-[#E9D6C2] sm:grid-cols-4">
          <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
          <Link href="#" className="transition hover:text-white">Terms of Service</Link>
          <Link href="#" className="transition hover:text-white">Shipping & Returns</Link>
          <Link href="#" className="transition hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
