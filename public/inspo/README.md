# Sigil Landing Page — Inspiration & Component Dump

Full frontend dump and modular component extraction from [https://sigil.framer.ai/](https://sigil.framer.ai/) ("Sigil — The infrastructure layer for AI agents").

---

## 📁 Directory Structure

```
inspo/
├── index.html                   # Fully localized, self-contained standalone page
├── README.md                    # This documentation file
├── original/
│   └── original.html            # Verbatim original HTML fetched directly from live URL
├── assets/
│   ├── fonts/                   # 68 woff2 web fonts (Geist, Doto, Martian Mono, Bitcount, etc.)
│   ├── images/                  # All avatars, og:image, favicons, illustrations
│   └── icons/                   # 265 extracted SVG icons, badges, glyphs
├── scripts/                     # 24 Framer ESM modules (Motion, React, Rolldown runtime, etc.)
│   ├── PixelGlyph.BlnbRjxE.mjs
│   ├── PixelDissolveButton.DS-Lr0BY.mjs
│   ├── PixelUnderlineLink.7VfU1qDl.mjs
│   └── ...
├── styles/
│   ├── design-tokens.css        # Extracted CSS color variables (--token-...)
│   ├── fonts.css                # Local @font-face declarations
│   ├── framer-components.css    # Extracted Framer layout and component styles
│   └── globals.css              # Reset, typography, animations
├── metadata/
│   └── manifest.json            # Full URL mapping, download timestamp, and asset index
└── components/                  # Clean React + Tailwind + TypeScript components
    ├── index.ts                 # Barrel export
    ├── PixelGlyph.tsx           # 7x7 bitmap pixel art glyphs (23 patterns)
    ├── PixelDissolveButton.tsx  # Canvas Bayer 8x8 dithering dissolve CTA button
    ├── PixelUnderlineLink.tsx   # Stepped clip-path pixel underline + key shortcut chip
    ├── Navbar.tsx               # Technical navigation bar with status pulse
    ├── Hero.tsx                 # Headline, live ticker, CTA pair, SDK copy box
    ├── ControlPlane.tsx         # Interactive console, live graph & log stream
    ├── TheProblem.tsx           # 4-card high-contrast pain point breakdown
    ├── WorkflowSteps.tsx        # 4-step onboarding cards with code snippets
    ├── FeatureGrid.tsx          # 6-card enterprise capability matrix
    └── Footer.tsx               # Dark technical footer with status & links
```

---

## 🎨 Design System & Color Tokens

| Token Name | Hex Value | Role / Usage |
|---|---|---|
| `--token-3b27429e` | `#f4f4f1` | Primary background (warm light grey) |
| `--token-e4fc2fa4` | `#ffffff` | Pure white surface / card background |
| `--token-2da7c71e` | `#e2e2dc` | Primary borders and dividers (light mode) |
| `--token-abfb5544` | `#cfcfc7` | Secondary border / inactive elements |
| `--token-9228e15b` | `#111111` | Primary dark text / high-contrast elements |
| `--token-8f679162` | `#66665f` | Secondary muted text |
| `--token-7a95d861` | `#ff4f00` | **Signature Sigil Orange** (accent / highlight) |
| `--token-fec5de8c` | `#e54500` | Hover orange (darker) |
| `--token-6b8e684d` | `#ff4f001f`| Orange glow / transparent halo |
| `--token-c014b93a` | `#111110` | Dark panel background |
| `--token-2a5539e6` | `#1a1a18` | Dark card surface |
| `--token-54bd0ee1` | `#2c2c29` | Dark borders and grid lines |
| `--token-b824c6fb` | `#8f8f87` | Dark mode secondary text |
| `--token-08a7539f` | `#1f9d55` | Operational green (live status, success) |

---

## 🔤 Typography & Font Stack

- **Geist**: Modern sans-serif for headlines, body copy, and navigation labels.
- **Geist Mono & Martian Mono**: Monospaced typography for metrics, timestamps, logs, and CLI snippets.
- **Doto & Silkscreen**: Pixelated display numbers and status tags.
- **Bitcount Grid Single**: Stylized retro-tech numbers.
- **Inter**: Fallback system sans-serif.

---

## ⚡ Signature Interactive Components

### 1. `PixelGlyph.tsx`
Renders authentic 7x7 pixel art symbols on crisp edges without raster artifacts.
```tsx
import { PixelGlyph } from './components/PixelGlyph';

// 23 Available Patterns:
// logo, router, retrieve, tool, verify, respond, check, scripts,
// logs, cost, alert, shield, cube, cloud, trace, plug, quote, lock,
// models, bolt, arrowLeft, arrowRight, arrowUpRight
<PixelGlyph pattern="router" color="#ff4f00" pixel={3} />
```

### 2. `PixelDissolveButton.tsx`
The primary CTA button on Sigil:
- Uses an HTML5 `<canvas>` rendering an **8×8 Bayer ordered dithering matrix**.
- On pointer enter, pixel dissolves from dark (`#111111`) to accent orange (`#ff4f00`).
- Features magnetic proximity physics and an orange diffused glow halo.
```tsx
import { PixelDissolveButton } from './components/PixelDissolveButton';

<PixelDissolveButton
  label="Start free trial"
  href="/signup"
  proximity={true}
  magnetic={true}
/>
```

### 3. `PixelUnderlineLink.tsx`
Secondary interactive links with:
- Stepped CSS `clip-path: inset(...)` transition simulating retro pixel drawing.
- Accessible keyboard listener chip (`[D]` triggers navigation).
- Sliding pixel arrows.
```tsx
import { PixelUnderlineLink } from './components/PixelUnderlineLink';

<PixelUnderlineLink
  label="Read the docs"
  href="/docs"
  decoration="key"
  shortcut="D"
/>
```

---

## 🚀 How to Run & Preview

### Local Preview Server (Resolves browser `file:///` CORS blocks)
Modern browsers block JavaScript ES modules (`type="module"`) when opened via `file:///` URLs (origin `null`). 

To view the landing page with full animations and scripts running:

1. **The server is already running for you at:**
   👉 **[http://localhost:3001/](http://localhost:3001/)**

2. To restart it anytime:
   ```bash
   node inspo/serve.mjs
   # or from the veiron/ directory:
   npm run inspo
   ```

### Use Components in your React App
Import any component from `inspo/components` directly into your React project:
```tsx
import {
  Navbar,
  Hero,
  ControlPlane,
  TheProblem,
  WorkflowSteps,
  FeatureGrid,
  Footer,
} from './inspo/components';

export function SigilInspiredPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f1]">
      <Navbar />
      <Hero />
      <ControlPlane />
      <TheProblem />
      <WorkflowSteps />
      <FeatureGrid />
      <Footer />
    </div>
  );
}
```
