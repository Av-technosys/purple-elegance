"use server"

import { revalidatePath } from "next/cache"
import { productService } from "./product.service"
import type { CreateProductInput, UpdateProductInput } from "./product.validations"

// ── PAGINATED ────────────────────────────────────────────────────────────────
export async function getProducts(params: {
  page: number
  pageSize: number
  search?: string
  category?: string
  status?: string
}) {
  return productService.getPaginated(params)
}

// ── FULL PRODUCT (for edit form) ─────────────────────────────────────────────
export async function getFullProduct(id: string) {
  try {
    return productService.getById(id)
  } catch {
    return null
  }
}

// ── GET BY SLUG (for PDP) ────────────────────────────────────────────────────
export async function getProductBySlug(slug: string) {
  try {
    return await productService.getBySlug(slug)
  } catch (error) {
    // Log so we can see DB errors in the terminal instead of silent 404s
    console.error(`[getProductBySlug] failed for slug "${slug}":`, error)
    return null
  }
}

// ── CREATE ───────────────────────────────────────────────────────────────────
export async function createProduct(input: CreateProductInput) {
  try {
    const product = await productService.create(input)
    revalidatePath("/admin/products")
    return { success: true, data: product, message: "Product created successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── UPDATE ───────────────────────────────────────────────────────────────────
export async function updateProduct(id: string, input: UpdateProductInput) {
  try {
    const product = await productService.update(id, input)
    revalidatePath("/admin/products")
    return { success: true, data: product, message: "Product updated successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteProduct(id: string) {
  try {
    await productService.delete(id)
    revalidatePath("/admin/products")
    return { success: true, message: "Product deleted successfully" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
