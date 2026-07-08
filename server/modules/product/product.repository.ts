import { db } from "@/server/db"
import { products, productImages } from "./product.schema"
import { categories } from "../category/category.schema"
import { eq, ilike, or, count, desc, and } from "drizzle-orm"
import type { NewProduct, UpdateProduct, NewProductImage } from "./product.types"

export const productRepository = {

  // ── PAGINATED LIST ──────────────────────────────────────────────────────────
  findPaginated: async ({
    page,
    pageSize,
    search,
    categorySlug,
    isActive,
  }: {
    page: number
    pageSize: number
    search?: string
    categorySlug?: string
    isActive?: boolean
  }) => {
    const offset = (page - 1) * pageSize

    // Resolve category slug → id
    let categoryId: string | undefined
    if (categorySlug) {
      const cat = await db.query.categories.findFirst({
        where: eq(categories.slug, categorySlug),
        columns: { id: true },
      })
      categoryId = cat?.id
    }

    const filters: ReturnType<typeof and>[] = []
    if (search) {
      filters.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.sku, `%${search}%`),
        )!,
      )
    }
    if (categoryId) {
      filters.push(eq(products.categoryId, categoryId))
    }
    if (isActive !== undefined) {
      filters.push(eq(products.isActive, isActive))
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          id: products.id,
          name: products.name,
          sku: products.sku,
          price: products.price,
          comparePrice: products.comparePrice,
          stock: products.stock,
          isFeatured: products.isFeatured,
          isActive: products.isActive,
          categoryId: products.categoryId,
          createdAt: products.createdAt,
        })
        .from(products)
        .where(whereClause)
        .orderBy(desc(products.createdAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ total: count() }).from(products).where(whereClause),
    ])

    // Fetch primary images
    const productIds = rows.map((r) => r.id)
    let imageMap: Record<string, string> = {}
    if (productIds.length > 0) {
      const images = await db
        .select({ productId: productImages.productId, url: productImages.url })
        .from(productImages)
        .where(
          and(
            or(...productIds.map((id) => eq(productImages.productId, id))),
            eq(productImages.isPrimary, true),
          ),
        )
      imageMap = Object.fromEntries(images.map((img) => [img.productId, img.url]))
    }

    const totalPages = Math.ceil(total / pageSize)

    return {
      items: rows.map((row) => ({
        ...row,
        image: imageMap[row.id] ?? null,
      })),
      page,
      totalPages: Math.max(totalPages, 1),
      total,
    }
  },

  // ── FIND BY ID (with images and variants) ───────────────────────────────────
  findById: async (id: string) => {
    return db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: true,
        variants: true,
      },
    })
  },

  // ── CREATE ──────────────────────────────────────────────────────────────────
  create: async (data: NewProduct) => {
    const [product] = await db.insert(products).values(data).returning()
    return product
  },

  // ── ADD IMAGE ───────────────────────────────────────────────────────────────
  addImage: async (data: NewProductImage) => {
    const [image] = await db.insert(productImages).values(data).returning()
    return image
  },

  // ── SET IMAGES (Replace all) ────────────────────────────────────────────────
  setImages: async (productId: string, urls: string[]) => {
    // Delete existing images
    await db.delete(productImages).where(eq(productImages.productId, productId))
    
    // Insert new images
    if (urls.length > 0) {
      const values = urls.map((url, index) => ({
        productId,
        url,
        isPrimary: index === 0, // First image is primary
      }))
      await db.insert(productImages).values(values)
    }
  },

  // ── UPDATE ──────────────────────────────────────────────────────────────────
  update: async (id: string, data: UpdateProduct) => {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning()
    return product
  },

  // ── DELETE ──────────────────────────────────────────────────────────────────
  delete: async (id: string) => {
    await db.delete(products).where(eq(products.id, id))
  },
}
