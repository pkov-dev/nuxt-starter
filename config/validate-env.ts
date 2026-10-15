/* eslint-disable node/no-process-env */
import type { z, ZodObject, ZodRawShape } from 'zod'

import { ZodError } from 'zod'

/**
 * Validates environment variables using a Zod schema.
 *
 * Throws during runtime startup when required variables are missing.
 * Skips strict validation during build phase because runtime env is unavailable.
 *
 * @returns Typed validated environment variables.
 */
export default function validateEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  env: Record<string, string | undefined> = process.env,
) {
  try {
    return EnvSchema.parse(env)
  }
  catch (error) {
    if (error instanceof ZodError) {
      const missing = error.issues
        .map(issue => `- ${issue.path[0]}`)
        .join('\n')

      const message = `Missing required values in .env:\n${missing}`

      if (process.env.APP_BUILD === 'true') {
        console.warn(message)
        return {} as z.infer<typeof EnvSchema>
      }

      const e = new Error(message)
      e.stack = ''
      throw e
    }

    throw error
  }
}
