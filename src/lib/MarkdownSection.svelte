<script lang="ts">
  let {
    html,
    placement = 'body',
  }: {
    html: string
    placement?: 'hero' | 'body'
  } = $props()
</script>

<section
  class="prose prose-sm max-w-none {placement === 'hero'
    ? 'mb-8 border-b border-surface-200-800 pb-6'
    : 'mt-8 border-t border-surface-200-800 pt-6'}"
>
  {@html html}
</section>
