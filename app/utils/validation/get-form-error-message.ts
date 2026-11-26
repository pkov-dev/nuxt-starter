import { FetchError } from 'ofetch'

import { getSubmitErrorData } from './form-submit-error'
import { isIssueList } from './format-server-issues'
import { messages } from './messages'
import { translate } from './translate'

/**
 * Text for the form alert; server texts are never shown, only known codes.
 * @param error - anything thrown by the form `submit`
 * @returns network, validation, form-code or unknown error text
 * @example internalError.value = getFormErrorMessage(error)
 */
export function getFormErrorMessage(error: unknown): string {
  const unknown = messages.errors.unknown

  if (error instanceof FetchError && !error.response)
    return messages.errors.network

  const data = getSubmitErrorData(error)

  if (isIssueList(data))
    return messages.errors.validation_failed

  if (isFormErrorData(data))
    return translate(`errors.${data.code}`, data.params) ?? unknown

  return unknown
}

function isFormErrorData(data: unknown): data is FormErrorData {
  return !!data
    && typeof data === 'object'
    && typeof (data as { code?: unknown }).code === 'string'
}
