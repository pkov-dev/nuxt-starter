import type { z } from 'zod'

import { getMessage } from './get-message'

/**
 * Replaces Zod error texts with texts from `messages`, without changing Zod globally.
 * Returns a Standard Schema accepted by vee-validate.
 *
 * @example
 * useForm({ validationSchema: localizeSchema(LoginSchema) })
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
