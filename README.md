# ramilamparo.github.io

Personal site. SvelteKit + Tailwind, prerendered to static files, deployed to GitHub Pages.

Retro terminal design in the spirit of [cyberspace.online](https://cyberspace.online): monospace
throughout, bordered panels, and seven switchable themes that each change colour and typeface.

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build      # static output in build/
pnpm preview
pnpm check      # svelte-check
```

## Content

Everything lives in [`src/lib/cv.ts`](src/lib/cv.ts) — profile, roles, projects, skills, education.
Pages render from it.

`static/Ramil_Amparo_CV.pdf` is generated from the separate `resume` repo (YAML → RenderCV → PDF).

## Theming

Themes are CSS custom properties on `[data-theme]` in
[`src/routes/layout.css`](src/routes/layout.css): `dark` (default), `light`, `vt320`, `grid`, `c64`,
`matrix`, `crypt`. Each block sets colour, radius, glow, typeface, size and tracking.

Tailwind maps them via `@theme inline`, so `bg-bg`, `text-fg`, `text-dim`, `border-line`,
`text-accent`, `rounded-box` and `glow-box` follow the active theme. An inline script in
`src/app.html` applies the stored theme and its favicon before first paint.

Adding a theme: an entry in `THEMES` in [`theme.svelte.ts`](src/lib/theme.svelte.ts), a var block in
`layout.css`, the active-button selector pair below it, the allowlist in `app.html`, and
`static/favicon-<id>.svg`.

## Fonts

Self-hosted in `src/lib/fonts/`, latin subset only, each with its licence alongside. All OFL 1.1.

| Font                                         | Theme                     |
| -------------------------------------------- | ------------------------- |
| JetBrains Mono                                | dark, light               |
| [Departure Mono](https://departuremono.com/)  | grid, and headings/chrome |
| VT323                                         | vt320                     |
| DotGothic16                                   | c64                       |
| Share Tech Mono                               | matrix                    |
| Geist Mono                                    | crypt                     |

## Logo and favicons

[`Logo.svelte`](src/lib/components/Logo.svelte) renders `static/logo.svg` through a CSS `mask`, so it
paints in the theme's foreground colour. `static/favicon-<theme>.svg` are pre-generated tiles sharing
the same path data; `setTheme()` swaps the `<link rel="icon">`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. Pages is set to the
**GitHub Actions** source.

Live at [ramilamparo.com](https://ramilamparo.com).
