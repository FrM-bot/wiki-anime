<script lang="ts">
	import Card from "./card.svelte";
import SectionSubTitleCard from "./sectionSubTitleCard.svelte";

	export let title = '';
	export let description = undefined as unknown as number | string;
	export let data: string[] = [];
</script>

{#if description || data}
	<div class="flex flex-wrap gap-2">
		<SectionSubTitleCard>
			{title}
		</SectionSubTitleCard>
		{#if description}
			<!-- content here -->
			<Card variant='gradient-v2'
				>{description}</Card
			>
		{:else if data?.length > 0}
			<!-- else content here -->
			{#each data as item}
				<Card variant='gradient-v2'>{item}</Card>
			{/each}
		{:else}
			<slot />
		{/if}
	</div>
{/if}
