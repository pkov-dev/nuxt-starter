import { messages } from './messages'

export type MessageParams = Record<string, string | number>

/**
 * Text by a dot path in `messages` with `{param}` substitution; the single swap point for i18n.
 * @param path - e.g. `fields.password.too_small.string`
 * @param params - values for `{min}`, `{max}` and other placeholders
 * @returns text, or `undefined` if the path does not exist
 * @example translate('defaults.too_small.string', { min: 8 })
 */
export function translate(path: string, params: MessageParams = {}): string | undefined {
  const template = path.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object')
      ? (node as Record<string, unknown>)[part]
      : undefined,
    messages,
  )

  return typeof template === 'string'
    ? interpolate(template, params)
    : undefined
}

function interpolate(template: string, params: MessageParams): string {
  return template.replace(
    /\{(\w+)\}/g,
    (placeholder, name: string) => name in params ? String(params[name]) : placeholder,
  )
}
