import { products, productImages, productAttributes } from "./product.schema"

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
    | "gender"
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

export type ProductAttribute = typeof productAttributes.$inferSelect
export type NewProductAttribute = typeof productAttributes.$inferInsert
