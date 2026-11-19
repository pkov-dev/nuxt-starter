import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { users } from '../db/schema'

export const UserSchema = createSelectSchema(users)

export const UserInsertSchema = createInsertSchema(users, {
  email: s => s.trim().pipe(z.email()),
  name: s => s.trim().min(2),
})
