import { z } from 'zod'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(20, 'Password must be at least 8 characters'),
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
