# DESIGN STATION — DESIGN BRIEF (v6 "Atelier")

*A Lovable-ready design and implementation brief for a complete rebuild of the Design Station flagship website.*

---

## 0 · ABOUT THIS DOCUMENT

This brief is written to be handed directly to a generative web tool such as Lovable, or to a design/development pair. It is structured so a builder can scaffold the site from it without further conversation:

- Section 2 defines the design system in concrete tokens.
- Section 3 is a section-by-section construction guide for the homepage.
- Sections 4–6 cover interactions, voice, and stack.
- Section 7 catalogs the assets the user has supplied (Cosmos moodboard) and what additional photography must still be commissioned.

**Reference assets reviewed.** The user supplied a folder named `claude.ds/` (also packaged as `ds.website.zip`) containing:

- **4 screenshots** showing the references the brand wants to evoke — Grohe "Shop the Look" hotspot rooms, a minimal hero with a single floating product (Diamond Jewelry template), glassmorphic smart-home UI overlays on a bedroom photo, and mobile light/scene control panels.
- **19 Cosmos moodboard JPEGs** of luxury interiors — warm-lit travertine baths, brushed steel and bronze faucets, sculptural pendant lighting, golden-hour photography.
- **1 MP4** (`cosmos_364735256.mp4`) — the cinematic hero reference.

Throughout this brief, where it says *"use moodboard image XYZ"* it refers to these supplied files. They define the **photography language** the site must adopt — warm afternoon light, sculptural product framing, travertine/oak/brass materiality.

---

## 1 · CONCEPT

**Working name for v6: *Atelier.***

The site re-frames Design Station from a *showroom that sells products* to **an atelier that quietly assembles rooms**.

Three strategic moves separate this from previous iterations:

1. **Architectural over commercial.** Product grids and shopping affordances recede. Photography of *rooms in real homes* leads. Each product is shown as a *consequence of an architectural decision*, not a SKU.
2. **The interaction is the showroom.** Where the Grohe reference uses static hotspot dots, we extend the same metaphor into a **scrolling cinematic room walk** — the user moves *through* a 3D-feeling space rather than clicking through pages.
3. **Quiet luxury, intelligently lit.** A single smart-home interaction (a Lutron-style scene toggle, applied site-wide) demonstrates the brand's category without ever using the word "smart" as marketing copy.

The site must feel like the print catalogue of a Milanese atelier, animated by a contemporary motion designer, and lit by a Persian cinematographer at golden hour.

---

## 2 · VISUAL LANGUAGE

### 2.1 Color tokens (locked, derived from user-supplied palette)

```css
:root {
  /* Primary surfaces */
  --cream:        #C0BFB2;  /* lighter primary — large surfaces, body */
  --cream-soft:   #D9D6C8;  /* even lighter for cards / hero */
  --cream-deep:   #ADAB9D;  /* mid-tone for subtle separation */

  /* Primary ink — the warm taupe, used as type colour and dark sections */
  --taupe:        #8C846C;  /* warm beige/taupe — primary darker */
  --taupe-soft:   rgba(140, 132, 108, 0.62);
  --taupe-faint:  rgba(140, 132, 108, 0.36);

  /* Deep ink — only for type and the rare dark moment */
  --ink:          #2A2418;  /* warm near-black for strong type */
  --ink-soft:     rgba(42, 36, 24, 0.65);
  --ink-faint:    rgba(42, 36, 24, 0.40);

  /* Metallic accent — used sparingly, < 5% of any view */
  --bronze:       #9C7F4A;  /* muted bronze for active states + accents */
  --bronze-soft:  #B89968;  /* light champagne — hover, highlights */

  /* Off-palette: a rare deep umber for footer / showcase only */
  --umber:        #1E1812;  /* a near-black with warm bias */

  /* Lines + scrims */
  --rule:         rgba(42, 36, 24, 0.10);
  --rule-cream:   rgba(192, 191, 178, 0.32);
  --whisper:      rgba(42, 36, 24, 0.04);
}
```

**Composition rule:** at any scroll position, ≥ 65% of the viewport should be `--cream` or `--cream-soft`. Dark sections (taupe / umber) are *moments*, not norms — they appear in 2–3 places across the entire site to punctuate the rhythm.

