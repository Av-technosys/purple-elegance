import { addresses } from "./address.schema"

export type Address = typeof addresses.$inferSelect
export type NewAddress = typeof addresses.$inferInsert
export type UpdateAddress = Partial<
  Pick<
    Address,
    | "fullName"
    | "phone"
    | "line1"
    | "line2"
    | "city"
    | "state"
    | "pincode"
    | "country"
    | "isDefault"
  >
>
