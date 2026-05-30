<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Pages/Home',
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  import { config } from '$lib/catalog.js';
  import AppShell from '$lib/AppShell.svelte';
  import Page from '../../routes/+page.svelte';

  const pageData = {
    totalExhibits: 12,
    config,
    hero: null,
    body: null,
  };
</script>

<!-- Default: catalog with exhibits — shows skeleton while Pagefind initializes (no index in Storybook) -->
<Story name="Default">
  <AppShell>
    <Page data={pageData} />
  </AppShell>
</Story>

<!-- Empty: catalog with no exhibits — shows the empty-state placeholder immediately -->
<Story name="Empty">
  <AppShell>
    <Page data={{ ...pageData, totalExhibits: 0 }} />
  </AppShell>
</Story>
