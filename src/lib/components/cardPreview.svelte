<script lang="ts">
  import Link from './link.svelte'

  export let info = {
    id: 0,
    src: '',
    title: '',
    topInfo: 1,
    href: ''
  } as {
    id: number
    title: string
    src: string
    topInfo: number,
    href: string
  }
</script>

<Link
  variant="gradient"
  props={{ style: 'padding: 2px' }}
  href={info.href}
  class="relative max-w-[200px]"
>
  {#if info?.topInfo}
    <div
      class="absolute top-1 z-[1] right-1 bg-tertiary/70 rounded px-1 py-[2px] grid place-content-center"
    >
      <span class="text-[.65rem] grid place-content-center">{info.topInfo}</span>
    </div>
  {/if}
  <picture class="rounded relative grid overflow-hidden">
    <img
      loading="lazy"
      class="aspect-[4/2] h-[260px] object-cover flex hover:scale-[103%] duration-200"
      src={info.src}
      alt={info.title}
    />
  </picture>
  <div class="absolute bottom-1 mx-auto w-full">
    <div class="mx-1 bg-tertiary/60 rounded backdrop-blur-[1px] h-fit">
      <h3
        class="py-1 px-[6px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal duration-200 transition-all text-[.7rem]"
      >
        {info.title}
      </h3>
    </div>
  </div>
</Link>
