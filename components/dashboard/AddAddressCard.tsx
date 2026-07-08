import Link from "next/link"

export function AddAddressCard() {
  return (
    <div className="rounded-[10px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Saved Address</p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
            Manage your shipping destinations for a faster checkout experience.
          </p>
        </div>
        <Link
          href="/dashboard/address/add"
          className="w-full sm:w-auto inline-flex items-center justify-center border border-zinc-950 bg-white hover:bg-zinc-50 px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-900 transition-colors duration-150 rounded-xs"
        >
          + Add New Address
        </Link>
      </div>
    </div>
  )
}
