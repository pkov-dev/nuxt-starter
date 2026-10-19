export const useUIStore = defineStore('ui', () => {
  const isMenuOpen = ref(false)
  const test = ref('test')

  return {
    isMenuOpen,
    test,
  }
})
