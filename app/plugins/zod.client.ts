import { z } from 'zod'

export default defineNuxtPlugin({
  name: 'zod',
  order: -30,
  setup() {
    z.config({ jitless: true })
  },
})
