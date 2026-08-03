<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';
	import ThemePicker from '$lib/components/ThemePicker.svelte';
	import Crt from '$lib/components/Crt.svelte';
	import CrtCanvas from '$lib/components/CrtCanvas.svelte';
	import { profile } from '$lib/cv';

	let { children } = $props();
</script>

<a
	href="#main"
	class="bg-fg text-bg sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-2 focus:py-1"
>
	Skip to content
</a>

<Crt />
<CrtCanvas />

<!-- .crt-screen is the capture target, so it must span the viewport: texElementImage2D
	 grabs this element's own box, and a max-width column would be stretched to fill the
	 canvas. The centring therefore lives on the inner wrapper. -->
<div class="crt-screen">
	<div class="crt-page mx-auto flex min-h-dvh max-w-6xl flex-col lg:flex-row">
		<header
		class="border-line flex flex-col gap-3 border-b p-3 lg:sticky lg:top-0 lg:h-dvh lg:w-60 lg:shrink-0 lg:gap-5 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:p-5"
	>
		<a href="/" class="group self-start">
			<span class="font-pixel block text-sm tracking-[0.15em] group-hover:underline">
				{profile.name.toUpperCase()}
			</span>
			<span class="text-dim block text-[11px]">{profile.location}</span>
		</a>

		<div class="lg:hidden"><Nav variant="bar" /></div>
		<div class="hidden lg:block"><Nav variant="sidebar" /></div>

		<div class="mt-auto hidden lg:flex lg:justify-end"><ThemePicker /></div>
	</header>

	<main id="main" class="flex min-w-0 flex-1 flex-col p-3 sm:p-5 lg:p-8">
		<div class="flex flex-col gap-6 pb-10">
			{@render children()}
		</div>

		<footer
			class="border-line text-dim mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-[11px]"
		>
			<span>© {new Date().getFullYear()} {profile.name}</span>
			<div class="lg:hidden"><ThemePicker /></div>
		</footer>
	</main>
	</div>
</div>
