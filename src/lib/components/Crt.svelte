<script lang="ts">
	import { onMount } from 'svelte';
	import { probeSupport, syncCrtFromDom } from '$lib/crt.svelte';
	import { applyEffects, loadEffects } from '$lib/effects.svelte';
	import { theme } from '$lib/theme.svelte';

	// Overrides are stored per theme, so switching theme must swap the inline vars over.
	$effect(() => {
		theme.current;
		applyEffects();
	});

	onMount(() => {
		loadEffects();
		syncCrtFromDom();
		probeSupport();
	});
</script>

<!-- Overlay only: never wraps content, so text stays crisp and clicks land where they look. -->
<div class="crt" aria-hidden="true">
	<div class="crt-lines"></div>
	<div class="crt-grille"></div>
	<div class="crt-glare"></div>
	<div class="crt-sweep"></div>
	<div class="crt-vignette"></div>
	<div class="crt-bezel"></div>
</div>

<style>
	.crt {
		position: fixed;
		inset: 0;
		z-index: 60;
		pointer-events: none;
		opacity: var(--t-crt, 0);
		contain: strict;
	}

	.crt > * {
		position: absolute;
		inset: 0;
	}

	.crt-lines {
		background: repeating-linear-gradient(
			to bottom,
			rgb(0 0 0 / 0.34) 0 1px,
			transparent 1px 3px
		);
	}

	/* Shadow-mask triads. Only correct for a colour tube — the amber/green/red themes are
	   single-phosphor displays with a continuous coating and no subpixel structure at all,
	   so they set --t-crt-grille to 0 and this disappears. */
	.crt-grille {
		background: repeating-linear-gradient(
			to right,
			rgb(255 0 0 / 0.05) 0 1px,
			rgb(0 255 0 / 0.05) 1px 2px,
			rgb(0 0 255 / 0.05) 2px 3px
		);
		mix-blend-mode: screen;
		opacity: calc(var(--t-crt-grille, 0) * 10);
	}

	/* Glass reflection off the top-left of the tube. */
	.crt-glare {
		background: radial-gradient(
			ellipse 60% 45% at 22% 8%,
			rgb(255 255 255 / 0.05),
			transparent 70%
		);
	}

	.crt-vignette {
		background:
			radial-gradient(ellipse 78% 78% at 50% 50%, transparent 55%, rgb(0 0 0 / 0.5) 100%),
			radial-gradient(ellipse 120% 120% at 50% 50%, transparent 70%, rgb(0 0 0 / 0.7) 100%);
	}

	/* Curved glass: a deep inset shadow reads as a bulging tube without transforming
	   the content — which would displace hit regions from where things are painted. */
	.crt-bezel {
		box-shadow:
			inset 0 0 130px 24px rgb(0 0 0 / 0.55),
			inset 0 0 0 1px rgb(0 0 0 / 0.9);
	}

	/* Slow bright band rolling down, like a mistimed vertical hold. */
	.crt-sweep {
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgb(255 255 255 / 0.045) 48%,
			rgb(255 255 255 / 0.07) 50%,
			rgb(255 255 255 / 0.045) 52%,
			transparent 100%
		);
		height: 26%;
		inset: -26% 0 auto 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.crt-sweep {
			animation: crt-roll 7.5s linear infinite;
		}

		.crt-lines {
			animation: crt-flicker 4.2s ease-in-out infinite;
		}
	}

	@keyframes crt-roll {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(480vh);
		}
	}

	@keyframes crt-flicker {
		0%,
		100% {
			opacity: 1;
		}
		48% {
			opacity: 0.94;
		}
		52% {
			opacity: 1.02;
		}
	}
</style>
