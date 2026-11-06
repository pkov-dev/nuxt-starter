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

export type InputValue = string | number

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
  label?: string
  description?: string
  error?: string
  required?: boolean
}

export type FormTextFieldProps = Omit<FormTextInputProps, 'error' | 'ariaDescribedby' | 'required'> & FormFieldProps
