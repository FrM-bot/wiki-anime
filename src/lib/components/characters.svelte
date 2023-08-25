<script lang="ts">
  import { getCharacters } from '$lib/services/character'
  import type { MainContent } from '$lib/types'
  import { LocalRotes } from '$lib/utils/routes'
  import SectionSubTitleCard from './sectionSubTitleCard.svelte'
  import Button from './button.svelte'
  import Skeleton from './skeleton.svelte'
  import CharacterCard from './characterCard.svelte'

  export let id: number
  export let type: MainContent
  let isShowedAllCharacters = false

  function toggleShopCharacters() {
    isShowedAllCharacters = !isShowedAllCharacters
  }
  const maxCharacters = 10
  
</script>

<SectionSubTitleCard>Characters</SectionSubTitleCard>

<div class="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 mt-4">
  {#await getCharacters({ id, type })}
    {#each { length: 10 } as _}
      <div class="rounded snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 w-fit">
        <Skeleton />
      </div>
    {/each}
  {:then characters}
    {#if characters && characters?.length > 0}
      {#each characters.slice(0, isShowedAllCharacters ? characters.length : maxCharacters) as { character, role }}
        <CharacterCard
          info={{
            href: LocalRotes.character.details(character.mal_id),
            src: character.images.webp.image_url,
            title: character.name,
            subTitle: role
          }}
        />
      {/each}
    {/if}
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>

<div class="flex justify-center">
  <Button on:click={toggleShopCharacters}>Show all characters</Button>
</div>
