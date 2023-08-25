<script lang="ts">
    import { fly } from 'svelte/transition'
    import type { PageData } from './$types'
    import { LocalRotes } from '$lib/utils/routes'
    import SectionSubTitleCard from '$lib/components/sectionSubTitleCard.svelte'
    import CharacterCard from '$lib/components/characterCard.svelte'
    import Details from '$lib/components/details.svelte'
    import CardHorizontal from '$lib/components/cardHorizontal.svelte'
  
    export let data: PageData

    console.log({ data })
  </script>
  
  <svelte:head>
    <title>
      {''}
    </title>
  </svelte:head>