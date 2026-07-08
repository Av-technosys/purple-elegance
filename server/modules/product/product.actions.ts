"use server"

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

// ── CREATE ───────────────────────────────────────────────────────────────────
export async function createProduct(input: CreateProductInput) {
  try {
    const product = await productService.create(input)
    return { success: true, data: product, message: "Product created successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── UPDATE ───────────────────────────────────────────────────────────────────
export async function updateProduct(id: string, input: UpdateProductInput) {
  try {
    const product = await productService.update(id, input)
    return { success: true, data: product, message: "Product updated successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteProduct(id: string) {
  try {
    await productService.delete(id)
    return { success: true, message: "Product deleted successfully" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
