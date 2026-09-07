# c2yz.com — Mike's corner of the web

v3 rebuild. Vanilla HTML/CSS/JS — **no frameworks, no build step, no
bundler**. The served tree is this repo's root; deploy stays rsync-simple.

## Structure

- `index.html` — home
- `loom.html`, `james.html` — case studies
- `writing.html` — long-form notes
- `404.html` — not found
- `assets/styles/main.css` — one handcrafted stylesheet
  (`@layer` reset → tokens → base → layout → components → motion)
- `assets/js/` — ES modules; abstract `Component` base with a
  template-method lifecycle (`mount()` → `render()`/`bind()`); components
  attach behavior only, content lives in plain semantic HTML
- `assets/fonts/` — Bricolage Grotesque (latin + latin-ext subsets);
  `fonts/` — Coiny subset, kept for the one easter egg
- `DESIGN.md` — the v3 design brief & research dump (source of truth)

## Motion

Scroll-driven reveals (`animation-timeline: view()`), a scroll-root gradient
hairline, kinetic headline entrances, magnetic buttons — all gated behind
`prefers-reduced-motion: no-preference` and `@supports` feature checks.
Cross-document view transitions are page-level only.

## Local dev

```
python3 -m http.server
```

Open http://localhost:8000. Try the Konami code.

---

Built by hand by Michał Czyż.