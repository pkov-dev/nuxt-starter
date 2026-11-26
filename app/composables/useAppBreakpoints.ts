import { useBreakpoints } from '@vueuse/core'

const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
} as const

/**
 * Project breakpoints (`xs` 480 … `xl` 1920) for VueUse `useBreakpoints`.
 * @returns VueUse breakpoints helpers
 * @example const isMobile = useAppBreakpoints().smaller('md')
 */
export function useAppBreakpoints() {
  return useBreakpoints(breakpoints)
}
