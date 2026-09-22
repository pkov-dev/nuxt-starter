import { useBreakpoints } from '@vueuse/core'

const breakpoints = {
  mobileSmall: 480,
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  hd: 1920,
} as const

export function useAppBreakpoints() {
  return useBreakpoints(breakpoints)
}