### 2.2 Typography

```
Display:  "PP Editorial New" or fallback "Cormorant Garamond"
          italic, weight 300, letter-spacing -0.02em
Body:     "Inter" or "Söhne", weight 300, letter-spacing 0.005em
Persian:  "Vazirmatn", weight 200/300, line-height 1.7
Mono:     "JetBrains Mono" for any numerals / specs
```

**Scale (rem):**

| Token | Size | Use |
|---|---|---|
| `--t-hero` | clamp(4rem, 11vw, 12rem) | Hero title |
| `--t-display` | clamp(2.5rem, 6vw, 5.5rem) | Section h2 |
| `--t-lede` | clamp(1.15rem, 1.4vw, 1.4rem) | Lead paragraphs |
| `--t-body` | 0.95rem | Body |
| `--t-cap` | 0.66rem, +0.28em tracking, UPPERCASE | Eyebrows, labels |
| `--t-mono` | 0.7rem, tabular-nums | Stats |

**Two rules of restraint:**
1. **Italic serif appears ≤ 6 times per page.** Only in section h2s and the hero. Anywhere else, use Inter.
2. **Uppercase tracked-out small caps are reserved for navigation, eyebrows, and category labels.** Never for body.

### 2.3 Spacing

A modular scale based on `0.5rem`:

```
--sp-1: 0.5rem    --sp-7: 6rem
--sp-2: 1rem      --sp-8: 9rem
--sp-3: 1.5rem    --sp-9: 12rem (section vertical pad)
--sp-4: 2rem      --sp-10: 16rem (showroom moments)
--sp-5: 3rem
--sp-6: 4rem

--gutter:    clamp(1.5rem, 7vw, 8rem)
--measure:   58ch   /* max body line length */
```

**Whitespace rule:** any section *introducing* a new content type (a new product collection, a new chapter of imagery) gets ≥ `--sp-9` of top padding. The site should feel like it has been *paginated*, not stacked.

### 2.4 Motion

Four cadences, used exclusively:

| Token | Duration | Used for |
|---|---|---|
| `--m-tap` | 220ms | Hover states, micro-feedback |
| `--m-reveal` | 980ms | Section entries on scroll |
| `--m-heavy` | 2200ms | Mood shifts, hero state changes |
| `--m-cinema` | 4200ms | Hero plane choreography, scene transitions |

**Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` for in/out, `cubic-bezier(0.65, 0, 0.35, 1)` for full transitions.

No bounces. No springs. No "fun". Everything decelerates into its final position the way a heavy door closes on a soft-stop hinge.

---

## 3 · HOMEPAGE — SECTION-BY-SECTION CONSTRUCTION GUIDE

The homepage is single-page-scroll, divided into eight movements. The figure in brackets is the desired viewport height.

### Movement 0 · Loader (1.6s)

A black scrim with the brand mark **Design Station** in italic serif, centred, weight 300, slightly tracked. A hairline draws horizontally across the screen left-to-right over 1.2 seconds, beneath the wordmark. When the line completes, the scrim drops away upward — revealing the hero. The line stays as the top edge of the navigation bar.

### Movement 1 · Hero (100svh) — *The Cinematic Room*

This is the centerpiece. Replace the previous Three.js multi-plane with a **scroll-driven layered photographic composition** modelled after `cosmos_364735256.mp4`.

**Composition (use moodboard images `cosmos_1941082142` and `cosmos_1696002072` as direct visual references):**

The hero is a **full-bleed photograph of a warm-lit luxury interior** — a basin with a brass faucet in golden-hour light, with sheer curtains, travertine wall, and a single pendant fixture. The image is captured at a wide focal length so the side walls recede into perspective, creating natural depth.

Layered on top, **four parallax layers**:

| Layer | Z-depth | Content | Mouse parallax |
|---|---|---|---|
| L1 (back) | -2.5 | The wide interior plate (warm-lit basin scene) | 8px |
| L2 (mid-back) | -1.0 | A separate cut-out of the architecture's far wall + window light spill | 14px |
| L3 (mid-front) | +0.4 | A cut-out of the principal product (the faucet alone, with its drop shadow) | 24px |
| L4 (foreground) | +1.6 | A small product detail — a brass disc, a folded towel, a single flower on a tray | 38px |

When the user moves the cursor, all four layers translate independently, creating a strong sense of camera position. When the user moves the cursor *toward the centre*, the layers settle to neutral. When they move toward an edge, the parallax amplifies — *as if leaning into the room*.

**Type overlay:**

- Top-left, vertically stacked: `ATELIER 01 · DESIGN STATION` (small caps, tracked, `--cream` opacity 0.8, mix-blend `difference`).
- Top-right, same treatment: live `TEHRAN · 19:43 · GOLDEN HOUR` — the third token switches with the actual time of day (morning / day / golden hour / night).
- Centre-bottom, large italic serif: *"چیزی برای فروش نداریم — یک اتاق داریم."* ("We do not sell. We hold a room.") at `--t-hero`, weight 200, italic. The italic em colour is `--bronze-soft`.
- Below the title, a single sub-line in body: *"شش‌هزار مترمربع، در پالادیومِ تهران، با هماهنگی قبلی."*
- Bottom-right corner: a thin vertical scroll-indicator that reads `↓ ENTER` and pulses softly.

**Scroll behaviour (the cosmos.so move):**

As the user scrolls the first 100vh, the hero **does not scroll past** — it stays sticky, and the layers compress toward the centre. L4 (the foreground product detail) **expands** as if walking into the room. By the time the user has scrolled 100vh, they're *inside* the foreground detail at extreme close-up. Then the next section reveals beneath, and the hero releases stickiness.

This is the single most expensive interaction on the site and it is worth it.

**Hero CTA:** a single floating chip, bottom-centre, glassmorphic — `رزرو ملاقات` in `--cream` text on `rgba(42,36,24,0.55)` with `backdrop-filter: blur(20px)`. Opens the booking modal.

### Movement 2 · Statement (60vh) — *The Atelier Premise*

After the hero, a calm full-width cream section. Two columns:

- Left (40%): a vertical hairline rule. Above it, in small caps: `THE ATELIER · سال نهم`. Below: a tiny pull-quote in italic serif — *"ما فروشنده نیستیم. مهماندار اتاق‌مان هستیم."*
- Right (60%): a single body paragraph, no more than 80 words, in `--ink-soft`. Persian-leaning copy explaining the showroom-as-atelier idea. Use the user's existing copy from screenshot 4:
  > *"ما در «دیزاین استیشن»، گلچینی از بهترین‌های دنیا را دور هم جمع کرده‌ایم؛ از شیرآلات خاص گرفته تا نور و هوشمندیِ خانه. فضای ما، بیشتر از اینکه فروشگاه باشد، یک فضای کاریِ مشترک برای شماست."*

No image in this movement. Whitespace is the design.

### Movement 3 · Shop the Room (140vh, sticky) — *The Walkthrough*

This is the **direct extension of the Grohe reference** (screenshot 1), but with the static photo replaced by a **two-image dissolve** that responds to scroll.

A single image — a full-width photograph of a luxury bath room interior in golden hour (use `cosmos_1941082142` style) — fills 90vh. Inside the image, **six interactive hotspots** sit on the actual products:

- Faucet
- Towel ring
- Mirror
- Wall sconce
- Soap dispenser
- Pendant light

Each hotspot is a 12px `--bronze` dot inside a 24px ring that pulses on a 2.4s loop. **On hover**, the dot expands to 28px and a small card slides in next to it from the nearest edge, showing:

- Lot number (e.g. "Lot 02")
- Product name + brand (e.g. *"Vola FS1 — Brushed Brass"*)
- A single line of provenance (e.g. *"کاست شده در هورزنس · دانمارک"*)
- A `Add to Folio →` link

**On click**, the room dissolves into a second photograph — *the same room, lit differently* (the same scene at night, with the pendant lit). Scroll continues; a third dissolve transitions to a *different room entirely* (a kitchen). Five rooms total, each with its own hotspot set, all stacked in a sticky 140vh container.

A small UI element bottom-centre shows `1 / 5` with a thin progress line. Click forward/back; drag horizontally on touch.

### Movement 4 · The Brand Cabinet (80vh)

Eight brand wordmarks, in a 4×2 grid on a `--cream-soft` background.

Use the user's brand list (Kohler · Sonos · American Standard · Grohe · hansgrohe · TOTO · Frigidaire · MOEN) and treat each wordmark in its real typographic style so it reads as a logo, not a label. Hover lifts the mark 12px and reveals beneath it `Iserlohn · since 1950` style provenance.

Above the grid, a single line: *"اکوسیستم برندها"* in serif italic.

### Movement 5 · Smart Product Lab (120vh) — *The Demo*

A full-bleed dark section (`--umber`). This is the direct response to screenshots 3 and 4 (the glassmorphic smart UI references).

**Composition:**

- Background: a real photo of a bedroom or living room interior (warm-lit, evening).
- Foreground (overlay): three glassmorphic UI panels floating over the room, like screenshot 3.

  1. **Scene control** — a row of pills: *"بیداری · کار · مهمانی · شب"*. Click any pill — the background photo cross-fades to that lighting state (cooler in the morning, warmer at evening). 1.4s transition.
  2. **Light slider** — a vertical rail with a draggable bronze handle. Drag the handle — the room actually dims (CSS filter brightness). Numbers next to the slider read percentage in Persian numerals.
  3. **Audio scene** — a small B&O Beolab badge with an animated waveform that pulses gently. Hover the waveform — a small overlay shows the track title in a tiny envelope.

This is **the** moment that proves the smart-home category. It must work flawlessly across hover, scroll, and touch.

A single overlay line, top-left of the section: `SMART CONTROL — صحنه‌ی شب`.

### Movement 6 · Showroom in 6,000 m² (100vh) — *The Hub Spread*

Editorial spread. Left half: a single very large photograph of the actual Palladium showroom — wide-angle, capturing the social table in foreground with product walls receding. Right half: vertically centred text:

- Eyebrow: `THE HUB · 6,000 M²`
- Italic serif h2: *"یک عصر، در میز اجتماعی."*
- Body, 56ch max: 60 words about the social table — bring the architect, bring the client, we stage what's on the bench.
- A small inline stat block: `8 برند · ۲۴۰ پروژه · از ۲۰۱۹`
- CTA: a thin underlined link `رزرو وقت ملاقات →`

On scroll, the left image scales 1.06 → 1.0 (subtle zoom-out) and the right text fades up in stagger.

### Movement 7 · Stories / Editorial (90vh)

A horizontal scroller of 4–6 cards. Each card is **a chapter from a previous project** — a portrait-orientation photograph + project name + neighbourhood + year. Hover any card: it lifts 8px and the brass underline draws under the title.

This is the editorial backbone — the *Inhabited* concept from earlier versions, now condensed.

Above the scroller: `LATEST CHAPTERS · ISSUE IV`.

### Movement 8 · Booking + Footer (120vh)

The closing movement is **the most important conversion surface**. It is *not* a contact form bolted onto the bottom. It is a full-screen booking experience.

**Structure:**

- Top: a large italic invitation — *"یک عصر آرام،<br/>در میز اجتماعی."* — at `--t-display` over `--umber` background, `--bronze-soft` italic em.
- Below the invitation, a **booking widget** (not a modal — it lives in the page). Three steps inline, side-by-side on desktop:
  1. **Intent** — radio cards for *Specifying a project / Client presentation / Material consultation / A quiet visit*
  2. **Date & window** — a small inline 7-day strip showing next available slots in Persian, click selects
  3. **Contact** — name, phone, optional email — floating labels
- Submit button: pill, `--cream` text on `--bronze`, full-width on mobile. On submit, the entire booking widget collapses into a typeset confirmation card showing the selected studio, date, and reply ETA.

**Footer (beneath the booking, same dark `--umber` background):**

- Four columns: brand block + social, navigation, contact (address + hours + direct line), newsletter signup.
- Newsletter: an inline input with a `--bronze` submit. On success the button morphs to "ثبت شد ✓".
- Bottom strip: `© دیزاین استیشن · ۱۴۰۵`, live Tehran time greeting in the centre with a pulsing `--bronze` dot, `با هماهنگی قبلی، از ۲۰۱۹` on the right.

A pre-footer detail — directly above the booking — is a 3rem-tall **marquee** in `--cream` against `--umber`: *"گلچینِ هشت برند · شش‌هزار مترمربع · میز اجتماعی · پالادیوم، تهران · از سال ۲۰۱۹"*, scrolling slowly right-to-left, pausing on hover.

---

## 4 · NAVIGATION

A fixed top bar, 80px tall, transparent over the hero.

**Layout:** brand left (italic serif `Design Station`, with a small caps subtitle `پالادیوم · تهران` beneath). Centre: a thin live time stamp + pulsing dot. Right: four anchor links (`اتاق · برندها · آزمایشگاه · تماس`) and a pill-shaped CTA `رزرو ملاقات` with `--bronze` background.

**On scroll past 80px:** the bar shrinks to 60px, gains `backdrop-filter: blur(20px)` on `rgba(192, 191, 178, 0.85)`, and a hairline bottom rule.

**Active section underline** — as the user scrolls, the underline draws under whichever anchor is currently in view (use IntersectionObserver, 35vh activation threshold).

**Mobile:** brand left, hamburger right. Tap hamburger → fullscreen overlay menu in `--umber` with the same four links at very large size (italic serif, weight 200), the booking CTA at the bottom.

---

## 5 · INTERACTIONS & MICRO-MOMENTS

### Custom cursor

A 10px outlined circle, `--ink` 1px border, transparent fill, mix-blend `difference` + `invert(1)`. Spring-damped (k=0.16, d=0.20) so it overshoots and settles.

**State machine:**
- Over text inputs → collapses to 2×22 ibeam.
- Over links/buttons → expands to 44px, fills with `rgba(156, 127, 74, 0.18)`, border becomes `--bronze`.
- Over a hotspot → grows to 56px with a small `+` glyph inside.
- Over an image marked `data-material="brass"` → emits a 6-particle fluid trail in `--bronze-soft`, the way a brush leaves a wet line.

Hide on `hover:none` (touch devices).

### Scroll-driven reveals

`opacity 0 → 1` and `translateY(28px → 0)` on a 980ms ease for every block flagged `.reveal`, triggered on `IntersectionObserver` with a 12% threshold. Stagger children by 80ms with `nth-child` rules — already in flagship.css, keep this.

### Reading progress

A 2px bar at the very top of the viewport, `--bronze`, width tracks `scrollY / (scrollHeight - clientHeight)`. Always visible, always live.

### Stats counters

Numbers in the "6,000 m² / 8 برند / 240+ پروژه / 2019" strip animate from 0 to their target value on first viewport entry, 1.8s ease-out, with Persian numeral formatting via `Intl.NumberFormat('fa-IR')`.

### Live time greeting

Footer + nav meta show *"غروب بخیر، تهران · 19:43"* — switches per hour: شب بخیر / صبح بخیر / ظهر بخیر / غروب بخیر. Refreshes every 30 seconds. Uses `Intl.DateTimeFormat('fa-IR', { timeZone: 'Asia/Tehran' })`.

### The "scene toggle" persistence

When the user picks a scene state in the Smart Product Lab (Wake / Work / Party / Night), persist it via `localStorage` and apply a *very subtle* tint to the entire site — `body::before` overlay at max 4% opacity in the scene's keyed colour, with a 2.2s heavy easing. This is the v3 "lighting bus" idea, refined.

---

## 6 · VOICE & COPY

### Tonal pillars

**Hosting, not selling.** *"We hold the room."* Never *"Buy this faucet."* Always *"This is the room we chose this for."*

**Specific, not abstract.** Use brand names, lead times, finish names. *"Vola FS1, brushed brass, 6 weeks"* — not *"Premium European fixtures."*

**Bilingual with parity.** Persian is the primary language. English is a tasteful courtesy reserved for nav labels, brand names, and dates.

### Sample copy lines (use verbatim or as templates)

| Slot | Copy |
|---|---|
| Hero title | *"چیزی برای فروش نداریم — یک اتاق داریم."* |
| Hero sub | *"شش‌هزار مترمربع، در پالادیومِ تهران، با هماهنگی قبلی."* |
| Statement | *"ما در «دیزاین استیشن»، گلچینی از بهترین‌های دنیا را دور هم جمع کرده‌ایم..."* (use existing user copy) |
| Walkthrough cue | *"خانه‌ی شماره ۰۲ — لواسان · سه برند، چهارده قطعه."* |
| Smart Lab eyebrow | *"کنترل هوشمند — صحنه‌ی شب."* |
| Showroom hub | *"یک عصر، در میز اجتماعی."* |
| Booking title | *"یک عصر آرام، در میز اجتماعی."* |
| Booking sub | *"زمانتان را انتخاب کنید. ظرف چهار ساعت کاری با تأیید نهایی تماس می‌گیریم."* |
| Confirmation | *"درخواست شما ثبت شد. تماس می‌گیریم."* |
| Footer signoff | *"با هماهنگی قبلی، از ۲۰۱۹."* |

### Forbidden words

`shop` / `خرید` / `قیمت` / `تخفیف` / `حراج` / `استثنایی` / `بی‌نظیر`. The brand earns its premium by not declaring it.

---

## 7 · TECHNICAL RECIPE

### Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | RSC for hero, ISR for product pages, route group for fa/en |
| Animation | **GSAP + ScrollTrigger** + **Framer Motion** | GSAP for the sticky hero choreography, FM for component state |
| 3D / photographic layers | **CSS transforms + image cut-outs** (PNGs with alpha) | Lighter than R3F; perfect for the four-plane parallax |
| Smart lab interactions | **React state + CSS filter on background photos** | No WebGL needed — keep it dependable |
| Image delivery | **next/image with `sizes` + Cloudflare Images** | AVIF + responsive variants automatic |
| Booking | **Cal.com self-hosted, embedded** | Real calendar without third-party branding |
| Type | **Variable fonts (woff2)** self-hosted | No Google Fonts in production |
| State persistence | **localStorage** for scene + mood + folio | No backend needed |
| RTL | **`dir="rtl"` + logical properties throughout** | Native, not retrofitted |
| Analytics | **Plausible (self-hosted)** | Trackers cheapen the brand |

### Performance budget

- LCP < 1.4s on a mid-range device
- INP < 200ms
- CLS < 0.02
- First-load JS ≤ 220 KB gzipped
- Hero image: AVIF, ≤ 380 KB at 1440p

### Image pipeline

Every photograph passes through:
1. **Crop** to a 16:10 or 4:5 canonical ratio
2. **Grade** to the warm/golden-hour palette (drop blue channel by ~6%, raise red by ~4%, slight S-curve in midtones)
3. **Export** AVIF + WebP fallback + JPEG 80
4. **Generate cut-outs** for hero parallax — products on transparent PNG, foreground details on transparent PNG

The grading step is what makes a stock photo look like *Design Station's* photo. Without it, the site reads as a template.

---

## 8 · ASSET INVENTORY

### Already supplied (from `claude.ds/`)

These are usable as **direct content** and as **photographic style guides**:

**Hero candidates** (warm light, sculptural composition):
- `cosmos_1941082142.jpeg` — warm-lit basin with brass faucet, sheer drapes, plants — **primary hero candidate**
- `cosmos_1696002072.jpeg` — minimalist travertine basin with pendant — secondary hero candidate
- `cosmos_1863761931.jpeg` — copper-toned kitchen alcove with pomegranates — for kitchen showcase
- `cosmos_217304919.jpeg` — bronze tap against sheer curtain — for "atelier moment"

**Product close-ups** (showcase spreads):
- `cosmos_321590197.jpeg` — chrome + black faucet on plain ground — product hero
- `cosmos_949244246.jpeg` — slim chrome faucet against travertine — material story
- `cosmos_290186355.jpeg` — bronze widespread on concrete — material story

**Room walkthroughs** (Shop the Room hotspot beds):
- `cosmos_1018855648.jpeg` — kitchen sink with city window — primary walk-through room
- `cosmos_230840336.jpeg` — bath with mirror and oak — secondary walk-through

**Cinematic reference**:
- `cosmos_364735256.mp4` — the cosmos.so video that defines the hero's cinematic feel. Use this as **motion reference** for the camera language; do not embed the video itself.

**Other moodboard images** to inspire (not required content):
- `cosmos_2913181` · `cosmos_1882925507` · `cosmos_1883007505` · `cosmos_47004102` · `cosmos_501721858` · `cosmos_34518950` · `cosmos_1368365239` · `cosmos_1639655608` · `cosmos_2039215081` · `cosmos_1036161363`

### Still required (commission)

For full production deployment, the user must still produce:

| Asset | Spec | Used for |
|---|---|---|
| **Showroom plate** | 4K wide-angle of the actual Palladium Hub, golden hour, with the social table foregrounded | Movement 6 (Showroom hub spread) |
| **5 walkthrough rooms** | Real homes specified by Design Station, photographed in two states each (day + evening) | Movement 3 (Shop the Room) |
| **8 product cut-outs** | Top-tier featured products against transparent backgrounds, PNG | Hero parallax + showcase |
| **Project portrait stack** | 4–6 portrait-orientation photos of completed residences | Movement 7 (Stories) |
| **Brand asset pack** | Authorised Kohler / Sonos / etc. wordmarks | Movement 4 (Brand Cabinet) |

Budget for photography: **2 days on the Palladium floor + 1 day per residence shoot.** Without this, the site falls back to the moodboard images (still beautiful, but not yours).

---

## 9 · MOOD BOARD (DESCRIPTIVE)

Imagine the following six images hung in sequence on a studio wall:

1. **Golden hour, bathroom alcove.** A brass faucet curves over a stone basin. Sheer linen curtains diffuse Tehran's late-September light. The water in the basin is utterly still.
2. **An empty meeting room.** A walnut table, four upholstered chairs, a single linear pendant unlit. The room awaits the architect's clients.
3. **A faucet, dissolved in light.** Polished chrome against a high-key backdrop. The product is so clean it could be a sculpture.
4. **A wide kitchen.** Warm oak cabinetry, white subway tile, a polished steel professional tap. Two pomegranates on a board catch the side light.
5. **A Lutron keypad.** Eight engraved scenes — `بیداری · کار · مهمانی · شب · ورود · خروج · شام · پایان روز`. A single bronze press indicates the active scene.
6. **A 6,000 m² showroom at night.** Architects walk the floor with their clients, accompanied by Design Station staff. The social table is occupied. A bottle of natural wine is open.

That is the website.

---

## 10 · NOTES TO THE BUILDER

If this brief is handed to **Lovable** or a similar generative AI tool:

- Start with the **palette tokens in section 2.1** verbatim — they're the load-bearing constraint.
- Build **section 3 in order**, top to bottom. Don't try to render all eight movements at once; ship the hero first, the booking second, then the walkthrough as the showpiece.
- Use **next/image** with the supplied moodboard photos as placeholders. The builder must annotate every image with `// production: replace with [asset name from section 8]`.
- The **scroll-sticky hero** is the hardest piece. Build it last; if budget runs out, fall back to a single-image hero with the four-layer parallax still active on mouse-move only.
- **Do not** scaffold a CMS. The site is hand-edited until the chapter count grows past 8.

If this brief is handed to **a designer**:

- The brief defines the *system*. Use it to lay out three Figma frames (homepage cover, walkthrough, smart lab), then iterate within the tokens.
- The brand wants *quiet luxury*. If any element makes you feel "let me add one more thing here", remove the thing instead.

If this brief is handed to **a creative director for approval**:

- The one strategic move worth defending: **the hero does not sell a product. It sells the room.** Every iteration of this site that performed below expectation in previous rounds put a product front-and-centre. This one inverts that. Defend it.

---

## 11 · ONE-LINE PITCH

> *"A digital atelier for architects, lit at golden hour, with a single brass detail catching the camera as you scroll into it."*

If the project leads cannot agree that this is what we are making, the brief has failed and we should restart from the moodboard.

---

— end of brief —
