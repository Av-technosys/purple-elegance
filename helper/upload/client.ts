"use client"

import { useCallback, useState } from "react"

type UploadResult = {
  fileKey: string
  fileUrl: string
}

type PresignedUrlResponse = {
  uploadUrl: string
  key: string
  previewUrl: string
}

/**
 * useFileUpload — client-side hook for uploading files to S3 via pre-signed URL.
 */
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (file: File, folder = "products"): Promise<UploadResult> => {
    setUploading(true)
    try {
      // 1. Get presigned URL from backend
      const presignRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          folder: folder,
        }),
      })

      if (!presignRes.ok) {
        const text = await presignRes.text()
        throw new Error(text || "Failed to get upload URL")
      }

      const { uploadUrl, key, previewUrl } = (await presignRes.json()) as PresignedUrlResponse

      // 2. Upload file directly to S3
      const s3Res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      })

      if (!s3Res.ok) {
        throw new Error("Failed to upload file to S3")
      }

      // Return the key and public preview URL
      return {
        fileKey: key,
        fileUrl: previewUrl,
      }
    } finally {
      setUploading(false)
    }
  }, [])

  return { upload, uploading }
}
