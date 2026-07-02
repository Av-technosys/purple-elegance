import Link from "next/link"

export function AddAddressCard() {
  return (
    <div className="rounded-[10px]border border-zinc-200  p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Saved Address</p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Manage your shipping destinations for a faster checkout experience.
          </p>
        </div>
        <Link
          href="/dashboard/address/add"
          className="inline-flex items-center justify-center rounded-full bg-[#2A0C00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3A1400]"
        >
          Add New Address
        </Link>
      </div>
    </div>
  )
}
