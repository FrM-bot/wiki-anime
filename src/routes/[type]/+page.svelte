<script lang="ts">
  import { page } from '$app/stores'
  import Card from '$lib/components/card.svelte'
  import Link from '$lib/components/link.svelte'
  import { LocalRotes } from '$lib/utils/routes'
  import type { PageData } from './$types'
  import Carrousel from '$lib/components/carrousel.svelte'
  import { MainContentData } from '$lib/types'

  export let data: PageData
</script>

<svelte:head>
  <title>
    {$page.params.type}
  </title>
</svelte:head>

<Card variant="gradient-v2" tag="h1" class="mb-6">
  {$page.params.type.toLocaleUpperCase()}
</Card>

{#if $page.url.pathname === LocalRotes.anime.index}
  <Carrousel
    type={MainContentData.Anime}
    data={data?.nowSeasonAnime?.map(({ images, title, mal_id, score }) => ({
      imageUrl: images.webp.image_url,
      title,
      malId: mal_id,
      topRightDataCard: score
    }))}
  >
    <Card
      slot="title"
      tag="div"
      variant="gradient"
      class="flex justify-between items-center w-full"
    >
      <Link variant="text" href={LocalRotes.anime.season.now()}>See this anime season</Link>
    </Card>
  </Carrousel>
  <Carrousel
    type={MainContentData.Anime}
    data={data?.upcomingSeasonAnime?.map(({ images, title, mal_id, score }) => ({
      imageUrl: images.webp.image_url,
      title,
      malId: mal_id,
      topRightDataCard: score
    }))}
  >
    <Card slot="title" tag="div" variant="gradient" class="flex justify-between items-center w-full">
      <Link variant="text" href={LocalRotes.anime.season.upcoming()}>See upcoming anime season</Link>
    </Card>
  </Carrousel>
  <Carrousel
    type={MainContentData.Anime}
    data={data?.topAnime?.map(({ images, title, mal_id, score }) => ({
      imageUrl: images.webp.image_url,
      title,
      malId: mal_id,
      topRightDataCard: score
    }))}
  >
    <Card
      slot="title"
      tag="div"
      variant="gradient"
      class="flex justify-between items-center w-full"
    >
      <Link variant="text" href={LocalRotes.anime.top}>See top anime</Link>
    </Card>
  </Carrousel>
{/if}

{#if $page.url.pathname === LocalRotes.manga.index}
  <Carrousel
    type={MainContentData.Manga}
    data={data?.topManga?.map(({ images, title, mal_id, score }) => ({
      imageUrl: images.webp.image_url,
      title,
      malId: mal_id,
      topRightDataCard: score
    }))}
  >
    <Card slot="title" tag="div" variant="gradient" class="flex justify-between items-center w-full">
      <Link variant="text" href={LocalRotes.manga.top}>See top manga</Link>
    </Card>
  </Carrousel>
{/if}
