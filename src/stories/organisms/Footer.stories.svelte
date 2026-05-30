<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/Footer',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import { config } from '$lib/catalog.js';
  import Footer from '$lib/Footer.svelte';

  const custom = {
    ...config,
    copyright: '(c) 2026 My Catalog',
    copyrightUrl: 'https://example.com/license',
    socials: {
      ...config.socials,
      itch: 'https://example.itch.io',
      github: 'https://github.com/example',
      email: 'hello@example.com',
    },
  };

  const rssOnly = {
    ...config,
    copyright: '',
    copyrightUrl: '',
    socials: { ...config.socials },
  };
</script>

<!-- Default: configured footer from oddments.config.js -->
<Story name="Default">
  <Footer />
</Story>

<!-- Custom: copyright plus enabled social links -->
<Story name="Custom">
  <Footer config={custom} />
</Story>

<!-- RssOnly: no optional copyright or social links -->
<Story name="RssOnly">
  <Footer config={rssOnly} />
</Story>
