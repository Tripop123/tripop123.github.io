# personal-site

Static personal site for Ramil Amparo. SvelteKit + Tailwind, fully prerendered, deployed to GitHub Pages.

Design is a retro terminal / BBS aesthetic in the spirit of [cyberspace.online](https://cyberspace.online):
monospace throughout, bordered panels, and a switchable set of CRT-era themes.

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

> `vite preview` caches its file map at startup. After a rebuild, restart it or you'll get 404s on
> the new hashed assets and an unstyled page.

## Content

All CV content lives in [`src/lib/cv.ts`](src/lib/cv.ts) — profile, roles, projects, skills,
education. Pages render from it, so edits happen in one file.

Upstream source of truth is the separate `resume` repo (`Ramil_Amparo_CV.yaml` → RenderCV → PDF).
`static/Ramil_Amparo_CV.pdf` is a **snapshot** copied from `rendercv_output/` — re-copy it when the
CV changes, or swap the `profile.cv` link for the resume repo's `latest` release asset to make it
self-updating.

## Theming

Themes are CSS custom properties on `[data-theme]` in
[`src/routes/layout.css`](src/routes/layout.css): `dark` (default), `light`, `vt320`, `grid`, `c64`,
`matrix`, `crypt`. Each block sets colour, radius, text/box glow, colour-scheme, **and its own
typeface, size and tracking** — so switching theme changes the face too, as on cyberspace.online.

Tailwind maps them via `@theme inline`, so `bg-bg`, `text-fg`, `text-dim`, `border-line`,
`text-accent`, `rounded-box` and `glow-box` all follow the active theme.

An inline script in `src/app.html` applies the stored theme *and* its favicon before first paint, so
there is no flash. The active theme button is highlighted by a pure-CSS rule keyed off `data-theme`
— a JS-driven active state would be baked wrong into the prerendered HTML and only correct itself
after hydration.

Adding a theme touches five places, and only the first is type-checked: `THEMES` in
[`theme.svelte.ts`](src/lib/theme.svelte.ts), a var block in `layout.css`, the active-button selector
pair below it, the allowlist regex in `app.html`, and `static/favicon-<id>.svg`.

## Fonts

All self-hosted, latin subset only, no third-party requests. `@font-face` is lazy, so a visitor only
downloads the face for the theme they are actually using.

| Font                                            | Theme(s)      | License |
| ----------------------------------------------- | ------------- | ------- |
| JetBrains Mono                                   | dark, light   | OFL 1.1 |
| [Departure Mono](https://departuremono.com/)     | grid + all headings/chrome on dark & light | OFL 1.1 |
| VT323                                            | vt320         | OFL 1.1 |
| DotGothic16                                      | c64           | OFL 1.1 |
| Share Tech Mono                                  | matrix        | OFL 1.1 |
| Geist Mono                                       | crypt         | OFL 1.1 |

Vendored in `src/lib/fonts/` with each licence alongside. They were pulled from Fontsource and the
packages then removed — vendoring the single latin `woff2` avoids shipping the five unused subsets,
which cut critical CSS by ~36% gzipped.

## Logo and favicons

[`Logo.svelte`](src/lib/components/Logo.svelte) renders `static/logo.svg` through a CSS `mask`, so
the shape is painted in the theme's foreground colour rather than the SVG's own green. It recolours
on theme switch with no JS. Swap `bg-fg` for `bg-accent` to tint it with the accent instead.

`static/favicon-<theme>.svg` are pre-generated tiles (theme background + monogram in theme
foreground) sharing `logo.svg`'s path data. `setTheme()` swaps the `<link rel="icon">` href.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

One-time setup in the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

Everything is prerendered via `export const prerender = true` in `src/routes/+layout.ts`. Adding a
route that can't be prerendered fails the build rather than silently shipping broken.

### Custom domain

`static/CNAME` is set to `www.ramilamparo.com` (the site listed on the CV). To finish:

1. DNS: `CNAME` record for `www` → `<user>.github.io`. For the apex domain instead, use `A` records
   to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` and change the CNAME file to match.
2. Set the domain under **Settings → Pages**, then enable **Enforce HTTPS**.

No `paths.base` is configured, which is correct for a custom domain or a `<user>.github.io` repo.
Serving from a project subpath would need `base` set in `vite.config.ts`.
