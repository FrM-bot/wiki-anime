<script lang="ts">
    import Link from './link.svelte'
  
    export let info = {
      title: '',
      subTitle: '',
      href: '',
      src: ''
    }
  </script>

<article
  class="grid grid-cols-[80px_1fr] gap-2 border-b border-b-tertiary rounded-b p-1 last:border-b-transparent py-1"
>
  <Link variant="text" href={info.href}>
    <picture class="rounded-sm overflow-hidden flex cursor-pointer">
      <img
        class="aspect-[4/2] h-[120px] w-32 object-cover flex duration-200"
        src={info.src}
        alt={info.title}
      />
    </picture>
  </Link>
  <div>
    <Link variant="text" href={info.href}>
      <h3
        class="[display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] text-sm"
      >
        {info.title}
      </h3>
    </Link>
    <span class="rounded bg-tertiary p-1 px-[6px] text-xs">{info.subTitle}</span>
  </div>
</article>
