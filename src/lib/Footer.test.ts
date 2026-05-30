import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { config } from './catalog.js'
import Footer from './Footer.svelte'

describe('Footer', () => {
  it('renders RSS by default', () => {
    render(Footer, { config })

    expect(screen.getByRole('link', { name: /rss feed/i })).toBeInTheDocument()
  })

  it('renders configured copyright and social links', () => {
    render(Footer, {
      config: {
        ...config,
        copyright: '(c) 2026 My Catalog',
        copyrightUrl: 'https://example.com/license',
        socials: {
          ...config.socials,
          github: 'https://github.com/example',
          email: 'hello@example.com',
        },
      },
    })

    expect(screen.getByRole('link', { name: '(c) 2026 My Catalog' })).toHaveAttribute('href', 'https://example.com/license')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/example')
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:hello@example.com')
  })
})
