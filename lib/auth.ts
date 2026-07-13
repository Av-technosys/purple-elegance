import { cookies, headers } from "next/headers"
import { authCookieNames, decodeToken } from "@/lib/auth-token"
import { refreshCognitoTokens } from "@/server/modules/auth/cognito"
import { userRepository } from "@/server/modules/user/user.repository"

async function refreshTokens(cookieStore: any, refreshToken: string, email: string) {
  try {
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

    return {
      accessToken: newTokens.accessToken,
      idToken: newTokens.idToken,
    }
  } catch (error) {
    console.error("Token refresh failed:", error)
    return null
  }
}

export async function getCurrentSession() {
  // 1. Try to read Cognito ID (sub) from request headers (passed by proxy)
  const headerStore = await headers()
  const headerCognitoId = headerStore.get("x-user-id") || headerStore.get("x-cognito-id")

  if (headerCognitoId) {
    const localUser = await userRepository.findByCognitoId(headerCognitoId)
    if (localUser && localUser.isActive) {
      return {
        accessToken: headerStore.get("authorization")?.replace("Bearer ", "") || null,
        idToken: null,
        user: {
          id: localUser.id,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          phone: localUser.phone,
          sub: localUser.cognitoId,
          role: localUser.role,
          isActive: localUser.isActive,
        },
      }
    }
  }

  // 2. Fallback to browser cookies
  const cookieStore = await cookies()

  let accessToken = cookieStore.get(authCookieNames.accessToken)?.value
  let idToken = cookieStore.get(authCookieNames.idToken)?.value
  const refreshToken = cookieStore.get(authCookieNames.refreshToken)?.value
  const role = cookieStore.get(authCookieNames.role)?.value
  const email = cookieStore.get(authCookieNames.email)?.value

  if (!refreshToken) {
    return null
  }

  // Check if token is missing or expired
  let claims = idToken ? decodeToken(idToken) : null
  const isExpired = claims && claims.exp ? claims.exp * 1000 < Date.now() : true

  if (!idToken || !accessToken || isExpired) {
    const userEmail = email || claims?.email
    if (userEmail) {
      const refreshed = await refreshTokens(cookieStore, refreshToken, userEmail)
      if (refreshed) {
        accessToken = refreshed.accessToken
        idToken = refreshed.idToken
        claims = idToken ? decodeToken(idToken) : null
      } else {
        return null
      }
    } else {
      return null
    }
  }

  // Fetch local user details from DB to return DB ID, active status, etc.
  const localUser = claims?.sub ? await userRepository.findByCognitoId(claims.sub) : null

  if (localUser && !localUser.isActive) {
    return null // Deactivated account
  }

  return {
    accessToken,
    idToken,
    user: {
      id: localUser?.id ?? claims?.["custom:user_id"],
      email: localUser?.email ?? claims?.email ?? email,
      firstName: localUser?.firstName ?? claims?.name?.split(" ")[0] ?? "",
      lastName: localUser?.lastName ?? claims?.name?.split(" ").slice(1).join(" ") ?? "",
      phone: localUser?.phone ?? claims?.phone ?? null,
      sub: claims?.sub,
      role: localUser?.role ?? role ?? "customer",
      isActive: localUser?.isActive ?? true,
    },
  }
}

export async function getCurrentUser() {
  const session = await getCurrentSession()
  return session?.user ?? null
}

export async function getCognitoId(): Promise<string | null> {
  // 1. Try to read Cognito ID (sub) from request headers (passed by proxy)
  try {
    const headerStore = await headers()
    const headerCognitoId = headerStore.get("x-user-id") || headerStore.get("x-cognito-id")
    if (headerCognitoId) {
      return headerCognitoId
    }
  } catch {
    // Fail-safe for environments without request context
  }

  // 2. Try to decode it from the cookies
  try {
    const cookieStore = await cookies()
    const idToken = cookieStore.get(authCookieNames.idToken)?.value
    if (idToken) {
      const claims = decodeToken(idToken)
      if (claims?.sub) {
        return claims.sub
      }
    }
  } catch {
    // Fail-safe for environments without request context
  }

  return null
}

