# Design Station — Atelier (Next.js)

A premium digital atelier for **Design Station**, the 6,000 m² luxury showroom at Palladium Mall, Tehran. Built as a library of "luxury primitives" composed into editorial pages.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** (locked design tokens — bone / ink / earth / terracotta)
- **Framer Motion 11** (named cadences: glance / reveal / heavy / cinema)
- **Lenis 1.1** (smooth scroll, integrated with Framer)
- **Zustand 5** (state primitives — folio, reservation, scene)

## Quick start

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

Requires Node 20+.

## Iteration 1 scope (shipped here)

- ✅ `PageShell` with Lenis smooth-scroll, blend-mode cursor, scroll-progress bar
- ✅ `Nav` — sticky transparent → blurred on scroll, RTL-aware, live Tehran time
- ✅ `HeroInspect` — single rotating product, masked-headline (background image clipped through type with scroll-parallax), pagination, auto-advance, arrow-key navigation
- ✅ `ReservationWidget` — 3-step inline booking (Intent / Date / Contact), Persian numerals, success state
- ✅ `Footer` — 4-column dark spread with live Tehran greeting, newsletter, social

## Iteration 2 (next)

- `Lookbook` — sticky scroll-driven room dissolves with annotated hotspots (Grohe "Shop the Look" pattern)
- `Brands` — 4×2 cabinet with hover provenance
- `SmartLab` — glassmorphic scene picker with bg-filter scenes
- `ShowroomHub` + `Stories` (horizontal snap scroller)
- Sanity CMS wiring for chapters

## Design system

Tokens live in two places, kept in sync:

- `tailwind.config.ts` — utility classes (colors, spacing, font sizes, cadences)
- `app/globals.css` — Tailwind v4 `@theme` reflection + base layer

### Palette

```
bone        #ECE6D3   (page background)
bone-soft   #F4EFE0
bone-deep   #D9D3BD
ink         #1F1A12   (text + dark sections accent)
earth       #8C846C   (captions, meta)
terracotta  #BC846C   (interactive accent — ≤ 5% of any view)
umber       #1A140E   (footer, dramatic dark sections)
```

### Motion cadences

```
glance   220ms   hover micro-feedback
reveal   980ms   section entries on scroll
heavy   2200ms   mood shifts, body tint
cinema  4200ms   hero state changes, scene transitions
```

Use them as Tailwind utilities (`duration-glance`, `ease-cinema`) or pull from `lib/motion/presets.ts` for Framer Motion variants.

## Folder map

```
app/                  # Next.js App Router (currently single-locale fa-RTL)
components/
  atoms/              # leaf, no state — Type, Cursor, Pin, NumeralFa, ScrollProgress
  molecules/          # composed, one job — Nav, FloatingInput, TimeSlot, SubmitPill
  organisms/          # major sections — HeroInspect, ReservationWidget, Footer
  shells/             # layout shells — PageShell, SmoothScroll
lib/
  motion/             # Framer presets + cadences
  content/            # typed brand/product data
  utils/              # time, faNum
public/photography/   # user-supplied moodboard photos
```

## Photography

`public/photography/` contains the four hero/product images extracted from the supplied `claude.ds/` moodboard:

- `hero-veil.jpeg` — warm-lit basin with brass faucet (used as the masked-headline background)
- `product-01.jpeg` — chrome basin mixer on black
- `product-02.jpeg` — tall slim chrome tap against travertine
- `product-03.jpeg` — smoked-bronze three-piece mixer on concrete

For production, replace with brand-licensed photography.

## Deploy

```bash
pnpm build
# deploys cleanly to Vercel via auto-detect, or:
# vercel --prod
```

## License

Private — Design Station, Palladium Mall, Tehran.
