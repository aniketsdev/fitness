# Shubham Rawat Fitness — One-Page Site Design

**Date:** 2026-05-09
**Owner:** Shubham Rawat (coach), build by Jyoti
**Status:** Approved — ready for implementation plan

## Goal

A single-page React website for fitness coach **Shubham Rawat** that converts visitors into WhatsApp conversations. The site presents Shubham's coaching offer (weight gain, weight loss, in-person training, group challenges), builds trust through bio + transformations, and routes every CTA to a pre-filled WhatsApp chat.

## Audience

- People searching for an online or in-person fitness coach in Shubham's area
- Both weight-loss and muscle-gain goals
- Mobile-first traffic (Instagram bio link, WhatsApp shares) — design must look great on phones above all else

## Success criteria

1. Site loads under 2s on mid-tier mobile (LCP < 2.5s, no large client-side libs)
2. Every CTA opens WhatsApp with a pre-filled message in one tap
3. Layout works on screens 320px–1920px wide with no horizontal scroll
4. Coach can swap photos, WhatsApp number, message text, and Instagram link by editing **one config file**
5. Lighthouse: Accessibility ≥ 95, Performance ≥ 90 on mobile

## Visual system — Warm Wellness

**Palette (CSS custom properties via Tailwind v4 `@theme`):**

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FEF5EC` | Page background |
| `--color-forest` | `#2D3A2E` | Body text, primary buttons, dark sections |
| `--color-terracotta` | `#C97B4A` | Accent — CTA fills, eyebrow text, decorative shapes |
| `--color-sage` | `#8FA689` | Secondary accent — stat strip, dividers |
| `--color-cream-dark` | `#F5E6D3` | Subtle section backgrounds, card surfaces |

**Typography:**
- **Display**: `Fraunces` (Google Fonts) — used for headlines, optical-size variable, italic for emphasis
- **Body**: `Inter` (Google Fonts) — 400/500/600/700 weights
- Fluid sizes via `clamp()` (Tailwind v4 supports arbitrary `text-[clamp(...)]`)

**Imagery & decoration:**
- Round / soft-rectangle photo masks (`rounded-3xl`, `rounded-full`)
- Generous whitespace (section padding `py-20 md:py-28`)
- Organic blob shapes as decorative absolute elements (terracotta/sage at low opacity)
- Subtle fade-up on scroll (custom `useScrollReveal` hook using `IntersectionObserver`)

## Tech stack

- **Framework**: React 19 + TypeScript (existing scaffold)
- **Build**: Vite 8 (existing scaffold)
- **Styling**: Tailwind CSS v4 — installed as `tailwindcss` + `@tailwindcss/vite` plugin. No `tailwind.config.js` needed; tokens defined in `@theme` block inside `src/styles/global.css`.
- **Fonts**: Google Fonts via `<link>` tag in `index.html` (`Fraunces` + `Inter`)
- **No animation library** — CSS transitions + IntersectionObserver only
- **No router** — single page
- **No backend** — WhatsApp click-to-chat replaces any contact form

## Page structure

The page renders top-to-bottom in this order. All section IDs match nav anchor links.

### 1. Sticky nav (`<Nav />`)
- Logo "Shubham Rawat" left (font-display, italic)
- Center/right links: `About` · `Process` · `Results` · `Contact`
- Right-side WhatsApp pill button (terracotta, white text, message-circle icon)
- Translucent cream background with `backdrop-blur` once page is scrolled
- **Mobile**: hamburger toggle revealing a slide-down menu

### 2. Hero (`<Hero />`, `id="top"`)
- **Eyebrow**: `— CERTIFIED FITNESS COACH` (terracotta, tracking-wider, uppercase)
- **Headline**: *"Your body, your timeline."* (Fraunces italic, ~`text-6xl md:text-7xl`)
- **Subline**: "Online 1-on-1 coaching · Custom diet plans · In-person training · Group challenges"
- **Primary CTA**: "Start on WhatsApp" (forest fill, cream text)
- **Secondary CTA**: "See transformations" (text link with arrow, scrolls to `#results`)
- **Right column on desktop**: portrait placeholder in a tall rounded-mask, decorative terracotta circle behind it
- **Mobile**: stacks vertically, photo above text

### 3. About Shubham (`<About />`, `id="about"`)
- Two-column on desktop (1fr photo · 1fr text), stacked on mobile
- Left: portrait placeholder, rounded-3xl, sage blob behind
- Right:
  - Section label `— ABOUT`
  - Headline *"Hi, I'm Shubham."* (display italic)
  - 2–3 paragraph bio (placeholder Lorem-but-realistic copy about coaching philosophy)
  - 3-stat strip: `500+ clients trained` · `7 years coaching` · `92% success rate` (sage-tinted background, divided)

### 4. How it works (`<Process />`, `id="process"`)
- Centered section heading: *"How it works."*
- Subheading: "Three steps from where you are to where you want to be."
- 3 cards in a row (desktop) → vertical stack (mobile):
  1. **Free WhatsApp consultation** — "Tell me your goals. We'll figure out if we're a fit."
  2. **Custom plan built for you** — "Workouts + diet, designed around your schedule and budget."
  3. **Daily check-ins & adjustments** — "I'm in your WhatsApp every day. Plans evolve as you do."
- Each card: large numeral (display, sage), heading, body, terracotta hairline divider

### 5. Transformations / Testimonials (`<Transformations />`, `id="results"`)
- Heading: *"Real results."*
- Horizontal scroll-snap row containing **5 cards**:
  - 3 before/after cards (split image, name + duration + goal)
  - 2 quote cards (avatar + name + 1–2 sentence testimonial)
