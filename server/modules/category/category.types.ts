import { categories } from "./category.schema"

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
export type UpdateCategory = Partial<Pick<Category, "name" | "slug" | "description" | "imageUrl" | "parentId" | "isActive">>
