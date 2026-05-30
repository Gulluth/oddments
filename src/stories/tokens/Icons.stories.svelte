<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Design Tokens/Icons',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import Icon from '$lib/Icon.svelte';
</script>

<!-- Local: currentColor icons bundled with Oddments -->
<Story name="Local">
  <div class="grid grid-cols-3 gap-6 text-center sm:grid-cols-6">

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="chevron-left" size={20} />
      </div>
      <code class="text-xs opacity-70">chevron-left</code>
      <span class="text-xs opacity-40">Pagination</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="chevron-right" size={20} />
      </div>
      <code class="text-xs opacity-70">chevron-right</code>
      <span class="text-xs opacity-40">Pagination</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="x" size={20} />
      </div>
      <code class="text-xs opacity-70">x</code>
      <span class="text-xs opacity-40">Chip</span>
    </div>

  </div>
</Story>

<!-- Local Extended: icons used by app components beyond primitive atoms -->
<Story name="Local Extended">
  <div class="grid grid-cols-3 gap-6 text-center sm:grid-cols-6">

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="search" size={20} />
      </div>
      <code class="text-xs opacity-70">search</code>
      <span class="text-xs opacity-40">SearchInput</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="external-link" size={20} />
      </div>
      <code class="text-xs opacity-70">external-link</code>
      <span class="text-xs opacity-40">[slug]/+page</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface text-success-500">
        <Icon name="filter-active" size={20} />
      </div>
      <code class="text-xs opacity-70">filter-active</code>
      <span class="text-xs opacity-40">FilterBar dirty</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="filter" size={20} />
      </div>
      <code class="text-xs opacity-70">filter</code>
      <span class="text-xs opacity-40">FilterBar clean</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="sun" size={20} />
      </div>
      <code class="text-xs opacity-70">sun</code>
      <span class="text-xs opacity-40">+layout light</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Icon name="moon" size={20} />
      </div>
      <code class="text-xs opacity-70">moon</code>
      <span class="text-xs opacity-40">+layout dark</span>
    </div>

  </div>
</Story>

<!-- Sizes: the four icon sizes used across the app -->
<Story name="Sizes">
  <div class="flex flex-wrap items-end gap-10">

    <div class="flex flex-col items-center gap-3">
      <Icon name="chevron-right" size={14} />
      <code class="text-xs opacity-70">14px</code>
      <span class="text-xs opacity-40">badge / chip icon</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <Icon name="chevron-right" size={16} />
      <code class="text-xs opacity-70">16px</code>
      <span class="text-xs opacity-40">icon-only (btn-icon)</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <Icon name="chevron-right" size={18} />
      <code class="text-xs opacity-70">18px</code>
      <span class="text-xs opacity-40">btn with label</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <Icon name="chevron-right" size={20} />
      <code class="text-xs opacity-70">20px</code>
      <span class="text-xs opacity-40">reference / display</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <Icon name="chevron-right" size={24} />
      <code class="text-xs opacity-70">24px</code>
      <span class="text-xs opacity-40">inline SVG (FilterBar)</span>
    </div>

  </div>
</Story>
