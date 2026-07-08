import { z } from "zod"

export const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  line1: z.string().min(1, "Address line 1 is required").max(200),
  line2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required").max(100),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  country: z.string().default("India"),
  isDefault: z.boolean().default(false),
})

export type AddressInput = z.infer<typeof addressSchema>
