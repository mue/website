import { parse as parseYaml } from 'yaml'

export type FrontmatterParseResult<T extends Record<string, unknown>> = {
  data: T
  content: string
}

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/

export function parseFrontmatter<T extends Record<string, unknown>>(
  raw: string,
): FrontmatterParseResult<T> {
  const normalized = raw.replace(/\r\n/g, '\n')
  const match = normalized.match(FRONTMATTER_REGEX)

  if (!match) {
    return { data: {} as T, content: raw }
  }

  const [, yamlSource, content] = match

  try {
    const parsed = (yamlSource?.trim()
      ? (parseYaml(yamlSource) as unknown)
      : {}) as T

    return { data: (parsed ?? ({} as T)) as T, content }
  } catch {
    // If frontmatter is malformed, return the whole document as content.
    return { data: {} as T, content: raw }
  }
}
