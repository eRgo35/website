# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS. No frameworks, no bundler, no build step. JS is
small ES modules, one job per file, attached as progressive enhancement:
content lives in semantic HTML, scripts only add behavior. Served as static
files by nginx (deploy config lives outside this repo by choice).

## Users

Anyone who looks up Michał "Mike" Czyż: from a link in a bio, a GitHub
profile, a CV, or a conversation. No single primary audience. The site is
a personal home base, not a hiring funnel.

## Product Purpose

A home base on the web: who Mike is, what he's working on and writing, and
where else to find him. Success is that a visitor quickly gets a sense of
the person and can reach whatever they came for (projects, writing, CV,
contact, profiles).

## Positioning

It is Mike's own voice and Mike's own work, handcrafted. The site itself is
a small demonstration of how he builds: no framework, nothing generated,
maintainable by one human.

## Operating Context

- Visitors arrive from GitHub, LinkedIn, YouTube, a CV, or a shared link.
- Light and dark themes; the current site respects `prefers-color-scheme`
  and remembers a manual toggle.
- Site is English.

## Capabilities and Constraints

- Current site (production, matches repo at 3968bbb): one page with bio,
  "My Projects" link to GitHub, profile links, CV download, contact email,
  avatar, theme toggle, year stamp.
- Writing/posts: wanted as a section. Hosting format for posts is undecided.
- Projects: public and private GitHub projects may be shown. Private
  projects can be described but not linked to source. Which projects to
  feature is undecided.
- A previous v3 rebuild was reverted on 2026-10-29 (still in git history,
  commits 75fabaf..71833ca); it is not authority for future work.

## Brand Commitments

- Name: Michał Czyż, goes by Mike. Domain c2yz.com, handle eRgo35.
- Voice: Mike's own writing is distinct and must be preserved. Reuse and
  polish existing copy; never rewrite it into corporate or generic tone.
  Ask before replacing factual copy or adding claims.

## Evidence on Hand

- Bio copy in `index.html` (student at Silesian University of Technology,
  Gliwice; Computer Science; Rust, JavaScript, AI/ML interest).
- CV: `Michał_Czyż_CV.pdf`. Portrait: `mike-czyz.webp`, `mike-czyz-240.webp`.
  Public key: `mike-czyz-public.gpg`. Social card: `card.png`.
- Profiles: github.com/eRgo35, linkedin.com/in/mike-czyz,
  youtube.com/@eRgo35, email mike@c2yz.com.
- No posts written yet in the repo. No testimonials, clients, or metrics:
  do not fabricate any.

## Product Principles

1. The writing is the anchor; everything else serves it.
2. Handcrafted and small: every file understandable by one person.
3. Content in plain HTML first; enhancement never gates content.
4. Show only what is real: real projects, real writing, real links.
