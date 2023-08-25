<script lang="ts">
  import { capitalizeString } from '$lib/utils/string'
  import Link from './link.svelte'
  import Skeleton from './skeleton.svelte'

  export let info: {
    mal_id: number
    href: string
    imgSrc: string
    title: string
    synopsis: string
    details: {
      [key: string]: string | number | Array<{ name: string }>
    }
  } = {
    mal_id: 0,
    href: '',
    imgSrc: '',
    title: '',
    synopsis: '',
    details: {}
  }
</script>

<article
  class="flex items-center flex-col mt-2 bg-gradient-to-tl from-dark-v2 via-dark-v1 to-dark-v2 rounded-md p-[6px] border-b border-b-slate-600 shadow-lg hover:border-b-slate-400 hover:shadow-black/30 duration-200"
>
  {#if info.imgSrc}
    <Link props={{ target: '_blank' }} class="rounded overflow-hidden w-full" href={info.href}>
      <picture class="w-full">
        <img class="w-full hover:scale-105 duration-200" src={info.imgSrc} alt={info.title} />
      </picture>
    </Link>
  {:else}
    <Skeleton size={{ width: 'w-full' }} />
  {/if}
  <div class="my-2 flex flex-col items-start w-full gap-1">
    <Link variant="text" props={{ target: '_blank' }} href={info.href} class="font-medium text-lg"
      >{info.title}</Link
    >
    {#if info.synopsis}
       <details class="text-sm">
         <summary class="opacity-70 text-xs [list-style:none;] px-1 bg-tertiary w-fit cursor-pointer border-b py-[2px]">Synopsis</summary>
         <p class="text-xs mt-1">{info.synopsis}</p>
       </details>
    {/if}
    {#if !info.href}
      <Skeleton type="text" size={{ width: 'w-full' }} />
    {/if}
    {#if Object.keys(info.details).length === 0}
      {#each { length: 3 } as _}
        <Skeleton type="text" />
      {/each}
    {/if}
    {#each Object.keys(info.details) as key}
      <div class="text-xs flex">
        <p class="opacity-80"><span class="text-xs opacity-70">{capitalizeString(key)}:</span> {info.details[key] ?? 'N/A'}</p>
      </div>
    {/each}
    <slot />
  </div>
</article>
