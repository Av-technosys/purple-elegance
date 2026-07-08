import { categoryRepository } from "./category.repository"
import { categorySchema, updateCategorySchema } from "./category.validations"
import type { CategoryInput, UpdateCategoryInput } from "./category.validations"

export const categoryService = {

  getAll: async () => {
    return categoryRepository.findAll()
  },

  getAllMeta: async () => {
    return categoryRepository.findAllMeta()
  },

  getPaginated: async (params: {
    page: number
    pageSize: number
    search?: string
    parentSlug?: string
  }) => {
    return categoryRepository.findPaginated(params)
  },

  getById: async (id: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) throw new Error("Category not found")
    return category
  },

  create: async (input: CategoryInput) => {
    const parsed = categorySchema.safeParse(input)
    if (!parsed.success) throw new Error(JSON.stringify(parsed.error.flatten().fieldErrors))

    // Check slug uniqueness
    const existing = await categoryRepository.findBySlug(parsed.data.slug)
    if (existing) throw new Error(`Slug "${parsed.data.slug}" is already taken`)

    return categoryRepository.create({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description ?? null,
      imageUrl: parsed.data.imageUrl || null,
      parentId: parsed.data.parentId ?? null,
      isActive: parsed.data.isActive,
    })
  },

  update: async (id: string, input: UpdateCategoryInput) => {
    const parsed = updateCategorySchema.safeParse(input)
    if (!parsed.success) throw new Error(JSON.stringify(parsed.error.flatten().fieldErrors))

    const existing = await categoryRepository.findById(id)
    if (!existing) throw new Error("Category not found")

    // Check slug uniqueness if slug is changing
    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugTaken = await categoryRepository.findBySlug(parsed.data.slug)
      if (slugTaken) throw new Error(`Slug "${parsed.data.slug}" is already taken`)
    }

    return categoryRepository.update(id, parsed.data)
  },

  delete: async (id: string) => {
    const existing = await categoryRepository.findById(id)
    if (!existing) throw new Error("Category not found")
    await categoryRepository.delete(id)
  },
}
