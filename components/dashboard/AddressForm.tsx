import { Button } from "@/components/ui/button"

export function AddressForm() {
  return (
    <form className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Full Name</span>
          <input
            type="text"
            placeholder="e.g. Julian Vane"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Phone Number</span>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
      </div>

      <div className="space-y-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Address Line 1</span>
          <input
            type="text"
            placeholder="Street address, P.O. box, company name"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
        <label className="space-y-2 ">
          <span className="text-sm font-medium text-zinc-700">Address Line 2 (Optional)</span>
          <input
            type="text"
            placeholder="Apartment, suite, unit, building, floor, etc."
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">City</span>
          <input
            type="text"
            placeholder="City"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">State / Province</span>
          <input
            type="text"
            placeholder="State"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Zip / Postal Code</span>
          <input
            type="text"
            placeholder="Zip Code"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Country</span>
          <select className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
          <input type="checkbox" className="h-5 w-5 accent-[#2A0C00]" />
          <span>Set as Default Address</span>
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="button" className="w-full rounded-2xl bg-[#2A0C00] text-white hover:bg-[#3A1400] sm:w-auto">
          Save Address
        </Button>
        <button type="button" className="w-full rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500 sm:w-auto">
          Cancel
        </button>
      </div>
    </form>
  )
}
