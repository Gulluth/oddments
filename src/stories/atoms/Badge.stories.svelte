<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Badge',
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text', description: 'Badge label' },
      variant: {
        control: 'select',
        options: ['filled', 'tonal', 'outlined'],
        description: 'Visual style preset',
      },
      color: {
        control: 'select',
        options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'],
        description: 'Semantic color token',
      },
    },
    args: {
      label: 'Badge',
      variant: 'filled',
      color: 'primary',
    },
  });
</script>

<script lang="ts">
  import Icon from '$lib/Icon.svelte';
</script>

<!-- Default: configurable via the Controls panel -->
<Story name="Default">
  {#snippet template(args)}
    {@const preset =
      args.variant === 'tonal'
        ? `preset-tonal-${args.color}`
        : args.variant === 'outlined'
          ? `preset-outlined-${args.color}-500`
          : `preset-filled-${args.color}-500`}
    <span class="badge {preset}">{args.label}</span>
  {/snippet}
</Story>

<!-- Variants: all semantic colors × filled / tonal / outlined -->
<Story name="Variants">
  <div class="space-y-3">
    {#each ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'] as color (color)}
      <div class="flex items-center gap-3">
        <span class="w-24 text-sm opacity-60 capitalize">{color}</span>
        <span class="badge preset-filled-{color}-500">Badge</span>
        <span class="badge preset-tonal-{color}">Badge</span>
        <span class="badge preset-outlined-{color}-500">Badge</span>
      </div>
    {/each}
  </div>
</Story>

<!-- WithIcon: label + leading icon -->
<Story name="WithIcon">
  <div class="flex items-center gap-3">
    <span class="badge preset-filled">
      <Icon name="rss" size={14} />
      <span>Feed</span>
    </span>
    <span class="badge preset-tonal-primary">
      <Icon name="rss" size={14} />
      <span>Feed</span>
    </span>
    <span class="badge preset-outlined-primary-500">
      <Icon name="rss" size={14} />
      <span>Feed</span>
    </span>
  </div>
</Story>

<!-- IconOnly: badge-icon for square icon badges -->
<Story name="IconOnly">
  <div class="flex items-center gap-3">
    <span class="badge-icon preset-filled">
      <Icon name="rss" size={16} />
    </span>
    <span class="badge-icon preset-tonal-primary">
      <Icon name="rss" size={16} />
    </span>
    <span class="badge-icon preset-outlined-primary-500">
      <Icon name="rss" size={16} />
    </span>
  </div>
</Story>

<!-- Overlap: numeric notification badge positioned over an element -->
<Story name="Overlap">
  <div class="flex items-center gap-8">
    <div class="relative inline-block">
      <span class="badge-icon preset-filled-primary-500 absolute -right-1 -top-1 z-10 text-xs">3</span>
      <div class="size-12 rounded-full bg-surface-200-800 flex items-center justify-center text-sm font-medium">AB</div>
    </div>
    <div class="relative inline-block">
      <span class="badge-icon preset-filled-error-500 absolute -right-1 -top-1 z-10 text-xs">9+</span>
      <div class="size-12 rounded-full bg-surface-200-800 flex items-center justify-center text-sm font-medium">CD</div>
    </div>
  </div>
</Story>
