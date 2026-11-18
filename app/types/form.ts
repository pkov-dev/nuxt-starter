export type TextInputType
  = | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'

export interface FormInputProps {
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
}

export type InputValue = string | number | undefined

export interface FormTextInputProps extends FormInputProps {
  placeholder?: string
  autocomplete?: string
  readonly?: boolean
  pattern?: string
  type?: TextInputType

  error?: boolean
  ariaDescribedby?: string
}

export interface FormFieldProps {
  name: string
  label?: string
  description?: string
  required?: boolean
  validateOnValueUpdate?: boolean
  validateOnBlur?: boolean
}

export type FormTextFieldProps
  = Omit<
    FormTextInputProps,
    'error'
    | 'ariaDescribedby'
    | 'required'
    | 'name'
  >
  & FormFieldProps
