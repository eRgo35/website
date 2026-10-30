# c2yz.com

Source for [c2yz.com](https://c2yz.com), the personal site of Michał "Mike" Czyż.

Plain HTML, CSS and a little JavaScript. No framework, no bundler, no build
step: what is in this repo is what gets served.

## Layout

```
index.html               the page; content is plain semantic HTML
assets/styles-<hash>.css the only stylesheet
fonts/Coiny-Regular.woff2  display face, subset (see below)
fonts/Coiny-Regular.ttf    full font, source for re-subsetting
Michał_Czyż_CV.pdf       CV linked from the page
mike-czyz*.webp          portrait (240px and 512px)
mike-czyz-public.gpg     public key
card.png, logo*.png, favicon.ico, manifest.json, robots.txt
PRODUCT.md               who the site is for and what it must stay true to
```

## Principles

- Content lives in HTML. Scripts only add behavior, and the page is fully
  readable with JavaScript off.
- The writing voice is Mike's own. Polish it, never rewrite it into
  something generic.
- Show only what is real: real projects, real links, no filler.

See `PRODUCT.md` for the full product record.

## Run it locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Any static file server works.

## Theme

The palette is [Kanagawa](https://github.com/rebelot/kanagawa.nvim): Lotus
in light mode, Wave in dark mode. Colors are semantic tokens at the top of
the stylesheet (`--bg`, `--fg`, `--link`, `--edge`, `--line`,
`--selection`), so swapping palettes means editing two blocks.

The page follows the system theme. The toggle on the portrait overrides it,
and picking the system's own mode hands control back to the system.

## Changing the stylesheet

Production nginx caches CSS and fonts for 30 days as `immutable`, so the
stylesheet name carries a content hash. After editing it:

```sh
old=$(ls assets/styles-*.css)
new=assets/styles-$(sha256sum "$old" | cut -c1-8).css
git mv "$old" "$new"
sed -i "s#/$old#/$new#" index.html
```

## Re-subsetting the font

`Coiny-Regular.woff2` covers Basic Latin, Latin-1 and Latin Extended-A
(Polish included). To regenerate it:

```sh
uvx --from 'fonttools[woff]' pyftsubset fonts/Coiny-Regular.ttf \
  --unicodes='U+0020-007E,U+00A0-00FF,U+0100-017F,U+2013-2014,U+2018-201D,U+2026,U+00B7,U+2192' \
  --flavor=woff2 --layout-features='*' \
  --output-file=fonts/Coiny-Regular.woff2
```

If a font file changes, rename it too (same cache rule as the stylesheet).

## Deploy

The site is served as static files by nginx. The deploy config lives outside
this repo.

## Mike around the web

- **Email**: [mike@c2yz.com](mailto:mike@c2yz.com)
- **GitHub**: [@eRgo35](https://github.com/eRgo35)
- **LinkedIn**: [mike-czyz](https://www.linkedin.com/in/mike-czyz)
- **YouTube**: [@eRgo35](https://www.youtube.com/@eRgo35)

---

Built with ❤️ by Michał Czyż
