<script lang="ts">
  import SearchIcon from '$lib/icons/Search.icon.svelte'
  import { goto } from '$app/navigation'
  import { LocalRotes } from '$lib/utils/routes'
  import type { MainContent } from '$lib/types'
  import { typeToSearch } from '$lib/utils/selectOptions'
  function onSearch(
    event: Event & {
      readonly submitter: HTMLElement | null
    } & {
      currentTarget: EventTarget & HTMLFormElement
    }
  ) {
    const fromData = new FormData(event.currentTarget)
    const { type, q } = Object.fromEntries(fromData) as { type: MainContent; q: string }
    if (q.length > 0) {
      goto(LocalRotes.search({ type, queries: { q } }))
    }
  }
</script>

<form on:submit|preventDefault={onSearch} class="flex rounded overflow-hidden">
  <button
    aria-label="search"
    class="bg-dark-v2 p-2 hover:shadow-xl hover:shadow-black/20 duration-300"
    ><SearchIcon /></button
  >
  <input
    placeholder="Bleach, Naruto..."
    type="search"
    name="q"
    class="bg-dark-v2 w-full p-2 focus:outline-none focus:shadow-xl active:shadow-black/20 duration-300"
  />
  <select
    name="type"
    class="appearance-none text-center focus:outline-none bg-dark-v2 p-2 hover:shadow-xl hover:shadow-black/20 duration-300"
  >
    {#each typeToSearch as { key, value }}
      <option {value}>{key}</option>
    {/each}
  </select>
</form>
