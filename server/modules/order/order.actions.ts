"use server"

import { orderService } from "./order.service"

// ── PAGINATED ORDER LIST ─────────────────────────────────────────────────────
export async function fetchOrders(params: {
  page: number
  pageSize: number
  search?: string
  status?: string
}) {
  return orderService.getPaginated(params)
}

// ── ORDER DETAIL ─────────────────────────────────────────────────────────────
export async function fetchOrderDetails(id: string) {
  try {
    return orderService.getDetail(id)
  } catch {
    return null
  }
}

// ── UPDATE ORDER STATUS ──────────────────────────────────────────────────────
export async function updateOrderStatus(id: string, status: string) {
  try {
    const order = await orderService.updateStatus(id, status)
    return { success: true, data: order, message: "Order status updated" }
  } catch (error) {
    return { success: false, data: null, message: (error as Error).message }
  }
}

// ── PAGINATED PAYMENTS (from orders table) ───────────────────────────────────
export async function fetchPurchasePayments(params: {
  page: number
  pageSize: number
  search?: string
  paymentStatus?: string
}) {
  return orderService.getPaymentsPaginated(params)
}

// ── DASHBOARD STATS ──────────────────────────────────────────────────────────
export async function getDashboardStats() {
  return orderService.getDashboardStats()
}
