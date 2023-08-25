<script lang="ts">
  import Card from '$lib/components/card.svelte'
  import { LocalRotes } from '$lib/utils/routes'
  import type { PageData } from '../$types'
  import CardPreview from '$lib/components/cardPreview.svelte'
  import Pagination from '$lib/components/pagination.svelte'
  import Grid from '$lib/components/grid.svelte'
  export let data: PageData
</script>

<svelte:head>
  <title>This season</title>
</svelte:head>

<Card variant="gradient" tag="h1" class="flex justify-between items-center">This season</Card>

<Grid>
  {#each data.animes as anime}
    <CardPreview
      info={{
        id: anime.mal_id,
        src: anime.images.webp.image_url,
        title: anime.title,
        topInfo: anime.score,
        href: LocalRotes.anime.details(anime.mal_id)
      }}
    />
  {/each}
</Grid>

<Pagination
  info={{
    current_page: data.pagination.current_page,
    last_visible_page: data.pagination.last_visible_page,
    has_next_page: data.pagination.has_next_page
  }}
/>
