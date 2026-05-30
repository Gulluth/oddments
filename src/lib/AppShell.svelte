<script lang="ts">
  import type { Snippet } from 'svelte';
  import { config } from '$lib/catalog.js';
  import Footer from './Footer.svelte';
  import SiteHeader from './SiteHeader.svelte';
  let { children }: { children: Snippet } = $props();

  $effect(() => {
    // Storybook controls data-theme via withThemeByDataAttribute; skip here so
    // the toolbar selection isn't overwritten on every story mount.
    if (typeof window !== 'undefined' && '__STORYBOOK_ADDONS_CHANNEL__' in window) return;
    document.documentElement.setAttribute('data-theme', config.theme);
    return () => document.documentElement.removeAttribute('data-theme');
  });
</script>

<div class="min-h-screen flex flex-col">
  <SiteHeader {config} />

  <main class="flex-1">
    {@render children()}
  </main>

  <Footer {config} />
</div>
