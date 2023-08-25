<script lang="ts">
  import Card from '$lib/components/card.svelte'
  import { LocalRotes } from '$lib/utils/routes'
  import CardPreview from '$lib/components/cardPreview.svelte'
  import type { MainContentData } from '$lib/types'
  import Pagination from '$lib/components/pagination.svelte'
  import { page } from '$app/stores'
  import Grid from '$lib/components/grid.svelte'

  export let data

  $: type = $page.params.type as MainContentData
</script>

<svelte:head>
  <title>Top {type}</title>
</svelte:head>

<Card variant="gradient" tag="h1" class="flex justify-between items-center">Top {type}</Card>

<Grid>
  {#each data?.data as content}
    <CardPreview
      info={{
        id: content.mal_id,
        src: content.images.webp.image_url,
        title: content.title,
        topInfo: content.score,
        href: LocalRotes[type].details(content.mal_id)
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
