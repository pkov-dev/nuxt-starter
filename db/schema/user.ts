import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
