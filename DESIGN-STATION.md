# Design Station — Website

A static, multi-page concept site for **Design Station**, a luxury home-automation, fixtures, and architectural-lighting showroom at Palladium Mall, Tehran.

## v5 — *Flagship* (current)

A single-page luxury showroom site modelled on the conservative-luxury reference the client supplied. Cool sand palette, restrained typography, intelligent micro-interactions. The structure mirrors the reference (hero → concept → brands → experience → contact) while every section adds a "smart" interaction beat that elevates it past the reference.

### Visual system
- **Palette** — cool sand `#E8E4DA` + warm soft `#F2EFE7` + dense ink `#1F1F1D` + a single muted champagne accent `#A89377`. Hairline rules at 1px.
- **Type** — Inter at 300 weight for nav, body, and small caps (0.24–0.32em tracking). Cormorant Garamond italic for editorial moments (h2, captions, accents). All-caps quote treatment on the hero tagline with italic-serif quotation marks.
- **Layout** — single-page anchor scroll. Generous side gutters, narrow text columns (max 36ch), asymmetric two-column splits.

### Sections + interactions
1. **Nav** — fixed transparent; on scroll, blurs to `rgba(232,228,218,0.85)` with backdrop-filter. Active section underline. Live "Tehran · HH:MM" centre meta with pulsing accent dot.
2. **Hero** — large procedural composition of a brushed-steel faucet over a stone basin with laminar water stream. On load: slow Ken Burns zoom-in. On cursor: a soft radial "shine" follows the cursor across the brushed metal (overlay blend). On scroll: stage translates + fades; caption fades in stagger.
3. **Concept** — text left, sconce-lit composition right. **Interactive smart switch overlay** on the visual: click toggles `is-on/is-off`, the entire image dims (filter brightness 0.55) over 1.4s. The switch's left/right rocker fills with accent when ON, ink when OFF.
4. **Brands** — 4×2 grid of eight brand wordmarks, each set in a distinct typeface to suggest a logo. Hover: wordmark lifts 12px, accent rule draws under, "Iserlohn · since 1950"-style caption fades up. Staggered intro reveal.
5. **Experience** — 1 large + 2 small tiles. Each tile has **mouse-driven 3D tilt** (perspective 1000px, rotateX/Y ±4°, easing 0.08), with the inner visual translating in the opposite direction for depth parallax. Hover surfaces an arrow chip top-right.
6. **Contact** — form with **floating labels** (transform + letter-spacing animation), submit button with **water-fill** hover effect (accent-deep fills from bottom). Stylised SVG map with pulsing pin and label.
7. **Footer** — live time-of-day greeting ("Good evening, Tehran · 19:43"), updated every 30s via `Intl.DateTimeFormat` with `timeZone: 'Asia/Tehran'`.

### Cursor
Outlined 10px circle with mix-blend-difference + invert. Spring-damped follow (k=0.18, d=0.20). Expands to 44px with muted-accent fill over interactive elements; collapses to a 2×22 ibeam over text inputs.

### Files
- `assets/css/flagship.css` — single self-contained stylesheet (no dependency on v1–v4 styles)
- `assets/js/flagship.js` — cursor + reveal + nav scroll-state + hero shine + smart switch + tile tilt + form labels + time greeting
- `index.html` — single-page flagship layout

### What this version leaves behind
Multi-page architecture (atelier, lot, chapter, directory) from v1–v4 is not part of v5. v5 is a single landing page in the spirit of the reference. Multi-page can return as a phase 2 if needed.

---

## v4 — *INHABITED*

See branch `claude/inhabited` (PR #5). A quarterly editorial publication — eight chapters per issue, annotated rooms, full-bleed cinematic hero.

## v3 — *The Cinematic Room*

See branch `claude/design-station-v3` (PR #4). Mood-keyed body, live light, lighting bus, PBR materials.

## v2 — *The Living Room*

See branch `claude/design-station-v2` (PR #3). Scenario simulator, smart-product view, lot scrollytelling.

## v1 — *The Quiet Room*

## Concept

*"The Quiet Room"* — the digital counterpart to the showroom's central Co-working Hub. The site sells the room before the merchandise: the Hub is Frame 02, before any product is shown.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — six-frame narrative: Hero · Hub · Disciplines · Curation · Archive · Access |
| `reserve.html` | Atelier Reservation — Intent → Studio → Date flow with live summary |
| `collections.html` | Smart Home · Fixtures · Lighting — editorial product index |

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
