import { pgEnum } from "drizzle-orm/pg-core"

// ─── User ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", ["customer", "admin"])

// ─── Order ───────────────────────────────────────────────────────────────────
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
])

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
])

export const paymentMethodEnum = pgEnum("payment_method", [
  "cod",
  "razorpay",
  "stripe",
  "upi",
])

// ─── Contact ─────────────────────────────────────────────────────────────────
export const contactStatusEnum = pgEnum("contact_status", [
  "new",
  "in_progress",
  "resolved",
  "closed",
])

export const contactSubjectEnum = pgEnum("contact_subject", [
  "order_issue",
  "return_refund",
  "product_query",
  "shipping_query",
  "payment_issue",
  "other",
])