- **Desktop**: visible all in one row with overflow-x-auto + scroll-snap (no JS carousel)
- **Mobile**: same scroll-snap pattern, one card visible at a time
- All images are committed placeholder JPGs in `src/assets/` (clearly labeled `placeholder-*.jpg`)

### 6. Final CTA band (`<CtaBand />`, `id="contact"`)
- Full-width terracotta block with cream text
- Headline: *"Ready when you are."*
- Subline: "Free 15-minute consultation. No pressure."
- Large WhatsApp button (cream fill, terracotta text, message-circle icon)
- Decorative cream blob shapes in corners at low opacity

### 7. Footer (`<Footer />`)
- Forest background, cream text
- Three columns on desktop (single column on mobile):
  - Brand: "Shubham Rawat" + tagline
  - Quick links (same as nav)
  - Social: Instagram link (placeholder), WhatsApp link
- Bottom strip: "© 2026 Shubham Rawat. All rights reserved."

## WhatsApp integration

All four CTAs (nav, hero, final band, footer) use a single reusable `<WhatsAppButton />` component. The button reads from a single config:

```ts
// src/config.ts
export const WHATSAPP_CONFIG = {
  number: 'TODO_REPLACE_WITH_E164_NUMBER', // e.g. '919876543210' (no +, no spaces)
  defaultMessage: "Hi Shubham, I'm interested in your coaching. Can we talk?",
};

export const SOCIAL_LINKS = {
  instagram: 'TODO_REPLACE_WITH_INSTAGRAM_URL',
};

export const COACH = {
  name: 'Shubham Rawat',
  city: 'TODO_REPLACE_WITH_CITY',
};
```

The button constructs: `https://wa.me/{number}?text={encodeURIComponent(message)}` and opens with `target="_blank" rel="noopener noreferrer"`. Each instance can override the message via prop (e.g., final CTA uses a slightly different intro), defaulting to `WHATSAPP_CONFIG.defaultMessage`.

## Component breakdown

```
src/
  config.ts                       # All TODO placeholders centralized here
  App.tsx                         # Composes <Nav /> + 6 sections + <Footer />
  main.tsx                        # Existing entry — imports global.css
  components/
    Nav.tsx                       # Sticky nav with mobile hamburger
    Hero.tsx
    About.tsx
    Process.tsx
    Transformations.tsx
    CtaBand.tsx
    Footer.tsx
    WhatsAppButton.tsx            # Reusable; props: { variant: 'primary'|'cream'|'pill', message?: string, label?: string }
    Icon.tsx                      # Inline SVG icons (message-circle, instagram, menu, x, arrow-right) — no icon library
  hooks/
    useScrollReveal.ts            # IntersectionObserver fade-up; returns ref + isVisible
  styles/
    global.css                    # @import "tailwindcss"; + @theme { tokens } + body resets
  assets/
    placeholder-coach.jpg
    placeholder-before-after-1.jpg, -2.jpg, -3.jpg
    placeholder-avatar-1.jpg, -2.jpg
```

## Responsive strategy

Mobile-first using Tailwind breakpoints:

| Range | Tailwind prefix | Adjustments |
|---|---|---|
| `<640px` | (default) | Single column everywhere; hamburger nav; horizontal scroll-snap for transformations; reduced section padding (`py-16`); smaller display sizes |
| `≥640px` | `sm:` | Slightly larger type, tighter mobile layout polish |
| `≥768px` | `md:` | Hero becomes 2-column (text + photo); About becomes 2-column; Process becomes 3 cards in a row |
| `≥1024px` | `lg:` | Full nav (no hamburger); footer becomes 3 columns; max-width container `max-w-7xl mx-auto px-6 lg:px-8` |

Type sizes use Tailwind's responsive classes plus `clamp()` for hero headline.

## Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>` ordered correctly (one `<h1>` in hero)
- All images have descriptive `alt` text (placeholders too: `alt="Coach Shubham Rawat (placeholder)"`)
- Focus rings on all interactive elements (Tailwind's default `focus-visible:ring`)
- Color contrast: forest-on-cream and cream-on-forest both pass WCAG AA
- WhatsApp buttons have descriptive text ("Start on WhatsApp"), not just an icon
- Mobile nav toggle has `aria-expanded` and `aria-controls`

## Out of scope (YAGNI)

- Backend / form submission (WhatsApp replaces it)
- CMS, blog, or multi-page routing
- Dark mode
- i18n / Hindi version
- Analytics (can be added later by dropping a script tag in `index.html`)
- Service worker / offline support
- Email signup / newsletter
- Animation libraries (Framer Motion, GSAP)
- Icon library (we hand-roll ~5 inline SVGs in `Icon.tsx`)

## TODO placeholders to swap before going live

A single grep for `TODO_REPLACE` will find all of these:

1. `WHATSAPP_CONFIG.number` — Shubham's WhatsApp number (E.164 format, no +)
2. `SOCIAL_LINKS.instagram` — Instagram URL
3. `COACH.city` — city for the in-person training mention
4. `placeholder-*.jpg` files in `src/assets/` — replace with real coach photo, before/afters, testimonial avatars
5. Bio paragraphs in `<About />` — replace with real bio
6. Stat numbers in `<About />` (`500+`, `7 years`, `92%`) — replace with real numbers
7. Testimonial names + quotes in `<Transformations />`

## Open questions / non-blocking

None — design is locked. Implementation can proceed.
