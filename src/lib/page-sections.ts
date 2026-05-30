import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface PageSection {
  html: string
}

export function parsePageSection(filename: 'hero.md' | 'body.md', root = '.'): PageSection | null {
  const filepath = join(root, filename)
  if (!existsSync(filepath)) return null

  try {
    const { data, content } = matter(readFileSync(filepath, 'utf-8'))
    if (data.published === false) return null

    const body = content.trim()
    if (!body) return null

    return { html: String(marked(body)) }
  } catch (e) {
    console.warn(`[oddments] skipping ${filename}:`, e)
    return null
  }
}
