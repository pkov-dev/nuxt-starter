export default defineAppConfig({
  navigation: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
  ],
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
})
