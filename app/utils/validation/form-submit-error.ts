import { FetchError } from 'ofetch'

/**
 * Submit error for `UiForm` from a source other than `$fetch`, e.g. an auth client.
 *
 * @example
 * throw new FormSubmitError({ code: 'invalid_credentials' })
 */
export class FormSubmitError extends Error {
  constructor(readonly data: FormErrorData | FieldIssue[]) {
    super('Form submit failed')
  }
}

/** Error `data` from a `$fetch` response or a `FormSubmitError`. */
export function getSubmitErrorData(error: unknown): unknown {
  if (error instanceof FormSubmitError)
    return error.data

  if (error instanceof FetchError)
    return error.data?.data
}
