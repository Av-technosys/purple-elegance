import { AddressCard } from "./AddressCard"

export function AddressList() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <AddressCard
        label="Default Address"
        name="Alexander Vane"
        lineOne="1122 Boutique Skyline, Suite 405"
        lineTwo="Upper Manhattan, New York, NY 10024"
        country="United States"
        pincode="10024"
        phone="+1 (555) 012-3456"
        isDefault
      />
      <AddressCard
        label="Saved Address"
        typeLabel="Office"
        name="Alexander Vane"
        lineOne="789 Fifth Avenue, 12th Floor"
        lineTwo="Midtown Corporate Hub, New York, NY 10022"
        country="United States"
        pincode="10022"
        phone="+1 (555) 987-6543"
      />
    </div>
  )
}
