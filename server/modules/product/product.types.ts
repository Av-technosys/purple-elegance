import { products, productImages } from "./product.schema"

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type UpdateProduct = Partial<
  Pick<
    Product,
    | "name"
    | "slug"
    | "description"
    | "price"
    | "comparePrice"
    | "categoryId"
    | "stock"
    | "sku"
    | "tags"
    | "isFeatured"
    | "isBestSeller"
    | "isNewArrival"
    | "isActive"
  >
>

export type ProductImage = typeof productImages.$inferSelect
export type NewProductImage = typeof productImages.$inferInsert
