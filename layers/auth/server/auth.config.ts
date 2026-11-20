import { defineServerAuth } from '@nuxtjs/better-auth/config'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '~~/server/db/client'
import { PASSWORD_LENGTH } from '../shared/auth.schema'
import * as schema from '../shared/auth.table'

export default defineServerAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: PASSWORD_LENGTH.min,
    maxPasswordLength: PASSWORD_LENGTH.max,
  },
  advanced: {
    database: { generateId: 'uuid' },
  },
})
