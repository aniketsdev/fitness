# Shubham Rawat Fitness Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page React + TypeScript + Tailwind v4 site for fitness coach Shubham Rawat that converts visitors into pre-filled WhatsApp chats.

**Architecture:** Single-page, no router, no backend. Tailwind v4 with `@theme` tokens for the Warm Wellness palette. Mobile-first responsive layout with `sm/md/lg` breakpoints. All swappable content (WhatsApp number, images, social links, copy) lives in `src/config.ts`.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Vitest + React Testing Library, Google Fonts (Fraunces + Inter).

**Spec:** `docs/superpowers/specs/2026-05-09-fitness-website-design.md`

**Working directory:** `/home/ttpl-lnvl15-0262/Documents/Learn/fitness`

**Note on git:** This directory is not a git repo at the start. Task 1 includes optional `git init`. If you skip git, also skip the `git add` / `git commit` steps in later tasks.

**Note on rolldown native bindings:** The fitness scaffold has previously hit a "rolldown native binding missing" error after installs. If `npm install` produces that error, run: `rm -rf node_modules package-lock.json && npm install`.

---

## File Structure

```
fitness/
  index.html                          # MODIFY — add Google Fonts <link> tags
  package.json                        # MODIFY — add deps (tailwind v4, vitest, RTL)
  vite.config.ts                      # MODIFY — add @tailwindcss/vite plugin, vitest config
  vitest.setup.ts                     # CREATE — extends matchers + jsdom mocks
  tsconfig.app.json                   # MODIFY — include vitest types
  src/
    main.tsx                          # MODIFY — import './styles/global.css'
    App.tsx                           # MODIFY — replace scaffold with site composition
    App.css                           # DELETE
    index.css                         # DELETE
    config.ts                         # CREATE — all swappable content + TODO placeholders
    components/
      Icon.tsx                        # CREATE — inline SVG icons
      WhatsAppButton.tsx              # CREATE — reusable CTA button
      WhatsAppButton.test.tsx         # CREATE — URL construction tests
      Nav.tsx                         # CREATE — sticky nav + mobile hamburger
      Nav.test.tsx                    # CREATE — mobile menu toggle test
      Hero.tsx                        # CREATE
      Hero.test.tsx                   # CREATE — smoke render
      About.tsx                       # CREATE
      About.test.tsx                  # CREATE — smoke render
      Process.tsx                     # CREATE
      Process.test.tsx                # CREATE — smoke render
      Transformations.tsx             # CREATE
      Transformations.test.tsx        # CREATE — smoke render
      CtaBand.tsx                     # CREATE
      CtaBand.test.tsx                # CREATE — smoke render
      Footer.tsx                      # CREATE
      Footer.test.tsx                 # CREATE — smoke render
    hooks/
      useScrollReveal.ts              # CREATE — IntersectionObserver fade-up
      useScrollReveal.test.ts         # CREATE — observer wiring test
    styles/
      global.css                      # CREATE — Tailwind import + @theme + body resets
```

Each file has one clear responsibility; no file mixes layout sections.

---

## Task 1: Install dependencies and (optional) init git

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.git/` (optional)

- [ ] **Step 1: Initialize git (optional but recommended)**

```bash
cd /home/ttpl-lnvl15-0262/Documents/Learn/fitness
git init
git add -A
git commit -m "chore: initial Vite scaffold"
```

If you choose not to use git, skip every subsequent `git add` / `git commit` step in this plan.

- [ ] **Step 2: Install Tailwind v4 (production deps)**

Run:
```bash
npm install tailwindcss @tailwindcss/vite
```

If you see a "rolldown native binding missing" error, run:
```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: install completes; `package.json` has `tailwindcss` and `@tailwindcss/vite` under `dependencies`.

- [ ] **Step 3: Install testing deps (dev deps)**

Run:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jsdom jsdom
```

Expected: install completes; `package.json` lists all six packages under `devDependencies`.

- [ ] **Step 4: Add test scripts to package.json**

Edit `package.json`'s `"scripts"` block to add `test` and `test:run`:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run"
}
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add tailwind v4 and vitest dependencies"
```

---

