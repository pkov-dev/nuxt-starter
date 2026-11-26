import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'

const root = process.cwd()
const rootDocs = ['README.md', 'CONTRIBUTING.md', 'CLAUDE.md']
const rootEntries = new Set(readdirSync(root))
const repoPath = /^[\w.-]+(?:\/[\w.-]+)+\/?$/
const link = /\[[^\]]*\]\(([^)\s]+)\)/g
const inlineCode = /`([^`\n]+)`/g
const heading = /^#{1,6} (\S.*)$/gm

function listMarkdown(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)

    if (entry.isDirectory())
      return listMarkdown(path)

    return entry.name.endsWith('.md') ? [path] : []
  })
}

/** Replaces fenced code blocks with empty lines, keeping line numbers. */
function stripFences(text: string): string {
  return text.replace(/^```[\s\S]*?\n```/gm, block => block.replace(/[^\n]/g, ''))
}

function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-')
}

function anchorsOf(file: string): Set<string> {
  const text = stripFences(readFileSync(file, 'utf8'))

  return new Set([...text.matchAll(heading)].map(match => slugify(match[1] ?? '')))
}

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split('\n').length
}

function checkLink(file: string, target: string): string | undefined {
  if (/^[a-z]+:/i.test(target))
    return

  const [path = '', anchor] = target.split('#')
  const resolved = path ? resolve(dirname(file), path) : file

  if (!existsSync(resolved))
    return `missing link target: ${target}`

  if (anchor && statSync(resolved).isFile() && resolved.endsWith('.md') && !anchorsOf(resolved).has(anchor))
    return `missing anchor: ${target}`
}

/** Checks a backticked value only when it looks like a path starting with a top-level repo entry. */
function checkPath(value: string): string | undefined {
  if (!repoPath.test(value) || !rootEntries.has(value.split('/')[0] ?? ''))
    return

  if (!existsSync(resolve(root, value)))
    return `missing path: ${value}`
}

/** Every doc except the index itself must be linked from the index. */
function checkIndex(index: string, docs: string[]): string[] {
  const text = stripFences(readFileSync(index, 'utf8'))
  const linked = new Set([...text.matchAll(link)].map(match => resolve(dirname(index), (match[1] ?? '').split('#')[0] ?? '')))

  return docs
    .filter(doc => doc !== index && !linked.has(doc))
    .map(doc => `${relative(root, index)}  not listed: ${relative(root, doc)}`)
}

const docsIndex = join(root, 'docs', 'README.md')
const docs = listMarkdown(join(root, 'docs'))
const files = [...rootDocs.map(name => join(root, name)), ...docs]
const errors: string[] = checkIndex(docsIndex, docs)

for (const file of files) {
  const text = stripFences(readFileSync(file, 'utf8'))
  const name = relative(root, file)

  for (const match of text.matchAll(link)) {
    const error = checkLink(file, match[1] ?? '')

    if (error)
      errors.push(`${name}:${lineOf(text, match.index)}  ${error}`)
  }

  for (const match of text.matchAll(inlineCode)) {
    const error = checkPath(match[1] ?? '')

    if (error)
      errors.push(`${name}:${lineOf(text, match.index)}  ${error}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
