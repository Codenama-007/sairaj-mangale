# AGENTS.md

Marketing site for a cyberpunk / futuristic gaming cafe (working name "Sairaj", from the folder).
This directory starts empty: scaffold before assuming any file exists.

## Stack

- Vite + vanilla JS + hand-written CSS. No React/Next unless the user asks — the site is one page of sections, not an app.
- Add GSAP or Three.js from npm only when a section actually needs them; don't preinstall a 3D stack.
- Node 22 / npm 10, Windows + PowerShell. No git repo initialized.
- No test, lint, or typecheck setup exists. Don't invent `npm test` / `npm run lint` steps; verify with `npm run build` and a browser check.

## Commands

```powershell
npm create vite@latest . -- --template vanilla   # one-time bootstrap
npm install
npm run dev        # http://localhost:5173, Vite HMR
npm run build      # also the only compile-time check
npm run preview
```

PowerShell: chain with `;`, not `&&`.

## Target layout

```
index.html              single page: hero, about, stations/setup, games, pricing, gallery, booking/contact, footer
src/main.js             entry; one init function per section, called from here
src/data/site.js        all copy, prices, hours, links in one object
src/styles/tokens.css   every color / spacing / type value
src/styles/base.css     reset + typography
src/styles/sections/    one stylesheet per section
public/                 images, fonts, video (reference as "/...", never relative)
```

## Design rules

- All colors, spacing, and type sizes live as CSS custom properties in `tokens.css`. No raw hex in section CSS.
- Palette: base `#05060a`, panel `#0c0f17`, cyan `#00e5ff`, magenta `#ff2d78`, acid `#c6ff00`, text `#e8f1ff`. Neon is an accent, not a fill — at most two accent hues visible at once.
- Display face (wide/condensed or techno sans) for headings + monospace for labels, prices, and HUD-ish text. Body ≥16px, contrast ≥4.5:1.
- Glow, scanlines, grain, chromatic aberration go on decorative layers only (`aria-hidden`, `pointer-events:none`), never on body copy.
- Cyberpunk means high contrast and clear hierarchy, not clutter: keep the grid consistent and section rhythm even.

## Motion & 3D

- Everything non-essential must opt out under `@media (prefers-reduced-motion: reduce)`.
- Import GSAP from npm (not CDN) and register plugins once in `main.js`.
- Three.js canvases: lazy-init, pause when offscreen, and dispose geometries/materials/textures/renderer. Vite HMR re-runs modules and will otherwise leak WebGL contexts.
- No scroll-jacking. Parallax offsets stay under ~15% so text remains readable.

## Content

- Cafe name, address, hours, prices, testimonials, and game lists are placeholders. Keep them editable in `src/data/site.js`, labeled as placeholder in code comments, not dressed up as verified facts.
- Booking/contact is display-only. Don't point forms at fake endpoints that silently swallow submissions — show an explicit "demo only" state until a real backend exists.
- Use royalty-free/CC0 imagery; log each source URL in `CREDITS.md` as it's added.

## Gotchas

- Add `.gitignore` (`node_modules`, `dist`) before running `git init`.
- Self-host fonts in `public/fonts` (or preconnect + `display=swap`); a display font with no fallback causes a visible layout shift on the hero.
