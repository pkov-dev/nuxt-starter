import type { AuthActionError } from '@nuxtjs/better-auth'
import { FormSubmitError } from '~/utils/validation/form-submit-error'

const FORM_ERRORS: Partial<Record<string, FormErrorCode>> = {
  INVALID_EMAIL_OR_PASSWORD: 'invalid_credentials',
  EMAIL_NOT_VERIFIED: 'email_not_verified',
}

const FIELD_ERRORS: Partial<Record<string, FieldIssue>> = {
  USER_ALREADY_EXISTS: { code: 'custom', path: ['email'], params: { key: 'email_taken' } },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: { code: 'custom', path: ['email'], params: { key: 'email_taken' } },
}

/** Better Auth error codes → app error codes. Unknown codes fall back to `errors.unknown`. */
export function authFormError(error: AuthActionError): FormSubmitError | AuthActionError['raw'] {
  if (error.status === 429)
    return new FormSubmitError({ code: 'too_many_requests' })

  const formCode = error.code && FORM_ERRORS[error.code]
  if (formCode)
    return new FormSubmitError({ code: formCode })

  const fieldIssue = error.code && FIELD_ERRORS[error.code]
  if (fieldIssue)
    return new FormSubmitError([fieldIssue])

  return error.raw
}