## Task 2: Configure Vite for Tailwind + Vitest

**Files:**
- Modify: `vite.config.ts`
- Create: `vitest.setup.ts`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Update vite.config.ts**

Replace the contents of `vite.config.ts` with:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
```

- [ ] **Step 2: Create vitest.setup.ts**

Create `vitest.setup.ts` with:

```ts
import '@testing-library/jest-dom/vitest'

// IntersectionObserver isn't available in jsdom — provide a minimal mock
class MockIntersectionObserver {
  observe = () => null
  unobserve = () => null
  disconnect = () => null
  takeRecords = () => []
  root = null
  rootMargin = ''
  thresholds = []
}

;(globalThis as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver =
  MockIntersectionObserver
```

- [ ] **Step 3: Update tsconfig.app.json to include vitest types**

Open `tsconfig.app.json` and add `"vitest/globals"` and `"@testing-library/jest-dom"` to the `compilerOptions.types` array. If `types` doesn't exist, add it. The relevant block should look like:

```json
"compilerOptions": {
  /* keep existing options */
  "types": ["vitest/globals", "@testing-library/jest-dom"]
}
```

Also ensure `"include"` covers `vitest.setup.ts`:

```json
"include": ["src", "vitest.setup.ts"]
```

- [ ] **Step 4: Verify config compiles**

Run: `npx tsc -b --noEmit`
Expected: Exits 0, no errors.

- [ ] **Step 5: Verify vitest runs (no tests yet — should report 0 tests)**

Run: `npm run test:run`
Expected: Exits 0 with message like "No test files found".

- [ ] **Step 6: Commit**

```bash
git add vite.config.ts vitest.setup.ts tsconfig.app.json
git commit -m "chore: configure tailwind plugin and vitest"
```

---

## Task 3: Set up global styles and design tokens

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`
- Delete: `src/App.css`, `src/index.css`

- [ ] **Step 1: Create src/styles/global.css**

Create `src/styles/global.css` with:

```css
@import "tailwindcss";

@theme {
  --color-cream: #FEF5EC;
  --color-cream-dark: #F5E6D3;
  --color-forest: #2D3A2E;
  --color-forest-soft: #3d4d3e;
  --color-terracotta: #C97B4A;
  --color-terracotta-dark: #a86238;
  --color-sage: #8FA689;
  --color-sage-soft: #b9c7b3;

  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-cream);
  color: var(--color-forest);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}
```

- [ ] **Step 2: Update src/main.tsx**

Open `src/main.tsx`. Change the line `import './index.css'` to:

```ts
import './styles/global.css'
```

- [ ] **Step 3: Delete the old default CSS files**

Run:
```bash
rm src/App.css src/index.css
```

- [ ] **Step 4: Remove App.css import from App.tsx**

Open `src/App.tsx`. Remove the line `import './App.css'` if present. (We will replace the entire file in Task 16, but remove the broken import now so the dev server starts.)

- [ ] **Step 5: Verify the dev server starts and the page renders**

Run: `npm run dev`

Open the printed URL. The default Vite scaffold should load with cream background and forest text colors. Stop the dev server with Ctrl-C.

If you see a blank page or compile error, double-check the `global.css` import path in `main.tsx`.

- [ ] **Step 6: Commit**

```bash
git add src/main.tsx src/styles/global.css src/App.tsx
git rm src/App.css src/index.css
git commit -m "feat: add tailwind v4 global styles and warm wellness theme tokens"
```

---

## Task 4: Add Google Fonts to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Open index.html and replace the contents**

Replace the contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shubham Rawat — Fitness Coach</title>
    <meta name="description" content="Online and in-person fitness coaching with Shubham Rawat. Custom plans for weight loss, muscle gain, and lasting transformation." />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify in browser**

Run: `npm run dev`. Open the page. Open DevTools → Network → filter by "font" — confirm Fraunces and Inter font files load (status 200). Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add fraunces and inter google fonts"
```

---

## Task 5: Create the central config file

**Files:**
- Create: `src/config.ts`

- [ ] **Step 1: Create src/config.ts**

Create `src/config.ts` with:

```ts
// Single source of truth for all swappable content.
// Search this file for "TODO_REPLACE" before going live.

export const COACH = {
  name: 'Shubham Rawat',
  title: 'Certified Fitness Coach',
  city: 'TODO_REPLACE_WITH_CITY',
  yearsExperience: 7,
  clientsTrained: '500+',
  successRate: '92%',
} as const;

export const WHATSAPP_CONFIG = {
  // E.164 format without the leading "+", e.g. '919876543210' for India
  number: 'TODO_REPLACE_WITH_E164_NUMBER',
  defaultMessage:
    "Hi Shubham, I'm interested in your coaching. Can we talk?",
} as const;

export const SOCIAL_LINKS = {
  instagram: 'TODO_REPLACE_WITH_INSTAGRAM_URL',
} as const;

// Placeholder images from Unsplash — swap with real photos before launch.
// All URLs use the unsplash.com CDN; no auth needed.
export const IMAGES = {
  coachPortrait:
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
  aboutPortrait:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  beforeAfter: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  ],
  testimonialAvatars: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  ],
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
] as const;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`
Expected: Exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/config.ts
git commit -m "feat: add central config for swappable site content"
```

