export const THEMES = [
	{ id: 'dark', label: 'DARK' },
	{ id: 'light', label: 'LIGHT' },
	{ id: 'vt320', label: 'VT320' },
	{ id: 'grid', label: 'GRiD' },
	{ id: 'c64', label: 'C64' },
	{ id: 'matrix', label: 'MATRIX' },
	{ id: 'crypt', label: 'CRYPT' }
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

function isTheme(value: unknown): value is ThemeId {
	return THEMES.some((t) => t.id === value);
}

function initialTheme(): ThemeId {
	if (typeof document === 'undefined') return 'dark';
	const active = document.documentElement.dataset.theme;
	return isTheme(active) ? active : 'dark';
}

export const theme = $state({ current: initialTheme() });

export function setTheme(next: ThemeId) {
	theme.current = next;
	document.documentElement.dataset.theme = next;

	const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (icon) icon.href = `/favicon-${next}.svg`;

	try {
		localStorage.setItem('theme', next);
	} catch {
		// private mode — the theme still applies for this page view
	}
}
