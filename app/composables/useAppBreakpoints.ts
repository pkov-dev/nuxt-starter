import { useBreakpoints } from '@vueuse/core'

const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
} as const

export function useAppBreakpoints() {
  return useBreakpoints(breakpoints)
}
