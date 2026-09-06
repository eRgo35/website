# c2yz.com portfolio rebuild — design brief & research dump

> Working document, 2026-09-04. Everything decided, researched, and still open
> for the v3 rebuild. Resume work by reading this top to bottom.

---

## 1. Where things stand (state baseline)

- Repo: `~/Work/c2yz.com/website` (`git@github.com:eRgo35/website.git`), single
  `main` branch.
- **2026-09-04, commit `3968bbb`**: repo forced into byte-identical sync with
  production (the live tree had drifted ~6 months ahead of git — edits deployed
  but never committed). Diff vs prod (`~/Work/c2yz.com/nginx/html`) verified
  clean; commit pushed to GitHub.
- Production takeout lives at `~/Work/c2yz.com/nginx/`:
  `docker-compose.yml` (Traefik labels, `websecure` entrypoint, certresolver
  `production`, port 41234→80, external network `router`), `nginx/` confs
  (`default.conf` static + 30d immutable caching, `redirect.conf` www→apex 301,
  `gzip.conf`), `html/` served tree.
  **Decision: infra files stay OUT of the repo** (user's call). If deploy
  changes are needed later, edit the takeout/server, not the repo.
- Current prod bugs noticed in passing (worth fixing in v3, don't back-port):
  duplicate `class="avatar"` on the avatar `<img>`; `href=" mailto:..."`
  has a leading space in both old and current copies.
- Current-gen prod facts (v2, being replaced): flat asset layout,
  `assets/styles-CkiWLeNT.css` (hand-written native CSS nesting despite the
  build-hash-looking name), `data-anim` fade-up system, no service worker,
  `manifest.json` link commented out, `mike-czyz-240.webp` srcset variant.

## 2. Philosophy constraints (non-negotiable, from user)

Modeled on the user's loom/james code style (see `~/Work/loom`):

- **No frameworks, no build step, no bundler.** Vanilla HTML/CSS/JS only.
  Deploy stays `rsync`-simple.
- **Single-file-per-class ES modules**, abstract base class with
  template-method lifecycle (`constructor` throws on `new.target === Base`),
  private fields (`#el`), JSDoc types. The loom `Block`/`Sequence` pattern is
  the style reference.
- **Content lives in plain semantic HTML tags.** The JS component layer
  attaches behavior (progressive enhancement) — it must NOT generate page
  markup. If JS is off/dead, the site reads complete. (User's explicit note.)
- No bloat, handcrafted, maintainable by a human, no spaghetti. Every line
  must earn its place.
- **Writing is distinct and is the anchor.** Keep the user's voice; design and
  motion serve the words, never the reverse. Do not rewrite copy into
  corporate tone.

## 3. Research summary (done 2026-09-04)

### Awwwards-tier dev portfolios 2025
- [Max Milkin](https://www.awwwards.com/sites/max-milkin-portfolio) — SOTD,
  performance-first minimal, "motion serves meaning". Closest to our lane.
- [Gen-02 SMSY](https://www.awwwards.com/sites/gen-02-smsy-portfolio),
  [Roman Jean-Elie '25](https://www.awwwards.com/sites/portfolio-25-1) —
  immersive WebGL worlds; impressive but anti-pattern for maintainability.
- [Abhishek Jha Folio '25](https://www.awwwards.com/sites/abhishek-jha-folio-25)
  — pre-footer 3D, hidden Tetris easter egg; community loves playful details.
- [Diego Sevilla](https://www.awwwards.com/sites/diego-sevilla-portfolio-2025)
  — 3D Octocat, vector parallax, custom 404.

### AI-engineer portfolios (the relevant peer set)
- Consistent pattern: **production over prototypes**, quantified impact,
  case studies that lead with the problem.
- [harisahmed.dev](https://harisahmed.dev/) — "Prototypes impress. Production
  systems pay." Numbered sections, metrics per project.
- [visheshverse.com](https://visheshverse.com/) — problem-first case studies.
- [priyanshupaul.vercel.app](https://priyanshupaul.vercel.app/) — signature:
  animated "a request travels through the stack" diagram; strong-opinions
  principles section. (We have a better raw asset for this: loom itself.)
- [Karthikeyan's portfolio](https://github.com/Karthikeyan260/Karthikeyan-portfolio)
  — cinematic AND zero-framework (vanilla + Three.js). Proof the constraint
  doesn't cap the ceiling. MIT-licensed reference code.

### Vanilla/handcrafted technique references
- [Mansoor Mamnoon's site](https://github.com/mansoor-mamnoon/personal-website)
  — best pure-vanilla technique sample: one ~1900-line CSS file, `@layer`,
  `@property` animated gradients, scroll-driven animations, View Transitions,
  ~80-line vanilla ⌘K palette. No npm.
- [Adambarnes.biz case study](https://www.adambarnes.biz/case-study-adambarnes-biz.html)
  — 14 static HTML files, GEO/JSON-LD thinking, `clamp()` fluid type.
- [AmraniCh/amranich.dev](https://github.com/AmraniCh/amranich.dev) — CSS
  Nectar SOTD, works with JS disabled.
- [Cynthia Ugwu clone](https://github.com/lightlessdays/Cynthia-Ugwu) —
  Awwwards pattern vocabulary (entry animations, cursor follower, menu hovers).

### Writing-first archetypes (protect the voice)
- [manuelmoreale.dev](https://manuelmoreale.dev/) — typography, calm, "deep
  distaste for flashy animations".
- [Jake Lazaroff](https://jakelazaroff-blog.jake.museum/) — "a website's
  obligation is first and foremost to its readers".
- [Lynn Fisher](https://lynnandtonic.com/about/) — yearly redesigns as art;
  [CSS Crème decode](https://csscreme.com/showcase/lynn).
- [joshwcomeau.com](https://www.joshwcomeau.com/) — polish ceiling (but React).

### Native-CSS motion evidence (no JS animation libs needed)
- [Mintec: Framer Motion → native APIs](https://mintec.co/blog/native-view-transitions-migration/)
  — 112 KB animation JS → **0 KB**, Lighthouse 72→94.
- [Mintec: GSAP → scroll-driven](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/)
  — 47→16 KB critical JS, p75 INP 224→104 ms.
- Technique primers: [cssawwwards 2026 guide](https://cssawwwards.com/blog/complete-guide-modern-css-2026),
  [youngju.dev deep dive](https://www.youngju.dev/blog/culture/2026-05-16-web-standards-2026-container-queries-view-transitions-popover-anchor-positioning-css-nesting-deep-dive.en),
  [css-animation.com view transitions/scroll APIs](https://www.css-animation.com/modern-view-transitions-scroll-apis/).
- Universal rule: gate motion behind `@media (prefers-reduced-motion: no-preference)`;
  `@supports` for tier-2 features. View-transition perf: ≤8 simultaneous
  `view-transition-name`s, 150–400 ms sweet spot.

## 4. Decided design brief (user answered discovery, 2026-09-04)

| Axis | Decision |
|---|---|
| Aesthetic | Typographic, calm base + restrained motion layer. NOT spectacle-forward, NOT terminal-soul. |
| Signature piece | None — polish distributed everywhere as micro-interactions. |
| Identity | **Full new identity.** Characterful/chunky display face (grown-up Coiny successor) + pastels: cool porcelain bg `#eef1f6`-ish, navy ink `#23283b`-ish, violet `#7d6ee8` + teal `#2fa98c` accent duo (starting points, exact values TBD in design). |
| Structure | Multi-page + **cross-document View Transitions**: home, loom case study, james case study, writing. Room for writing to breathe. NOTE: card→page shared-element morph was NOT selected — transitions are page-level only. |
| Components | Loom-style abstract `Component` base class, template-method lifecycle (`mount()` → `render()`/`bind()`), one class per file, native ES modules, no bundler. Content in plain HTML; components attach behavior only. |
| Motion set | `animation-timeline: view()` scroll reveals (replaces v2's data-anim), gradient progress hairline (`animation-timeline: scroll(root)`), magnetic buttons + hover micro-fx, kinetic char-split headline entrances. All behind `prefers-reduced-motion`. |
| Easter eggs | Exactly **one** hidden surprise. |

## 5. Open slots — awaiting user's ideas before design doc

1. **Fonts & exact palette** — I owe concrete display-face candidates + full
   OKLCH token system (`color-mix()` derivations so dark theme is free).
   User may name a typeface/color they've been wanting to use.
2. **The one easter egg** — user's personality slot. Floated candidates:
   - konami code re-skins the site in the OLD Coiny/Rosé-Pine v1 design
     ("museum of my past self", Lynn-Fisher-vibes, great story)
   - hidden `/prompt` page answering like james
   - terminal mode on the 404
3. **Any "I want THAT trick"** sightings from other sites.

## 6. Next steps (when resumed)

1. Collect user's answers to §5.
2. Write full design doc: page map, component inventory (classes),
   file/module layout, CSS `@layer` architecture, motion spec, font/palette
   tokens, easter egg spec → user approval → then build.
3. Build in `website/` on a branch; old v2 tree already preserved in git
   (`3968bbb`), so nothing can be lost.
4. Deploy stays the existing nginx/Traefik setup in `~/Work/c2yz.com/nginx`
   (swap `html/` contents at ship time).

## 7. Reference: current prod copy snippets (voice preservation)

Existing copy patterns to keep/polish, from v2 (`index.html`):
- "Hi, I'm Mike 👋🏻", "I'm currently working on new fascinating projects, so
  be sure to follow me!", "Student / Software Developer", the bio paragraphs
  about Silesian University of Technology / Rust and JavaScript / AI-ML
  interest, "Mike around the web" list, "[📎 cv] [📧 contact]" bracket
  shorthand, footer GPG key link, dynamic year.
