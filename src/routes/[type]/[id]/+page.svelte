<script lang="ts">
  import { fly } from 'svelte/transition'
  import Characters from '$lib/components/characters.svelte'
  import Link from '$lib/components/link.svelte'
  import SectionSubTitleCard from '$lib/components/sectionSubTitleCard.svelte'
  import SubSection from '$lib/components/subSection.svelte'
  import type { Anime } from '$lib/types/anime'
  import type { Manga } from '$lib/types/manga'
  import type { PageData } from './$types'
  import { MainContentData } from '$lib/types'
  import { LocalRotes } from '$lib/utils/routes'
  import Details from '$lib/components/details.svelte'
  import { page } from '$app/stores'
  import Card from '$lib/components/card.svelte'

  export let data: PageData
  function checkIsAnime(data: Anime | Manga): data is Anime {
    return (data as Anime).episodes !== undefined
  }
  const classSubtitleSection =
    'text-center bg-dark-v1 flex items-center justify-center px-4 py-2 w-full'
  $: type = $page.params.type as MainContentData
</script>

<svelte:head>
  <title>
    {data?.title || ''}
  </title>
</svelte:head>

<Details
  info={{ imgSrc: data?.images?.webp?.image_url, mainTitle: data?.title, mal_id: data.mal_id }}
>
  <div slot="left-section" transition:fly={{ x: -200, duration: 200 }} class="flex flex-col gap-4">
    <h3 class={classSubtitleSection}>Alternative Titles</h3>
    <SubSection title="Synonyms" data={data?.title_synonyms} />
    <SubSection title="Japanese" description={data?.title_japanese} />
    <SubSection title="English" description={data?.title_english} />

    <h3 class={classSubtitleSection}>Information</h3>
    <SubSection title="Type">
      <Link
        variant="gradient"
        href={LocalRotes.search({
          type,
          queries: { type: data.type.replaceAll(' ', '').toLowerCase() }
        })}>{data?.type}</Link
      >
    </SubSection>

    {#if checkIsAnime(data)}
      <SubSection title="Aired" description={data?.aired?.string} />
      <SubSection title="Episodes" description={data?.episodes} />
      <SubSection title="Duration" description={data?.duration} />
      {#if data?.season && data?.year}
        <SubSection title="Season">
          <Link
            variant="gradient"
            href={LocalRotes.anime.season.to({ season: data.season, year: data.year })}
          >
            {data?.season}
            {data?.year}
          </Link>
        </SubSection>
      {/if}
      {#if data?.broadcast?.string}
        <SubSection title="Broadcast" description={data?.broadcast?.string} />
      {/if}
      <SubSection title="Studios">
        {#each data?.studios as studio}
          <!-- <Link variant="gradient" href={LocalRotes.studio.details(studio.mal_id)}
            >{studio?.name}</Link -->
          <Card variant="gradient-v2">{studio?.name}</Card>
        {/each}
      </SubSection>

      {#if data?.licensors?.length > 0}
        <SubSection title="Licensors">
          {#each data?.licensors as licensor}
            <!-- <Link variant="gradient" href={`/${licensor?.type}/genres/${licensor?.mal_id}`}
              >{licensor?.name}</Link
            > -->
            <Card variant="gradient-v2">{licensor?.name}</Card>
          {/each}
        </SubSection>
      {/if}
    {:else}
      <SubSection title="Published" description={data?.published?.string} />
      <SubSection title="Authors">
        {#each data?.authors as author}
          <Link variant="gradient" href={LocalRotes.people.details({ id: author.mal_id })}
            >{author?.name}</Link
          >
        {/each}
      </SubSection>
    {/if}
    <SubSection title="Status" description={data?.status} />
    <SubSection title="Source" description={data?.source} />
    <SubSection title="Rating" description={data?.rating} />
    <SubSection title="Genres">
      {#each data?.genres as genre}
        <Link
          variant="gradient"
          href={LocalRotes.search({ type, queries: { genres: String(genre.mal_id) } })}
          >{genre?.name}</Link
        >
      {/each}
    </SubSection>

    <SubSection title="Themes">
      {#each data?.themes as theme}
        <Link
          variant="gradient"
          href={LocalRotes.search({ type, queries: { genres: String(theme.mal_id) } })}
          >{theme?.name}</Link
        >
      {/each}
    </SubSection>

    <SubSection title="Demographics">
      {#each data?.demographics as demographic}
        <Link
          variant="gradient"
          href={LocalRotes.search({ type, queries: { genres: String(demographic.mal_id) } })}
          >{demographic?.name}</Link
        >
      {/each}
    </SubSection>

    <h3 class={classSubtitleSection}>Statistics</h3>
    <SubSection title="Rank" description={data?.rank} />
    <SubSection title="Score" description={data?.score} />
    <SubSection title="Scored by" description={data?.scored_by} />
    <SubSection title="Popularity" description={data?.popularity} />
    <SubSection title="Members" description={data?.members} />
    <SubSection title="Favorites" description={data?.favorites} />

    <h3 class={classSubtitleSection}>External Links</h3>
    {#if data.external}
      <div class="flex flex-wrap gap-2">
        {#each data?.external as link}
          <Link variant="gradient" href={link.url} props={{ target: '_blank', rel: 'noreferrer' }}>
            {link.name}
          </Link>
        {/each}
        <Link
          variant="gradient"
          props={{ target: '_blank' }}
          href={`https://lectortmo.com/library?_pg=1&title=${data?.title}`}>{data?.title}</Link
        >
      </div>
    {/if}
  </div>
  <div
    slot="right-section"
    transition:fly={{ x: 200, duration: 200 }}
    class="flex flex-col gap-4 backdrop-blur-sm"
  >
    <SectionSubTitleCard>Synopsis</SectionSubTitleCard>
    <p>{data?.synopsis}</p>
    {#if data?.background}
      <SectionSubTitleCard>Background</SectionSubTitleCard>
      <p>{data?.background}</p>
    {/if}

    <Characters
      id={data?.mal_id}
      type={checkIsAnime(data) ? MainContentData.Anime : MainContentData.Manga}
    />

    <SectionSubTitleCard>Related</SectionSubTitleCard>
    {#each data?.relations as relation}
      <SubSection title={relation?.relation}>
        {#each relation?.entry as entry}
          <Link variant="gradient" href={`/${entry.type}/${entry.mal_id}`}>{entry.name}</Link>
        {/each}
      </SubSection>
    {/each}
    {#if checkIsAnime(data) && data?.trailer?.embed_url}
      <SectionSubTitleCard>Trailer</SectionSubTitleCard>
      <iframe
        loading="lazy"
        title="trailer"
        class="aspect-video w-full"
        src={data?.trailer?.embed_url}
        allowFullScreen
      />
    {/if}
  </div>
</Details>
