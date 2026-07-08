import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { contactStatusEnum, contactSubjectEnum } from "@/server/db/enums"

export const contactMessages = pgTable("contact_messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: contactSubjectEnum("subject").notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum("status").default("new").notNull(),
  adminNotes: text("admin_notes"),                           // Internal notes for admin
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
