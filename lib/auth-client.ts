"use client"

import { authCookieNames } from "./auth-token"

/**
 * getClientAccessToken - Helper to read the access token on the client-side (browser)
 */
export function getClientAccessToken(): string | null {
  if (typeof window === "undefined") return null
  const match = document.cookie.match(new RegExp(`(^| )${authCookieNames.accessToken}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

/**
 * authFetch - Custom fetch wrapper that automatically appends the Bearer access token
 * in the Authorization header. Ideal for cross-origin or external API requests.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getClientAccessToken()
  const headers = new Headers(options.headers || {})
  
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
