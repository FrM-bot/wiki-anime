<script lang="ts">
  import { classNamesJoin } from '$lib/utils/classNamesJoin'
  import type { HTMLInputAttributes } from 'svelte/elements'
  export let props = {} as HTMLInputAttributes
  const variants = {
    default:
      'bg-dark-v1 appearance-none outline-none py-[.3em] px-[.7em] rounded shadow-lg border-b border-b-transparent focus:border-b-slate-600 focus:shadow-slate-600/20 shadow-black/30 duration-200'
  }
  export let variant: keyof typeof variants = 'default'
  let className = ''
  export { className as class }
  export let label = ''

  const classSelect = classNamesJoin(className, variants[variant])
</script>

{#if props.type === 'checkbox'}
  <label class="flex cursor-pointer">
    <input class="w-0 h-0 peer" {...props} on:change />
    {#if label}
      <span class="peer-checked:bg-tertiary rounded-full peer-checked:border-primary text-white/80 px-[.6em] py-[.2em] border-tertiary bg-dark-v1 peer-checked:shadow-primary/20 border peer-checked:text-primary shadow-md active:translate-y-[2px] duration-200">{label}</span>
    {/if}
  </label>
{:else}
  <label class="flex flex-col gap-[2px]">
    {#if label}
      <span class="">{label}</span>
    {/if}

    <input class={classSelect} {...props} on:change />
  </label>
{/if}
