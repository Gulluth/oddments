import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { afterEach, describe, expect, it } from 'vitest'
import { fetchCovers, summarizeCoverFetch } from './fetch-covers.js'

const roots = []

function makeRoot() {
  const root = mkdtempSync(join(tmpdir(), 'oddments-covers-'))
  roots.push(root)
  return root
}

async function writeExhibit(root, filename, coverUrl) {
  await mkdir(join(root, 'oddments'), { recursive: true })
  const filepath = join(root, 'oddments', filename)
  writeFileSync(filepath, `---\nname: Test Exhibit\ncover-image: ${coverUrl}\n---\n`)
  return filepath
}

function okFetch(body = 'image-bytes') {
  return async () => ({
    ok: true,
    status: 200,
    arrayBuffer: async () => Buffer.from(body),
  })
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true })))
})

describe('fetchCovers', () => {
  it('downloads external covers and rewrites frontmatter to local paths', async () => {
    const root = makeRoot()
    const exhibit = await writeExhibit(root, '2026-05-30-test-exhibit.md', 'https://example.com/cover.png')

    const results = await fetchCovers({ rootDir: root, fetchImpl: okFetch() })

    expect(results).toEqual([
      {
        status: 'fetched',
        file: join('oddments', '2026-05-30-test-exhibit.md'),
        url: 'https://example.com/cover.png',
        path: join('static', 'covers', 'test-exhibit.png'),
        localPath: '/covers/test-exhibit.png',
      },
    ])
    expect(readFileSync(join(root, 'static', 'covers', 'test-exhibit.png'), 'utf8')).toBe('image-bytes')
    expect(readFileSync(exhibit, 'utf8')).toContain('cover-image: /covers/test-exhibit.png')
  })

  it('reuses existing cover files without clobbering them', async () => {
    const root = makeRoot()
    const exhibit = await writeExhibit(root, '2026-05-30-test-exhibit.md', 'https://example.com/cover.png')
    await mkdir(join(root, 'static', 'covers'), { recursive: true })
    const coverPath = join(root, 'static', 'covers', 'test-exhibit.png')
    writeFileSync(coverPath, 'existing')
    let fetchCount = 0

    const results = await fetchCovers({
      rootDir: root,
      fetchImpl: async () => {
        fetchCount++
        return { ok: true, status: 200, arrayBuffer: async () => Buffer.from('new') }
      },
    })

    expect(results[0].status).toBe('reused')
    expect(fetchCount).toBe(0)
    expect(readFileSync(coverPath, 'utf8')).toBe('existing')
    expect(readFileSync(exhibit, 'utf8')).toContain('cover-image: /covers/test-exhibit.png')
  })

  it('reports planned work during dry-run without touching files', async () => {
    const root = makeRoot()
    const exhibit = await writeExhibit(root, '2026-05-30-test-exhibit.md', 'https://example.com/cover.png')

    const results = await fetchCovers({ rootDir: root, dryRun: true, fetchImpl: okFetch() })

    expect(results[0]).toMatchObject({
      status: 'would-fetch',
      path: join('static', 'covers', 'test-exhibit.png'),
    })
    expect(existsSync(join(root, 'static', 'covers', 'test-exhibit.png'))).toBe(false)
    expect(readFileSync(exhibit, 'utf8')).toContain('https://example.com/cover.png')
    expect(summarizeCoverFetch(results, true)).toBe('Covers would fetch 1 image(s), reuse 0, failed 0.')
  })

  it('continues after failed downloads', async () => {
    const root = makeRoot()
    await writeExhibit(root, '2026-05-30-failing-exhibit.md', 'https://example.com/fail.png')
    await writeExhibit(root, '2026-05-30-working-exhibit.md', 'https://example.com/ok.png')

    const results = await fetchCovers({
      rootDir: root,
      fetchImpl: async url => {
        if (url.includes('fail')) return { ok: false, status: 404, arrayBuffer: async () => Buffer.from('') }
        return { ok: true, status: 200, arrayBuffer: async () => Buffer.from('ok') }
      },
    })

    expect(results.map(result => result.status)).toEqual(['failed', 'fetched'])
    expect(readFileSync(join(root, 'static', 'covers', 'working-exhibit.png'), 'utf8')).toBe('ok')
    expect(summarizeCoverFetch(results)).toBe('Covers fetched 1 image(s), reused 0, failed 1.')
  })
})
