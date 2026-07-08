import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { users } from "../user/user.schema"
import { products } from "../product/product.schema"

export const wishlists = pgTable("wishlists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
