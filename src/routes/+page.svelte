<script lang="ts">
  import Card from '$lib/components/card.svelte'
  import Carrousel from '$lib/components/carrousel.svelte'
  import FormFilter from '$lib/components/formFilter.svelte'
  import Link from '$lib/components/link.svelte'
  import RandomSection from '$lib/components/randomSection.svelte'
  import { MainContentData } from '$lib/types'
  import { LocalRotes } from '$lib/utils/routes'
  import type { PageData } from './$types'
  import FilterIcon from '$lib/icons/Filter.icon.svelte'

  export let data: PageData
</script>

<svelte:head>
  <title>Wiki anime</title>
</svelte:head>

<section class="flex justify-center mb-4">
  <div class="bg-dark-v1 mx-auto rounded-md p-1 w-fit flex gap-4 shadow-lg">
    <Link
      class="px-2 py-1 font-semibold text-lg hover:bg-dark-v2 duration-200 rounded"
      href={LocalRotes.anime.index}
    >
      Anime
    </Link>
    <Link
      class="px-2 py-1 font-semibold text-lg hover:bg-dark-v2 duration-200 rounded"
      href={LocalRotes.manga.index}
    >
      Manga
    </Link>
  </div>
</section>

<Carrousel
  type={MainContentData.Anime}
  data={data?.topAnime?.map(({ images, title, mal_id, score }) => ({
    imageUrl: images.webp.image_url,
    title,
    malId: mal_id,
    topRightDataCard: score
  }))}
>
  <Card slot="title" tag="div" variant="gradient" class="flex justify-between items-center w-full">
    <Link variant="text" href={LocalRotes.anime.top}>Top anime</Link>
  </Card>
</Carrousel>
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
    <Link variant="text" href={LocalRotes.manga.top}>Top manga</Link>
  </Card>
</Carrousel>

<Card variant="gradient" tag="h2" class="flex gap-2 items-center my-4">
  <FilterIcon />
  Filter
</Card>

<FormFilter />

<RandomSection />
