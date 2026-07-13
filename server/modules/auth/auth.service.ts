import {
  cognitoSignUp,
  cognitoConfirmSignUp,
  cognitoResendConfirmationCode,
  authSignIn,
  cognitoForgotPassword,
  cognitoConfirmForgotPassword,
  cognitoGlobalSignOut,
  refreshCognitoTokens,
  cognitoUpdateUserAttribute,
} from "./cognito"
import { userRepository } from "@/server/modules/user/user.repository"
import type { SignUpInput, SignInInput, ConfirmSignUpInput, ConfirmForgotPasswordInput } from "./auth.validations"
import { cookies } from "next/headers"
import { authCookieNames } from "@/lib/auth-token"

// Cookie names — single source of truth
export const AUTH_COOKIES = [
  authCookieNames.accessToken,
  authCookieNames.idToken,
  authCookieNames.refreshToken
] as const

async function refreshTokensAndGetUser(cookieStore: any, refreshToken: string, emailHint?: string) {
  let email = emailHint
  if (!email) {
    const expiredIdToken = cookieStore.get(authCookieNames.idToken)?.value
    if (expiredIdToken) {
      try {
        const payload = JSON.parse(
          Buffer.from(expiredIdToken.split(".")[1], "base64url").toString("utf8")
        )
        email = payload.email || payload["cognito:username"]
      } catch {
        // ignore
      }
    }
  }

  if (!email) {
    throw new Error("Cannot refresh session. Missing email identifier.")
  }

  const newTokens = await refreshCognitoTokens({ email, refreshToken })
  const maxAge = newTokens.expiresIn || 3600

  cookieStore.set(authCookieNames.accessToken, newTokens.accessToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
    sameSite: "lax",
  })

  cookieStore.set(authCookieNames.idToken, newTokens.idToken!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
    sameSite: "lax",
  })

  if (newTokens.refreshToken) {
    cookieStore.set(authCookieNames.refreshToken, newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    })
  }

  const payload = JSON.parse(
    Buffer.from(newTokens.idToken!.split(".")[1], "base64url").toString("utf8")
  )

  const user = await userRepository.findByCognitoId(payload.sub)
  if (!user) throw new Error("User profile not found after token refresh.")
  if (!user.isActive) throw new Error("This account has been deactivated.")

  return user
}

export const authService = {
  signUp: async (input: SignUpInput) => {
    // 1. Check if user already exists locally
    const existingUser = await userRepository.findByEmail(input.email)
    if (existingUser) {
      throw new Error("User with this email already exists.")
    }

    // 2. Format attributes for Cognito
    const userAttributes = [
      { Name: "email", Value: input.email },
      { Name: "given_name", Value: input.firstName },
      { Name: "family_name", Value: input.lastName },
    ]
    if (input.phone) {
      const formattedPhone = input.phone.startsWith("+") ? input.phone : `+91${input.phone}`
      userAttributes.push({ Name: "phone_number", Value: formattedPhone })
    }

    // 3. Create user in Cognito
    const cognitoResult = await cognitoSignUp({
      email: input.email,
      password: input.password,
      userAttribute: userAttributes,
    })

    if (!cognitoResult.UserSub) {
      throw new Error("Failed to register user in identity provider.")
    }

    // 4. Create user in local DB
    const newUser = await userRepository.create({
      cognitoId: cognitoResult.UserSub,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone || null,
      role: "customer",
      isActive: true, // User is verified via Cognito's confirmation code
    })

    // 5. Save local DB user ID to Cognito user attribute
    try {
      await cognitoUpdateUserAttribute({
        email: input.email,
        userAttribute: [{ Name: "custom:user_id", Value: newUser.id }],
      })
    } catch (err) {
      console.warn(`[signUp] Failed to update custom:user_id attribute in Cognito:`, err)
    }

    return newUser
  },

  confirmSignUp: async (input: ConfirmSignUpInput) => {
    await cognitoConfirmSignUp({
      email: input.email,
      code: input.code,
    })
    return { success: true, message: "Email verified successfully. You can now login." }
  },

  resendConfirmationCode: async (email: string) => {
    await cognitoResendConfirmationCode({ email })
    return { success: true, message: "Verification code resent successfully." }
  },

  login: async (input: SignInInput) => {
    // 1. Sign in to Cognito
    const tokens = await authSignIn({
      email: input.email,
      password: input.password,
    })

    // 2. Fetch local user to verify active status
    const localUser = await userRepository.findByEmail(input.email)
    if (localUser && !localUser.isActive) {
      throw new Error("This account has been deactivated.")
    }

    return tokens
  },

  forgotPassword: async (email: string) => {
    await cognitoForgotPassword({ email })
    return { success: true, message: "Password reset code sent to your email." }
  },

  confirmForgotPassword: async (input: ConfirmForgotPasswordInput) => {
    await cognitoConfirmForgotPassword({
      email: input.email,
      code: input.code,
      newPassword: input.newPassword,
    })
    return { success: true, message: "Password has been reset successfully." }
  },

  // Invalidates ALL Cognito sessions for the user (all devices)
  logout: async (accessToken: string) => {
    await cognitoGlobalSignOut({ accessToken })
  },

  // Checks and returns authenticated user, with transparent token refreshing
  getAuthenticatedUser: async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(authCookieNames.accessToken)?.value
    const idToken = cookieStore.get(authCookieNames.idToken)?.value
    const refreshToken = cookieStore.get(authCookieNames.refreshToken)?.value

    if (!idToken || !accessToken) {
      if (refreshToken) {
        return await refreshTokensAndGetUser(cookieStore, refreshToken)
      }
      throw new Error("Unauthorized. Please login.")
    }

    try {
      const payload = JSON.parse(
        Buffer.from(idToken.split(".")[1], "base64url").toString("utf8")
      )

      const isExpired = payload.exp * 1000 < Date.now()
      if (isExpired) {
        if (refreshToken) {
          return await refreshTokensAndGetUser(cookieStore, refreshToken, payload.email || payload["cognito:username"])
        }
        throw new Error("Session expired. Please login again.")
      }

      const user = await userRepository.findByCognitoId(payload.sub)
      if (!user) {
        throw new Error("User profile not found.")
      }
      if (!user.isActive) {
        throw new Error("This account has been deactivated.")
      }

      return user
    } catch (err) {
      if (refreshToken) {
        try {
          return await refreshTokensAndGetUser(cookieStore, refreshToken)
        } catch {
          // fall through to primary error
        }
      }
      throw err
    }
  },

  requireAuth: async () => {
    return authService.getAuthenticatedUser()
  },

  requireAdmin: async () => {
    const user = await authService.getAuthenticatedUser()
    if (user.role !== "admin") {
      throw new Error("Forbidden. Admin access required.")
    }
    return user
  },
}



