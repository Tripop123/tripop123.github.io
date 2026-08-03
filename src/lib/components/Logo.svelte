<script lang="ts">
	import { profile } from '$lib/cv';

	let { width = 84, alt = `${profile.name} logo` }: { width?: number; alt?: string } = $props();
</script>

<!-- Two elements on purpose: CSS applies `filter` before `mask`, so a drop-shadow on the
	 masked element itself would be computed from its rectangular box and then masked away.
	 The wrapper filters the already-masked result, so the glow follows the glyph. -->
<span role="img" aria-label={alt} class="glow block shrink-0" style:width="{width}px">
	<span class="mark bg-fg block"></span>
</span>

<style>
	.glow {
		filter: var(--t-drop-glow, none);
	}

	.mark {
		width: 100%;
		aspect-ratio: 14.98987 / 20.30802;
		-webkit-mask: url('/logo-dither.svg') no-repeat center / contain;
		mask: url('/logo-dither.svg') no-repeat center / contain;
	}
</style>
