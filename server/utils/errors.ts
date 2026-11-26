type FieldOf<TBody> = [TBody] extends [never] ? never : keyof TBody & string

/**
 * `createError` arguments for an error under a field; `TBody` is required and limits `field` to body fields.
 * @param field - body field the error belongs to
 * @param code - field error code
 * @returns 422 error options with one field issue
 * @example throw createError(fieldError<typeof body>('email', 'email_taken'))
 */
export function fieldError<TBody extends object = never>(
  field: NoInfer<FieldOf<TBody>>,
  code: FieldErrorCode,
): { statusCode: number, message: string, data: FieldIssue[] } {
  return {
    statusCode: 422,
    message: code,
    data: [
      {
        code: 'custom',
        path: [field],
        params: { key: code },
      },
    ],
  }
}

/**
 * `createError` arguments for an error about the whole form.
 * @param statusCode - HTTP status
 * @param code - form error code
 * @param params - values for placeholders in the error text
 * @returns error options with the form code
 * @example throw createError(formError(401, 'invalid_credentials'))
 */
export function formError(
  statusCode: number,
  code: FormErrorCode,
  params?: FormErrorData['params'],
): { statusCode: number, message: string, data: FormErrorData } {
  return {
    statusCode,
    message: code,
    data: { code, params },
  }
}
