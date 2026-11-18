import type { z } from 'zod'

import { messages } from '~~/server/utils/validation/messages'

export type Namespace = keyof typeof messages.entities

type MessageValue
  = | string
    | ((value?: number) => string)

type MessageKey
  = | z.core.$ZodIssue['code']
    | 'required'

export function formatZodErrors<T extends Record<string, unknown>>(
  issues: z.core.$ZodRawIssue[],
  namespace?: Namespace,
): Partial<Record<keyof T, string>> {
  return issues.reduce<Partial<Record<keyof T, string>>>(
    (errors, issue) => {
      const field = issue.path.join('.') as keyof T
      console.log(namespace, 'namespace')

      errors[field] = getMessage(issue, namespace)

      return errors
    },
    {},
  )
}

export function getMessage(
  issue: z.core.$ZodRawIssue,
  namespace?: Namespace,
): string {
  const fieldPath = issue.path.map(String)
  const fieldName = fieldPath.at(-1)

  const messageKey = getMessageKey(issue)

  /**
   * 1. Entity messages
   *
   * auth.password.required
   * auth.password.too_small
   */
  if (namespace) {
    const entityMessage = getNestedValue(
      messages.entities,
      [
        namespace,
        ...fieldPath,
        messageKey,
      ],
    )

    if (entityMessage) {
      return resolveMessage(entityMessage, issue)
    }
  }

  /**
   * 2. Shared field messages
   *
   * password.required
   * password.too_small
   */
  if (fieldName) {
    const fieldMessage = getNestedValue(
      messages.fields,
      [
        fieldName,
        messageKey,
      ],
    )

    if (fieldMessage) {
      return resolveMessage(fieldMessage, issue)
    }
  }

  /**
   * 3. Global defaults
   */
  const defaultMessage = getDefaultMessage(messageKey)

  if (defaultMessage) {
    return resolveMessage(defaultMessage, issue)
  }

  return issue.message || 'Invalid value'
}

function getMessageKey(
  issue: z.core.$ZodRawIssue,
): MessageKey {
  if (
    issue.code === 'invalid_type'
    && issue.input === undefined
  ) {
    return 'required'
  }

  return issue.code
}

function getDefaultMessage(
  key: MessageKey,
): MessageValue | undefined {
  return messages.defaults[key]
}

function resolveMessage(
  message: MessageValue,
  issue: z.core.$ZodRawIssue,
): string {
  if (typeof message === 'function') {
    return message(
      issue.minimum ?? issue.maximum,
    )
  }

  return message
}

function getNestedValue(
  object: Record<string, unknown>,
  path: string[],
): MessageValue | undefined {
  return path.reduce<unknown>(
    (value, key) => {
      if (
        value
        && typeof value === 'object'
      ) {
        return (
          value as Record<string, unknown>
        )[key]
      }

      return undefined
    },
    object,
  ) as MessageValue | undefined
}
