import { userRepository } from "../user/user.repository"
import { addressRepository } from "./address.repository"
import type { AddressInput } from "./address.validations"

export const addressService = {

  getAllAddresses: async (cognitoId: string) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")
    return addressRepository.findAllByUserId(user.id)
  },


  getAddress: async (cognitoId: string, addressId: string) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")

    const address = await addressRepository.findByIdAndUserId(addressId, user.id)
    if (!address) throw new Error("Address not found.")

    return address
  },


  createAddress: async (cognitoId: string, data: AddressInput) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")

    // If this is first address → make it default automatically
    const existing = await addressRepository.findAllByUserId(user.id)
    const isDefault = existing.length === 0 ? true : data.isDefault

    // If new address is default → clear existing defaults first
    if (isDefault) {
      await addressRepository.setDefault("", user.id).catch(() => {})
    }

    return addressRepository.create({ ...data, userId: user.id, isDefault })
  },


  updateAddress: async (
    cognitoId: string,
    addressId: string,
    data: AddressInput,
  ) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")

    const address = await addressRepository.findByIdAndUserId(addressId, user.id)
    if (!address) throw new Error("Address not found.")

    if (data.isDefault) {
      return addressRepository.setDefault(addressId, user.id)
    }

    return addressRepository.update(addressId, data)
  },


  setDefaultAddress: async (cognitoId: string, addressId: string) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")

    const address = await addressRepository.findByIdAndUserId(addressId, user.id)
    if (!address) throw new Error("Address not found.")

    return addressRepository.setDefault(addressId, user.id)
  },

  deleteAddress: async (cognitoId: string, addressId: string) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")

    const address = await addressRepository.findByIdAndUserId(addressId, user.id)
    if (!address) throw new Error("Address not found.")

    return addressRepository.delete(addressId)
  },
}
