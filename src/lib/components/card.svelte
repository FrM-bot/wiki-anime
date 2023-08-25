<script lang="ts">
	import { classNamesJoin } from '$lib/utils/classNamesJoin'

	const variants = {
		default:
			'rounded border py-[.3em] px-[.6em] shadow-lg shadow-black/10 truncate dark:border-tertiary bg-dark-v1 dark:bg-custom-dark-v2',
		'gradient-v2': 'bg-gradient-to-r from-tertiary/80 to-transparent py-[.3em] px-[.6em] border-l',
		gradient:
			'border py-[.3em] px-[.6em] rounded shadow-lg shadow-black/40 border-transparent dark:[background:linear-gradient(to_right,rgb(var(--dark-v1)),rgb(var(--dark-v1)))_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] [background:linear-gradient(to_right,#fff,#fff)_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] shadow-primary/5'
	}

    export let variant: keyof typeof variants = 'default'
	export let tag: 'div' | 'h1' | 'h2' | 'h3' | 'label' | 'span' | 'article' = 'div'
	let className = ''

	export { className as class }
	let classCard = classNamesJoin(className , variants[variant])
</script>

<svelte:element this={tag} class={classCard}>
	<slot />
</svelte:element>
