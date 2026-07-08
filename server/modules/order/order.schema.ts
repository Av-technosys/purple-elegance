import { integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import {
  orderStatusEnum,
  paymentMethodEnum,
  paymentStatusEnum,
} from "@/server/db/enums"
import { users } from "../user/user.schema"
import { addresses } from "../address/address.schema"
import { products } from "../product/product.schema"
import { productVariants } from "../product/product.schema"

export const orders = pgTable("orders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderNumber: text("order_number").notNull().unique(),   // PE-2024-0001
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  addressId: text("address_id").references(() => addresses.id, {
    onDelete: "set null",
  }),
  status: orderStatusEnum("status").default("pending").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
  paymentMethod: paymentMethodEnum("payment_method"),
  paymentId: text("payment_id"),                          // Razorpay / Stripe txn ID
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 10, scale: 2 }).default("0").notNull(),
  shippingCharge: numeric("shipping_charge", { precision: 10, scale: 2 }).default("0").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id, {
    onDelete: "set null",
  }),
  // ↓ Snapshot of product at time of order (product details may change later)
  productName: text("product_name").notNull(),
  productImage: text("product_image"),
  size: text("size"),
  color: text("color"),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
