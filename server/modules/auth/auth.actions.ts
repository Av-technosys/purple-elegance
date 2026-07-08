"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIES, authService } from "./auth.service"


export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

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
