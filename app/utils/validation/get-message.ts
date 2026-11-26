import type { z } from 'zod'
import type { MessageParams } from './translate'

import { messages } from './messages'
import { translate } from './translate'

/**
 * Text for a Zod issue: `fields[name][key]` → `defaults[key]` → `defaults.invalid`.
 * @param issue - Zod issue with `input`, used to detect empty values
 * @returns user-facing text
 * @example schema.safeParse(value, { error: getMessage })
 */
export function getMessage(issue: z.core.$ZodRawIssue): string {
  const fieldName = getFieldName(issue.path ?? [])
  const key = getMessageKey(issue)
  const params = getParams(issue)

  const scopes = fieldName
    ? [`fields.${fieldName}`, 'defaults']
    : ['defaults']

  for (const scope of scopes) {
    const message = key && translate(`${scope}.${key}`, params)

    if (message)
      return message
  }

  return messages.defaults.invalid
}

function isEmpty(value: unknown): boolean {
  return value === undefined
    || value === null
    || (typeof value === 'string' && value.trim() === '')
}

/** Message key: `required` for empty input first, then `custom.<key>`, `too_small.<origin>`, or the issue code. */
function getMessageKey(issue: z.core.$ZodRawIssue): string | undefined {
  if (isEmpty(issue.input))
    return 'required'

  if (issue.code === 'custom')
    return typeof issue.params?.key === 'string' ? `custom.${issue.params.key}` : undefined

  if (issue.code === 'too_small' || issue.code === 'too_big')
    return issue.origin ? `${issue.code}.${issue.origin}` : undefined

  return issue.code
}

function getParams(issue: z.core.$ZodRawIssue): MessageParams {
  if (issue.code === 'too_small')
    return { min: Number(issue.minimum) }

  if (issue.code === 'too_big')
    return { max: Number(issue.maximum) }

  return {}
}

/** Last non-index path segment: `['items', 0, 'email']` → `email`. */
function getFieldName(path: PropertyKey[]): string | undefined {
  return path
    .map(String)
    .findLast(segment => !/^\d+$/.test(segment))
}
