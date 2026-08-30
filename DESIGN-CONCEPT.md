# Design Station — Website Concept v2

A complete overhaul concept, written as a hand‑off brief for an implementation pass
(human team or generative tools such as Lovable / v0 / Cursor). It supersedes the
"Quiet Room" direction in `DESIGN-STATION.md` while keeping the same brand voice:
quiet authority, architectural restraint, no shouting.

> Scope of this document: brand frame, design system, motion language, sitemap,
> page‑by‑page layout with section‑level wireframe descriptions, component
> inventory, imagery direction, and tech recommendations. It is descriptive — not
> a coded implementation.

---

## 1. Brand Frame

**Design Station** — a 6,000 m² flagship showroom in Palladium Mall, Tehran.
Exclusive importer of global brands in:

- **Architectural hardware** — door handles, hinges, locks, profiles
- **Smart‑home systems** — lighting control, shading, climate, AV
- **Premium lighting** — decorative + architectural

The website is not a catalog. It is a **digital extension of the showroom**:
the room comes before the merchandise, the material comes before the spec sheet,
and the visit is the conversion event.

**Brand personality**

| Is | Is not |
|---|---|
| Quiet, considered, materially precise | Loud, promotional, discount‑driven |
| Editorial, magazine‑grade typography | Catalog‑grade, dense, gridded |
| Tactile (brushed, woven, knurled) | Glassy, glossy, plasticky |
| Confident in white space | Afraid of an empty screen |
| Bilingual fa / en, equal weight | English‑first with token Farsi |

**One‑sentence positioning**
*A house of materials for the architects of Tehran — and the rooms they imagine.*

---

## 2. Design Principles

1. **Light first.** The site is daylight, not midnight. Background is the cream
   `#C0BFB2` (and a pure paper variant `#F4F2EC`). Darker tones appear only as
   *small, deliberate* moments of contrast — never as a full‑viewport background.
2. **White space is the product.** Every section has at least one breath of
   silence — a paragraph of empty grid, an oversized margin, a single image
   floating in a quarter of the viewport.
3. **One idea per screen.** A section earns the user's full attention or it
   doesn't ship. No carousels of three competing CTAs.
4. **Interaction reveals craft.** Hovers, scroll, and pointer motion expose
   material detail (a grain shifts, a knurl rotates, a lamp warms). Interaction
   is never decorative — it always teaches the product.
5. **Quiet typography.** A single editorial serif and a single neutral sans.
   No third typeface. Generous leading.
6. **Originality over reference.** Gessi, Dornbracht, and cosmos.so are
   *posture references* — they tell us how confidence reads on a screen. We
   never reproduce their layouts.

---

## 3. Color System

A **light, warm, low‑contrast** palette with one metallic accent.

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--paper` | `#F4F2EC` | Pure background — homepage hero, large editorial spreads | 60% |
| `--cream` | `#C0BFB2` | Default page background, card surfaces | 25% |
| `--taupe` | `#8C846C` | Body text on cream, soft section dividers, captions | 8% |
| `--ink` | `#2A2824` | Headlines, primary text on paper | 5% |
| `--bronze` | `#9A7B4F` | Metallic accent — single hover state, single CTA, single underline | 2% |
| `--patina` | `#3B4438` _(used sparingly)_ | One "deep" section per page only — e.g. Showroom block | <1% |

**Rules of use**

- **No black.** `--ink` is a warm near‑black, never `#000`.
- **No pure white.** `--paper` is a hint of warmth; pure white reads cold next to taupe.
- **Bronze is precious.** Used on max one element per fold — the active filter,
  the CTA, the hovered link. Never as a fill on large surfaces.
- **"Light dark" moments.** When contrast is needed, prefer `--patina` at 92% over
  `--ink` at 100%, and limit any dark region to ≤ 35 vh per page.
- **Gradients** are forbidden except for a single ~3% noise/grain overlay on
  large flats to avoid banding on premium displays.

**Mood reference (textual mood board)**

> Linen curtain at 11 a.m. · brushed bronze knurl catching one window · raw
> plaster wall warmed by an Edison filament · a single white tulip in a stone
> vase · the spine of an architecture monograph · steam off a clay cup.

---

## 4. Typography

Two families. No more.

