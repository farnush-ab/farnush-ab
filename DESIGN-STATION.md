# Design Station — Website

A static, multi-page concept site for **Design Station**, a luxury home-automation, fixtures, and architectural-lighting showroom at Palladium Mall, Tehran.

## v4 — *INHABITED* (current)

A complete redesign, from scratch. The site is now a digital editorial publication: **INHABITED — a quarterly index of homes specified through this room.** Each issue carries eight chapters, each a home in detail with annotated rooms, an editorial article, and a list of the specified lots.

**Strategic move:** We do not sell products. We curate homes. The product directory exists, but it lives in service of the chapters — never the other way round.

### Visual system
- **Palette** — paper-warm-white `#F7F4EE` and dense ink `#161512`, with a single refined-brass accent `#A87B45`. No mood-keyed inversions; the editorial body is always paper.
- **Type** — Cormorant Garamond italic at editorial scale (clamp 3.5rem → 13rem on hero) + Inter 300 for body at narrow column widths (max 56ch, line-height 1.78). Hairline rules at 1px. Tabular numerals.
- **Layout** — generous side gutters (`clamp(1.5rem, 7vw, 8rem)`), asymmetric grids, magazine-style three-column article spreads with sticky meta + body + aside.

### Hero — Cinematic Gateway
`inhabited-hero.js` runs a five-plane WebGL parallax composition standing in for a real interior photograph: warm wall + window, midground architecture/doorway, brass pendant catching light, atmospheric dust, foreground faucet detail. Each plane has its own DoF blur shader; cursor X drives parallax, cursor Y shifts the focal plane. ACES tonemap + UnrealBloom postprocessing.

The hero is dark and immersive. The editorial body that follows is paper-white and calm. The contrast is the point — the site is "a window into a room, then a quiet read."

### Pages
| File | Purpose |
|---|---|
| `index.html` | Cover (cinematic hero) → Contents (8 chapters) → Featured spread (No. 01) → Article → Atelier → Directory → Masthead foot |
| `chapter.html` | One chapter in detail: cover + 4 annotated rooms with hotspots, editorial article, closing spread, atelier callback |
| `reserve.html` | Atelier Reservation in INHABITED style: Intent → Studio → Chapter (optional) with live summary |
| `collections.html` | Directory — full alphabetised product list across Smart Home, Fixtures, Lighting |

### Files
- `assets/css/inhabited.css` — single self-contained stylesheet (no dependency on v1/v2/v3 styles)
- `assets/js/inhabited.js` — cursor + scroll reveal + cover parallax + reserve interactions
- `assets/js/inhabited-hero.js` — five-plane cinematic hero with bloom + DoF

### What this version leaves behind (v1–v3)
The mood system, scenario simulator, live light section, lot scrollytelling, spectrum scrubber, and lighting bus from v3 are not part of v4's primary site flow. They remain in the repository on their own branches; v4 is the canonical experience going forward.

---

## v1 — *The Quiet Room*

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
