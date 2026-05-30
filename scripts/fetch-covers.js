#!/usr/bin/env node
// Fetches external cover-image URLs from oddments/, saves to static/covers/,
// and rewrites frontmatter in-place to use local paths.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const ODDMENTS_DIR = 'oddments'
const COVERS_DIR = 'static/covers'
const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/

function getMarkdownFiles(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return getMarkdownFiles(full)
      if (entry.isFile() && entry.name.endsWith('.md')) return [full]
      return []
    })
  } catch {
    return []
  }
}

function coverPaths(rootDir, filepath, coverUrl) {
  const exhibitSlug = basename(filepath, '.md').replace(DATE_PREFIX, '')
  const ext = extname(new URL(coverUrl).pathname) || '.jpg'
  const filename = `${exhibitSlug}${ext}`
  const destPath = join(rootDir, COVERS_DIR, filename)
  const localPath = `/covers/${filename}`
  return { destPath, localPath }
}

async function downloadCover(coverUrl, destPath, fetchImpl) {
  const res = await fetchImpl(coverUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  writeFileSync(destPath, Buffer.from(await res.arrayBuffer()))
}

export async function fetchCovers(options = {}) {
  const rootDir = options.rootDir ?? process.cwd()
  const dryRun = options.dryRun ?? false
  const fetchImpl = options.fetchImpl ?? globalThis.fetch
  const files = getMarkdownFiles(join(rootDir, ODDMENTS_DIR))
  const results = []

  if (!dryRun) mkdirSync(join(rootDir, COVERS_DIR), { recursive: true })

  for (const filepath of files) {
    const raw = readFileSync(filepath, 'utf8')
    const { data } = matter(raw)
    const coverUrl = data['cover-image']

    if (!coverUrl || typeof coverUrl !== 'string' || !coverUrl.startsWith('http')) continue

    let paths
    try {
      paths = coverPaths(rootDir, filepath, coverUrl)
    } catch (err) {
      results.push({
        status: 'failed',
        file: relative(rootDir, filepath),
        url: coverUrl,
        error: err.message,
      })
      continue
    }

    const { destPath, localPath } = paths
    const destRelative = relative(rootDir, destPath)
    const fileRelative = relative(rootDir, filepath)
    const exists = existsSync(destPath)

    if (dryRun) {
      results.push({
        status: exists ? 'would-reuse' : 'would-fetch',
        file: fileRelative,
        url: coverUrl,
        path: destRelative,
        localPath,
      })
      continue
    }

    if (!exists) {
      try {
        await downloadCover(coverUrl, destPath, fetchImpl)
        results.push({ status: 'fetched', file: fileRelative, url: coverUrl, path: destRelative, localPath })
      } catch (err) {
        results.push({ status: 'failed', file: fileRelative, url: coverUrl, path: destRelative, error: err.message })
        continue
      }
    } else {
      results.push({ status: 'reused', file: fileRelative, url: coverUrl, path: destRelative, localPath })
    }

    const rewritten = raw.replace(coverUrl, localPath)
    if (rewritten !== raw) writeFileSync(filepath, rewritten)
  }

  return results
}

export function summarizeCoverFetch(results, dryRun = false) {
  const fetched = results.filter(result => result.status === 'fetched').length
  const reused = results.filter(result => result.status === 'reused').length
  const wouldFetch = results.filter(result => result.status === 'would-fetch').length
  const wouldReuse = results.filter(result => result.status === 'would-reuse').length
  const failed = results.filter(result => result.status === 'failed').length

  if (dryRun) return `Covers would fetch ${wouldFetch} image(s), reuse ${wouldReuse}, failed ${failed}.`
  return `Covers fetched ${fetched} image(s), reused ${reused}, failed ${failed}.`
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const results = await fetchCovers({ dryRun })
  for (const result of results) {
    if (result.status === 'failed') {
      console.error(`Failed: ${result.file} (${result.error})`)
    } else {
      const verb = {
        fetched: 'Fetched',
        reused: 'Reused',
        'would-fetch': 'Would fetch',
        'would-reuse': 'Would reuse',
      }[result.status]
      console.log(`${verb}: ${result.url} -> ${result.path}`)
    }
  }
  console.log(summarizeCoverFetch(results, dryRun))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
