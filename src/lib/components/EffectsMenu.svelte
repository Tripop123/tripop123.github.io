<script lang="ts">
	import {
		EFFECTS,
		effectiveValue,
		effects,
		isOverridden,
		resetEffects,
		setEffect,
		type EffectKey
	} from '$lib/effects.svelte';
	import { crt, setCrt } from '$lib/crt.svelte';
	import { theme } from '$lib/theme.svelte';

	const uid = $props.id();
	const menuId = `effects-${uid}`;

	let trigger: HTMLButtonElement;
	let menu: HTMLDivElement;

	const MENU_W = 240;

	/* Sits beside the theme menu, flipping to whichever side has room. Nested auto popovers
	   stack, so opening this keeps the theme menu open behind it. */
	function anchor() {
		const r = trigger.getBoundingClientRect();
		menu.style.bottom = `${window.innerHeight - r.bottom - 6}px`;
		if (r.right + 6 + MENU_W <= window.innerWidth) {
			menu.style.left = `${r.right + 6}px`;
			menu.style.right = 'auto';
		} else {
			menu.style.right = `${window.innerWidth - r.left + 6}px`;
			menu.style.left = 'auto';
		}
	}

	// Only the WebGL shader consumes every parameter; on the SVG fallback the sliders
	// would move nothing, so they are hidden rather than shown inert.
	const tunable = $derived(crt.mode === 'canvas');
	const live = $derived(tunable && crt.enabled);

	// Re-read when the theme changes or an override moves, so sliders show live values.
	const rows = $derived.by(() =>
		EFFECTS.map((e) => {
			theme.current;
			effects.byTheme[theme.current]?.[e.key];
			return { ...e, value: effectiveValue(e.key), overridden: isOverridden(e.key) };
		})
	);

	const dirty = $derived(rows.some((r) => r.overridden));

	function format(v: number, step: number) {
		return v.toFixed(step < 0.001 ? 4 : step < 0.01 ? 3 : 2);
	}
</script>

<button
	bind:this={trigger}
	type="button"
	popovertarget={menuId}
	class="rounded-box text-dim hover:text-fg hover:bg-panel font-pixel flex w-full cursor-pointer items-center justify-between gap-3 px-2.5 py-1 text-left text-[11px] tracking-[0.15em]"
>
	EFFECTS <span aria-hidden="true">▸</span>
</button>

<div
	bind:this={menu}
	id={menuId}
	popover
	onbeforetoggle={(e) => e.newState === 'open' && anchor()}
	class="effects-menu crt-glass border-line rounded-box glow-box bg-bg border p-2.5"
>
	<label
		class="text-dim font-pixel flex items-center gap-2 text-[11px] tracking-[0.15em] has-[:disabled]:opacity-40 has-[:enabled]:cursor-pointer"
		title={crt.mode === 'canvas'
			? 'WebGL CRT shader (HTML-in-Canvas)'
			: 'Scanlines, phosphor bloom and vignette'}
	>
		<!-- Never disabled: the CSS overlay is plain CSS, so the effect is always available. -->
		<input
			type="checkbox"
			class="accent-fg"
			checked={crt.enabled}
			onchange={(e) => setCrt(e.currentTarget.checked)}
		/>
		CRT EFFECT{crt.mode === 'canvas' ? ' ✦' : ''}
	</label>

	{#if tunable}
		<div class="border-line mt-2.5 mb-2 flex items-baseline justify-between gap-4 border-t pt-2">
			<p class="text-dim font-pixel text-[10px] tracking-[0.2em] uppercase">Parameters</p>
			<button
				type="button"
				onclick={resetEffects}
				disabled={!dirty}
				class="text-dim hover:text-fg font-pixel cursor-pointer text-[10px] tracking-[0.15em] underline decoration-dotted disabled:cursor-default disabled:opacity-30 disabled:no-underline"
			>
				RESET
			</button>
		</div>

		<div class:opacity-40={!live}>
			{#each rows as row (row.key)}
				<label class="mb-1.5 block">
					<span class="text-dim font-pixel flex justify-between text-[10px] tracking-[0.15em]">
						<span class={row.overridden && live ? 'text-accent' : ''}>{row.label}</span>
						<span>{format(row.value, row.step)}</span>
					</span>
					<input
						type="range"
						class="accent-fg w-full"
						min={row.min}
						max={row.max}
						step={row.step}
						value={row.value}
						disabled={!live}
						oninput={(e) => setEffect(row.key as EffectKey, e.currentTarget.valueAsNumber)}
					/>
				</label>
			{/each}
		</div>

		<p class="text-dim mt-1 text-[10px] leading-snug opacity-70">
			Saved per theme. Defaults come from the active theme.
		</p>
	{/if}
</div>

<style>
	.effects-menu {
		position: fixed;
		inset: auto;
		margin: 0;
		width: 240px;
	}

	input[type='range'] {
		height: 1rem;
	}

	input[type='range']:disabled {
		cursor: default;
	}
</style>
