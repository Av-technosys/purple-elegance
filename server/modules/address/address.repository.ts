import { db } from "@/server/db"
import { addresses } from "./address.schema"
import { and, eq } from "drizzle-orm"
import type { NewAddress, UpdateAddress } from "./address.types"

export const addressRepository = {

  findAllByUserId: async (userId: string) => {
    return db.query.addresses.findMany({
      where: eq(addresses.userId, userId),
      orderBy: (addresses, { desc }) => [desc(addresses.isDefault)],
    })
  },

  findById: async (id: string) => {
    return db.query.addresses.findFirst({
      where: eq(addresses.id, id),
    })
  },

  findByIdAndUserId: async (id: string, userId: string) => {
    return db.query.addresses.findFirst({
      where: and(eq(addresses.id, id), eq(addresses.userId, userId)),
    })
  },


  create: async (data: NewAddress) => {
    const [address] = await db.insert(addresses).values(data).returning()
    return address
  },


  update: async (id: string, data: UpdateAddress) => {
    const [address] = await db
      .update(addresses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(addresses.id, id))
      .returning()
    return address
  },

  // First unset all defaults for user, then set the chosen one

  setDefault: async (id: string, userId: string) => {
    await db
      .update(addresses)
      .set({ isDefault: false, updatedAt: new Date() })
      .where(eq(addresses.userId, userId))

    const [address] = await db
      .update(addresses)
      .set({ isDefault: true, updatedAt: new Date() })
      .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
      .returning()

    return address
  },


  delete: async (id: string) => {
    const [address] = await db
      .delete(addresses)
      .where(eq(addresses.id, id))
      .returning()
    return address
  },
}
