import type { z } from 'zod'

import { getMessage } from './get-message'

/**
 * Wraps a Zod schema so its errors use texts from `messages`, without changing Zod globally.
 * @param schema - Zod schema of the form
 * @returns Standard Schema accepted by vee-validate
 * @example useForm({ validationSchema: localizeSchema(SignInSchema) })
 */
export function localizeSchema<T extends z.ZodType>(
  schema: T,
): { '~standard': z.core.$ZodStandardSchema<T> } {
  return {
    '~standard': {
      version: 1,
      vendor: 'app',
      validate: (value) => {
        const result = schema.safeParse(value, { error: getMessage })

        return result.success
          ? { value: result.data }
          : { issues: result.error.issues }
      },
    },
  }
}
