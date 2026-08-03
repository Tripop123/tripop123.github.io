import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/* SvelteKit emits the stylesheet after ~11 modulepreload links. Moving it ahead of them
   gets it discovered and requested first instead of contending with the JS chunks. */

const BUILD = 'build';
const STYLESHEET = /<link[^>]+rel="stylesheet"[^>]*>/g;
const FIRST_MODULEPRELOAD = /<link[^>]+rel="modulepreload"[^>]*>/;

function* htmlFiles(dir) {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) yield* htmlFiles(path);
		else if (entry.endsWith('.html')) yield path;
	}
}

let changed = 0;
for (const file of htmlFiles(BUILD)) {
	const html = readFileSync(file, 'utf8');
	const sheets = html.match(STYLESHEET);
	const anchor = html.match(FIRST_MODULEPRELOAD);
	if (!sheets || !anchor) continue;

	const stripped = html.replace(STYLESHEET, '');
	const at = stripped.indexOf(anchor[0]);
	if (at === -1) continue;

	writeFileSync(file, stripped.slice(0, at) + sheets.join('') + stripped.slice(at));
	changed++;
}

console.log(`hoist-css: stylesheet moved ahead of modulepreloads in ${changed} file(s)`);
