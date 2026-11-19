import { messages } from './messages'

export type MessageParams = Record<string, string | number>

/** Resolves `fields.email.invalid_format`-like paths. The single swap point for i18n. */
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
