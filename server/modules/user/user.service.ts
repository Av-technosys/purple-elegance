import { userRepository } from "./user.repository"
import type { UpdateUserProfile } from "./user.types"

export const userService = {

  getProfile: async (cognitoId: string) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")
    if (!user.isActive) throw new Error("Account is deactivated.")
    return user
  },


  updateProfile: async (cognitoId: string, data: UpdateUserProfile) => {
    const user = await userRepository.findByCognitoId(cognitoId)
    if (!user) throw new Error("User not found.")
    return userRepository.updateProfile(user.id, data)
  },
}
