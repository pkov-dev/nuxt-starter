import tailwindcss from '@tailwindcss/vite'

import './server/config/env'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@vueuse/nuxt'],
  css: ['~/assets/styles/tailwind.css', '~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/styles/abstracts/index" as *;
          `,
        },
      },
    },
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
})
