import Link from "next/link"

interface AddressCardProps {
  label: string
  name: string
  lineOne: string
  lineTwo: string
  country: string
  pincode: string
  phone: string
  isDefault?: boolean
  typeLabel?: string
  onSetDefault?: () => void
}

export function AddressCard({
  label,
  name,
  lineOne,
  lineTwo,
  country,
  pincode,
  phone,
  isDefault,
  typeLabel,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div className="rounded-[10px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{label}</span>
          {typeLabel && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-700">
              {typeLabel}
            </span>
          )}
        </div>
        {isDefault ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            Default Address
          </span>
        ) : (
          <button
            type="button"
            onClick={onSetDefault}
            className="text-xs font-semibold text-[#2A0C00] underline cursor-pointer hover:text-[#4A2313] bg-transparent border-none outline-none"
          >
            Set as default
          </button>
        )}
      </div>

      <div className="mt-5 space-y-2 text-sm text-zinc-700">
        <p className="font-semibold text-zinc-950">{name}</p>
        <p>{lineOne}</p>
        <p>{lineTwo}</p>
        <p>{country}</p>
        <p className="text-sm text-zinc-500">PINCODE: {pincode}</p>
        <p className="text-sm text-zinc-500">MOBILE: {phone}</p>
      </div>
    </div>
  )
}
