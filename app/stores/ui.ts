export const useUIStore = defineStore('ui', () => {
  const isHeaderMenuOpen = ref(false)

  const toggleHeaderMenu = () => isHeaderMenuOpen.value = !isHeaderMenuOpen.value
  const closeHeaderMenu = () => isHeaderMenuOpen.value = false

  return {
    isHeaderMenuOpen,

    toggleHeaderMenu,
    closeHeaderMenu,
  }
})
