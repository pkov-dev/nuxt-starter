import tailwindcss from '@tailwindcss/vite'
import { createResolver } from 'nuxt/kit'

import './config/env'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
  ],
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
  icon: {
    fallbackToApi: false,

    customCollections: [
      {
        prefix: 'app',
        normalizeIconName: false,
        dir: resolve('./app/assets/images/icons'),
      },
    ],
    clientBundle: {
      // Enable for SPA / static deployment without Nuxt server
      // includeCustomCollections: true,
      // scan: true,
    },
  },
  devtools: {
    enabled: true,
  },
})
