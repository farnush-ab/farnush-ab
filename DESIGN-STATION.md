# Design Station — Website

A static, multi-page concept site for **Design Station**, a luxury home-automation, fixtures, and architectural-lighting showroom at Palladium Mall, Tehran.

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
