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
