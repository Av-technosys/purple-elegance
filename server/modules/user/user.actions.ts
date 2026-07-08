"use server"

import { cookies } from "next/headers"
import { userService } from "./user.service"
import { updateProfileSchema } from "./user.validations"


async function getCognitoId(): Promise<string> {
  const cookieStore = await cookies()
  const idToken = cookieStore.get("id_token")?.value
  if (!idToken) throw new Error("Unauthorized. Please login.")

  // Decode JWT payload (base64) — no need to verify, Cognito already did
  const payload = JSON.parse(
    Buffer.from(idToken.split(".")[1], "base64url").toString("utf8"),
  )
  return payload.sub as string
}


export async function getProfileAction() {
  try {
    const cognitoId = await getCognitoId()
    const user = await userService.getProfile(cognitoId)
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}


export async function updateProfileAction(formData: FormData) {
  try {
    const cognitoId = await getCognitoId()

    const parsed = updateProfileSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
    })

    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors }
    }

    const updatePayload = {
      ...parsed.data,
      phone: parsed.data.phone ?? null,
    }

    const user = await userService.updateProfile(cognitoId, updatePayload)
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
