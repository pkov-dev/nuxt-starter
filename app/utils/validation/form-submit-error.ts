import { FetchError } from 'ofetch'

/**
 * Submit error for `UiForm` from a source other than `$fetch`, e.g. an auth client.
 * @param data - a form error code, or field issues
 * @example throw new FormSubmitError({ code: 'invalid_credentials' })
 */
export class FormSubmitError extends Error {
  constructor(readonly data: FormErrorData | FieldIssue[]) {
    super('Form submit failed')
  }
}

/**
 * Error payload of a form submit, whatever threw it.
 * @param error - a `FetchError`, a `FormSubmitError` or anything else
 * @returns response `data.data`, `FormSubmitError.data`, or `undefined`
 * @example const data = getSubmitErrorData(error)
 */
export function getSubmitErrorData(error: unknown): unknown {
  if (error instanceof FormSubmitError)
    return error.data

  if (error instanceof FetchError)
    return error.data?.data
}
