<script lang="ts">
  import Search from '$lib/icons/Search.icon.svelte'
  import { URLs } from '$lib/services/urls'
  import { MainContentData, type MainContent } from '$lib/types'
  import type { ResponseAnime } from '$lib/types/anime'
  import type { ResponseManga } from '$lib/types/manga'
  import { LocalRotes } from '$lib/utils/routes'
  import { slide } from 'svelte/transition'
  import Link from './link.svelte'
  import { onMount } from 'svelte'

  export let search = {
    q: '',
    type: MainContentData.Anime,
    isOpenMenu: false
  }

  let resultsPromise: Promise<ResponseAnime | ResponseManga>
  async function SearchFn({ q, type }: { q: string; type: MainContent }) {
    const response = await fetch(`${URLs.filter({ type })}?q=${search.q}&limit=10`)
    const results = await response.json()
    return results
  }
  $: if (search.q) {
    console.log(search.q)
    resultsPromise = SearchFn({ q: search.q, type: search.type })
  }
</script>

<div class="relative flex">
  <slot />
  {#if search.isOpenMenu}
    <div
      transition:slide={{ duration: 200 }}
      role="dialog"
      class="absolute shadow-lg p-1 top-[140%] max-w-xl sm:w-[470px] w-80 bg-dark-v2 rounded-md rounded-tr-none right-[1px] before:absolute before:z-[1] before:w-4 before:h-4 before:bg-dark-v2 before:right-[40%] before:-top-4 before:[clip-path:polygon(50%_10%,_0%_100%,_100%_100%)]"
    >
      <div
        class="w-full flex flex-col gap-2 p-1 bg-dark-v1 rounded max-h-[520px] overflow-y-scroll"
      >
        {#await resultsPromise}
          <p>Loading...</p>
        {:then results}
          {#if results?.data?.length > 0}
            <!-- content here -->
            {#each results?.data as data}
              <div class="relative grid grid-cols-[80px_1fr] gap-2 hover:bg-dark-v2 rounded-sm">
                <a href={LocalRotes[search.type].details(data.mal_id)}>
                  <picture class="rounded rounded-r-none overflow-hidden flex cursor-pointer">
                    <img
                      class="object-contain duration-200"
                      src={data.images.webp.image_url}
                      alt={data.title}
                      loading="lazy"
                    />
                  </picture>
                </a>
                <div class="flex flex-col gap-1">
                  <Link
                    variant="text"
                    class="sm:max-w-[30ch] max-w-[17ch] text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                    href={LocalRotes[search.type].details(data.mal_id)}>{data.title}</Link
                  >
                  <span class="text-xs">Score: {data.score}</span>
                  <div class="flex flex-wrap gap-1">
                    {#each data.genres as genre}
                      <Link
                        href={LocalRotes.search({
                          type: search.type,
                          queries: {
                            genres: String(genre.mal_id)
                          }
                        })}
                        class="text-xs bg-tertiary px-1 py-[2px] rounded">{genre.name}</Link
                      >
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        {/await}
      </div>
    </div>
  {/if}
</div>
