import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { config } from './catalog.js'
import SiteHeader from './SiteHeader.svelte'

describe('SiteHeader', () => {
  it('renders title text by default', () => {
    render(SiteHeader, { config: { ...config, icon: '', logo: '' } })

    expect(screen.getByRole('link', { name: `${config.title} home` })).toBeInTheDocument()
    expect(screen.getByText(config.title)).toBeInTheDocument()
  })

  it('uses icon image with title text when configured', () => {
    render(SiteHeader, { config: { ...config, icon: '/icon.svg', logo: '' } })

    expect(screen.getByText(config.title)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: `${config.title} home` }).querySelector('img')).toHaveAttribute('src', '/icon.svg')
  })

  it('uses logo image when configured', () => {
    render(SiteHeader, { config: { ...config, icon: '/icon.svg', logo: '/logo.svg' } })

    expect(screen.getByRole('img', { name: config.title })).toHaveAttribute('src', '/logo.svg')
    expect(screen.queryByText(config.title)).not.toBeInTheDocument()
  })
})
