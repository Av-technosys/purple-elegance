import { NextResponse } from 'next/server'
import { createImageUpload } from '@/services/upload.service'
import { validateImageUploadPayload } from '@/validators/upload.validator'

export async function POST(request: Request) {
  // TODO: Add await requireAdmin() when auth is implemented

  const json = await request.json()
  const payload = validateImageUploadPayload(json)
  const upload = await createImageUpload(payload)

  return NextResponse.json(upload)
}
