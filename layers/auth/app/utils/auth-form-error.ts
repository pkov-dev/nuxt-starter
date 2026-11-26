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

/**
 * Maps a Better Auth error to app error codes; unknown codes fall back to `errors.unknown`.
 * @param error - error returned by a Better Auth action
 * @returns `FormSubmitError` for known codes, otherwise the raw error
 * @example if (signIn.error.value) throw authFormError(signIn.error.value)
 */
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
