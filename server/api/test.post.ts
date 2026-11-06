import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBodyZod(
    event,
    schema,
  )

  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    data: body,
    success: true,
  }
})
