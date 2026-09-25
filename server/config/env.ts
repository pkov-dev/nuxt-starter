import { z } from 'zod'
import validateEnv from './validate-env'

const EnvSchema = z.object({
  NODE_ENV: z.string(),
})

export type Env = z.infer<typeof EnvSchema>

export default validateEnv(EnvSchema)