| Use | Family | Weight / style | Notes |
|---|---|---|---|
| Display | **Söhne Breit** _or_ Cormorant Garamond | Light, italic for emphasis | Headlines, hero, section labels |
| Body | **Inter** _or_ Söhne | Regular 400, Medium 500 | Body, UI, captions, nav |
| Numerals | Inter / Söhne, **tabular** | — | Lot codes, dates, addresses |
| Farsi pair | **Estedad** (display) + **Vazirmatn** (body) | Match weights to Latin | Equal vertical rhythm in fa/en |

**Scale (desktop, fluid clamp to mobile)**

```
display-xl   clamp(56px, 9vw, 168px)  line-height 0.92  letter-spacing -0.02em
display-l    clamp(40px, 5.5vw, 96px) line-height 1.00
display-m    clamp(28px, 3vw, 56px)   line-height 1.08
title        24 / 32                  line-height 1.20
body         16 / 28                  line-height 1.75
caption      13 / 20                  letter-spacing  0.06em uppercase
```

**Treatment**

- Italic serif fragments inside sans headlines (*"the people who design"*) —
  a single editorial gesture per page.
- Captions and eyebrows in **uppercase Inter 13 px, letter‑spacing 0.08em,
  color `--taupe`**.
- Paragraph max width: **62 ch.** Never wider.

---

## 5. Motion Language

Motion is **slow, weighty, and silent.** Nothing snaps. Nothing pings.

| Element | Behavior |
|---|---|
| Default easing | `cubic-bezier(0.22, 1, 0.36, 1)` — long, quiet decel |
| Default duration | 600 ms for UI, 1200 ms for hero/section transitions |
| Cursor | Custom 18 px dot, lags pointer by ~80 ms, scales to 56 px on hover targets, blend‑mode `difference` on dark moments |
| Scroll | `lenis`‑style smoothing, ~0.08 lerp; no parallax beyond ±8% |
| Reveal | IntersectionObserver: text rises 16 px + fades over 800 ms, images mask up from baseline over 1.2 s |
| Image hover | 1.04× scale over 900 ms with subtle exposure lift (+3% brightness) |
| Hero camera | Pointer‑driven yaw / pitch within ±6°, return‑to‑rest after 2 s idle |

**Performance budget**

- Hero scene < 1.4 MB total GPU memory
- LCP < 2.2 s on 4G mid‑tier Android
- CLS = 0 (all images have intrinsic aspect ratios)
- Three.js scene auto‑downgrades to a poster image below 60 fps for 3 consecutive seconds

---

## 6. Information Architecture

A flat, five‑destination site.

```
/                 Home — the cinematic anchor
/collections      Index of all three disciplines + filters
   /collections/hardware
   /collections/smart
   /collections/lighting
   /collections/[product]    Product detail
/lab              The Smart Product Lab — interactive demos
/showroom         The 6,000 m² visit — virtual tour
/atelier          Reserve a private visit
/journal          Editorial pieces (optional, post‑launch)
```

Primary nav: **Collections · Lab · Showroom · Atelier**.
Persistent CTA: **Reserve a visit** (bronze underline on hover).

---

## 7. Homepage — Section by Section

Eight sections, each one breath. Roughly 9 viewport heights total on desktop.

### 7.1 Hero — "The Light Room"

> *Inspired by the depth/parallax feel of the cosmos.so reference, but with our
> own posture: a single luxury interior rendered as parallax layers of light.*

**Composition (desktop)**

```
┌──────────────────────────────────────────────────────────────┐
│  DESIGN STATION                              EN / فا   Visit │  ← nav, paper bg
│                                                              │
│                                                              │
│                                                              │
│      A house of materials                                    │
│      for the architects                                      │
│      of Tehran.                                              │
│                                                              │
│                          ⟶  Three‑layer interior scene       │
│                             drifts with the cursor           │
│                             (taupe walls, cream floor,        │
│                              one bronze handle in focus)      │
│                                                              │
│  01 · The Light Room        Palladium Mall · Floor 4 · 2019  │
└──────────────────────────────────────────────────────────────┘
```

**Behavior**

- Background is `--paper`. No veil, no overlay.
- The 3D / parallax composition sits in the **right two‑thirds** of the
  viewport. The headline sits in the **left third**, italic serif fragment on
  "architects".
- Layers (back → front): plaster wall · linen curtain · a single architectural
  hardware piece (door pull, faucet spout, or sconce) · a soft ground shadow.
- **Camera**: Three.js orthographic scene with five depth planes. Pointer
  controls yaw/pitch within ±6°; scroll pushes the camera forward 18% over the
  first viewport, revealing the hardware piece in macro detail at 100% scroll.
