export type FieldErrorCode
  = | 'email_taken'

export type FormErrorCode
  = | 'invalid_credentials'

export interface FormErrorData {
  code: FormErrorCode
  params?: Record<string, string | number>
}
