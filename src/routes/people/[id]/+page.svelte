<script lang="ts">
  import { fly } from 'svelte/transition'
  import type { PageData } from './$types'
  import { LocalRotes } from '$lib/utils/routes'
  import SectionSubTitleCard from '$lib/components/sectionSubTitleCard.svelte'
  import CharacterCard from '$lib/components/characterCard.svelte'
  import Details from '$lib/components/details.svelte'
  import CardHorizontal from '$lib/components/cardHorizontal.svelte'

  export let data: PageData

  const { person } = data
  console.log({ person })
</script>

<svelte:head>
  <title>
    {person?.name || ''}
  </title>
</svelte:head>

<Details
  info={{
    imgSrc: person?.images?.jpg?.image_url,
    mainTitle: person?.name,
    mal_id: person?.mal_id
  }}
>
  <div slot="left-section" transition:fly={{ x: -200, duration: 200 }} class="flex flex-col gap-4">
    {#if person?.anime.length > 0}
      <SectionSubTitleCard>Animeography</SectionSubTitleCard>
      <div class="grid grid-cols-1 gap-2">
        {#each person?.anime as { anime, position }}
          <CardHorizontal
            info={{
              href: LocalRotes.manga.details(anime.mal_id),
              src: anime?.images?.webp?.image_url,
              title: anime.title,
              subTitle: position
            }}
          />
        {/each}
      </div>
    {/if}
    {#if person?.manga.length > 0}
      <SectionSubTitleCard>Mangaography</SectionSubTitleCard>
      <div class="grid grid-cols-1 gap-2">
        {#each person?.manga as { manga, position }}
          <CardHorizontal
            info={{
              href: LocalRotes.manga.details(manga.mal_id),
              src: manga?.images?.webp?.image_url,
              title: manga.title,
              subTitle: position
            }}
          />
        {/each}
      </div>
    {/if}
  </div>

  <div
    slot="right-section"
    transition:fly={{ x: 200, duration: 200 }}
    class="flex flex-col gap-4 backdrop-blur-sm"
  >
    <SectionSubTitleCard>About</SectionSubTitleCard>
    <p
      class="[display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:9]"
    >
      {person?.about}
    </p>
    <SectionSubTitleCard>Voice Acting Roles</SectionSubTitleCard>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 mt-4">
      {#each person.voices as { anime, role, character }}
        <CharacterCard
          info={{
            href: LocalRotes.anime.details(anime.mal_id),
            src: anime.images.jpg.image_url,
            title: anime.title,
            subTitle: role,
            text: character.name
          }}
        />
      {/each}
    </div>
  </div>
</Details>
