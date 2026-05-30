import type { IconName } from './icons.js'

export type SocialKey =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'twitter'
  | 'bluesky'
  | 'mastodon'
  | 'itch'
  | 'github'
  | 'deviantart'
  | 'behance'
  | 'discord'
  | 'signal'
  | 'drivethrurpg'
  | 'youtube'
  | 'patreon'
  | 'kofi'
  | 'twitch'
  | 'tumblr'
  | 'reddit'
  | 'threads'
  | 'substack'
  | 'kickstarter'
  | 'backerkit'
  | 'gumroad'
  | 'email'
  | 'website'

export interface SocialDefinition {
  key: SocialKey
  label: string
  icon: IconName
}

export const socialDefinitions: SocialDefinition[] = [
  { key: 'instagram', label: 'Instagram', icon: 'instagram' },
  { key: 'tiktok', label: 'TikTok', icon: 'tiktok' },
  { key: 'facebook', label: 'Facebook', icon: 'facebook' },
  { key: 'twitter', label: 'Twitter', icon: 'twitter' },
  { key: 'bluesky', label: 'Bluesky', icon: 'bluesky' },
  { key: 'mastodon', label: 'Mastodon', icon: 'mastodon' },
  { key: 'itch', label: 'itch.io', icon: 'itch' },
  { key: 'github', label: 'GitHub', icon: 'github' },
  { key: 'deviantart', label: 'DeviantArt', icon: 'deviantart' },
  { key: 'behance', label: 'Behance', icon: 'behance' },
  { key: 'discord', label: 'Discord', icon: 'discord' },
  { key: 'signal', label: 'Signal', icon: 'signal' },
  { key: 'drivethrurpg', label: 'DriveThruRPG', icon: 'drivethrurpg' },
  { key: 'youtube', label: 'YouTube', icon: 'youtube' },
  { key: 'patreon', label: 'Patreon', icon: 'patreon' },
  { key: 'kofi', label: 'Ko-fi', icon: 'kofi' },
  { key: 'twitch', label: 'Twitch', icon: 'twitch' },
  { key: 'tumblr', label: 'Tumblr', icon: 'tumblr' },
  { key: 'reddit', label: 'Reddit', icon: 'reddit' },
  { key: 'threads', label: 'Threads', icon: 'threads' },
  { key: 'substack', label: 'Substack', icon: 'substack' },
  { key: 'kickstarter', label: 'Kickstarter', icon: 'kickstarter' },
  { key: 'backerkit', label: 'BackerKit', icon: 'backerkit' },
  { key: 'gumroad', label: 'Gumroad', icon: 'gumroad' },
  { key: 'email', label: 'Email', icon: 'email' },
  { key: 'website', label: 'Website', icon: 'website' },
]

export function normalizeSocialHref(key: SocialKey, value: string): string {
  if (key !== 'email') return value
  if (value.startsWith('mailto:')) return value
  return `mailto:${value}`
}
