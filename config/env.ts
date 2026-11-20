import { z } from 'zod'
import validateEnv from './validate-env'

const EnvSchema = z.object({
  NODE_ENV: z.string(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),

  BETTER_AUTH_SECRET: z.string().min(32),
})

export type Env = z.infer<typeof EnvSchema>

export default validateEnv(EnvSchema)
