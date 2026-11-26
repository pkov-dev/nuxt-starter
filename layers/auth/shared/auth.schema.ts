import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { user } from './auth.table'

export const PASSWORD_LENGTH = { min: 8, max: 128 } as const

const UserInsertSchema = createInsertSchema(user, {
  name: s => s.trim().min(1),
  email: s => s.trim().pipe(z.email()),
})

const password = z.string().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max)

export const SignInSchema = UserInsertSchema
  .pick({ email: true })
  .extend({ password })

export const SignUpSchema = UserInsertSchema
  .pick({ name: true, email: true })
  .extend({
    password,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    params: { key: 'password_mismatch' satisfies FieldErrorCode },
  })

export type SignInInput = z.infer<typeof SignInSchema>
export type SignUpInput = z.infer<typeof SignUpSchema>
export type User = typeof user.$inferSelect
