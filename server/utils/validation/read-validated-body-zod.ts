import type { H3Event } from 'h3'
import type { z, ZodType } from 'zod'
import { readValidatedBody } from 'h3'

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
