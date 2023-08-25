<script lang="ts">
  import Card from './card.svelte'
  import RandomIcon from '$lib/icons/Random.icon.svelte'
  import { getData } from '$lib/services'
  import type { Anime } from '$lib/types/anime'
  import { URLs } from '$lib/services/urls'
  import { MainContentData } from '$lib/types'
  import type { Manga } from '$lib/types/manga'
  import Link from './link.svelte'
  import { LocalRotes } from '$lib/utils/routes'
  import Button from './button.svelte'
  import CardDetails from './cardDetails.svelte'
  let promiseRandomAnime: Promise<{ data: Anime }>
  let promiseRandomManga: Promise<{ data: Manga }>

  function getRandomAnime() {
    const url = URLs.random({ type: MainContentData.Anime })
    promiseRandomAnime = getData<{ data: Anime }>({ url })
  }

  function getRandomManga() {
    const url = URLs.random({ type: MainContentData.Manga })
    promiseRandomManga = getData<{ data: Manga }>({ url })
  }
</script>

<section>
  <Card variant="gradient" tag="h2" class="flex gap-2 items-center my-8">
    <RandomIcon />
    Random
  </Card>
  <div class="grid grid-cols-2 gap-2">
    <div class="max-w-xs mx-auto">
      <div>
        <Button variant="gradient" class="w-full" on:click={getRandomAnime}>Get random anime</Button
        >
      </div>
      {#if promiseRandomAnime}
        {#await promiseRandomAnime}
          <CardDetails />
        {:then { data: anime }}
          <CardDetails
            info={{
              mal_id: anime.mal_id,
              href: LocalRotes.anime.details(anime.mal_id),
              title: anime.title,
              imgSrc: anime.images.webp?.large_image_url,
              synopsis: anime.synopsis,
              details: {
                type: anime.type,
                score: anime.score,
                rank: anime.rank,
                episodes: anime.episodes,
                year: anime.year,
                aired: anime.aired.string
              }
            }}
          >
            {#if anime?.genres?.length > 0}
              <div class="text-xs flex opacity-70 gap-1 flex-wrap">
                <span class="mr-1">Genres:</span>
                {#each anime?.genres as genre}
                  <span class="bg-tertiary px-1 rounded-sm">{genre?.name}</span>
                {/each}
              </div>
            {/if}
            {#if anime?.themes?.length > 0}
              <div class="text-xs flex opacity-70 gap-1 flex-wrap">
                <span class="mr-1">Themes:</span>
                {#each anime?.themes as theme}
                  <span class="bg-tertiary px-1 py-[1px] rounded-sm">{theme?.name}</span>
                {/each}
              </div>
            {/if}</CardDetails
          >
        {:catch error}
          <p class="mx-auto py-4">{error}</p>
        {/await}
      {:else}
        <CardDetails />
      {/if}
    </div>
    <div class="max-w-xs mx-auto">
      <div>
        <Button variant="gradient" class="w-full" on:click={getRandomManga}>Get random manga</Button
        >
      </div>
      {#if promiseRandomManga}
        {#await promiseRandomManga}
          <CardDetails />
        {:then { data: manga }}
          <CardDetails
            info={{
              mal_id: manga.mal_id,
              href: LocalRotes.manga.details(manga.mal_id),
              title: manga.title,
              imgSrc: manga.images.webp?.large_image_url,
              synopsis: manga.synopsis,
              details: {
                type: manga.type,
                score: manga.score,
                rank: manga.rank,
                chapters: manga.chapters,
                volumes: manga.volumes,
                published: manga.published.string
              }
            }}
          >
            {#if manga?.genres?.length > 0}
              <div class="text-xs flex opacity-70 gap-1 flex-wrap">
                <span class="mr-1">Genres:</span>
                {#each manga?.genres as genre}
                  <span class="bg-tertiary px-1 rounded-sm">{genre?.name}</span>
                {/each}
              </div>
            {/if}
            {#if manga?.themes?.length > 0}
              <div class="text-xs flex opacity-70 gap-1 flex-wrap">
                <span class="mr-1">Themes:</span>
                {#each manga?.themes as theme}
                  <span class="bg-tertiary px-1 py-[1px] rounded-sm">{theme?.name}</span>
                {/each}
              </div>
            {/if}
          </CardDetails>
        {:catch error}
          <p>{error}</p>
        {/await}
      {:else}
        <CardDetails />
      {/if}
    </div>
  </div>
</section>
