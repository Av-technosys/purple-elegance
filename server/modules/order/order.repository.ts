import { db } from "@/server/db"
import { orders, orderItems } from "./order.schema"
import { users } from "../user/user.schema"
import { addresses } from "../address/address.schema"
import { eq, ilike, or, count, desc, and } from "drizzle-orm"

export const orderRepository = {

  // ── PAGINATED LIST ──────────────────────────────────────────────────────────
  findPaginated: async ({
    page,
    pageSize,
    search,
    status,
  }: {
    page: number
    pageSize: number
    search?: string
    status?: string
  }) => {
    const offset = (page - 1) * pageSize

    const filters: ReturnType<typeof and>[] = []

    if (search) {
      filters.push(
        or(
          ilike(orders.orderNumber, `%${search}%`),
          ilike(orders.id, `%${search}%`),
        )!,
      )
    }

    if (status && status !== "__all__") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filters.push(eq(orders.status, status as any))
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          id: orders.id,
          orderNumber: orders.orderNumber,
          status: orders.status,
          paymentStatus: orders.paymentStatus,
          paymentMethod: orders.paymentMethod,
          paymentId: orders.paymentId,
          subtotal: orders.subtotal,
          discount: orders.discount,
          shippingCharge: orders.shippingCharge,
          total: orders.total,
          addressId: orders.addressId,
          createdAt: orders.createdAt,
          // User join
          userId: users.id,
          userFirstName: users.firstName,
          userLastName: users.lastName,
          userEmail: users.email,
          // Address join
          addressLine1: addresses.line1,
          addressLine2: addresses.line2,
        })
        .from(orders)
        .leftJoin(users, eq(orders.userId, users.id))
        .leftJoin(addresses, eq(orders.addressId, addresses.id))
        .where(whereClause)
        .orderBy(desc(orders.createdAt))
        .limit(pageSize)
        .offset(offset),
      db.select({ total: count() }).from(orders).where(whereClause),
    ])

    const totalPages = Math.ceil(total / pageSize)

    return {
      data: rows,
      meta: {
        page,
        totalPages: Math.max(totalPages, 1),
        total,
        pageSize,
      },
    }
  },

  // ── SINGLE ORDER DETAIL ─────────────────────────────────────────────────────
  findById: async (id: string) => {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, id),
    })
    if (!order) return null

    const [items, user, address] = await Promise.all([
      db.select().from(orderItems).where(eq(orderItems.orderId, id)),
      db
        .select({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          phone: users.phone,
        })
        .from(users)
        .where(eq(users.id, order.userId))
        .then((rows) => rows[0] ?? null),
      order.addressId
        ? db
            .select()
            .from(addresses)
            .where(eq(addresses.id, order.addressId))
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
    ])

    return { order, items, user, address }
  },

  // ── UPDATE STATUS ───────────────────────────────────────────────────────────
  updateStatus: async (id: string, status: string) => {
    const [order] = await db
      .update(orders)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning()
    return order
  },

  // ── PAGINATED PAYMENTS (from orders table) ──────────────────────────────────
  findPaymentsPaginated: async ({
    page,
    pageSize,
    search,
    paymentStatus,
  }: {
    page: number
    pageSize: number
    search?: string
    paymentStatus?: string
  }) => {
    const offset = (page - 1) * pageSize

    const filters: ReturnType<typeof and>[] = []

    if (search) {
      filters.push(
        or(
          ilike(orders.orderNumber, `%${search}%`),
          ilike(orders.id, `%${search}%`),
          ilike(orders.paymentId, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.firstName, `%${search}%`),
        )!,
      )
    }

    if (paymentStatus && paymentStatus !== "__all__") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filters.push(eq(orders.paymentStatus, paymentStatus as any))
    }

    const whereClause = filters.length > 0 ? and(...filters) : undefined

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          payment: {
            id: orders.id,
            createdAt: orders.createdAt,
            paymentAmount: orders.total,
            paymentMethod: orders.paymentMethod,
            paymentStatus: orders.paymentStatus,
            paymentId: orders.paymentId,
            paymentOrderId: orders.orderNumber,
          },
          order: {
            id: orders.id,
          },
          user: {
            name: users.firstName,
            email: users.email,
          },
        })
        .from(orders)
        .leftJoin(users, eq(orders.userId, users.id))
        .where(whereClause)
        .orderBy(desc(orders.createdAt))
        .limit(pageSize)
        .offset(offset),
      db
        .select({ total: count() })
        .from(orders)
        .leftJoin(users, eq(orders.userId, users.id))
        .where(whereClause),
    ])

    const totalPages = Math.ceil(total / pageSize)

    return {
      data: rows,
      meta: {
        page,
        totalPages: Math.max(totalPages, 1),
        total,
        pageSize,
      },
    }
  },

  // ── DASHBOARD STATS ─────────────────────────────────────────────────────────
  getStats: async () => {
    const [orderCount, userCount] = await Promise.all([
      db.select({ total: count() }).from(orders),
      db.select({ total: count() }).from(users),
    ])
    return {
      orders: orderCount[0]?.total ?? 0,
      users: userCount[0]?.total ?? 0,
    }
  },
}
