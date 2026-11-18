import type { z } from 'zod'
import type { Namespace } from './get-message'

import { getMessage } from './get-message'

/**
 * Server responds with raw Zod issues (no texts).
 * Zod strips `input` from them, so it is restored from the submitted form values
 * and the issue goes through the same `getMessage` as client-side validation.
 */
export function formatServerIssues<TValues extends object>(
  issues: z.core.$ZodIssue[],
  values: TValues,
  namespace?: Namespace,
): Partial<Record<keyof TValues, string>> {
  const errors: Partial<Record<string, string>> = {}

  for (const issue of issues) {
    const field = issue.path.join('.')
    const input = getByPath(values, issue.path)

    errors[field] ??= getMessage({ ...issue, input } as z.core.$ZodRawIssue, namespace)
  }

  return errors as Partial<Record<keyof TValues, string>>
}

export function isIssueList(data: unknown): data is z.core.$ZodIssue[] {
  return Array.isArray(data)
    && data.every(item =>
      item
      && typeof item === 'object'
      && typeof item.code === 'string'
      && Array.isArray(item.path),
    )
}

function getByPath(source: unknown, path: PropertyKey[]): unknown {
  return path.reduce<unknown>(
    (node, key) => (node && typeof node === 'object')
      ? (node as Record<PropertyKey, unknown>)[key]
      : undefined,
    source,
  )
}
