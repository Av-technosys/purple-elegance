import { Button } from "@/components/ui/button"

export function SettingsForm() {
  return (
    <div className="space-y-10">
      <section className="rounded-[10px]border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">Personal Information</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Manage your personal information and security preferences.
            </p>
          </div>
          <Button className="rounded-2xl bg-[#2A0C00] text-white hover:bg-[#3A1400]">
            Save Changes
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Full Name</span>
            <input className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" defaultValue="Alexander Vane" />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Email Address</span>
            <input className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" defaultValue="alexander.vane@domain.com" />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Phone Number</span>
            <input className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" defaultValue="+1 234 567 8901" />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Date of Birth</span>
            <input type="date" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" defaultValue="1992-05-12" />
          </label>
        </div>
      </section>

      <section className="rounded-[10px]border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">Password Update</h2>
            <p className="mt-2 text-sm text-zinc-600">Update your account password to keep your profile secure.</p>
          </div>
          <Button className="rounded-2xl bg-[#2A0C00] text-white hover:bg-[#3A1400]">
            Save Changes
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Current Password</span>
            <input type="password" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>New Password</span>
            <input type="password" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Confirm New Password</span>
            <input type="password" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200" />
          </label>
        </div>
      </section>

      <section className="rounded-[10px]border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-950">Communication Preferences</h2>
          <p className="mt-2 text-sm text-zinc-600">Choose how you want to receive notifications and promotions.</p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-700">
            <span>
              <span className="block font-semibold text-zinc-950">Order Updates</span>
              <span className="text-xs text-zinc-500">Receive SMS and email notifications about your order status.</span>
            </span>
            <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#2A0C00]" />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-700">
            <span>
              <span className="block font-semibold text-zinc-950">Promotional Emails</span>
              <span className="text-xs text-zinc-500">Get exclusive access to new arrivals, events, and sales.</span>
            </span>
            <input type="checkbox" className="h-5 w-5 accent-[#2A0C00]" />
          </label>
        </div>
      </section>
    </div>
  )
}
