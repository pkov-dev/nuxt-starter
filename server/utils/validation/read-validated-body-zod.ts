import type { H3Event } from 'h3'
import type { z, ZodType } from 'zod'
import { readValidatedBody } from 'h3'

/**
 * Reads and validates the request body; throws 422 with raw Zod issues on failure.
 * @param event - H3 event
 * @param schema - Zod schema of the body
 * @returns parsed body
 * @example const body = await readValidatedBodyZod(event, SignInSchema)
 */
export async function readValidatedBodyZod<
  TSchema extends ZodType,
>(
  event: H3Event,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  const result = await readValidatedBody(event, schema.safeParse)

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.issues,
    })
  }

  return result.data
}
