import tailwindcss from '@tailwindcss/vite'
import { createResolver } from 'nuxt/kit'

import './config/env'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-19',
  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/scripts',
    'nuxt-security',
    '@nuxt/hints',
    '@nuxt/a11y',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Home',
    },
  },
  fonts: {
    families: [
      {
        name: 'Outfit',
        provider: 'google',
        weights: [400, 500, 700],
      },
      {
        name: 'Lora',
        provider: 'local',
        weights: [400, 700],
      },
    ],
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
  security: {
    headers: {
      contentSecurityPolicy: {
        // Nuxt Image CSP issue: https://github.com/nuxt/image/issues/1011
        'script-src-attr': ['\'unsafe-inline\''],
      },
    },
    csrf: true,
    requestSizeLimiter: {
      maxRequestSizeInBytes: 5_000_000,
      maxUploadFileRequestInBytes: 20_000_000,
    },
  },
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

  devtools: {
    enabled: true,
  },
})
