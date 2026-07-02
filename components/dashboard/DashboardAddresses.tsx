import { DashboardHeader } from "./DashboardHeader"
import { AddAddressCard } from "./AddAddressCard"
import { AddressList } from "./AddressList"

export function DashboardAddresses() {
  return (
    <>
      <DashboardHeader
        title="Saved Address"
        description="Manage your shipping destinations for a faster checkout experience."
      />
      <div className="space-y-6">
        <AddAddressCard />
        <AddressList />
      </div>
    </>
  )
}
