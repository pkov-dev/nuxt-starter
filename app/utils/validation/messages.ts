type SizeOrigin = 'string' | 'number' | 'array' | 'set' | 'date' | 'bigint' | 'file'

export interface MessageSet {
  required?: string
  invalid?: string
  invalid_type?: string
  invalid_format?: string
  invalid_value?: string
  not_multiple_of?: string
  too_small?: Partial<Record<SizeOrigin, string>>
  too_big?: Partial<Record<SizeOrigin, string>>
  custom?: Partial<Record<FieldErrorCode, string>>
}

type DefaultMessages = MessageSet & {
  required: string
  invalid: string
  custom: Record<FieldErrorCode, string>
}

type ErrorMessages = Record<FormErrorCode | 'validation_failed' | 'network' | 'unknown', string>

export const messages = {
  defaults: {
    required: 'Required',
    invalid: 'Invalid value',
    invalid_format: 'Invalid format',
    too_small: {
      string: 'Min {min} characters',
      number: 'Min {min}',
      array: 'Min {min} items',
    },
    too_big: {
      string: 'Max {max} characters',
      number: 'Max {max}',
      array: 'Max {max} items',
    },
    custom: {
      email_taken: 'Email already registered',
      password_mismatch: 'Passwords do not match',
    },
  },

  fields: {
    email: {
      invalid_format: 'Invalid email',
    },
  },

  form: {
    success: 'Submitted',
  },

  errors: {
    validation_failed: 'Validation Failed',
    network: 'No connection',
    unknown: 'Something went wrong',
    invalid_credentials: 'Invalid email or password',
    email_not_verified: 'Confirm your email first',
    too_many_requests: 'Too many attempts, try later',
  },
} satisfies {
  defaults: DefaultMessages
  fields: Record<string, MessageSet>
  form: { success: string }
  errors: ErrorMessages
}
