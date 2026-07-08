import { productRepository } from "./product.repository"
import { createProductSchema, updateProductSchema } from "./product.validations"
import type { CreateProductInput, UpdateProductInput } from "./product.validations"

export const productService = {

  getPaginated: async (params: {
    page: number
    pageSize: number
    search?: string
    category?: string
    status?: string  // "active" | "inactive" — mapped to isActive
  }) => {
    const isActive =
      params.status === "active"
        ? true
        : params.status === "inactive"
          ? false
          : undefined

    return productRepository.findPaginated({
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      categorySlug: params.category,
      isActive,
    })
  },

  getById: async (id: string) => {
    const product = await productRepository.findById(id)
    if (!product) throw new Error("Product not found")
    return product
  },

  create: async (input: CreateProductInput) => {
    const parsed = createProductSchema.safeParse(input)
    if (!parsed.success) throw new Error(JSON.stringify(parsed.error.flatten().fieldErrors))

    const { images, ...productData } = parsed.data

    const product = await productRepository.create({
      name: productData.name,
      slug: productData.slug,
      description: productData.description ?? null,
      price: productData.price,
      comparePrice: productData.comparePrice || null,
      categoryId: productData.categoryId ?? null,
      stock: productData.stock,
      sku: productData.sku ?? null,
      tags: productData.tags ?? null,
      isFeatured: productData.isFeatured,
      isBestSeller: productData.isBestSeller,
      isNewArrival: productData.isNewArrival,
      isActive: productData.isActive,
    })

    // Attach images if provided
    if (images && images.length > 0) {
      await productRepository.setImages(product.id, images)
    }

    return product
  },

  update: async (id: string, input: UpdateProductInput) => {
    const parsed = updateProductSchema.safeParse(input)
    if (!parsed.success) throw new Error(JSON.stringify(parsed.error.flatten().fieldErrors))

    const existing = await productRepository.findById(id)
    if (!existing) throw new Error("Product not found")

    const { images, ...productData } = parsed.data

    const product = await productRepository.update(id, {
      ...productData,
      price: productData.price,
      comparePrice: productData.comparePrice || null,
      categoryId: productData.categoryId ?? null,
      sku: productData.sku ?? null,
      tags: productData.tags ?? null,
    })

    // Update images if provided
    if (images && images.length > 0) {
      await productRepository.setImages(id, images)
    }

    return product
  },

  delete: async (id: string) => {
    const existing = await productRepository.findById(id)
    if (!existing) throw new Error("Product not found")
    await productRepository.delete(id)
  },
}