- **Idle micro‑motion**: the curtain breathes (2 px sway, 6 s loop); the
  bronze surface catches a single specular glint every 9 s.
- **Hover**: hovering the hero brings the cursor‑lag dot over the hardware,
  triggering a 200 ms exposure lift and a caption fade‑in: *"Olivari · Boma ·
  Brushed Bronze · Lot 0142"*.

**Fallback** (no WebGL / reduced motion): a high‑res still of the same composition,
the headline, and a static caption.

### 7.2 Statement — One sentence, one breath

A full viewport on `--paper`. No image. One paragraph, max 24 words, set in
`display-m` italic. Centered vertically, left margin = 1/8 of viewport.

> *"We do not sell hardware. We furnish the small, deliberate gestures that
> finish a room — the handle, the switch, the light."*

A thin `--taupe` line, 1 px, 96 px wide, sits 6 rem below the paragraph.

### 7.3 Disciplines — Three doors

Three full‑height panels side by side on desktop, stacked on mobile. Background
alternates `--paper` / `--cream` / `--paper`. Each door is an image + a single
verb.

```
┌──────────────┬──────────────┬──────────────┐
│              │              │              │
│   [image]    │   [image]    │   [image]    │
│              │              │              │
│   Hold       │   Wire       │   Light      │
│              │              │              │
│   Hardware   │   Smart      │   Lighting   │
│   ⟶          │   ⟶          │   ⟶          │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Interaction**

- On hover, the *other two* panels desaturate to 55% and shrink to 0.96×; the
  hovered panel reveals a second image (macro detail) crossfading over 900 ms.
- Verb (Hold / Wire / Light) shifts from `--ink` to `--bronze` on hover.
- Click → `/collections/{discipline}`.

**Image direction** (from `/mnt/data/claude.ds/`)

- *Hold*: a single door pull, three‑quarter angle, plaster wall behind.
- *Wire*: a wall‑mounted touch panel or smart switch, finger approaching.
- *Light*: a pendant lit at 2700 K against a cream wall, dusk.

### 7.4 Smart Product Lab — Teaser

A **single horizontal slab**, 75 vh, `--paper` background. Left half: a short
editorial paragraph. Right half: a live, interactive miniature.

**The miniature**: a small isometric rendering of a corner of a living room.
Two controls below it:

```
   ◯  Warm 2700K   ●  Cool 4000K        ▢ Curtains  ▣ Lights
```

Clicking changes the scene in real time — the lighting temperature shifts, the
curtain rises. Everything in `--cream` / `--taupe` / `--paper`; the lit area
glows `--bronze` at the lowest temperature.

CTA: `Enter the Lab ⟶` (bronze underline).

### 7.5 Showroom — The single "light dark" moment

The only section that uses `--patina` as background. Limited to **one viewport
height max**.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                                                              │
│   6,000 m²                              ⟶ wide cinematic     │
│   of material,                            still of the show‑ │
│   on the fourth floor                     room, taupe‑on‑    │
│   of Palladium.                           patina, one warm   │
│                                            window of light   │
│                                                              │
│   Book a private walk ⟶                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Behavior**

- Background `--patina`, text `--paper`.
- The image is a single wide hero shot of the showroom — picked from
  `claude.ds` for the one with the strongest single light source, so the
  composition reads as "warm window in a quiet room" rather than "interior
  catalog photo".
- On scroll, the image masks up from baseline over 1.4 s; numerals "6,000"
  count up from 0 with tabular Inter.
- CTA on hover: bronze underline crawls left‑to‑right over 500 ms.

### 7.6 Curation — The brand index

A typographic spread. No images. The 24‑ish brands Design Station carries,
laid out as an editorial column in `display-m`, two columns on desktop:

```
   Olivari    ·    Gessi    ·    Flos    ·    Crestron
   Dornbracht ·    Foscarini ·  Lutron    ·    Lualdi
   Boffi      ·    Artemide ·    Bticino  ·    ...
