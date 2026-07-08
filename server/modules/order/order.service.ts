import { orderRepository } from "./order.repository"

export const orderService = {

  getPaginated: async (params: {
    page: number
    pageSize: number
    search?: string
    status?: string
  }) => {
    return orderRepository.findPaginated(params)
  },

  getDetail: async (id: string) => {
    const result = await orderRepository.findById(id)
    if (!result) throw new Error("Order not found")
    return result
  },

  updateStatus: async (id: string, status: string) => {
    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ]
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`)
    }
    return orderRepository.updateStatus(id, status)
  },

  getPaymentsPaginated: async (params: {
    page: number
    pageSize: number
    search?: string
    paymentStatus?: string
  }) => {
    return orderRepository.findPaymentsPaginated(params)
  },

  getDashboardStats: async () => {
    return orderRepository.getStats()
  },
}
