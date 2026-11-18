import { z } from 'zod'

export default defineNuxtPlugin(() => {
  z.config({
    customError: getMessage,
  })
})
