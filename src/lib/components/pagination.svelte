<script lang="ts">
  import Button from './button.svelte'
  import ArrowIcon from '$lib/icons/arrow.svelte'
  import Card from './card.svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { fromObjectQueriesToUrl } from '$lib/utils/url'
  $: search = Object.fromEntries(new URLSearchParams($page.url.search))

  export let info = {
    current_page: Number(search.page) ?? 1,
    last_visible_page: 1,
    has_next_page: false
  }

  $: baseUrl = $page.url.origin + $page.url.pathname

  function nextPage() {
    if (info.current_page < info.last_visible_page) {
      info.current_page++
      const toUrl = fromObjectQueriesToUrl({
        baseUrl,
        queries: {
          ...search,
          page: String(info.current_page)
        }
      })
      goto(String(toUrl))
    }
  }
  function previousPage() {
    if (info.current_page > 1) {
      info.current_page--
      const toUrl = fromObjectQueriesToUrl({
        baseUrl,
        queries: {
          ...search,
          page: String(info.current_page)
        }
      })
      goto(String(toUrl))
    }
  }

  function goToPage({ page = 1 }: { page: number }) {
    if (page <= info.last_visible_page && page > 0) {
      info.current_page = page
      const toUrl = fromObjectQueriesToUrl({
        baseUrl,
        queries: {
          ...search,
          page: String(info.current_page)
        }
      })
      goto(String(toUrl))
    }
  }
</script>

<div class="w-full grid place-content-center">
  <Card class="my-2 w-fit">
    <div class="flex gap-4 justify-center items-center">
      <Button on:click={previousPage} props={{ style: 'padding: 3px;', disabled: info.current_page === 1 }}>
        <ArrowIcon props={{ style: 'transform: rotate(-90deg);' }} />
      </Button>

      <input
        class="bg-dark-v2 [-webkit-appearance: none] h-full text-center p-2 focus:outline-none appearance-none w-16"
        placeholder="page"
        type="number"
        bind:value={info.current_page}
        min="1"
        max={info.last_visible_page}
        on:keypress={(e) => e.key === 'Enter' && goToPage({ page: Number(e.currentTarget.value) })}
        required
      />
      <span>of</span>
      <span>{info.last_visible_page}</span>

      <Button on:click={nextPage} props={{ style: 'padding: 3px;', disabled: !info.has_next_page }}>
        <ArrowIcon props={{ style: 'transform: rotate(90deg);' }} />
      </Button>
      <Button
        on:click={(_) => {
          goToPage({ page: info.current_page })
        }}
        props={{ style: 'padding: 3px 10px;' }}>Go</Button
      >
    </div>
  </Card>
</div>
