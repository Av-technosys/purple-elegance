"use server"

import { revalidatePath } from "next/cache"
import { categoryService } from "./category.service"
import type { CategoryInput, UpdateCategoryInput } from "./category.validations"

// ── GET ALL (for dropdowns) ─────────────────────────────────────────────────
export async function getCategories() {
  try {
    return categoryService.getAll()
  } catch {
    return []
  }
}

// ── GET ALL META (id/name/slug for selects) ──────────────────────────────────
export async function getAllCategoriesMeta() {
  try {
    return categoryService.getAllMeta()
  } catch {
    return []
  }
}

// ── PAGINATED ────────────────────────────────────────────────────────────────
export async function getCategoriesPagination(params: {
  page: number
  pageSize: number
  search?: string
  category?: string
}) {
  return categoryService.getPaginated({
    page: params.page,
    pageSize: params.pageSize,
    search: params.search,
    parentSlug: params.category,
  })
}

// ── CREATE ───────────────────────────────────────────────────────────────────
export async function createCategory(input: CategoryInput) {
  try {
    const category = await categoryService.create(input)
    revalidatePath("/admin/category")
    return { success: true, data: category, message: "Category created successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── UPDATE ───────────────────────────────────────────────────────────────────
export async function updateCategory(id: string, input: UpdateCategoryInput) {
  try {
    const category = await categoryService.update(id, input)
    revalidatePath("/admin/category")
    return { success: true, data: category, message: "Category updated successfully" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteCategory(id: string) {
  try {
    await categoryService.delete(id)
    revalidatePath("/admin/category")
    return { success: true, message: "Category deleted successfully" }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}
