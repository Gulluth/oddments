import { parseOddments } from '$lib/oddments.js'
import { config } from '$lib/catalog.js'
import { parsePageSection } from '$lib/page-sections.js'

export const prerender = true

export function load() {
  const exhibits = parseOddments(process.env.ODDMENTS_DIR ?? 'oddments', config.customFields)
  const root = process.env.ODDMENTS_ROOT ?? '.'
  return {
    totalExhibits: exhibits.length,
    config,
    hero: parsePageSection('hero.md', root),
    body: parsePageSection('body.md', root),
  }
}
