<script lang="ts">
	let { command, title }: { command: string; title: string } = $props();
</script>

<div>
	<p class="text-dim font-pixel mb-2 text-xs tracking-[0.2em]">
		<span class="text-accent">$</span>
		{command}
	</p>
	<h1 class="text-xl tracking-tight sm:text-2xl">{title}</h1>
</div>
