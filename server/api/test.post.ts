import { z } from 'zod'

// Test endpoint. The server knows no user-facing texts: it returns raw issues,
// texts are resolved on the client (app/utils/validation/messages.ts).
//
// Intentionally stricter than the client schema (min 20 vs min 8)
// to test how server validation errors are displayed.
const schema = z.object({
  email: z.email(),
  password: z.string().min(20),
})

export default defineEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const body = await readValidatedBodyZod(
    event,
    schema,
  )

  // Business error example: same issue format, no text, only a key
  if (body.email === 'taken@example.com') {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: [{ code: 'custom', path: ['email'], params: { key: 'email_taken' } }],
    })
  }

  return {
    data: body,
    success: true,
  }
})
