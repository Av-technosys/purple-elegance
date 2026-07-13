"use client"

import { useState, useEffect } from "react"
import { AddressCard } from "./AddressCard"

export function AddressList() {
  const [addresses, setAddresses] = useState<any[]>([])

  const loadAddresses = () => {
    const saved = localStorage.getItem("purple-elegance-addresses")
    if (saved) {
      try {
        setAddresses(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    } else {
      const initial = [
        {
          id: "default-1",
          fullName: "Alexander Vane",
          addressLine1: "1122 Boutique Skyline, Suite 405",
          addressLine2: "Upper Manhattan, New York, NY 10024",
          country: "United States",
          zip: "10024",
          phone: "+1 (555) 012-3456",
          isDefault: true,
          label: "Default Address"
        },
        {
          id: "default-2",
          fullName: "Alexander Vane",
          addressLine1: "789 Fifth Avenue, 12th Floor",
          addressLine2: "Midtown Corporate Hub, New York, NY 10022",
          country: "United States",
          zip: "10022",
          phone: "+1 (555) 987-6543",
          isDefault: false,
          label: "Saved Address",
          typeLabel: "Office"
        }
      ]
      localStorage.setItem("purple-elegance-addresses", JSON.stringify(initial))
      setAddresses(initial)
    }
  }

  useEffect(() => {
    loadAddresses()
  }, [])

  const setDefaultAddress = (id: string) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))
    setAddresses(updated)
    localStorage.setItem("purple-elegance-addresses", JSON.stringify(updated))
  }

  const deleteAddress = (id: string) => {
    const updated = addresses.filter((addr) => addr.id !== id)
    if (updated.length > 0 && !updated.some(addr => addr.isDefault)) {
      updated[0].isDefault = true
    }
    setAddresses(updated)
    localStorage.setItem("purple-elegance-addresses", JSON.stringify(updated))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2 select-none">
      {addresses.map((addr) => (
        <div key={addr.id} className="relative group">
          <AddressCard
            label={addr.isDefault ? "Default Address" : "Saved Address"}
            typeLabel={addr.typeLabel}
            name={addr.fullName}
            lineOne={addr.addressLine1}
            lineTwo={addr.addressLine2 || `${addr.city}, ${addr.state} - ${addr.zip}`}
            country={addr.country}
            pincode={addr.zip}
            phone={addr.phone}
            isDefault={addr.isDefault}
            onSetDefault={() => setDefaultAddress(addr.id)}
          />
          <button
            type="button"
            onClick={() => deleteAddress(addr.id)}
            className="absolute bottom-6 right-6 text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
      {addresses.length === 0 && (
        <div className="col-span-full py-10 text-center text-zinc-400 text-sm">
          No addresses saved yet. Click Add New Address to add one.
        </div>
      )}
    </div>
  )
}
