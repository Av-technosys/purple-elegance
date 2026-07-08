import { cognitoGlobalSignOut } from "./cognito"

// Cookie names — single source of truth
export const AUTH_COOKIES = ["access_token", "id_token", "refresh_token"] as const

export const authService = {
  // Invalidates ALL Cognito sessions for the user (all devices)

  logout: async (accessToken: string) => {
    await cognitoGlobalSignOut({ accessToken })
  },
}
