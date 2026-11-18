/**
 * The only place with user-facing validation texts.
 *
 * Lookup order (first match wins):
 * 1. entities[namespace][...path][key]
 * 2. fields[fieldName][key]
 * 3. defaults[key]
 *
 * `key` is the Zod issue code, `required` for empty values,
 * or `params.key` for custom (business) issues.
 */
export const messages = {
  defaults: {
    required: 'This field is required defaults',
    invalid: 'Invalid value defaults',
    invalid_format: 'Invalid format defaults',

    too_small: (min?: number) =>
      min
        ? `Minimum ${min} characters defaults`
        : 'Value is too small defaults',

    too_big: (max?: number) =>
      max
        ? `Maximum ${max} characters defaults`
        : 'Value is too big defaults',
  },

  fields: {
    email: {
      required: 'Please enter your email fields',
      invalid_format: 'Please enter a valid email fields',
      // Business error from the server: { code: 'custom', params: { key: 'email_taken' } }
      email_taken: 'This email is already registered fields',
    },
    password: {
      required: 'Please enter your password fields',
      too_small: (min?: number) =>
        `Password must contain at least ${min} characters fields`,
    },
  },

  entities: {
    auth: {
      password: {
        required: 'Password is required for login entity',

        too_small: (min?: number) =>
          `Password must contain at least ${min} characters entity`,
      },
      email: {
        required: 'Please enter your email entity',
        invalid_format: 'Please enter a valid email entity',
      },
    },

    product: {
      title: {
        required: 'Product title is required',
      },

      price: {
        too_small: 'Product price must be greater than zero',
      },
    },
  },
} as const
