<script lang="ts">
  import { iconPaths, type IconName } from './icons.js'

  let {
    name,
    size = 20,
    label,
  }: {
    name: IconName
    size?: number
    label?: string
  } = $props()

  const labelled = $derived(Boolean(label))
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden={labelled ? undefined : 'true'}
  role={labelled ? 'img' : undefined}
>
  {#if label}
    <title>{label}</title>
  {/if}
  {@html iconPaths[name]}
</svg>
