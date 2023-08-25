<script lang="ts">
  import { fly } from 'svelte/transition'
  import type { PageData } from './$types'
  import { LocalRotes } from '$lib/utils/routes'
  import SectionSubTitleCard from '$lib/components/sectionSubTitleCard.svelte'
  import CharacterPictures from '$lib/components/characterPictures.svelte'
  import CharacterCard from '$lib/components/characterCard.svelte'
  import Details from '$lib/components/details.svelte'
  import CardHorizontal from '$lib/components/cardHorizontal.svelte'

  export let data: PageData

  const { character } = data
</script>

<svelte:head>
  <title>
    {data?.character?.name || ''}
  </title>
</svelte:head>

<Details
  info={{
    imgSrc: character?.images?.webp?.image_url,
    mainTitle: character?.name,
    mal_id: character?.mal_id
  }}
>
  <div slot="left-section" transition:fly={{ x: -200, duration: 200 }} class="flex flex-col gap-4">
    <SectionSubTitleCard>Animeography</SectionSubTitleCard>
    <div class="grid grid-cols-1 gap-2">
      {#each character?.anime as { anime, role }}
        <CardHorizontal
          info={{
            href: LocalRotes.anime.details(anime.mal_id),
            src: anime?.images?.webp?.image_url,
            title: anime.title,
            subTitle: role
          }}
        />
      {/each}
    </div>
    <SectionSubTitleCard>Mangaography</SectionSubTitleCard>
    <div class="grid grid-cols-1 gap-2">
      {#each character?.manga as { manga, role }}
        <CardHorizontal
          info={{
            href: LocalRotes.manga.details(manga.mal_id),
            src: manga?.images?.webp?.image_url,
            title: manga.title,
            subTitle: role
          }}
        />
      {/each}
    </div>
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
      {character?.about}
    </p>
    <CharacterPictures id={character.mal_id} name={character.name} />
    <SectionSubTitleCard>Voice actors</SectionSubTitleCard>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 mt-4">
      {#each character.voices as actor}
        <CharacterCard
          info={{
            href: LocalRotes.people.details({ id: actor.person.mal_id }),
            src: actor.person.images.jpg.image_url,
            title: actor.person.name,
            subTitle: actor.language
          }}
        />
      {/each}
    </div>
  </div>
</Details>
