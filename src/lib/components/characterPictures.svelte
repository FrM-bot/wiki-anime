<script lang="ts">
  import { getCharacterPictures } from '$lib/services/character'
  import SectionSubTitleCard from './sectionSubTitleCard.svelte'
  import Skeleton from './skeleton.svelte'

  export let id: number
  export let name: string
  let isShowedAllCharacters = false

  function toggleShowCharacters() {
    isShowedAllCharacters = !isShowedAllCharacters
  }
  const maxCharacters = 10
</script>

<SectionSubTitleCard>Pictures</SectionSubTitleCard>

<div class="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 mt-4">
  {#await getCharacterPictures({ id })}
    {#each { length: 10 } as _}
      <div class="rounded snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 w-fit">
        <Skeleton />
      </div>
    {/each}
  {:then pictures}
    {#if pictures && pictures?.length > 0}
      {#each pictures as picture}
        <picture
          class="border-2 border-tertiary overflow-hidden rounded p-[2px] hover:shadow-md shadow-black/50"
        >
          <img class="rounded-sm" src={picture?.jpg?.image_url} alt={name} />
        </picture>
      {/each}
    {/if}
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>
