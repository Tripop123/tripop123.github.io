import pathlib

OUT = pathlib.Path('/home/ram/Documents/projects/personal-site/static')

W, H = 14.98987, 20.30802
PATH = (
    "m 56.433248,159.33794 -0.03867,6.06161 h -3.914167 v -18.54302 h 7.612014 "
    "c 7.036207,0 7.492856,9.54256 0.481784,9.50134 h -4.164957 l 0.03927,-3.16138 "
    "c 9.920534,0 9.334373,4.89349 9.181772,12.05034 l -6.020244,0.12939 v -6.06206 "
    "c 2.378405,0.0747 3.498307,0.42819 3.346211,3.19693"
)
ORIGIN = "translate(-51.597911,-145.97403)"

BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
FADE_START = 0.60   # solid above this fraction of the mark's height
DITHER = 0.5        # steady-state density lower down: 8 of 16 Bayer levels survive
RAMP = 0.35         # eases into that density, so the cut is not a hard edge
BLEED = 0.04


def dither_rects(cell, x0, y0, x1, y1, fade_top, fade_bottom):
    """White mask cells over the box, dissolving between fade_top and fade_bottom."""
    cols = int(round((x1 - x0) / cell))
    rows = int(round((y1 - y0) / cell))

    def kept(c, r):
        y = y0 + r * cell + cell / 2
        span = fade_bottom - fade_top
        t = 0.0 if y <= fade_top else min(1.0, (y - fade_top) / span)
        # Density eases from solid to DITHER over the first RAMP of the dithered zone,
        # then holds flat — dense near the top, steady the rest of the way down, rather
        # than either a hard edge or a pattern that thins out to nothing.
        if t <= FADE_START:
            fade = 0.0
        else:
            u = (t - FADE_START) / (1 - FADE_START)
            fade = DITHER * min(1.0, u / RAMP)
        return (BAYER[c % 4][r % 4] + 0.5) / 16 > fade

    out = []
    solid = 0
    while solid < rows and all(kept(c, solid) for c in range(cols)):
        solid += 1
    if solid:
        out.append(
            f'<rect x="{x0:.4f}" y="{y0:.4f}" width="{x1 - x0:.4f}" '
            f'height="{solid * cell + BLEED:.4f}"/>'
        )
    for r in range(solid, rows):
        run = None
        for c in range(cols + 1):
            on = c < cols and kept(c, r)
            if on and run is None:
                run = c
            elif not on and run is not None:
                out.append(
                    f'<rect x="{x0 + run * cell:.4f}" y="{y0 + r * cell:.4f}" '
                    f'width="{(c - run) * cell + BLEED:.4f}" height="{cell + BLEED:.4f}"/>'
                )
                run = None
    return out


# ---- page logo: fine grid, reads as pixels at ~84px -------------------------------
rects = dither_rects(W / 40, 0, 0, W, H, 0, H)
(OUT / 'logo-dither.svg').write_text(
    f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}">
  <!-- Ordered-dither fade: a 4x4 Bayer threshold against a vertical ramp, so the mark
       dissolves into hard pixels toward the bottom instead of fading smoothly. The mask
       carries the alpha, which is what the CSS mask in Logo.svelte samples. -->
  <defs>
    <mask id="dither" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}">
      <g fill="#fff" shape-rendering="crispEdges">
{chr(10).join("        " + r for r in rects)}
      </g>
    </mask>
  </defs>
  <g mask="url(#dither)">
    <g transform="{ORIGIN}">
      <path d="{PATH}" fill="none" stroke="#1faa5a" stroke-width="1.765"
            stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
</svg>
'''
)

# ---- favicons: coarse grid, or the dither is sub-pixel mush at 16-32px -------------
SCALE = 22 / H
DX = (32 - W * SCALE) / 2
DY = 5.0
CELL = 2.0  # tile units; 2px cells at a 32px render, aligned to the tile grid

THEMES = {
    'dark': ('#000000', '#efe5c0'),
    'light': ('#efe5c0', '#000000'),
    'vt320': ('#170800', '#ff9a10'),
    'grid': ('#120900', '#ff9810'),
    'c64': ('#2a2ab8', '#ffffff'),
    'matrix': ('#000000', '#a0e044'),
    'crypt': ('#100202', '#ee1100'),
}

fav = dither_rects(CELL, 0, 0, 32, 32, DY, DY + 22)
mask = chr(10).join("        " + r for r in fav)

for name, (bg, fg) in THEMES.items():
    (OUT / f'favicon-{name}.svg').write_text(
        f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'''
        f'''<defs><mask id="d" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">'''
        f'''<g fill="#fff" shape-rendering="crispEdges">{"".join(fav)}</g></mask></defs>'''
        f'''<rect width="32" height="32" rx="4" fill="{bg}"/>'''
        f'''<g mask="url(#d)"><g transform="translate({DX:.3f},{DY:.3f}) scale({SCALE:.5f}) {ORIGIN}">'''
        f'''<path d="{PATH}" fill="none" stroke="{fg}" stroke-width="1.765" '''
        f'''stroke-linecap="round" stroke-linejoin="round"/></g></g></svg>\n'''
    )

sizes = {p.name: p.stat().st_size for p in sorted(OUT.glob('favicon-*.svg'))}
print(f'logo-dither.svg {(OUT / "logo-dither.svg").stat().st_size}b  ({len(rects)} rects)')
print(f'favicons: {len(sizes)} files, {min(sizes.values())}-{max(sizes.values())}b, {len(fav)} rects each')
