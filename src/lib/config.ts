export type ImageOrientation = 'landscape' | 'portrait' | 'none'
export type CardLayout = 'masonry' | 'grid'

export interface FilterDimension {
  cloud: boolean
  menu: boolean
}

export interface CustomField {
  key: string
  label: string
  type: 'text' | 'date' | 'url'
  multiple: boolean
}

export interface CatalogConfig {
  title: string
  icon?: string
  logo?: string
  description?: string
  theme?: string
  exhibitsPerPage?: number
  showSubmitForm?: boolean
  submitUrl?: string
  showTagCloud?: boolean
  showFilterBar?: boolean
  filters?: Partial<Record<'category' | 'author' | 'genre' | 'cost' | 'tags', FilterDimension>>
  customFields?: CustomField[]
  basePath?: string
  showCost?: boolean
  siteUrl?: string
  copyright?: string
  copyrightUrl?: string
  showRss?: boolean
  instagram?: string
  tiktok?: string
  facebook?: string
  twitter?: string
  bluesky?: string
  mastodon?: string
  itch?: string
  github?: string
  deviantart?: string
  behance?: string
  discord?: string
  signal?: string
  drivethrurpg?: string
  youtube?: string
  patreon?: string
  kofi?: string
  twitch?: string
  tumblr?: string
  reddit?: string
  threads?: string
  substack?: string
  kickstarter?: string
  backerkit?: string
  gumroad?: string
  email?: string
  website?: string
  customCss?: string
  imageOrientation?: ImageOrientation
  cardLayout?: CardLayout
}
