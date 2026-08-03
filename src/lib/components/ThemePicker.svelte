<script lang="ts">
	import { THEMES, setTheme, theme, type ThemeId } from '$lib/theme.svelte';
	import EffectsMenu from '$lib/components/EffectsMenu.svelte';

	const uid = $props.id();
	const menuId = `theme-menu-${uid}`;

	let trigger: HTMLButtonElement;
	let menu: HTMLDivElement;

	/* Anchored off the trigger's edges only, so it needs no measurement of the menu
	   and can be set before paint. CSS anchor positioning isn't in Firefox yet. */
	function anchor() {
		const r = trigger.getBoundingClientRect();
		menu.style.bottom = `${window.innerHeight - r.top + 6}px`;
		menu.style.right = `${window.innerWidth - r.right}px`;
	}

	function choose(id: ThemeId) {
		setTheme(id);
		menu.hidePopover();
	}

	/* Only tube-era themes have a CRT to simulate. Read from --t-crt rather than listing
	   theme ids, so a new theme opts in by setting that var and nothing else. */
	const crtTheme = $derived.by(() => {
		theme.current;
		if (typeof document === 'undefined') return false;
		const v = getComputedStyle(document.documentElement).getPropertyValue('--t-crt');
		return (parseFloat(v) || 0) > 0;
	});
</script>

<button
	bind:this={trigger}
	class="btn text-[11px] tracking-[0.2em]"
	popovertarget={menuId}
	aria-label="Change theme"
>
	THEME ▴
</button>

<div
	bind:this={menu}
	id={menuId}
	popover
	onbeforetoggle={(e) => e.newState === 'open' && anchor()}
	class="theme-menu crt-glass border-line rounded-box glow-box bg-bg border p-1"
>
	{#each THEMES as t (t.id)}
		<button
			type="button"
			data-theme-btn={t.id}
			onclick={() => choose(t.id)}
			aria-pressed={theme.current === t.id}
			class="rounded-box text-dim hover:text-fg hover:bg-panel font-pixel block w-full cursor-pointer px-2.5 py-1 text-left text-[11px] tracking-[0.15em]"
		>
			{t.label}
		</button>
	{/each}

	{#if crtTheme}
		<div class="border-line mt-1 border-t pt-1">
			<EffectsMenu />
		</div>
	{/if}
</div>

<style>
	.theme-menu {
		position: fixed;
		inset: auto;
		margin: 0;
		width: max-content;
	}
</style>
