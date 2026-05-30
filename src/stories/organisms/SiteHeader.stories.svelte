<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/SiteHeader',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  import { config } from '$lib/catalog.js';
  import SiteHeader from '$lib/SiteHeader.svelte';

  const withIcon = { ...config, icon: '/favicon.svg', logo: '' };
  const withLogo = { ...config, logo: '/favicon.svg' };
</script>

<Story name="Title">
  <SiteHeader config={{ ...config, icon: '', logo: '' }} />
</Story>

<Story name="IconTitle">
  <SiteHeader config={withIcon} />
</Story>

<Story name="Logo">
  <SiteHeader config={withLogo} />
</Story>
