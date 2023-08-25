<script lang="ts">
  import { fly, slide } from 'svelte/transition'
  import Card from '$lib/components/card.svelte'
  import { onMount, onDestroy } from 'svelte'
  import Image from '$lib/components/image.svelte'
  import { page } from '$app/stores'

  export let info = {
    imgSrc: '',
    mal_id: 1,
    mainTitle: ''
  }

  onMount(() => {
    console.log()
    const header = globalThis.document.querySelector('#main-header')
    if (globalThis?.window?.scrollY === 0 && header?.classList.contains('main-header')) {
      header?.classList.remove('main-header')
    }
    globalThis.window.onscroll = (e) => {
      if ($page?.params?.id) {
        if (globalThis?.window?.scrollY >= 10 && !header?.classList.contains('main-header')) {
          header?.classList.add('main-header')
        }
        if (globalThis?.window?.scrollY === 0 && header?.classList.contains('main-header')) {
          header?.classList.remove('main-header')
        }
      }
    }
  })
  onDestroy(() => {
    const header = globalThis.document?.querySelector('#main-header')
    header?.classList.add('main-header')
  })
</script>

<div
  class="absolute w-full h-[450px] left-0 top-0 -z-[1] blur-md"
  style={`background: linear-gradient(to top, rgba(20, 20, 20, 1), rgba(20, 20, 20, .9), rgba(20, 20, 20, .8), rgba(20, 20, 20, .7), rgba(20, 20, 20, .6)), url("${info.imgSrc}") no-repeat 0%/0%;background-size: cover;background-position: center 10%;`}
  transition:slide={{ duration: 200, delay: 100, axis: 'y' }}
/>

<div transition:fly={{ y: -200, duration: 200 }} class="flex flex-wrap gap-2 mb-4">
  <Card variant="gradient-v2" tag="h1">
    <span class="text-lg font-semibold">{info?.mainTitle}</span>
  </Card>
</div>

<div class="grid md:grid-cols-[minmax(80px,300px)_1fr] grid-cols-1 gap-2">
  <section transition:fly={{ x: -200, duration: 200 }}>
    <Image
      src={info.imgSrc}
      alt={info.mainTitle}
      class="max-w-sm shadow-lg shadow-tertiary/20 w-full"
    />
    <slot name="left-section" />
  </section>
  <section transition:fly={{ x: 200, duration: 200 }}>
    <slot name="right-section" />
  </section>
</div>
