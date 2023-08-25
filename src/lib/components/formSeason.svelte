<script lang="ts">
  import { goto } from '$app/navigation'
  import type { Season } from '$lib/types/season'
  import { LocalRotes } from '$lib/utils/routes'
  let isLoading = false
  export let defaultValues = {} as { season: string; year: number }

  export let seasonsAvailable: Season[]

  function goToSeasonAnime(
    e: Event & {
      readonly submitter: HTMLElement | null
    } & {
      currentTarget: EventTarget & HTMLFormElement
    }
  ) {
    const formDataEntries = new FormData(e.currentTarget)
    const { season, year } = Object.fromEntries(formDataEntries) as unknown as {
      season: string
      year: number
    }
    goto(LocalRotes.anime.season.to({ season, year, page: 1 }))
  }

  $: availableSeasonYear = seasonsAvailable?.find(
    (season) => season.year === Number(defaultValues.year)
  )?.seasons

  function handlerSelectYear(value: string) {
    const season = seasonsAvailable.find((season) => season.year === Number(value))
    availableSeasonYear = season?.seasons
  }
</script>

{#if !isLoading}
  <form on:submit|preventDefault={goToSeasonAnime} class="flex gap-1">
    <div class="bg-dark-v2 py-1 px-2 rounded flex gap-1">
      <select
        value={defaultValues?.season}
        class="bg-transparent appearance-none outline-none w-fit text-center"
        name="season"
      >
        {#if availableSeasonYear}
          {#each availableSeasonYear as season}
            <option class="bg-dark-v1 p-2" value={season}>{season}</option>
          {/each}
        {/if}
      </select>
      <span class="pr-1">of</span>
      <select
        value={defaultValues?.year}
        class="bg-transparent appearance-none outline-none w-fit text-center"
        name="year"
        on:change={({ currentTarget }) => handlerSelectYear(currentTarget.value)}
      >
        {#if seasonsAvailable}
          {#each seasonsAvailable as { year }}
            <option class="bg-dark-v1 p-2" value={year}>{year}</option>
          {/each}
        {/if}
      </select>
    </div>
    <button class="bg-dark-v2 py-1 px-2 rounded">Go</button>
  </form>
{/if}
