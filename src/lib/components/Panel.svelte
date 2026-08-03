<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		aside,
		flush = false,
		children
	}: {
		title: string;
		aside?: string;
		flush?: boolean;
		children: Snippet;
	} = $props();
</script>

<section class="border-line rounded-box glow-box border">
	<header class="border-line flex items-baseline justify-between gap-3 border-b px-3 py-1.5">
		<h2 class="text-dim text-xs tracking-[0.2em] uppercase">{title}</h2>
		{#if aside}<span class="text-dim font-pixel shrink-0 text-xs">{aside}</span>{/if}
	</header>
	<div class={flush ? '' : 'p-3 sm:p-4'}>
		{@render children()}
	</div>
</section>
