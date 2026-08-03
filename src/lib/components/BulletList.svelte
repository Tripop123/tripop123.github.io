<script lang="ts">
	let { items, gap = 'space-y-2' }: { items: readonly string[]; gap?: string } = $props();
</script>

<ul class="mt-3 text-sm {gap}">
	{#each items as item}
		<li class="flex gap-2">
			<span class="text-accent" aria-hidden="true">›</span>
			<span>{item}</span>
		</li>
	{/each}
</ul>
