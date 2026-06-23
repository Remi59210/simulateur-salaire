# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static website hosted on GitHub Pages at `simulateur-salaire.fr`. No build system, no package manager, no test suite. Every file is served directly — changes committed and pushed to `main` are live within ~60 seconds.

**Deployment:** `git push origin main` (GitHub Pages auto-deploys from main).

## Architecture

### CSS system

Two shared stylesheets loaded by all tool pages:
- `css/nav.css` — navigation bar only (dark `#0F172A` background, kept separate so it loads on every page type)
- `css/tools.css` — palette, layout, cards, inputs, result cells, info boxes, footer. **All tool pages inherit from this file.**

The palette is defined with CSS custom properties in `tools.css`. The variables `--orange`, `--orange-dark`, `--orange-light`, `--orange-mid` are intentionally remapped to blue values — this is a backward-compatibility alias so older tool code using `var(--orange)` automatically picks up the blue palette without touching each file.

The dashboard (`index.html`) and `simulateur-salaire/index.html` define their own inline `:root` palette that must be kept in sync with `tools.css` manually — they do not load `tools.css`.

**Article pages** (`articles/`, `articles.html`) use Tailwind CDN instead of `tools.css`. This is an intentional architectural split — do not introduce Tailwind into tool pages or `tools.css` into article pages.

### Navigation (`js/nav.js`)

Single IIFE that runs on every page. It reads `window.location.pathname` to mark the active link, then writes the entire `<nav>` into `<div id="site-nav">`.

**When adding a new tool**, you must update two places:
1. `js/nav.js` — add an entry to the `dropTools` array (with `href`, `label`, `patterns`, `i` icon path)
2. `index.html` — add a `.tool-card` in the appropriate section grid

The `isSubpage` variable in `nav.js` controls which paths show the "← Accueil" back link — add new tool paths there too.

### Tool pages

Each tool under `simulateur-salaire/` and `calculateur-frais-kilometriques/` is a self-contained HTML file with:
- Links to `nav.css` + `tools.css`
- An optional inline `<style>` for tool-specific components
- A `<script>` block at the bottom with vanilla JS (no frameworks, no imports)
- A `<section class="tool-seo">` at the bottom for SEO text

### Article data (`js/articles.js`)

Static array used by `articles.html` to render the article listing and filters. When creating a new article page, add a corresponding entry to this array. The `link` field must point to the actual HTML file path.

## Fiscal data (updated annually)

The calculateur frais kilométriques embeds the DGFiP barème directly in JS. Key values to update each year:
- `BAREME` object (rates per CV/cylindrée, per tranche)
- `calcImpot()` function (IR brackets: currently 0%/11%/30%/41%/45% with specific thresholds)
- Abattement 10% bounds: currently min 495 €, max 14 171 €

## Language

The site is entirely in French. All code comments, variable names in HTML, and user-facing strings must be in French. Technical identifiers in JS/CSS remain in English.
