import type { z } from 'zod'

import { getMessage } from './get-message'

/**
 * Server Zod issues → field texts; `input` is restored from form values because Zod strips it.
 * @param issues - issues from a 422 response
 * @param values - submitted form values
 * @returns first text per field
 * @example setErrors(formatServerIssues(data, values))
 */
export function formatServerIssues<TValues extends object>(
  issues: z.core.$ZodIssue[],
  values: TValues,
): Partial<Record<keyof TValues, string>> {
  const errors: Partial<Record<string, string>> = {}

  for (const issue of issues) {
    const field = issue.path.join('.')
    const input = getByPath(values, issue.path)

    errors[field] ??= getMessage({ ...issue, input } as z.core.$ZodRawIssue)
  }

  return errors as Partial<Record<keyof TValues, string>>
}

/**
 * Checks that error data is a list of Zod issues.
 * @param data - error `data` from a response
 * @returns `true` for an array of issues with `code` and `path`
 * @example if (isIssueList(data)) setErrors(formatServerIssues(data, values))
 */
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
