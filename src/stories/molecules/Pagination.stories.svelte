<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Molecules/Pagination',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import Icon from '$lib/Icon.svelte';
</script>

<!-- Default: 5 pages, page 3 active -->
<Story name="Default">
  <nav class="flex items-center gap-1" aria-label="Pagination">
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-left" size={14} /></button>
    <button class="btn-icon preset-outlined size-8" title="button">1</button>
    <button class="btn-icon preset-outlined size-8" title="button">2</button>
    <button class="btn-icon preset-filled size-8" title="button" aria-current="page">3</button>
    <button class="btn-icon preset-outlined size-8" title="button">4</button>
    <button class="btn-icon preset-outlined size-8" title="button">5</button>
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-right" size={14} /></button>
  </nav>
</Story>

<!-- FewPages: 2 pages — all buttons visible, no ellipsis -->
<Story name="FewPages">
  <nav class="flex items-center gap-1" aria-label="Pagination">
    <button class="btn-icon preset-outlined size-8" title="button" disabled><Icon name="chevron-left" size={14} /></button>
    <button class="btn-icon preset-filled size-8" title="button" aria-current="page">1</button>
    <button class="btn-icon preset-outlined size-8" title="button">2</button>
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-right" size={14} /></button>
  </nav>
</Story>

<!-- ManyPages: 20 pages — ellipsis truncation at both ends, page 10 active -->
<Story name="ManyPages">
  <nav class="flex items-center gap-1" title="button" aria-label="Pagination">
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-left" size={14} /></button>
    <button class="btn-icon preset-outlined size-8" title="button">1</button>
    <span class="px-1 opacity-40">…</span>
    <button class="btn-icon preset-outlined size-8" title="button">8</button>
    <button class="btn-icon preset-outlined size-8" title="button">9</button>
    <button class="btn-icon preset-filled size-8" title="button" aria-current="page">10</button>
    <button class="btn-icon preset-outlined size-8" title="button">11</button>
    <button class="btn-icon preset-outlined size-8" title="button">12</button>
    <span class="px-1 opacity-40">…</span>
    <button class="btn-icon preset-outlined size-8" title="button">20</button>
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-right" size={14} /></button>
  </nav>
</Story>

<!-- LastPage: active page at the end, next disabled -->
<Story name="LastPage">
  <nav class="flex items-center gap-1" title="button" aria-label="Pagination">
    <button class="btn-icon preset-outlined size-8" title="button"><Icon name="chevron-left" size={14} /></button>
    <button class="btn-icon preset-outlined size-8" title="button">1</button>
    <button class="btn-icon preset-outlined size-8" title="button">2</button>
    <button class="btn-icon preset-outlined size-8" title="button">3</button>
    <button class="btn-icon preset-outlined size-8" title="button">4</button>
    <button class="btn-icon preset-filled size-8" title="button" aria-current="page">5</button>
    <button class="btn-icon preset-outlined size-8" title="button" disabled><Icon name="chevron-right" size={14} /></button>
  </nav>
</Story>
