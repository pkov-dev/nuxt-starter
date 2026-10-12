/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from 'zod'
import { ZodError } from 'zod'

export default function validateEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    return EnvSchema.parse(buildEnv)
  }
  catch (error) {
    if (error instanceof ZodError) {
      const missing = error.issues
        .map(issue => `- ${issue.path[0]}`)
        .join('\n')

      console.error(
        '\x1B[31m%s\x1B[0m',
        `Missing required values in .env:\n${missing}`,
      )

      return buildEnv
    }

    console.error(error)
    return buildEnv
  }
}
