<script lang="ts">
  import Icon from './Icon.svelte'

  let dark = $state(false)

  $effect(() => {
    dark = document.documentElement.classList.contains('dark')
  })

  function toggleDark() {
    dark = !dark
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('color-scheme', dark ? 'dark' : 'light')
  }
</script>

<button
  onclick={toggleDark}
  class="btn-icon preset-tonal size-8"
  aria-label="Toggle dark mode"
>
  {#if dark}
    <Icon name="sun" size={16} />
  {:else}
    <Icon name="moon" size={16} />
  {/if}
</button>
