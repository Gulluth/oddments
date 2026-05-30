import rawConfig from "../../oddments.config.js";
import type { CatalogConfig, CardLayout, CustomField, FilterDimension, ImageOrientation } from "./config.js";

const cfg = rawConfig as CatalogConfig;

export const config = {
  // Identity
  title: cfg.title,
  icon: cfg.icon ?? "",
  logo: cfg.logo ?? "",
  description: cfg.description ?? "",
  siteUrl: cfg.siteUrl ?? "",
  copyright: cfg.copyright ?? "",
  copyrightUrl: cfg.copyrightUrl ?? "",
  showRss: cfg.showRss ?? true,
  socials: {
    instagram: cfg.instagram ?? "",
    tiktok: cfg.tiktok ?? "",
    facebook: cfg.facebook ?? "",
    twitter: cfg.twitter ?? "",
    bluesky: cfg.bluesky ?? "",
    mastodon: cfg.mastodon ?? "",
    itch: cfg.itch ?? "",
    github: cfg.github ?? "",
    deviantart: cfg.deviantart ?? "",
    behance: cfg.behance ?? "",
    discord: cfg.discord ?? "",
    signal: cfg.signal ?? "",
    drivethrurpg: cfg.drivethrurpg ?? "",
    youtube: cfg.youtube ?? "",
    patreon: cfg.patreon ?? "",
    kofi: cfg.kofi ?? "",
    twitch: cfg.twitch ?? "",
    tumblr: cfg.tumblr ?? "",
    reddit: cfg.reddit ?? "",
    threads: cfg.threads ?? "",
    substack: cfg.substack ?? "",
    kickstarter: cfg.kickstarter ?? "",
    backerkit: cfg.backerkit ?? "",
    gumroad: cfg.gumroad ?? "",
    email: cfg.email ?? "",
    website: cfg.website ?? "",
  },

  // Appearance
  theme: cfg.theme ?? "cerberus",

  // Content display
  exhibitsPerPage: cfg.exhibitsPerPage ?? 24,
  showCost: cfg.showCost ?? false,

  // Navigation & filters
  showTagCloud: cfg.showTagCloud ?? true,
  showFilterBar: cfg.showFilterBar ?? true,
  filters:
    cfg.filters ??
    ({} as Partial<
      Record<"category" | "author" | "genre" | "cost" | "tags", FilterDimension>
    >),

  // Custom fields
  customFields: cfg.customFields ?? ([] as CustomField[]),

  // Custom stylesheet
  customCss: cfg.customCss ?? null,

  // Community submissions
  showSubmitForm: cfg.showSubmitForm ?? false,
  submitUrl: cfg.submitUrl ?? "",

  // Image layout
  imageOrientation: (cfg.imageOrientation ?? 'landscape') as ImageOrientation,

  // Card layout
  cardLayout: (cfg.cardLayout ?? 'masonry') as CardLayout,
};

export type ResolvedConfig = typeof config;
