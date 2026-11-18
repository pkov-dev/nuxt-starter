import { defineConfig } from 'drizzle-kit'
import env from './config/env'

export default defineConfig({
  schema: './shared/db/schema/index.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
