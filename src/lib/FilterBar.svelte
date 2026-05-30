<script lang="ts">
    import Icon from "./Icon.svelte";

    let {
        categories = [],
        authors = [],
        genres = [],
        costs = [],
        category = $bindable("all"),
        author = $bindable("all"),
        genre = $bindable("all"),
        cost = $bindable("all"),
        show = true,
        showCost = true,
    }: {
        categories: string[];
        authors: string[];
        genres: string[];
        costs: string[];
        category: string;
        author: string;
        genre: string;
        cost: string;
        show?: boolean;
        showCost?: boolean;
    } = $props();

    const isDirty = $derived(
        category !== "all" ||
            author !== "all" ||
            genre !== "all" ||
            cost !== "all",
    );

    function clearAll() {
        category = "all";
        author = "all";
        genre = "all";
        cost = "all";
    }
</script>

{#if show}
    <div class="flex flex-wrap gap-2">
        <select class="select flex-1" bind:value={category} aria-label="Filter by category">
            <option value="all">Categories</option>
            {#each categories as cat}<option value={cat}>{cat}</option>{/each}
        </select>

        <select class="select flex-1" bind:value={author} aria-label="Filter by author">
            <option value="all">Authors</option>
            {#each authors as a}<option value={a}>{a}</option>{/each}
        </select>

        <select class="select flex-1" bind:value={genre} aria-label="Filter by genre">
            <option value="all">Genres</option>
            {#each genres as g}<option value={g}>{g}</option>{/each}
        </select>

        {#if showCost}
            <select class="select flex-1" bind:value={cost} aria-label="Filter by cost">
                <option value="all">All Costs</option>
                {#each costs as c}<option value={c}>{c}</option>{/each}
            </select>
        {/if}

        <button
            onclick={clearAll}
            disabled={!isDirty}
            aria-label="Clear filters"
            class="shrink-0 transition-colors {isDirty
                ? 'text-success-500 hover:text-success-400 cursor-pointer'
                : 'text-surface-400 cursor-not-allowed'}"
        >
            {#if isDirty}
                <Icon name="filter-active" size={24} />
            {:else}
                <Icon name="filter" size={24} />
            {/if}
        </button>
    </div>
{/if}
