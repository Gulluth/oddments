import { describe, expect, it } from 'vitest'
import { join } from 'node:path'
import { parsePageSection } from './page-sections.js'

const FIXTURES = join(import.meta.dirname, '../test/fixtures/page-sections')

describe('parsePageSection', () => {
  it('returns null when the file is absent', () => {
    expect(parsePageSection('hero.md', join(FIXTURES, 'absent'))).toBeNull()
  })

  it('renders markdown when published is missing', () => {
    const section = parsePageSection('hero.md', join(FIXTURES, 'published-by-default'))
    expect(section!.html).toContain('<h1>Welcome</h1>')
    expect(section!.html).toContain('<strong>curious</strong>')
  })

  it('renders markdown when published is true', () => {
    const section = parsePageSection('body.md', join(FIXTURES, 'published-true'))
    expect(section!.html).toContain('<p>More catalog context.</p>')
  })

  it('returns null when published is false', () => {
    expect(parsePageSection('hero.md', join(FIXTURES, 'unpublished'))).toBeNull()
  })
})
