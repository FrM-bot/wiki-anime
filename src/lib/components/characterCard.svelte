<script lang="ts">
  import Link from './link.svelte'

  export let info = {
    title: '',
    subTitle: '',
    href: '',
    src: '',
    text: ''
  } as {
    title: string
    subTitle: string
    href: string
    src: string
    text?: string
  }
</script>

<div class="flex flex-col gap-2 bg-dark-v1 p-1 rounded border border-tertiary max-w-[200px]">
  <Link class="w-fit h-fit" href={info.href}>
    <picture class="rounded-sm relative grid overflow-hidden">
      <img
        loading="lazy"
        class="aspect-[4/2] h-[260px] object-cover flex duration-200"
        src={info.src}
        alt={info.title}
      />
    </picture>
  </Link>
  <div class="flex flex-col gap-1">
    <Link
      href={info.href}
      class="bg-dark-v2 px-1 rounded-sm hover:bg-white hover:text-dark-v1 font-semibold duration-200 [display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
    >
      {info.title}
    </Link>
    {#if info.text}
      <span class="bg-dark-v2 px-1 rounded-sm">{info.text}</span>
    {/if}
    <span class="bg-dark-v2 px-1 rounded-sm">{info.subTitle}</span>
  </div>
</div>
