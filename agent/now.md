---
updated: 2026-09-14
deliverable: comp4020-ass2-baishi
---

# Now

## State

This run (159h to cutoff) worked the exact untried-angle list the prior run's
`now.md` had flagged: keyboard tab-order walk, Lighthouse, `pnpm audit`/
`outdated`, `prefers-reduced-motion` on the deck, and a copy-vs-behaviour prose
pass. Two real, small findings, both fixed and pushed (`98796bb`):

- `pnpm audit` found 12 vulnerabilities (1 critical, 7 high, 4 moderate) in
  transitive deps, including a real astro advisory (GHSA-376h-93r7-7g6f, <=7.2.3)
  and an svgo one (GHSA-4vpr-x523-8j87). A plain in-range `pnpm update`
  (astro 7.2.2→7.3.2, sharp/@astrojs/mdx/vitest/@types/node patch-level, no
  pin crossing a major version) cleared every finding; `pnpm audit` now
  clean, `pnpm check` still green. Committed `85fd45d`.
- Copy-vs-behaviour pass on `src/pages/policies/index.mdx`: every other
  in-prose assessment reference across the site deliberately links the
  generic `/assessments/` listing with generic anchor text ("assessment
  page") — a real, consistent convention, confirmed by grepping every
  instance. The policies page was the one exception: it named a specific
  assessment ("Assignment 1") but still linked the generic listing instead
  of `/assessments/the-convincing-copy/`. Fixed to link the specific page.
  Committed `98796bb`.

Other angles came back "checked, confirmed correct" or structurally
unverifiable, not defects:

- Keyboard tab-order walk (desktop viewport, home page): skip link → wordmark
  → nav (Lectures/Studios/Assessment/People/Policies) → labelled search
  button ("Search (Cmd+K)") → hero card links, all with visible outline. Clean.
- Lighthouse (first run ever on this repo): all five categories 1.0
  (performance/accessibility/best-practices/seo/agentic-browsing), zero
  console errors. A genuinely clean first result, unlike ass1/crit-4/crit-5's
  first Lighthouse runs which all found something.
- `prefers-reduced-motion` on the deck: astromotion's only reduced-motion
  guard styles a first-run help-hint overlay, and that overlay's own code
  (`node_modules/astromotion/src/first-run-help.ts`) deliberately never
  renders when `navigator.webdriver === true` — confirmed this session's
  `agent-browser` reports `navigator.webdriver` as `true`, so the hint (and
  therefore its reduced-motion guard) is structurally unobservable via CDP
  automation by the theme's own design ("Any browser being driven
  programmatically... is not a viewer who needs teaching the key
  bindings"). Also upstream platform code (astromotion), not this course's
  own content — didn't chase further. Log this as a new category alongside
  the existing iOS-touch-emulation gap: some live checks are blocked by a
  library's own automation-detection, not a sandbox tooling gap.
- Home-page prose cross-check: "three finished pieces — a convincing copy, a
  written case against a sample you didn't make, and an object with a
  history built to match it" matches the three real assessments
  (the-convincing-copy / the-tell / provenance) exactly. No fix needed.

`PROCESS.md` is unchanged this run — already at 598 words against this
assignment's hard 400–600 cap (tighter than a crit's 600–900), so the two new
commits above aren't cited yet. Not a gap to leave standing forever: if a
future run has room to trim an existing paragraph, the audit fix is the more
citation-worthy of the two (a real, numbered vulnerability count cleared) and
could replace a less load-bearing sentence elsewhere. Not urgent — `PROCESS.md`
doesn't need to cite every commit, only support its own narrative with real
ones, and the current 8-commit narrative still holds together.

Not the last run. No reflection expected for this repo (assignment, not a
crit).

## Next action

Read `PROCESS.md` first (598 words, 8 cited commits, unchanged this run).
Genuinely untried angles left: a full keyboard tab-order walk beyond the home
page (lecture/session/assessment/people page chrome, and the deck's own tab
order distinct from its arrow-key nav); a 200%-zoom reflow check (never done
on this repo); a real mobile-viewport (390×844) pass of everything checked
here at desktop only. If `PROCESS.md` ever needs trimming room, swap in the
`pnpm audit` fix as a cited moment — it's a stronger, more countable finding
than at least one existing sentence.
