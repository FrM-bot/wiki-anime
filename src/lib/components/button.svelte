<script lang="ts">
  import { classNamesJoin } from '$lib/utils/classNamesJoin'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const variants = {
    text: 'hover:[text-shadow:#FC0_1px_0_10px]',
    transparent:
      'backdrop-blur-[2px] bg-dark-v2/50 hover:bg-dark-v2/80 duration-300 rounded h-fit grid place-content-center outline-none',
    default:
      'rounded bg-dark-v1 shadow-md hover:shadow-black/30 hover:shadow-lg py-[0.4rem] px-[0.8rem] border-tertiary border duration-300',
    gradient:
      'border py-[.2em] px-[.6em] grid place-content-center rounded shadow-lg shadow-black/40 border-transparent [background:linear-gradient(to_right,rgb(var(--dark-v1)),rgb(var(--dark-v1)))_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box]'
  }

  export let variant: keyof typeof variants = 'default'

  export let props = {} as HTMLButtonAttributes

  let className = ''

  export { className as class }

  const classCard = classNamesJoin(className, variants[variant])
</script>

<button class={classCard} {...props} on:click>
  <slot />
</button>
