import { z } from 'zod'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(20, 'Password must be at least 20 characters'),
})

export default defineEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const body = await readValidatedBodyZod(
    event,
    schema,
  )

  return {
    data: body,
    success: true,
  }
})
