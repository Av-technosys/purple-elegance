"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIES, authService } from "./auth.service"
import { authCookieNames, decodeToken } from "@/lib/auth-token"
import {
  signUpSchema,
  signInSchema,
  confirmSignUpSchema,
  forgotPasswordSchema,
  confirmForgotPasswordSchema,
  resendCodeSchema,
  type SignUpInput,
  type SignInInput,
  type ConfirmSignUpInput,
  type ForgotPasswordInput,
  type ConfirmForgotPasswordInput,
  type ResendCodeInput,
} from "./auth.validations"

export interface ActionResponse {
  success: boolean
  message?: string
  error?: string | Record<string, string[]> | any
  data?: any
}

export async function signUpAction(input: SignUpInput): Promise<ActionResponse> {
  try {
    const parsed = signUpSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const user = await authService.signUp(parsed.data)
    return {
      success: true,
      message: "Registration successful. Please check your email for verification code.",
      data: { email: user.email },
    }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function confirmSignUpAction(input: ConfirmSignUpInput): Promise<ActionResponse> {
  try {
    const parsed = confirmSignUpSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const result = await authService.confirmSignUp(parsed.data)
    return { success: true, message: result.message }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function resendConfirmationCodeAction(input: ResendCodeInput): Promise<ActionResponse> {
  try {
    const parsed = resendCodeSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const result = await authService.resendConfirmationCode(parsed.data.email)
    return { success: true, message: result.message }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function loginAction(input: SignInInput): Promise<ActionResponse> {
  try {
    const parsed = signInSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const tokens = await authService.login(parsed.data)

    // Set Cookies securely
    const cookieStore = await cookies()
    const maxAge = tokens.expiresIn || 3600

    cookieStore.set(authCookieNames.accessToken, tokens.accessToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
      sameSite: "lax",
    })

    cookieStore.set(authCookieNames.idToken, tokens.idToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
      sameSite: "lax",
    })

    if (tokens.refreshToken) {
      cookieStore.set(authCookieNames.refreshToken, tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
        sameSite: "lax",
      })
    }

    // Set Email and Role cookies
    const claims = decodeToken(tokens.idToken!)
    const role = claims?.["cognito:groups"]?.includes("admin") ? "admin" : "customer"
    const email = claims?.email || parsed.data.email

    cookieStore.set(authCookieNames.email, email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
    })

    cookieStore.set(authCookieNames.role, role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
    })

    return { success: true, message: "Logged in successfully." }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function forgotPasswordAction(input: ForgotPasswordInput): Promise<ActionResponse> {
  try {
    const parsed = forgotPasswordSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const result = await authService.forgotPassword(parsed.data.email)
    return { success: true, message: result.message }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function confirmForgotPasswordAction(input: ConfirmForgotPasswordInput): Promise<ActionResponse> {
  try {
    const parsed = confirmForgotPasswordSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const result = await authService.confirmForgotPassword(parsed.data)
    return { success: true, message: result.message }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(authCookieNames.accessToken)?.value

    // Invalidate on Cognito side (kills all sessions across all devices)
    if (accessToken) {
      await authService.logout(accessToken)
    }

    // Clear all auth cookies
    AUTH_COOKIES.forEach((name) => {
      cookieStore.delete(name)
    })
  } catch {
    // Even if Cognito call fails — still clear cookies locally
    const cookieStore = await cookies()
    AUTH_COOKIES.forEach((name) => {
      cookieStore.delete(name)
    })
  }

  redirect("/login")
}



