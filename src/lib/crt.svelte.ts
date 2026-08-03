export const STORAGE_KEY = 'crt-curve';

/** `canvas` = WebGL shader via the HTML-in-Canvas origin trial; `css` = the overlay. */
export type CrtMode = 'canvas' | 'css';

export const crt = $state({ enabled: false, mode: 'css' as CrtMode, probed: false });

/* Chrome 148-150 origin trial. Gives a real shader over live DOM, so text stays selectable
   and the accessibility tree survives — unlike snapshotting into a canvas. */
function hasHtmlInCanvas() {
	if (typeof document === 'undefined') return false;
	// Separate elements: a canvas only ever yields one context type.
	const ctx2d = document.createElement('canvas').getContext('2d');
	const gl = document.createElement('canvas').getContext('webgl2');
	return (
		typeof (ctx2d as unknown as Record<string, unknown> | null)?.drawElementImage === 'function' &&
		typeof (gl as unknown as Record<string, unknown> | null)?.texElementImage2D === 'function'
	);
}

export function prefersReducedMotion() {
	return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* No feature probe needed for the overlay — it is plain CSS and works everywhere, so the
   effect is never unavailable, only rendered by one path or the other. */
export function probeSupport() {
	if (crt.probed) return;
	crt.probed = true;
	crt.mode = hasHtmlInCanvas() ? 'canvas' : 'css';

	let stored: string | null = null;
	try {
		stored = localStorage.getItem(STORAGE_KEY);
	} catch {
		// private mode — fall through to the default
	}

	// On by default, but reduced-motion wins over that default. An explicit choice
	// still wins over both.
	if (stored === null) setCrt(!prefersReducedMotion(), false);
	else setCrt(stored === '1');
}

export function setCrt(on: boolean, persist = true) {
	crt.enabled = on;
	document.documentElement.toggleAttribute('data-crt', on);
	if (!persist) return;
	try {
		localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
	} catch {
		// private mode — applies for this page view only
	}
}

export function syncCrtFromDom() {
	crt.enabled = document.documentElement.hasAttribute('data-crt');
}
