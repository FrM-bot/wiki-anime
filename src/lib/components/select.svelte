<script lang="ts">
  import { classNamesJoin } from '$lib/utils/classNamesJoin'
  import type { HTMLSelectAttributes } from 'svelte/elements'
  export let props = {} as HTMLSelectAttributes
  const variants = {
    default:
      'bg-dark-v1 appearance-none outline-none py-[.3em] px-[.7em] rounded shadow-lg border-b border-b-transparent focus:border-b-slate-600 focus:shadow-slate-600/30 shadow-black/30 duration-200'
  }
  export let variant: keyof typeof variants = 'default'
  let className = ''
  export { className as class }
  export let label = ''

  const classSelect = classNamesJoin(className, variants[variant])
</script>

<label class="flex flex-col gap-[2px]">
  {#if label}
    <span>{label}</span>
  {/if}

  <select class={classSelect} {...props} on:change>
    <slot />
  </select>
</label>
