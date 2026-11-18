import type { z } from 'zod'
import type { Namespace } from './get-message'

import { getMessage } from './get-message'

/**
 * Wraps a Zod schema into a Standard Schema whose issues carry texts from `messages`.
 *
 * The schema itself stays text-free (it is shared with the server);
 * texts are attached per parse, so the form namespace is available.
 *
 * Accepted by vee-validate as `validationSchema` and by any other
 * Standard Schema compatible form library.
 */
export function withMessages<T extends z.ZodType>(
  schema: T,
  namespace?: Namespace,
): { '~standard': z.core.$ZodStandardSchema<T> } {
  return {
    '~standard': {
      version: 1,
      vendor: 'app',
      validate: (value) => {
        const result = schema.safeParse(value, {
          error: issue => getMessage(issue, namespace),
        })

        return result.success
          ? { value: result.data }
          : { issues: result.error.issues }
      },
    },
  }
}
