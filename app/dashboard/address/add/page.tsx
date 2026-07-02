import { AddressForm } from "@/components/dashboard/AddressForm"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function page() {
  return (
    <>
      <DashboardHeader
        title="Add New Address"
        description="Add your address details for a faster and easier checkout experience."
      />
      <AddressForm />
    </>
  )
}
