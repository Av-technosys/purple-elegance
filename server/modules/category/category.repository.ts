import { db } from "@/server/db"
import { categories } from "./category.schema"
import { eq, ilike, or, count, desc } from "drizzle-orm"
import type { NewCategory, UpdateCategory } from "./category.types"

export const categoryRepository = {

  // ── LIST (all, no pagination) ───────────────────────────────────────────────
  findAll: async () => {
    return db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(desc(categories.createdAt))
  },

  // ── LIST WITH META (for dropdowns) ─────────────────────────────────────────
  findAllMeta: async () => {
    return db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        parentId: categories.parentId,
      })
      .from(categories)
      .orderBy(categories.name)
  },

  // ── PAGINATED LIST ──────────────────────────────────────────────────────────
  findPaginated: async ({
    page,
    pageSize,
    search,
    parentSlug,
  }: {
    page: number
    pageSize: number
    search?: string
    parentSlug?: string
  }) => {
    const offset = (page - 1) * pageSize

    // Build search filter
    const whereClause = search
      ? or(
          ilike(categories.name, `%${search}%`),
          ilike(categories.slug, `%${search}%`),
        )
      : undefined

    const [items, [{ total }]] = await Promise.all([
      db
        .select()
        .from(categories)
        .where(whereClause)
        .orderBy(desc(categories.createdAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ total: count() }).from(categories).where(whereClause),
    ])

    // Fetch parent names for display
    const parentIds = [
      ...new Set(items.map((c) => c.parentId).filter(Boolean) as string[]),
    ]
    let parentMap: Record<string, string> = {}
    if (parentIds.length > 0) {
      const parents = await db
        .select({ id: categories.id, name: categories.name })
        .from(categories)
        .where(or(...parentIds.map((id) => eq(categories.id, id))))
      parentMap = Object.fromEntries(parents.map((p) => [p.id, p.name]))
    }

    const totalPages = Math.ceil(total / pageSize)

    return {
      items: items.map((c) => ({
        ...c,
        parentName: c.parentId ? (parentMap[c.parentId] ?? null) : null,
      })),
      page,
      totalPages: Math.max(totalPages, 1),
      total,
    }
  },

  // ── SINGLE ──────────────────────────────────────────────────────────────────
  findById: async (id: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.id, id),
    })
  },

  findBySlug: async (slug: string) => {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    })
  },

  // ── CREATE ──────────────────────────────────────────────────────────────────
  create: async (data: NewCategory) => {
    const [category] = await db.insert(categories).values(data).returning()
    return category
  },

  // ── UPDATE ──────────────────────────────────────────────────────────────────
  update: async (id: string, data: UpdateCategory) => {
    const [category] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning()
    return category
  },

  // ── DELETE ──────────────────────────────────────────────────────────────────
  delete: async (id: string) => {
    await db.delete(categories).where(eq(categories.id, id))
  },
}
