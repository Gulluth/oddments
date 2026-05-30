<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Button',
    tags: ['autodocs'],
    argTypes: {
      label: { control: 'text', description: 'Button label' },
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
      size: {
        control: 'select',
        options: ['btn-sm', 'btn-base', 'btn-lg'],
        description: 'Size modifier',
      },
      disabled: {
        control: 'boolean',
        description: 'Disabled state',
      },
    },
    args: {
      label: 'Button',
      variant: 'filled',
      color: 'primary',
      size: 'btn-base',
      disabled: false,
    },
  });
</script>

<script lang="ts">
  import Icon from '$lib/Icon.svelte';

  let activeMonth = $state('January');
  const months = ['January', 'February', 'March'];
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
    <button type="button" class="btn {args.size} {preset}" disabled={args.disabled}>
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
        <button type="button" class="btn preset-filled-{color}-500">Filled</button>
        <button type="button" class="btn preset-tonal-{color}">Tonal</button>
        <button type="button" class="btn preset-outlined-{color}-500">Outlined</button>
      </div>
    {/each}
  </div>
</Story>

<!-- Sizes: sm → base → lg -->
<Story name="Sizes">
  <div class="flex items-center gap-4">
    <button type="button" class="btn btn-sm preset-filled">Small</button>
    <button type="button" class="btn btn-base preset-filled">Base</button>
    <button type="button" class="btn btn-lg preset-filled">Large</button>
  </div>
</Story>

<!-- WithIcon: label + trailing icon -->
<Story name="WithIcon">
  <div class="flex items-center gap-3">
    <button type="button" class="btn preset-filled">
      <span>Continue</span>
      <Icon name="chevron-right" size={18} />
    </button>
    <button type="button" class="btn preset-tonal-primary">
      <span>Continue</span>
      <Icon name="chevron-right" size={18} />
    </button>
    <button type="button" class="btn preset-outlined-primary-500">
      <span>Continue</span>
      <Icon name="chevron-right" size={18} />
    </button>
  </div>
</Story>

<!-- IconOnly: btn-icon for square icon-only buttons -->
<Story name="IconOnly">
  <div class="flex items-center gap-3">
    <button type="button" class="btn-icon preset-filled" title="Go" aria-label="Go">
      <Icon name="chevron-right" size={18} />
    </button>
    <button type="button" class="btn-icon preset-tonal-primary" title="Go" aria-label="Go">
      <Icon name="chevron-right" size={18} />
    </button>
    <button type="button" class="btn-icon preset-outlined-primary-500" title="Go" aria-label="Go">
      <Icon name="chevron-right" size={18} />
    </button>
  </div>
</Story>

<!-- Disabled: native disabled attribute on <button> -->
<Story name="Disabled">
  <div class="flex items-center gap-3">
    <button type="button" class="btn preset-filled-primary-500" disabled>Filled</button>
    <button type="button" class="btn preset-tonal-primary" disabled>Tonal</button>
    <button type="button" class="btn preset-outlined-primary-500" disabled>Outlined</button>
  </div>
</Story>

<!-- Group: segmented button group with active state -->
<Story name="Group">
  <nav class="btn-group preset-outlined-surface-200-800 p-1">
    {#each months as month (month)}
      <button
        type="button"
        class="btn"
        class:preset-filled={activeMonth === month}
        onclick={() => (activeMonth = month)}
      >
        {month}
      </button>
    {/each}
  </nav>
</Story>
