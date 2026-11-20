export default defineNuxtConfig({
  modules: ['@nuxtjs/better-auth'],
  auth: {
    redirects: {
      login: '/login',
      guest: '/account',
      authenticated: '/account',
      logout: '/login',
    },
  },
  routeRules: {
    '/api/auth/**': { csurf: false },
  },
})
