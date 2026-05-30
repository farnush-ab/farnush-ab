# Design Station — Website

A static, multi-page concept site for **Design Station**, a luxury home-automation, fixtures, and architectural-lighting showroom at Palladium Mall, Tehran.

## Concept

*"The Quiet Room"* — the digital counterpart to the showroom's central Co-working Hub. The site sells the room before the merchandise: the Hub is Frame 02, before any product is shown.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — eight-frame narrative: Hero · Hub · Disciplines · **Scenario Simulator** · **Live Light** · Curation · **Lot Teaser** · Archive · Access |
| `reserve.html` | Atelier Reservation — Intent → Studio → Date flow with live summary |
| `collections.html` | Smart Home · Fixtures · Lighting — editorial product index |
| `lot.html` | **Smart-Product View** — scroll-driven exploded view of Vola FS1 across five beats |

## v3 — *The Cinematic Room*

The page becomes a room. Lighting on screen actually tints the page.

- **Hero — Cinematic Gateway** (`hero-cinematic.js`) — 4 procedurally textured planes at different depths, each with a custom DoF blur shader. Cursor X drives parallax; cursor Y drives focal plane. ACES tonemapping + UnrealBloom postprocessing. Awaits real showroom footage to swap textures for depth-masked AVIF.
- **Lighting Bus** (`lighting-bus.js`) — global state aggregating active fixture sources (kelvin × intensity × visibility) and writing CSS variables (`--bus-r/g/b`, `--bus-intensity`, `--bus-warm`, `--bus-shadow-len`). Body background, card shadows, and a fixed multiply overlay respond in real time. Maximum DOM tint capped at 6% for legibility.
- **Spectrum scrubber** — horizontal color-temperature ribbon (1800K – 6500K) tied to the bus. Hover the band or tap a fixture name; the page warms or cools.
- **PBR materials** (`env-map.js`) — procedural studio cubemap fed through `PMREMGenerator`, applied as `scene.environment` to hub and lot scenes. Brass, ceramic, and accent materials upgraded to `MeshPhysicalMaterial` with anisotropy, clearcoat, and proper envMapIntensity.
- **Inertial cursor + fluid trail** — spring-damped cursor with velocity inheritance; particle trail with curl/vorticity over `data-material` surfaces, density scaled to cursor speed.
- **Cinematic cadences** — four named timings (`--cad-glance` 240ms, `--cad-reveal` 980ms, `--cad-heavy` 2200ms, `--cad-cinematic` 4200ms) for mood transitions and section reveals.

### What v3 leaves for production

- Real 8K showroom plate (RED Komodo + 29/50mm primes, two-day shoot) — `hero-cinematic.js` swaps `CanvasTexture` for AVIF.
- Manufacturer-grade GLBs (Vola FS1, Flos 2097, Lutron HomeWorks) — Draco + KTX2 compressed, 600KB each.
- 40 macro-photography plates for atmospheric backgrounds.
- Theatre.js timeline authoring for designers to edit Smart-Product View beats.

## v2 — *The Living Room*

The site now keys to a single global variable, `--mood`, with four states (`morning`, `studio`, `evening`, `late`). All color, contrast, shadow length, and fixture warmth interpolate in lockstep.

- **Scenario Simulator** — homepage section with mood toggles, live-rendered floor-plan SVG (16 lighting nodes, blinds, HVAC, audio path), and updated sequence trace per mood. Persists via localStorage.
- **Live Light** — Three.js pendant lamp whose Kelvin and emissive intensity respond to the active mood and to scroll proximity. Bulb color computed via Tanner Helland Kelvin → RGB.
- **Smart-Product View (`lot.html`)** — five-beat scrollytelling: Object → Material → Explosion → Open (handle turns, water flows) → Reassembly. Twelve+ named primitives.
- **Material-aware cursor** — different styling and a canvas particle trail when hovering elements tagged `data-material="brass|light|glass|stone"`.
- **Quiet Mode** — footer toggle freezes all motion, hides cursor. Persists via localStorage.

## Design System

**Palette — *Plaster, Patina, and Light***
- Ground `#EFEBE4` · Hush `#1A1A1C` · Material (brushed bronze) `#8B6F47` · Patina (smoked sage) `#3D4A40`

**Typography**
- Display: Cormorant Garamond (italic-leaning serif)
- Body: Inter, +0.5% tracking
- Tabular numerals for Lot codes and dates

**Motion**
- Custom drifting cursor, blend-mode difference
- Three.js scenes: hero dust drift; Hub architectural cutaway with hand-aware camera orbit
- IntersectionObserver-driven reveals
- Threshold word scales on scroll

## Stack (demo)

- Vanilla HTML + CSS + ES modules
- Three.js 0.160 via jsDelivr CDN
- Google Fonts (Cormorant Garamond, Inter)
- Zero build step — open `index.html` in a browser

## Production stack (recommended)

Next.js 15 · GSAP ScrollTrigger · React Three Fiber + Drei · Theatre.js · Sanity (bilingual fa/en) · Cal.com self-hosted · Plausible · Vercel Edge + Arvan Cloud CDN.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Drop the folder onto Vercel, Netlify, or Cloudflare Pages. No build configuration required.
