import { defineConfig } from 'drizzle-kit'
import env from './config/env'

export default defineConfig({
  schema: './db/schema/index.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
