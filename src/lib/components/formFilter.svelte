<script lang="ts">
  import Card from '$lib/components/card.svelte'
  import { LocalRotes } from '$lib/utils/routes'
  import { MainContentData } from '$lib/types'
  import { page } from '$app/stores'
  import Select from '$lib/components/select.svelte'
  import Button from '$lib/components/button.svelte'
  import { goto } from '$app/navigation'
  import Input from '$lib/components/input.svelte'
  import Genres from '$lib/utils/genres.json'
  import {
    orderBy,
    sort,
    typeToSearchAnime,
    statusContent,
    rating,
    typeToSearch
  } from '$lib/utils/selectOptions.js'
  import { onMount } from 'svelte'
  import { checkMainType } from '$lib/utils/checkTypes'

  let type: MainContentData = checkMainType($page?.params?.type)

  $: queryText = $page?.url?.searchParams?.get('q')
  let genres = $page?.url?.searchParams?.get('genres')?.split(',') ?? ([] as string[])
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'unit' })

  let sortedGenres = {
    anime: {},
    manga: {}
  } as {
    anime: {
      [k: string]: any[]
    }
    manga: {
      [k: string]: any[]
    }
  }
  function sortGenres({ type }: { type: MainContentData }) {
    let sortedGenres = {
      anime: {},
      manga: {}
    } as {
      anime: {
        [k: string]: any[]
      }
      manga: {
        [k: string]: any[]
      }
    }
    Genres.data[type].forEach((data) => {
      if (!sortedGenres[type][data.name[0]]) {
        sortedGenres[type][data.name[0]] = [data]
      } else {
        sortedGenres[type][data.name[0]] = sortedGenres[type][data.name[0]].concat(data)
      }
    })
    return sortedGenres
  }
  onMount(() => {
    sortedGenres = sortGenres({ type })
  })

  function onFilter(
    event: Event & {
      readonly submitter: HTMLElement | null
    } & {
      currentTarget: EventTarget & HTMLFormElement
    }
  ) {
    const fromData = new FormData(event.currentTarget)
    const queries = Object.fromEntries(fromData)
    if (genres.length > 0) {
      queries.genres = formatter.format(genres).replaceAll(' ', '')
    }
    goto(LocalRotes.search({ type, queries }))
  }
  function onSelectGenre({ value, checked }: { value: string; checked: boolean }) {
    if (checked) {
      genres = genres.concat(value)
    }

    if (!checked) {
      genres = genres.filter((genre) => genre !== value)
    }
  }
  function onSelectMainType({ value }: { value: MainContentData }) {
    type = value
    sortedGenres = sortGenres({ type })
  }
</script>

<Card variant="gradient-v2" class="flex justify-between gap-1 items-center pb-4">
  <form on:submit|preventDefault={onFilter} class="flex flex-wrap gap-2">
    <Input
      label="Title"
      props={{ type: 'text', name: 'q', placeholder: "Jojo's, bleach...", value: queryText }}
    />
    {#if type === MainContentData.Anime}
      <Select label="Rating" class="flex-[1_0_1]" props={{ name: 'rating' }}>
        {#each rating as { key, value }}
          <option {value}>{key}</option>
        {/each}
      </Select>
    {/if}
    <Select
      on:change={({ currentTarget }) => {
        onSelectMainType({
          value: currentTarget?.value
        })
      }}
      label="Type"
      class="flex-[1_0_1]"
      props={{ value: type }}
    >
      {#each typeToSearch as { key, value }}
        <option {value}>{key}</option>
      {/each}
    </Select>
    <Select label="Sub type" class="flex-[1_0_1]" props={{ name: 'type' }}>
      {#each typeToSearchAnime[type] as { key, value }}
        <option {value}>{key}</option>
      {/each}
    </Select>
    <Select label="Status" class="flex-[1_0_1]" props={{ name: 'status' }}>
      {#each statusContent[type] as { key, value }}
        <option {value}>{key}</option>
      {/each}
    </Select>
    <Select label="Sort" class="flex-[1_0_1]" props={{ name: 'sort' }}>
      {#each sort as { key, value }}
        <option {value}>{key}</option>
      {/each}
    </Select>
    <Select label="Order by" class="flex-[1_0_1]" props={{ name: 'order_by' }}>
      {#each orderBy.all as { key, value }}
        <option {value}>{key}</option>
      {/each}
      {#each orderBy[type] as { key, value }}
        <option {value}>{key}</option>
      {/each}
    </Select>
    <Input
      class="w-20"
      label="Min score"
      props={{ type: 'number', name: 'min_score', placeholder: '0', min: 0 }}
    />
    <Input
      class="w-20"
      label="Max score"
      props={{ type: 'number', name: 'max_score', placeholder: '10', max: 10 }}
    />
    <Input
      label="Start letter"
      class="w-20"
      props={{ type: 'text', name: 'letter', placeholder: 'R', maxlength: 1 }}
    />
    <fieldset
      class="flex gap-4 flex-wrap mt-4 mb-2 border-2 border-tertiary p-6 rounded-xl bg-dark-v1 shadow-lg shadow-black/30"
    >
      <legend class="border-2 border-tertiary px-3 py-1 rounded-xl bg-dark-v1 shadow-lg"
        >Include genres</legend
      >
      {#each Object.keys(sortedGenres[type]) as letter}
        <div
          class="flex flex-wrap gap-4 bg-dark-v2 relative p-2 [box-shadow:-3px_3px_0px_1px_rgba(10,10,10,1)] hover:[box-shadow:-1px_1px_0px_1px_rgba(10,10,10,1)] rounded-xl justify-center items-center duration-200"
        >
          <span class="absolute -top-3 -left-3 px-2 rounded bg-tertiary/50 backdrop-blur-sm"
            >{letter}</span
          >
          <div class="flex flex-wrap gap-1">
            {#each sortedGenres[type][letter] as { name, mal_id }}
              <Input
                label={name}
                props={{
                  type: 'checkbox',
                  value: mal_id,
                  checked: genres.includes(String(mal_id))
                }}
                on:change={({ currentTarget }) => {
                  onSelectGenre({
                    value: currentTarget?.value,
                    checked: currentTarget?.checked
                  })
                }}
              />
            {/each}
          </div>
        </div>
      {/each}
      <!-- {#each Genres.data[type].sort((a, b) => a.name.localeCompare(b.name)) as { name, mal_id }}
      {/each} -->
    </fieldset>
    <Button class="flex-[1_0_1]" props={{ type: 'submit' }} variant="gradient">Apply filters</Button
    >
  </form>
</Card>
