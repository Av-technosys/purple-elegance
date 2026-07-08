import { db } from "@/server/db"
import { users } from "./user.schema"
import { eq } from "drizzle-orm"
import type { NewUser, UpdateUserProfile } from "./user.types"

export const userRepository = {

  findById: async (id: string) => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    })
  },

  findByCognitoId: async (cognitoId: string) => {
    return db.query.users.findFirst({
      where: eq(users.cognitoId, cognitoId),
    })
  },

  findByEmail: async (email: string) => {
    return db.query.users.findFirst({
      where: eq(users.email, email),
    })
  },


  create: async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning()
    return user
  },


  updateProfile: async (id: string, data: UpdateUserProfile) => {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user
  },

  deactivate: async (id: string) => {
    const [user] = await db
      .update(users)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user
  },
}
