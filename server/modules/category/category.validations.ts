import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
})

export const updateCategorySchema = categorySchema.partial()

export type CategoryInput = z.infer<typeof categorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
