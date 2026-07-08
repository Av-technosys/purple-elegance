import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be a valid price"),
  comparePrice: z
    .string()
    .optional()
    .refine(
      (v) => v === undefined || v === "" || (!isNaN(Number(v)) && Number(v) >= 0),
      "Must be a valid price",
    ),
  categoryId: z.string().optional().nullable(),
  stock: z.number().int().min(0).default(0),
  sku: z.string().max(100).optional().nullable(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isActive: z.boolean().default(true),
  // Array of image URLs
  images: z.array(z.string()).optional().default([]),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
