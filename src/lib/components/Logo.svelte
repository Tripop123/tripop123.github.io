<script lang="ts">
	import { profile } from '$lib/cv';

	let { width = 84, alt = `${profile.name} logo` }: { width?: number; alt?: string } = $props();
</script>

<span role="img" aria-label={alt} class="bg-fg block shrink-0" style:width="{width}px"></span>

<style>
	span {
		aspect-ratio: 14.98987 / 20.30802;
		-webkit-mask: url('/logo.svg') no-repeat center / contain;
		mask: url('/logo.svg') no-repeat center / contain;
	}
</style>
