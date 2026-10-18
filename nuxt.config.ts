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
    '@nuxt/image',
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
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
        mediaQuery: true,
      },
    },
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

  image: {
    quality: 80,
    screens: {
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
  devtools: {
    enabled: true,
  },
})