```

**Interaction**: hovering a brand name fades it to `--bronze` and reveals a
one‑line origin caption to the right (*Olivari — Borgomanero, Italy, 1911*).
Click → filter `/collections` by that brand.

### 7.7 Atelier — The conversion

A simple two‑column block on `--cream`.

- **Left:** a single product still or showroom corner photo, full‑bleed in its
  column, no caption.
- **Right:** form‑less invitation. Three lines:
  *"By appointment. Bring drawings. Bring questions. We pour tea."*
  Followed by **`Reserve a visit ⟶`** — the most prominent bronze CTA on the
  homepage.

### 7.8 Footer — Quiet practical

Three columns on `--paper`:

```
Design Station             Visit                       Index
Palladium Mall, 4th        Sun–Thu  11:00–21:00         Collections
Vali‑Asr Ave, Tehran       Fri      14:00–22:00         Lab
                           By appointment recommended   Showroom
+98 21 ...                                              Atelier
hello@designstation.ir
                                                       EN  /  فا
```

A single horizontal taupe line at top. No social icons (or one, max — Instagram).
Bottom strip: copyright, year, and a tiny lot‑style serial like `LOT 0001 · 2026`.

---

## 8. Collections Page — Editorial Index

**Top of page**

A 50 vh header on `--paper`. Three filter chips on the left:
**`Hardware · Smart · Lighting`**. A search field on the right, no border, just
a taupe underline. Below: a faint count, *"137 pieces · 24 houses."*

**Grid**

Asymmetric editorial grid — *not* a uniform 4‑column. Three sizes per row:
**oversize (col‑span 6) · medium (col‑span 4) · small (col‑span 3)**, mixed.
Whitespace cells inserted intentionally — at least 1 empty cell per 5 products.

**Card**

- Image, intrinsic aspect (no crop).
- Below image: brand caption in uppercase taupe, product name in serif display‑m.
- On hover: image fades to a second image (alternate angle or detail),
  product name shifts to bronze, a small `⟶` appears bottom‑right.

**Filters**

Sticky bottom bar, slim, paper background:
**`Discipline · Brand · Finish · Style · Room`**. Selected filter chips fill
`--bronze` with `--paper` text. A single `Clear` link in taupe.

**Detail pages (`/collections/[product]`)**

- Single hero image, ~85 vh, paper background, no caption.
- A horizontal scroll strip of detail shots (knurl, finish, scale comparison)
  with snap behavior.
- Spec table — tabular Inter, alternating cream / paper rows.
- For 6–10 hero products (hand‑picked: a Gessi faucet, an Olivari handle,
  a Foscarini pendant), a **3D interactive viewer** in place of the hero image:
  drag to rotate ±180° yaw, ±25° pitch, double‑click to reset. Built on
  `<model-viewer>` (glTF, Draco‑compressed, < 2.5 MB per model).
- Bottom CTA: `Reserve to see in person ⟶`.

---

## 9. Smart Product Lab — Page

The most interactive page on the site. The point: prove the "smart" claim
without jargon.

**Hero**

A 60 vh statement: *"The room obeys. Quietly."* on `--paper`.

**Three live demos** — each a full viewport, alternating `--paper` / `--cream`:

### Demo 1 — Light Scene

An isometric room rendered in soft cream and taupe vector shapes. Four buttons:
**`Morning · Work · Dinner · Off`**. Clicking shifts the warmth, intensity,
and zone of the lit area; the bronze "lit" region animates over 900 ms.
A small caption reads the scene aloud: *"2700 K · 32% · zones 1, 3."*

### Demo 2 — Shading

A horizontal cross‑section of a window with a linen blind. Drag the blind up
and down; the wall behind responds (light falls, shadow lengthens). On release,
the blind animates to the nearest preset (0%, 30%, 70%, 100%) and the preset
name appears in taupe caption.

### Demo 3 — Integration map

A radial diagram on `--cream`. Center node: *"One pane of glass."* Six outer
nodes: **lighting · shading · climate · audio · access · scenes**. Hovering a
node draws the line from center in bronze, and a short caption appears below
the diagram explaining the integration in one sentence.

**Closing block**

A typographic outro: *"The smart house is a quiet house. We tune the silence."*
CTA: `Book a Lab session ⟶`.

---

## 10. Showroom Page — The Visit, Virtual

The page that has to *feel* like the 6,000 m² floor without pretending to be a
360° tour stretched to fill a screen.

**Hero**

The single wide cinematic still from the homepage Showroom slab, here at full
height. Headline: *"Floor 4. Sixteen rooms. One conversation."*

**The walk**

A vertical scroll narrative. Each section is one *room* of the showroom — six
to eight rooms total, hand‑picked from `claude.ds` for compositional strength:

```
Room 01 — Entry / Material Library
Room 02 — The Hardware Wall
Room 03 — Gessi · Dornbracht corner
Room 04 — Lighting Theatre
Room 05 — Smart‑Home Apartment Mock
Room 06 — The Hub (co‑working / sample table)
```

Each block: a single large image on `--paper`, a 1‑sentence caption in serif,
a small floor‑plan diagram in the corner showing which room you're in (the
active room fills `--bronze`, others stay taupe outline). Scroll advances
through the rooms; the floor plan stays sticky in the lower‑right.

**Closing block**

Practical: address, opening hours, parking note, public transit note, and the
`Reserve a visit ⟶` CTA. Repeated map view in cream / taupe (custom‑styled
Mapbox or Google Maps), no pin chrome — just a single bronze dot at Palladium.

---

## 11. Atelier — Reservation

Keep the existing intent → studio → date flow from the current `reserve.html`,
but restyle to the new palette. Three steps, one card per step, full‑viewport,
generous margins. No progress bar — a small lot‑style numeral counts up:
**`STEP 01 · INTENT`** in taupe caption.

Form fields: no boxes, just taupe underlines that thicken on focus.
Submit button: bronze fill, paper text, 56 px tall, full column width.
Confirmation page: a single line of italic serif —
*"We will write to you within the day."*

---

## 12. Imagery Direction

(Since I cannot inspect `claude.ds/` from this sandbox, here is the **selection
brief**. Apply it to the folder yourself, or describe the candidates and I'll
slot them.)

**Choose ~24 images total, no more.** A site that uses too many photographs
loses its sense of editing.

| Use | Count | Criteria |
|---|---|---|
| Hero (homepage parallax layers) | 3–4 | One plaster wall, one linen / curtain, one macro of bronze hardware |
| Discipline doors | 3 + 3 | Per door: one wide scene, one macro detail crossfade |
| Smart Lab teaser | 0 | Vector / WebGL only — no photos |
| Showroom slab (home) | 1 | Wide, single light source, taupe‑on‑warm dusk feeling |
| Showroom page rooms | 6–8 | Each room one image, picked for composition not coverage |
| Collections cards | 12–24 | Product on neutral cream/paper background, intrinsic aspect |
| Atelier still | 1 | Showroom corner with tea cup, paper, a single object |
| Footer / texture | 0 | None — the typography carries the footer |

**Pass rules** — accept an image only if:

- The dominant tone is cream / taupe / paper — not gray, not black, not blue‑white
- There is at most **one** strong light source
- The composition has at least 35% breathing room
- There is one tactile material in focus (brushed metal, plaster, linen, oak, marble)

**Reject** — even if the product is the right product:

- Catalog‑studio shots on pure white
- Anything with visible reflections of the photographer's setup
- Wide showroom shots that read as "retail" rather than "atelier"

---

## 13. Component Inventory

A short, deliberate kit. Each is reusable across pages.

| Component | Notes |
|---|---|
| `Nav` | Paper bg, taupe links, bronze underline on hover. EN / فا toggle. |
| `LotLabel` | Uppercase Inter 13 px, letter‑spacing 0.08em, taupe. `01 · The Light Room` |
| `EditorialParagraph` | Serif display‑m, italic fragment support, 62 ch max |
| `Door` | Image + verb + caption + arrow; hover desaturates siblings |
| `RoomBlock` | Full‑bleed image + 1‑sentence caption + sticky mini‑floor‑plan |
| `ProductCard` | Image, brand caption, name, hover‑swap secondary image |
| `Viewer3D` | `<model-viewer>` wrapper, drag‑rotate, dbl‑click reset |
| `FilterChip` | Pill, taupe outline default, bronze fill when active |
| `CTA` | Text link with `⟶`, bronze underline on hover; or filled bronze button |
| `Cursor` | Custom 18 → 56 px dot, blend‑difference on dark sections |
| `MapMuted` | Custom‑styled Mapbox in cream / taupe, single bronze dot |
| `SceneLab` | Isometric WebGL component, scene presets |
| `MarqueeBrands` | Slow horizontal scroll of brand names, taupe |

---

## 14. Tech Recommendation (for Lovable handoff)

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | RSC, edge, image pipeline, i18n built‑in |
| Styling | **Tailwind v4 + tokens** | Tokens map to CSS variables in section 3 |
| Animation | **Motion (Framer Motion v11) + Lenis** | Smooth scroll + spring transforms |
| 3D | **React Three Fiber + Drei + @google/model-viewer** | Hero scene + product viewers |
| CMS | **Sanity** (bilingual fa/en, image hotspot) | Editorial control of rooms / products |
| Booking | **Cal.com self‑hosted** | Atelier flow, RTL‑friendly |
| Analytics | **Plausible** | Quiet, privacy‑forward — fits brand |
| Hosting | **Vercel + Arvan Cloud CDN** | Edge in EU, mirror in IR for latency |
| Fonts | **Söhne / Inter / Estedad / Vazirmatn** (self‑hosted) | No third‑party FOIT |
| RTL | **`dir="rtl"` on `/fa/*`** + logical CSS properties throughout | Equal weight for Farsi |

**Build budget**

- < 180 KB JS on first load for non‑Lab pages
- Hero 3D lazy‑loaded after LCP, code‑split by route
- All images served as AVIF + WebP fallback, lazy below the fold

**Accessibility**

- WCAG AA. Bronze on paper passes at 16 px+ — verified.
- All motion respects `prefers-reduced-motion`: hero falls back to still, scroll
  smoothing disables, reveals shorten to 200 ms cross‑fade.
- All interactive surfaces have a visible focus ring in `--ink` 2 px, 4 px offset.

---

## 15. Homepage Visual Mood — Textual Wireframe

A single ASCII map of the homepage, top to bottom, to anchor handoff:

```
┌──────────────────────────────────────────────────────────────┐
│  NAV  (paper, taupe links, bronze CTA underline)             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO — "The Light Room"                                     │
│  · Left third: italic serif headline on paper                │
│  · Right two‑thirds: 3D parallax (wall · curtain · bronze)   │
│  · Bottom strip: lot label + address                          │
│                                              ~100 vh         │
├──────────────────────────────────────────────────────────────┤
│  STATEMENT — single italic paragraph centered on paper       │
│                                              ~70 vh          │
├──────────────────────────────────────────────────────────────┤
│  DISCIPLINES — three doors (Hold · Wire · Light)             │
│  · Alternating paper/cream backgrounds                       │
│                                              ~110 vh         │
├──────────────────────────────────────────────────────────────┤
│  LAB TEASER — slab, left text + right interactive scene      │
│                                              ~75 vh          │
├──────────────────────────────────────────────────────────────┤
│  ░░░  SHOWROOM — the one "light dark" moment ░░░             │
│  · `--patina` bg, single wide cinematic still                │
│  · "6,000 m²" tabular count‑up                               │
│                                              ~100 vh         │
├──────────────────────────────────────────────────────────────┤
│  CURATION — typographic brand index, two columns on paper    │
│                                              ~80 vh          │
├──────────────────────────────────────────────────────────────┤
│  ATELIER — image + invitation + bronze "Reserve" CTA         │
│                                              ~85 vh          │
├──────────────────────────────────────────────────────────────┤
│  FOOTER — three columns, single taupe rule, lot serial       │
└──────────────────────────────────────────────────────────────┘
```

**Total**: ~9 viewport heights. Six of them are predominantly `--paper`. One is
`--cream`. One is `--patina` (the showroom). Bronze appears on **at most five**
elements site‑wide above the fold of any given section.

---

## 16. What changes vs. the existing repo

The current site (`index.html`, `collections.html`, `reserve.html`) implements
the earlier "Quiet Room" direction with the Plaster/Hush/Bronze palette and a
six‑frame narrative. This concept replaces:

- **Palette** — Hush `#1A1A1C` removed as background; `--paper` + `--cream` are
  now the substrate. Bronze becomes warmer (`#9A7B4F`). Patina is retained but
  only for the single Showroom moment.
- **Narrative** — six frames collapse to eight homepage sections, each shorter
  and more focused. The "Hub reservation" concept becomes the *Atelier* page.
- **New surfaces** — `/lab` (Smart Product Lab), `/showroom` (virtual walk),
  `/collections/[product]` (product detail with optional 3D viewer).
- **Hero** — the dust‑drift Three.js scene is replaced by a parallax interior
  composition, lighter and more architectural.

The motion language, typography pairing, lot‑label idiom, and bilingual
treatment are retained.

---

*End of brief. Next deliverable on request: tokenized CSS variable file
(`assets/css/tokens.css`) wired to this palette, plus a redesigned homepage
shell (`index.html` v2) that prototypes sections 7.1 through 7.3.*
