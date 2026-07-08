import { orders, orderItems } from "./order.schema"
import { users } from "../user/user.schema"
import { addresses } from "../address/address.schema"

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type OrderItem = typeof orderItems.$inferSelect

export type OrderListRow = {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  paymentMethod: string | null
  paymentId: string | null
  subtotal: string
  discount: string
  shippingCharge: string
  total: string
  createdAt: Date
  // joined
  userId: string
  userFirstName: string
  userLastName: string
  userEmail: string
  addressLine1: string | null
  addressLine2: string | null
}

export type OrderDetailResult = {
  order: Order & {
    items: (OrderItem)[]
    user: Pick<typeof users.$inferSelect, "id" | "firstName" | "lastName" | "email" | "phone"> | null
    address: typeof addresses.$inferSelect | null
  }
}
