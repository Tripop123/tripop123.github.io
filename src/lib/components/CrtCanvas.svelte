<script lang="ts">
	import { crt, prefersReducedMotion } from '$lib/crt.svelte';
	import { theme } from '$lib/theme.svelte';

	const VERT = `#version 300 es
in vec2 p;
out vec2 uv;
void main() {
	// Flat, 1:1 with the canvas. Any geometric distortion would move painted pixels
	// without moving layout boxes, putting hit regions out of line with what is drawn.
	uv = vec2(p.x, -p.y) * 0.5 + 0.5;
	gl_Position = vec4(p, 0.0, 1.0);
}`;

	const FRAG = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform sampler2D tex;
uniform vec2 res;
uniform vec2 grid;
uniform float time;
uniform float scan, ca, grille, bloom, roll;

void main() {
	// Signal-style colour fringing, strongest at the edges. Zero on the monochrome
	// themes, which have one gun and physically cannot misconverge.
	float edge = dot(uv * 2.0 - 1.0, uv * 2.0 - 1.0);
	float sep = ca * edge;
	vec3 col;
	col.r = texture(tex, uv + vec2(sep, 0.0)).r;
	col.g = texture(tex, uv).g;
	col.b = texture(tex, uv - vec2(sep, 0.0)).b;

	// Phosphor bloom: cheap 4-tap blur added back over the source.
	if (bloom > 0.0) {
		vec2 o = 1.6 / res;
		vec3 b = texture(tex, uv + vec2(o.x, 0)).rgb + texture(tex, uv - vec2(o.x, 0)).rgb
		       + texture(tex, uv + vec2(0, o.y)).rgb + texture(tex, uv - vec2(0, o.y)).rgb;
		col += bloom * b * 0.25;
	}

	// Scanlines and grille key off the device grid so their density is physical.
	float line = sin(uv.y * grid.y * 1.5708);
	col *= 1.0 - scan * (line * line);

	float g = mod(uv.x * grid.x, 3.0);
	vec3 triad = vec3(step(g, 1.0), step(1.0, g) * step(g, 2.0), step(2.0, g));
	col *= 1.0 - grille * (1.0 - triad);

	// Rolling vertical-hold band.
	col += 0.03 * roll * smoothstep(0.98, 1.0, fract(uv.y - time * 0.12));

	// Vignette.
	vec2 v = uv * 2.0 - 1.0;
	col *= 1.0 - 0.45 * pow(dot(v, v) * 0.5, 1.5);

	outColor = vec4(col, 1.0);
}`;

	let canvas: HTMLCanvasElement | undefined;
	let host: HTMLElement | null = null;
	let raf = 0;
	/* Non-null while running. Also the re-entrancy guard: the effect re-runs on theme and
	   toggle changes, and starting twice would append the subtree and stack listeners. */
	let detach: (() => void) | null = null;

	function compile(gl: WebGL2RenderingContext, type: number, src: string) {
		const sh = gl.createShader(type)!;
		gl.shaderSource(sh, src);
		gl.compileShader(sh);
		if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
			throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile failed');
		}
		return sh;
	}

	function start() {
		if (detach) return;
		const screen = document.querySelector<HTMLElement>('.crt-screen');
		if (!screen || !canvas) return;

		host = screen;
		// Set imperatively: `layoutsubtree` isn't in the HTML type defs yet.
		canvas.setAttribute('layoutsubtree', '');
		canvas.appendChild(screen);
		canvas.hidden = false;
		// The shader draws scanlines/grille/vignette itself; stand the CSS overlay down
		// or every layer is applied twice.
		document.documentElement.toggleAttribute('data-crt-gl', true);

		/* Fill by size, not by positioning. `layoutsubtree` wants a direct child with normal
		   generated boxes, and the capture is of this element's own box — so a mismatch with
		   the canvas would stretch the texture across the quad. */
		Object.assign(screen.style, {
			display: 'block',
			width: '100%',
			height: '100%',
			maxWidth: 'none',
			margin: '0',
			overflowY: 'auto'
		});

		const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
		if (!gl) return stop();

		const prog = gl.createProgram()!;
		gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
		gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(prog);
		gl.useProgram(prog);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const loc = gl.getAttribLocation(prog, 'p');
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

		const tex = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		const uRes = gl.getUniformLocation(prog, 'res');
		const uGrid = gl.getUniformLocation(prog, 'grid');
		const uTime = gl.getUniformLocation(prog, 'time');
		const PARAMS = ['scan', 'ca', 'grille', 'bloom', 'roll'] as const;
		const uParam = Object.fromEntries(PARAMS.map((n) => [n, gl.getUniformLocation(prog, n)]));

		// Shader character lives with the palette: each theme sets its own --t-crt-* values.
		const readTheme = () => {
			const cs = getComputedStyle(document.documentElement);
			const master = parseFloat(cs.getPropertyValue('--t-crt')) || 0;
			const still = prefersReducedMotion() ? 0 : 1;
			for (const n of PARAMS) {
				const v = (parseFloat(cs.getPropertyValue(`--t-crt-${n}`)) || 0) * master;
				gl.uniform1f(uParam[n], n === 'roll' ? v * still : v);
			}
		};
		const themeObserver = new MutationObserver(readTheme);
		// `style` too: the effects sliders write inline --t-crt-* overrides onto <html>.
		themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme', 'style'] });
		readTheme();

		const el = canvas;
		const t0 = performance.now();

		const draw = (ev?: Event) => {
			// A queued paint can still fire after teardown, when host is already null.
			// texElementImage2D throws on anything that isn't an Element.
			if (!host || !canvas) return;

			/* Backing store at device resolution so the tube is as sharp as the display,
			   while the CSS box stays viewport-sized — the ordinary HiDPI canvas pattern.
			   Measured off the canvas rather than the window, because innerWidth counts the
			   scrollbar and the canvas box does not. The subtree lays out against the CSS
			   box, so this must not be compensated with zoom. */
			const dpr = window.devicePixelRatio || 1;
			const w = Math.round(canvas.clientWidth * dpr);
			const h = Math.round(canvas.clientHeight * dpr);
			if (!w || !h) return;
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}

			/* The paint event carries an ElementImage the browser already registered for this
			   frame; the IDL accepts (Element or ElementImage). Signature is
			   (target, internalformat, element), and internalformat must be sized — RGBA8
			   keeps the maths in sRGB, SRGB8_ALPHA8 would linearise and render everything dark. */
			const source =
				(ev as unknown as { elementImage?: object } | undefined)?.elementImage ?? host;
			// @ts-expect-error origin-trial API, not in lib.dom yet
			gl.texElementImage2D(gl.TEXTURE_2D, gl.RGBA8, source);

			gl.viewport(0, 0, w, h);
			gl.uniform2f(uRes, w, h);
			gl.uniform2f(uGrid, w, h);
			gl.uniform1f(uTime, (performance.now() - t0) / 1000);
			gl.drawArrays(gl.TRIANGLES, 0, 3);

			/* Registers the element for hit testing. Identity, because the quad is flat and
			   fills the canvas 1:1 — which is precisely why the mouse lands where it looks. */
			// @ts-expect-error origin-trial API, not in lib.dom yet
			const sync: DOMMatrix = el.getElementTransform(host, new DOMMatrix());
			const next = sync.toString();
			if (host.style.transform !== next) host.style.transform = next;
		};

		// The element's rendering is only guaranteed current inside a paint event, so draw
		// there and drive the animation by asking for the next one.
		el.addEventListener('paint', draw);
		const pump = () => {
			// @ts-expect-error origin-trial API, not in lib.dom yet
			el.requestPaint();
			raf = requestAnimationFrame(pump);
		};
		pump();

		detach = () => {
			el.removeEventListener('paint', draw);
			themeObserver.disconnect();
		};
	}

	function stop() {
		cancelAnimationFrame(raf);
		raf = 0;
		detach?.();
		detach = null;
		if (host) host.removeAttribute('style');
		if (host && canvas?.contains(host)) canvas.parentElement?.insertBefore(host, canvas);
		host = null;
		document.documentElement.toggleAttribute('data-crt-gl', false);
		if (canvas) {
			canvas.hidden = true;
			canvas.removeAttribute('layoutsubtree');
		}
	}

	// Top level: effects can only be created during component init, not inside onMount.
	$effect(() => {
		// Reading theme.current keeps this reactive to theme switches. A theme with
		// --t-crt: 0 stays out of the canvas entirely — routing it through a texture
		// would resample the text for an effect of zero strength.
		theme.current;
		const strength =
			parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--t-crt')) || 0;

		if (crt.enabled && crt.mode === 'canvas' && strength > 0) start();
		else stop();
		return stop;
	});
</script>

<canvas bind:this={canvas} class="crt-canvas" hidden></canvas>

<style>
	.crt-canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
