import type { z } from 'zod'

import { messages } from './messages'

export type Namespace = keyof typeof messages.entities

type MessageValue = string | ((limit?: number) => string)

/**
 * Empty form value: never filled, cleared, or whitespace only.
 *
 * Zod 4 reports such values with different codes depending on the schema
 * (`invalid_type` for undefined, `too_small` / `invalid_format` for ''),
 * so "required" has to be derived from the input, not from the code.
 */
export function isEmpty(value: unknown): boolean {
  return value === undefined
    || value === null
    || (typeof value === 'string' && value.trim() === '')
}

/**
 * Resolves a user-facing text for a Zod issue.
 *
 * Expects the issue to carry `input`: Zod provides it inside error maps,
 * for server issues it is restored from the form values (see format-server-issues.ts).
 */
export function getMessage(
  issue: z.core.$ZodRawIssue,
  namespace?: Namespace,
): string {
  const path = (issue.path ?? []).map(String)
  const fieldName = path.at(-1)
  const key = getMessageKey(issue)

  const message
    = (namespace ? lookup(messages.entities, [namespace, ...path, key]) : undefined)
      ?? (fieldName ? lookup(messages.fields, [fieldName, key]) : undefined)
      ?? lookup(messages.defaults, [key])

  if (message === undefined)
    return issue.message ?? 'Invalid value'

  return typeof message === 'function'
    ? message(getLimit(issue))
    : message
}

function getMessageKey(issue: z.core.$ZodRawIssue): string {
  if (isEmpty(issue.input))
    return 'required'

  if (issue.code === 'custom' && typeof issue.params?.key === 'string')
    return issue.params.key

  return issue.code
}

function getLimit(issue: z.core.$ZodRawIssue): number | undefined {
  if (issue.code === 'too_small')
    return Number(issue.minimum)

  if (issue.code === 'too_big')
    return Number(issue.maximum)

  return undefined
}

function lookup(source: object, path: string[]): MessageValue | undefined {
  const value = path.reduce<unknown>(
    (node, key) => (node && typeof node === 'object')
      ? (node as Record<string, unknown>)[key]
      : undefined,
    source,
  )

  return typeof value === 'string' || typeof value === 'function'
    ? value as MessageValue
    : undefined
}
