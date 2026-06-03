# Design Station

The digital extension of Design Station — a 6,000 m² luxury architectural hub at Palladium, Tehran. This site reads as a premium digital magazine: ultra-minimalist, tactile, profoundly editorial.

## Stack

- **Next.js 15** · App Router · React 19 · TypeScript
- **Tailwind CSS** with a bespoke warm-neutral token system
- **Framer Motion** — weighted easing curves, no bounce
- **Lenis** smooth scroll
- **React Three Fiber + Drei** for the hero "Cosmos" sculptural object
- **next/font** loading Playfair Display (Latin display), Inter (Latin body), Vazirmatn (Persian primary)
- RTL by default (`<html dir="rtl">`)

## Design Tokens

```
bone       #ECE6D3   primary background
sand       #C0BFB2   alt depth surface
ink        #2A2620   soft "black" (never pure)
ash        #5C5849   secondary text
gold       #8C846C   muted accent
terracotta #BC846C   warm accent (italic highlights)
patina     #3D4A40   deep contrast
```

Motion curves live in `lib/motion.ts`:
- `ease.weighted = [0.22, 1, 0.36, 1]` — entries
- `ease.glide   = [0.65, 0, 0.35, 1]` — exits
- Spring: `stiffness 60, damping 22, mass 1.1` — the "weighty inertia" of the hero object

## Structure

```
app/
  layout.tsx           RTL root · fonts · Lenis
  page.tsx             6-section narrative
  reserve/page.tsx     dedicated reservation route
components/
  atoms/               Button, Typography, Pin, Divider, NumberBadge
  molecules/           Nav, Footer, ProductCard, BrandLogo, HotspotTooltip, ProductDrawer
  organisms/           HeroCosmos, HeroMaskText, Lookbook, BrandGallery, ShowroomStory, ReservationForm
  providers/           LenisProvider
lib/                   motion tokens · product/brand data · cn helper
```

## Six modules

1. **HeroCosmos** — R3F sculptural torus knot with bronze transmission material; rotates with weighted spring inertia on cursor movement.
2. **HeroMaskText** — SVG outline typography ("STATION") masks a textured image; parallax on scroll + mouse.
3. **Lookbook** — interior scenes overlaid with elegant pin hotspots → tooltip on hover → side drawer with full product detail on click.
4. **ShowroomStory** — editorial split with parallaxed showroom image and tabular stats.
5. **BrandGallery** — grayscale brand wordmarks that gain color and reveal origin/year on hover.
6. **ReservationForm** — three-step booking (Intent → Slot → Contact) with live summary panel.

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## Notes

- Placeholder imagery is served from Unsplash via `next/image`. Swap to `public/media/` for production.
- The Cosmos hero uses an abstract torus knot as the central object — drop a `.glb` into `public/models/` and swap the geometry inside `HeroCosmos.tsx` when final assets are ready.
- The reservation step currently logs to local state only — wire to Cal.com or a serverless handler for production.
