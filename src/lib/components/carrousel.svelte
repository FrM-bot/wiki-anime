<script lang="ts">
  import Arrow from '$lib/icons/arrow.svelte'
  import type { MainContent } from '$lib/types'
  import { LocalRotes } from '$lib/utils/routes'
  import Button from './button.svelte'
  import Link from './link.svelte'
  import Skeleton from './skeleton.svelte'

  let scrollContainer: HTMLDivElement

  export let type: MainContent
  export let data = [] as {
    malId: number
    title: string
    imageUrl: string
    topRightDataCard: number
  }[]

  function onScrollLeft() {
    const currentScroll = scrollContainer.scrollLeft
    scrollContainer.scrollTo({ behavior: 'smooth', left: currentScroll - 200 })
  }

  function onScrollRight() {
    const currentScroll = scrollContainer.scrollLeft
    scrollContainer.scrollTo({ behavior: 'smooth', left: currentScroll + 200 })
  }
</script>

<div class="mt-4 mb-2 flex justify-between gap-2">
  <slot name="title" />
  <div class="flex gap-2">
    <Button on:click={onScrollLeft} variant="text" class="bg-dark-v1 rounded px-1 text-primary active:translate-y-[2px] border border-tertiary"
      ><Arrow props={{ style: 'transform: rotate(-90deg);' }} /></Button
    >
    <Button on:click={onScrollRight} variant="text" class="bg-dark-v1 rounded px-1 text-secondary active:translate-y-[2px] border border-tertiary"
      ><Arrow props={{ style: 'transform: rotate(90deg);' }} /></Button
    >
  </div>
</div>
<div
  class="flex gap-4 w-full flex-nowrap mb-4 overflow-x-scroll snap-x relative items-center"
  style="scroll-behavior: smooth"
  id="container-carrousel"
  bind:this={scrollContainer}
>
  {#each data as item}
    <div
      class="rounded snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 relative border-tertiary border-2"
      id={`to-${item.malId}`}
    >
      <Link href={LocalRotes[type].details(item.malId)}>
        <picture>
          <img
          class="hover:scale-105 duration-300 h-60 w-[160px] object-fill"
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          />
        </picture>
      </Link>
      {#if item?.topRightDataCard}
        <div class="absolute top-1 right-1 bg-tertiary/70 rounded p-1 grid place-content-center">
          <span class="text-[.65rem] grid place-content-center">{item?.topRightDataCard}</span>
        </div>
      {/if}
      <div class="absolute bottom-1 mx-auto w-full">
        <div class="mx-1 bg-tertiary/60 rounded-sm backdrop-blur-[1px] h-fit">
          <h3 class="py-1 px-[6px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal duration-200 transition-all text-[.7rem]">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  {/each}
  {#if data.length === 0}
    {#each { length: 10 } as _}
      <div class="rounded snap-center overflow-hidden align-middle flex-shrink-0 flex-grow-0 w-fit">
        <Skeleton size={{ width: 'w-[160px]' }} />
      </div>
    {/each}
  {/if}
</div>

<style>
  #container-carrousel::-webkit-scrollbar:horizontal {
    height: 0;
  }
</style>