---

## Task 6: Build the inline icon component

**Files:**
- Create: `src/components/Icon.tsx`

- [ ] **Step 1: Create src/components/Icon.tsx**

Create `src/components/Icon.tsx` with:

```tsx
type IconName =
  | 'message-circle'
  | 'instagram'
  | 'menu'
  | 'x'
  | 'arrow-right'
  | 'arrow-up-right';

type Props = {
  name: IconName;
  className?: string;
  'aria-hidden'?: boolean;
};

export function Icon({ name, className = 'h-5 w-5', ...rest }: Props) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': rest['aria-hidden'] ?? true,
  };

  switch (name) {
    case 'message-circle':
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      );
    case 'x':
      return (
        <svg {...common}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case 'arrow-up-right':
      return (
        <svg {...common}>
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      );
  }
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`
Expected: Exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/Icon.tsx
git commit -m "feat: add inline SVG icon component"
```

---

## Task 7: Build WhatsAppButton (TDD)

**Files:**
- Create: `src/components/WhatsAppButton.test.tsx`
- Create: `src/components/WhatsAppButton.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/WhatsAppButton.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('builds a wa.me URL with the given number and url-encoded message', () => {
    render(
      <WhatsAppButton
        number="919876543210"
        message="Hi there & welcome!"
        label="Chat now"
      />
    )
    const link = screen.getByRole('link', { name: /chat now/i })
    expect(link).toHaveAttribute(
      'href',
      'https://wa.me/919876543210?text=Hi%20there%20%26%20welcome!'
    )
  })

  it('opens in a new tab with rel noopener', () => {
    render(
      <WhatsAppButton
        number="919876543210"
        message="Hi"
        label="Chat now"
      />
    )
    const link = screen.getByRole('link', { name: /chat now/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the message-circle icon', () => {
    const { container } = render(
      <WhatsAppButton number="919876543210" message="Hi" label="Chat now" />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- WhatsAppButton`
Expected: FAIL with module-not-found / "Cannot find module './WhatsAppButton'".

- [ ] **Step 3: Implement WhatsAppButton**

Create `src/components/WhatsAppButton.tsx` with:

```tsx
import { Icon } from './Icon'

type Variant = 'primary' | 'cream' | 'pill';

type Props = {
  number: string;
  message: string;
  label: string;
  variant?: Variant;
  className?: string;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-forest text-cream hover:bg-forest-soft px-6 py-3 rounded-full font-medium',
  cream:
    'bg-cream text-terracotta hover:bg-cream-dark px-8 py-4 rounded-full font-semibold text-lg',
  pill:
    'bg-terracotta text-cream hover:bg-terracotta-dark px-4 py-2 rounded-full text-sm font-medium',
};

export function WhatsAppButton({
  number,
  message,
  label,
  variant = 'primary',
  className = '',
}: Props) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <Icon name="message-circle" className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- WhatsAppButton`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/WhatsAppButton.tsx src/components/WhatsAppButton.test.tsx
git commit -m "feat: add reusable WhatsAppButton component"
```

---

## Task 8: Build useScrollReveal hook (TDD)

**Files:**
- Create: `src/hooks/useScrollReveal.test.ts`
- Create: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useScrollReveal.test.ts` with:

```ts
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useScrollReveal } from './useScrollReveal'

describe('useScrollReveal', () => {
  let observerCallback: IntersectionObserverCallback | null = null
  let observeSpy: ReturnType<typeof vi.fn>
  let disconnectSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeSpy = vi.fn()
    disconnectSpy = vi.fn()
    observerCallback = null

    class ObserverStub implements IntersectionObserver {
      root = null
      rootMargin = ''
      thresholds: number[] = []
      observe = observeSpy
      unobserve = vi.fn()
      disconnect = disconnectSpy
      takeRecords = () => []
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb
      }
    }
    ;(globalThis as unknown as { IntersectionObserver: typeof ObserverStub }).IntersectionObserver =
      ObserverStub
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with isVisible=false', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    expect(result.current.isVisible).toBe(false)
  })

  it('observes the ref target after mount', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    expect(observeSpy).toHaveBeenCalledWith(el)
  })

  it('flips to isVisible=true when the observer reports intersection', () => {
    const { result } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    act(() => {
      observerCallback?.(
        [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current.isVisible).toBe(true)
  })

  it('disconnects the observer on unmount', () => {
    const { result, unmount } = renderHook(() => useScrollReveal<HTMLDivElement>())
    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })
    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- useScrollReveal`
Expected: FAIL with "Cannot find module './useScrollReveal'".

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useScrollReveal.ts` with:

```ts
import { useCallback, useEffect, useRef, useState } from 'react'

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useScrollReveal<T extends Element>(options: Options = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    elementRef.current = node;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- useScrollReveal`
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/hooks/useScrollReveal.test.ts
git commit -m "feat: add useScrollReveal hook for fade-up animations"
```

---

## Task 9: Build Nav with mobile hamburger (TDD for toggle, then UI)

**Files:**
- Create: `src/components/Nav.test.tsx`
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/Nav.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Nav } from './Nav'

describe('Nav', () => {
  it('renders the coach name as a logo link', () => {
    render(<Nav />)
    expect(screen.getByText('Shubham Rawat')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Process' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Results' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('toggles the mobile menu open/closed', async () => {
    const user = userEvent.setup()
    render(<Nav />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- Nav`
Expected: FAIL with "Cannot find module './Nav'".

- [ ] **Step 3: Implement Nav.tsx**

Create `src/components/Nav.tsx` with:

```tsx
import { useEffect, useState } from 'react'
import { COACH, NAV_LINKS, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'
import { WhatsAppButton } from './WhatsAppButton'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a
          href="#top"
          className="font-display italic text-xl md:text-2xl text-forest"
        >
          {COACH.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-forest/80 hover:text-forest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={WHATSAPP_CONFIG.defaultMessage}
            label="WhatsApp"
            variant="pill"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 text-forest"
        >
          <Icon name={isOpen ? 'x' : 'menu'} className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-cream border-t border-forest/10 px-6 py-6 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-base text-forest"
            >
              {link.label}
            </a>
          ))}
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={WHATSAPP_CONFIG.defaultMessage}
            label="Start on WhatsApp"
            variant="primary"
            className="self-start"
          />
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- Nav`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "feat: add sticky nav with mobile hamburger"
```

---

## Task 10: Build Hero section

**Files:**
- Create: `src/components/Hero.test.tsx`
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/Hero.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /your body, your timeline/i
    )
  })

  it('renders the WhatsApp CTA', () => {
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: /start on whatsapp/i })
    ).toBeInTheDocument()
  })

  it('renders a "see transformations" anchor pointing to #results', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /see transformations/i })
    expect(link).toHaveAttribute('href', '#results')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- Hero`
Expected: FAIL with "Cannot find module './Hero'".

- [ ] **Step 3: Implement Hero.tsx**

Create `src/components/Hero.tsx` with:

```tsx
import { COACH, IMAGES, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'
import { WhatsAppButton } from './WhatsAppButton'

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative z-10">
          <p className="text-terracotta text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-6">
            — {COACH.title}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest">
            Your body,
            <br />
            <em className="italic font-normal">your timeline.</em>
          </h1>
          <p className="mt-6 text-base md:text-lg text-forest/75 max-w-md leading-relaxed">
            Online 1-on-1 coaching · Custom diet plans · In-person training ·
            Group challenges. Built around your goals, your schedule, your life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <WhatsAppButton
              number={WHATSAPP_CONFIG.number}
              message={WHATSAPP_CONFIG.defaultMessage}
              label="Start on WhatsApp"
              variant="primary"
            />
            <a
              href="#results"
              className="inline-flex items-center gap-2 text-forest/80 hover:text-forest font-medium"
            >
              See transformations
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 w-40 h-40 md:w-56 md:h-56 rounded-full bg-terracotta/15 -z-10" />
          <div className="absolute -bottom-8 -left-4 w-28 h-28 md:w-40 md:h-40 rounded-full bg-sage/30 -z-10" />
          <img
            src={IMAGES.coachPortrait}
            alt={`${COACH.name} (placeholder image)`}
            className="w-full aspect-[4/5] object-cover rounded-3xl shadow-lg"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- Hero`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: add hero section"
```

---

## Task 11: Build About section

**Files:**
- Create: `src/components/About.test.tsx`
- Create: `src/components/About.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/About.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { About } from './About'

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(
      screen.getByRole('heading', { level: 2, name: /hi, i'm shubham/i })
    ).toBeInTheDocument()
  })

  it('renders the three stats', () => {
    render(<About />)
    expect(screen.getByText(/clients trained/i)).toBeInTheDocument()
    expect(screen.getByText(/years coaching/i)).toBeInTheDocument()
    expect(screen.getByText(/success rate/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- About`
Expected: FAIL with "Cannot find module './About'".

- [ ] **Step 3: Implement About.tsx**

Create `src/components/About.tsx` with:

```tsx
import { COACH, IMAGES } from '../config'

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-sage/30 -z-10" />
          <img
            src={IMAGES.aboutPortrait}
            alt={`${COACH.name} coaching (placeholder image)`}
            className="w-full aspect-[4/5] object-cover rounded-3xl shadow-md"
            loading="lazy"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — About
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Hi, I'm Shubham.
            <br />
            <em className="italic font-normal">Let's build something real.</em>
          </h2>
          <div className="mt-6 space-y-4 text-forest/80 leading-relaxed">
            <p>
              I've spent the last {COACH.yearsExperience}+ years helping people
              who tried every fast-fix diet, every 30-day shred, every
              motivational reel — and still felt stuck. Sustainable change
              isn't about discipline alone. It's about building a plan that
              actually fits your life.
            </p>
            <p>
              Whether you're trying to drop weight, put on muscle, or just feel
              strong again, we'll start with a free WhatsApp consultation,
              build a plan together, and adjust it weekly as your body changes.
              No cookie-cutter PDFs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 bg-sage/15 rounded-2xl p-6">
            <Stat value={COACH.clientsTrained} label="clients trained" />
            <Stat value={`${COACH.yearsExperience}`} label="years coaching" />
            <Stat value={COACH.successRate} label="success rate" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl text-forest">{value}</div>
      <div className="mt-1 text-xs md:text-sm text-forest/70 leading-tight">
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- About`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/About.test.tsx
git commit -m "feat: add about section with bio and stats"
```

---

## Task 12: Build Process section

**Files:**
- Create: `src/components/Process.test.tsx`
- Create: `src/components/Process.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/Process.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Process } from './Process'

describe('Process', () => {
  it('renders the section heading', () => {
    render(<Process />)
    expect(
      screen.getByRole('heading', { level: 2, name: /how it works/i })
    ).toBeInTheDocument()
  })

  it('renders all three step headings', () => {
    render(<Process />)
    expect(screen.getByText(/free whatsapp consultation/i)).toBeInTheDocument()
    expect(screen.getByText(/custom plan built for you/i)).toBeInTheDocument()
    expect(
      screen.getByText(/daily check-ins & adjustments/i)
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- Process`
Expected: FAIL with "Cannot find module './Process'".

- [ ] **Step 3: Implement Process.tsx**

Create `src/components/Process.tsx` with:

```tsx
const STEPS = [
  {
    n: '01',
    title: 'Free WhatsApp consultation',
    body: "Tell me your goals, your schedule, your past attempts. We'll figure out if we're a fit. No pressure.",
  },
  {
    n: '02',
    title: 'Custom plan built for you',
    body: 'Workouts and diet, designed around your body, your kitchen, and your budget. Built in 48 hours.',
  },
  {
    n: '03',
    title: 'Daily check-ins & adjustments',
    body: "I'm in your WhatsApp every day. Plans evolve as you do. Stuck? Question? Just message me.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="relative py-20 md:py-28 px-6 lg:px-8 bg-cream-dark/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Three steps from where you are
            <br />
            <em className="italic font-normal">to where you want to be.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="bg-cream rounded-2xl p-8 shadow-sm border border-forest/5"
            >
              <div className="font-display text-5xl text-sage mb-2">
                {step.n}
              </div>
              <div className="w-12 h-px bg-terracotta mb-6" />
              <h3 className="text-xl font-semibold text-forest mb-3 font-body">
                {step.title}
              </h3>
              <p className="text-forest/75 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- Process`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Process.tsx src/components/Process.test.tsx
git commit -m "feat: add 3-step process section"
```

---

## Task 13: Build Transformations section

**Files:**
- Create: `src/components/Transformations.test.tsx`
- Create: `src/components/Transformations.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/Transformations.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Transformations } from './Transformations'

describe('Transformations', () => {
  it('renders the section heading', () => {
    render(<Transformations />)
    expect(
      screen.getByRole('heading', { level: 2, name: /real results/i })
    ).toBeInTheDocument()
  })

  it('renders all 5 result cards (3 transformations + 2 testimonials)', () => {
    const { container } = render(<Transformations />)
    const cards = container.querySelectorAll('[data-card]')
    expect(cards.length).toBe(5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- Transformations`
Expected: FAIL with "Cannot find module './Transformations'".

- [ ] **Step 3: Implement Transformations.tsx**

Create `src/components/Transformations.tsx` with:

```tsx
import { IMAGES } from '../config'

type Transformation = {
  kind: 'transform';
  image: string;
  name: string;
  goal: string;
  duration: string;
};

type Quote = {
  kind: 'quote';
  avatar: string;
  name: string;
  text: string;
};

type Card = Transformation | Quote;

const CARDS: Card[] = [
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[0],
    name: 'Priya M.',
    goal: 'Lost 14kg',
    duration: '6 months',
  },
  {
    kind: 'quote',
    avatar: IMAGES.testimonialAvatars[0],
    name: 'Anjali R.',
    text: "I'd tried four trainers before Shubham. He's the first who actually listened. Down 9kg and not hungry once.",
  },
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[1],
    name: 'Rohan K.',
    goal: 'Gained 8kg lean mass',
    duration: '5 months',
  },
  {
    kind: 'quote',
    avatar: IMAGES.testimonialAvatars[1],
    name: 'Megha S.',
    text: 'The daily WhatsApp check-ins kept me honest. I never felt alone in this. I look forward to workouts now.',
  },
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[2],
    name: 'Vikram J.',
    goal: 'Lost 18kg',
    duration: '8 months',
  },
];

export function Transformations() {
  return (
    <section id="results" className="relative py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — Results
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Real results.
            <br />
            <em className="italic font-normal">Real people.</em>
          </h2>
        </div>

        <div className="-mx-6 lg:-mx-8 px-6 lg:px-8">
          <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth">
            {CARDS.map((card, i) => (
              <CardView key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardView({ card }: { card: Card }) {
  if (card.kind === 'transform') {
    return (
      <article
        data-card
        className="snap-start shrink-0 w-[80%] sm:w-[55%] md:w-[32%] lg:w-[30%] bg-cream-dark/40 rounded-2xl overflow-hidden shadow-sm"
      >
        <img
          src={card.image}
          alt={`${card.name} transformation (placeholder)`}
          className="w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
        <div className="p-5">
          <div className="font-display text-2xl text-forest">{card.name}</div>
          <div className="mt-1 text-terracotta font-medium text-sm">
            {card.goal}
          </div>
          <div className="text-forest/60 text-xs mt-1">{card.duration}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-card
      className="snap-start shrink-0 w-[80%] sm:w-[55%] md:w-[32%] lg:w-[30%] bg-forest text-cream rounded-2xl p-6 md:p-8 flex flex-col justify-between aspect-[4/5]"
    >
      <p className="font-display text-xl md:text-2xl italic leading-snug">
        “{card.text}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={card.avatar}
          alt={`${card.name} (placeholder)`}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="text-cream/90 text-sm font-medium">{card.name}</div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- Transformations`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Transformations.tsx src/components/Transformations.test.tsx
git commit -m "feat: add transformations section with scroll-snap carousel"
```

---

## Task 14: Build CtaBand section

**Files:**
- Create: `src/components/CtaBand.test.tsx`
- Create: `src/components/CtaBand.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/CtaBand.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaBand } from './CtaBand'

describe('CtaBand', () => {
  it('renders the headline', () => {
    render(<CtaBand />)
    expect(
      screen.getByRole('heading', { level: 2, name: /ready when you are/i })
    ).toBeInTheDocument()
  })

  it('renders the WhatsApp CTA link', () => {
    render(<CtaBand />)
    expect(
      screen.getByRole('link', { name: /message shubham/i })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- CtaBand`
Expected: FAIL with "Cannot find module './CtaBand'".

- [ ] **Step 3: Implement CtaBand.tsx**

Create `src/components/CtaBand.tsx` with:

```tsx
import { WHATSAPP_CONFIG } from '../config'
import { WhatsAppButton } from './WhatsAppButton'

export function CtaBand() {
  return (
    <section
      id="contact"
      className="relative bg-terracotta text-cream py-20 md:py-28 px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cream/10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-cream/10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          Ready when
          <br />
          <em className="italic font-normal">you are.</em>
        </h2>
        <p className="mt-6 text-cream/85 text-base md:text-lg max-w-md mx-auto">
          Free 15-minute consultation. No pressure, no contract, no upsell.
          Let's just talk.
        </p>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={`${WHATSAPP_CONFIG.defaultMessage} I'd like to book the free consultation.`}
            label="Message Shubham"
            variant="cream"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- CtaBand`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/CtaBand.tsx src/components/CtaBand.test.tsx
git commit -m "feat: add final cta band"
```

---

## Task 15: Build Footer

**Files:**
- Create: `src/components/Footer.test.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/components/Footer.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the coach name', () => {
    render(<Footer />)
    expect(screen.getByText('Shubham Rawat')).toBeInTheDocument()
  })

  it('renders the copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders the instagram link', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: /instagram/i })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:run -- Footer`
Expected: FAIL with "Cannot find module './Footer'".

- [ ] **Step 3: Implement Footer.tsx**

Create `src/components/Footer.tsx` with:

```tsx
import { COACH, NAV_LINKS, SOCIAL_LINKS, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  return (
    <footer className="bg-forest text-cream/85 px-6 lg:px-8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
        <div>
          <div className="font-display italic text-2xl text-cream">
            {COACH.name}
          </div>
          <p className="mt-3 text-sm text-cream/70 max-w-xs">
            {COACH.title}. Helping you build a body — and a life — that lasts.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-4">
            Connect
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <Icon name="instagram" className="h-4 w-4" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <Icon name="message-circle" className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 text-xs text-cream/55 flex flex-col md:flex-row justify-between gap-2">
        <div>© {year} {COACH.name}. All rights reserved.</div>
        <div>Built with care.</div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- Footer`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "feat: add footer with social links"
```

---

## Task 16: Compose App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace the contents of src/App.tsx**

Open `src/App.tsx` and replace the entire file with:

```tsx
import { About } from './components/About'
import { CtaBand } from './components/CtaBand'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { Transformations } from './components/Transformations'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Process />
        <Transformations />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 2: Type-check**

Run: `npx tsc -b --noEmit`
Expected: Exits 0.

- [ ] **Step 3: Run the full test suite**

Run: `npm run test:run`
Expected: All tests pass (around 20 across all components).

- [ ] **Step 4: Run the production build**

Run: `npm run build`
Expected: Build succeeds; `dist/` folder is created with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: compose all sections in App"
```

---

## Task 17: Manual QA pass

**Files:** None — verification only.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`. Open the printed URL in a browser.

- [ ] **Step 2: Desktop check (1280×800 or wider)**

Verify:
- Hero shows side-by-side text + photo
- Nav shows full link list, no hamburger
- About is 2-column with photo on left
- Process shows 3 cards in a row
- Transformations shows ~3 cards visible at once with horizontal scroll
- CTA band fills the width
- Footer is 3 columns
- All clicks of "WhatsApp" buttons open `wa.me/TODO_REPLACE_WITH_E164_NUMBER?text=...` in a new tab — this is expected; the placeholder URL won't load a real chat until you swap the number

- [ ] **Step 3: Tablet check (768×1024)**

Use DevTools responsive mode. Verify:
- Hero is 2-column
- Process is 3 cards in a row
- Footer is 3 columns
- Transformations carousel scrolls horizontally

- [ ] **Step 4: Mobile check (375×812)**

Use DevTools responsive mode. Verify:
- Hamburger button appears in nav (full nav links hidden)
- Tapping hamburger opens menu, tapping again closes
- Hero stacks: text below photo (or photo below text — confirm one order)
- About stacks: photo above bio
- Process stacks vertically
- Transformations: one card visible at a time, swipe horizontally to see more
- Footer becomes single column
- No horizontal page scroll anywhere (the body should not have a horizontal scrollbar)

- [ ] **Step 5: Accessibility quick check**

In DevTools → Lighthouse → Accessibility audit. Expected score: ≥ 95. If any failure:
- Missing alt: every `<img>` should have alt text
- Color contrast: forest-on-cream and cream-on-forest both pass AA — if a fail surfaces it's likely terracotta-on-cream small text; bump to forest text
- Heading order: should be h1 (Hero) → h2 (each section) → h3 (cards). Fix any skipped levels.

- [ ] **Step 6: Search the codebase for unswapped placeholders**

Run:
```bash
grep -rn "TODO_REPLACE" src/
```

Expected output is exactly:
```
src/config.ts:  city: 'TODO_REPLACE_WITH_CITY',
src/config.ts:  number: 'TODO_REPLACE_WITH_E164_NUMBER',
src/config.ts:  instagram: 'TODO_REPLACE_WITH_INSTAGRAM_URL',
```

These three are the swap points before going live. Any others mean copy was missed and needs fixing.

- [ ] **Step 7: Final commit (no code change, marker for "v0.1 done")**

```bash
git tag v0.1.0
```

(Optional — only if using git.)

---

## Self-review checklist (already completed by the planner — for your reference)

- ✅ Spec coverage: every section in the spec maps to a task (Nav→T9, Hero→T10, About→T11, Process→T12, Transformations→T13, CtaBand→T14, Footer→T15, App composition→T16). Tooling, theme, and config covered by T1–T6.
- ✅ No placeholders inside the plan itself — every code block is complete and runnable.
- ✅ Type consistency: `useScrollReveal` returns `{ ref, isVisible }` — matches across hook + test. `WhatsAppButton` props (`number`, `message`, `label`, `variant`) match across all callers (Nav, Hero, CtaBand, Footer-style direct anchor).
- ✅ All component file names match their import paths (`./Hero`, `./Nav`, etc.).
- ✅ Visual placeholder strategy is explicit: Unsplash URLs in `src/config.ts` → swap at launch.

---

## Notes for the executor

- Keep the dev server running in a side terminal during Tasks 10–17. Refresh as you commit each section to feel progress.
- If a Tailwind class doesn't seem to apply, you've probably forgotten the `@import "tailwindcss"` line in `src/styles/global.css` — check there first.
- The placeholder Unsplash URLs may rate-limit if you reload aggressively. Use `sm` size variants in DevTools and they'll cache.
- All tests should run in well under 10 seconds total. If any test hangs, check for unmocked `IntersectionObserver` usage.
