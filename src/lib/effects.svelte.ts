import { THEMES, theme, type ThemeId } from './theme.svelte';

/* Slider overrides are written as inline custom properties on <html>, which beat the
   theme's [data-theme] block. Both consumers then need no changes: the WebGL shader
   already reads --t-crt-* from computed style, and the CSS overlay already uses var().

   Kept per theme: the parameters are tuned against a particular palette and phosphor, so
   a bloom that suits Matrix blows out C64. One global set would fight every switch. */

export const EFFECTS = [
	{ key: 'crt', label: 'INTENSITY', min: 0, max: 1.5, step: 0.05 },
	{ key: 'crt-scan', label: 'SCANLINES', min: 0, max: 0.5, step: 0.01 },
	{ key: 'crt-bloom', label: 'BLOOM', min: 0, max: 0.4, step: 0.01 },
	{ key: 'crt-ca', label: 'ABERRATION', min: 0, max: 0.006, step: 0.0002 },
	{ key: 'crt-grille', label: 'GRILLE', min: 0, max: 0.2, step: 0.005 },
	{ key: 'crt-roll', label: 'ROLL', min: 0, max: 1.5, step: 0.05 }
] as const;

export type EffectKey = (typeof EFFECTS)[number]['key'];
type Overrides = Partial<Record<EffectKey, number>>;

const STORAGE_KEY = 'crt-effects';

export const effects = $state({ byTheme: {} as Partial<Record<ThemeId, Overrides>> });

function active(): Overrides {
	return effects.byTheme[theme.current] ?? {};
}

/** Must re-run on theme change, or the previous theme's inline overrides linger. */
export function applyEffects() {
	if (typeof document === 'undefined') return;
	const style = document.documentElement.style;
	const current = active();
	for (const e of EFFECTS) {
		const v = current[e.key];
		if (v === undefined) style.removeProperty(`--t-${e.key}`);
		else style.setProperty(`--t-${e.key}`, String(v));
	}
}

function save() {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(effects.byTheme));
	} catch {
		// private mode — applies for this page view only
	}
}

export function loadEffects() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : null;
		if (parsed && typeof parsed === 'object') {
			// Whitelisted on both axes: these end up as CSS property values, so neither the
			// stored theme ids nor the keys can be trusted.
			for (const t of THEMES) {
				const stored = (parsed as Record<string, unknown>)[t.id];
				if (!stored || typeof stored !== 'object') continue;
				const out: Overrides = {};
				for (const e of EFFECTS) {
					const v = (stored as Record<string, unknown>)[e.key];
					if (typeof v === 'number' && Number.isFinite(v)) out[e.key] = v;
				}
				if (Object.keys(out).length) effects.byTheme[t.id] = out;
			}
		}
	} catch {
		// unparseable — fall back to theme defaults
	}
	applyEffects();
}

export function setEffect(key: EffectKey, value: number) {
	(effects.byTheme[theme.current] ??= {})[key] = value;
	applyEffects();
	save();
}

/** Clears the active theme's tuning only; other themes keep theirs. */
export function resetEffects() {
	delete effects.byTheme[theme.current];
	applyEffects();
	save();
}

export function isOverridden(key: EffectKey) {
	return active()[key] !== undefined;
}

/** Override if this theme has one, otherwise whatever the theme declares. */
export function effectiveValue(key: EffectKey) {
	const o = active()[key];
	if (o !== undefined) return o;
	if (typeof document === 'undefined') return 0;
	const v = getComputedStyle(document.documentElement).getPropertyValue(`--t-${key}`);
	return parseFloat(v) || 0;
}
