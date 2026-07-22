export const authCookieNames = {
  accessToken: "pe_access_token",
  idToken: "pe_id_token",
  refreshToken: "pe_refresh_token",
  email: "pe_email",
  role: "pe_role",
} as const

export function decodeToken(token: string): any {
  try {
    const [, payload] = token.split(".")
    if (!payload) return null
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
  } catch {
    return null
  }
}
