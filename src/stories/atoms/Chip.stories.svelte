<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Chip',
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text', description: 'Chip label' },
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
      disabled: {
        control: 'boolean',
        description: 'Disabled state',
      },
    },
    args: {
      label: 'Chip',
      variant: 'filled',
      color: 'primary',
      disabled: false,
    },
  });
</script>

<script lang="ts">
  import Icon from '$lib/Icon.svelte';

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  let selectedSize = $state('M');

  const tags = ['Design', 'Development', 'Marketing', 'Research'];
  let selectedTags = $state(new Set(['Design']));

  function toggleTag(tag: string) {
    const next = new Set(selectedTags);
    next.has(tag) ? next.delete(tag) : next.add(tag);
    selectedTags = next;
  }
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
    <button type="button" class="chip {preset}" disabled={args.disabled}>
      {args.label}
    </button>
  {/snippet}
</Story>

<!-- Variants: all semantic colors × filled / tonal / outlined -->
<Story name="Variants">
  <div class="space-y-3">
    {#each ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'] as color (color)}
      <div class="flex items-center gap-3">
        <span class="w-24 text-sm opacity-60 capitalize">{color}</span>
        <button type="button" class="chip preset-filled-{color}-500">Chip</button>
        <button type="button" class="chip preset-tonal-{color}">Chip</button>
        <button type="button" class="chip preset-outlined-{color}-500">Chip</button>
      </div>
    {/each}
  </div>
</Story>

<!-- WithIcon: label + trailing icon -->
<Story name="WithIcon">
  <div class="flex items-center gap-3">
    <button type="button" class="chip preset-filled">
      <span>Remove</span>
      <Icon name="x" size={14} />
    </button>
    <button type="button" class="chip preset-tonal-primary">
      <span>Remove</span>
      <Icon name="x" size={14} />
    </button>
    <button type="button" class="chip preset-outlined-primary-500">
      <span>Remove</span>
      <Icon name="x" size={14} />
    </button>
  </div>
</Story>

<!-- IconOnly: chip-icon for square icon chips -->
<Story name="IconOnly">
  <div class="flex items-center gap-3">
    <button type="button" class="chip-icon preset-filled" aria-label="Remove">
      <Icon name="x" size={16} />
    </button>
    <button type="button" class="chip-icon preset-tonal-primary" aria-label="Remove">
      <Icon name="x" size={16} />
    </button>
    <button type="button" class="chip-icon preset-outlined-primary-500" aria-label="Remove">
      <Icon name="x" size={16} />
    </button>
  </div>
</Story>

<!-- Disabled: native disabled attribute -->
<Story name="Disabled">
  <div class="flex items-center gap-3">
    <button type="button" class="chip preset-filled-primary-500" disabled>Filled</button>
    <button type="button" class="chip preset-tonal-primary" disabled>Tonal</button>
    <button type="button" class="chip preset-outlined-primary-500" disabled>Outlined</button>
  </div>
</Story>

<!-- SingleSelect: one active chip at a time -->
<Story name="SingleSelect">
  <div class="flex flex-wrap gap-2">
    {#each sizes as size (size)}
      <button
        type="button"
        class="chip {selectedSize === size ? 'preset-filled' : 'preset-tonal-surface'}"
        onclick={() => (selectedSize = size)}
      >
        {size}
      </button>
    {/each}
  </div>
  <p class="mt-3 text-sm opacity-60">Selected: <strong>{selectedSize}</strong></p>
</Story>

<!-- MultiSelect: toggle multiple chips independently -->
<Story name="MultiSelect">
  <div class="flex flex-wrap gap-2">
    {#each tags as tag (tag)}
      <button
        type="button"
        class="chip {selectedTags.has(tag) ? 'preset-filled' : 'preset-tonal-surface'}"
        onclick={() => toggleTag(tag)}
      >
        <span>{tag}</span>
      </button>
    {/each}
  </div>
  <p class="mt-3 text-sm opacity-60">Selected: <strong>{[...selectedTags].join(', ') || 'none'}</strong></p>
</Story>
