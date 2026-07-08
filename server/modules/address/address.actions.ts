"use server"

import { cookies } from "next/headers"
import { addressService } from "./address.service"
import { addressSchema } from "./address.validations"


async function getCognitoId(): Promise<string> {
  const cookieStore = await cookies()
  const idToken = cookieStore.get("id_token")?.value
  if (!idToken) throw new Error("Unauthorized. Please login.")

  const payload = JSON.parse(
    Buffer.from(idToken.split(".")[1], "base64url").toString("utf8"),
  )
  return payload.sub as string
}


export async function getAddressesAction() {
  try {
    const cognitoId = await getCognitoId()
    const addresses = await addressService.getAllAddresses(cognitoId)
    return { success: true, data: addresses }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function getAddressAction(addressId: string) {
  try {
    const cognitoId = await getCognitoId()
    const address = await addressService.getAddress(cognitoId, addressId)
    return { success: true, data: address }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function createAddressAction(formData: FormData) {
  try {
    const cognitoId = await getCognitoId()

    const parsed = addressSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      line1: formData.get("line1"),
      line2: formData.get("line2"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
      country: formData.get("country") || "India",
      isDefault: formData.get("isDefault") === "true",
    })

    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const address = await addressService.createAddress(cognitoId, parsed.data)
    return { success: true, data: address }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function updateAddressAction(addressId: string, formData: FormData) {
  try {
    const cognitoId = await getCognitoId()

    const parsed = addressSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      line1: formData.get("line1"),
      line2: formData.get("line2"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),
      country: formData.get("country") || "India",
      isDefault: formData.get("isDefault") === "true",
    })

    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const address = await addressService.updateAddress(
      cognitoId,
      addressId,
      parsed.data,
    )
    return { success: true, data: address }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function setDefaultAddressAction(addressId: string) {
  try {
    const cognitoId = await getCognitoId()
    const address = await addressService.setDefaultAddress(cognitoId, addressId)
    return { success: true, data: address }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function deleteAddressAction(addressId: string) {
  try {
    const cognitoId = await getCognitoId()
    await addressService.deleteAddress(cognitoId, addressId)
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
