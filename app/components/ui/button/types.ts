import type { RouteLocationRaw } from 'vue-router'

export interface ButtonProps {
  disabled?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}
