export type FieldErrorCode
  = | 'email_taken'
    | 'password_mismatch'

export type FormErrorCode
  = | 'invalid_credentials'
    | 'email_not_verified'
    | 'too_many_requests'

export interface FieldIssue {
  code: 'custom'
  path: PropertyKey[]
  params: { key: FieldErrorCode }
}

export interface FormErrorData {
  code: FormErrorCode
  params?: Record<string, string | number>
}
