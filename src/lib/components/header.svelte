<script>
  import { LocalRotes } from '$lib/utils/routes'
  import InputSearch from './inputSearch.svelte'
  import Link from './link.svelte'
</script>

<header class="sticky top-0 z-20 px-4 py-2 main-header duration-200" id="main-header">
  <nav
    class="w-full flex justify-between items-center z-20 sm:gap-2 gap-2 lg:max-w-[90vw] xl:max-w-screen-content max-w-[95vw] m-auto"
  >
    <Link href={LocalRotes.home}>Wiki Anime</Link>
    <ul class="flex gap-2 items-center">
      <li>
        <InputSearch />
      </li>
    </ul>
  </nav>
</header>
