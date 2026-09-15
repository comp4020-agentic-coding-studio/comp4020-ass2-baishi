---
updated: 2026-09-15
deliverable: comp4020-ass2-baishi
---

# Now

## State

This run (141h to cutoff) worked the exact three-item list the prior run's
`now.md` flagged, and all three came back clean — no code change, no commit:

- `pnpm audit`: no known vulnerabilities. `pnpm outdated`: same four entries
  as before (`@astrojs/mdx`, `@types/node`, `typescript`, `vitest`), all
  major-only bumps — correctly left alone, matching established policy.
- Lighthouse re-run against the built site (base path is
  `/comp4020-ass2-baishi/`, derived from the origin remote — hitting bare
  `/` under `pnpm preview` 404s silently with a 200 status, since Astro
  serves `404.html` as the body; always resolve the real base from
  `dist/index.html`'s hrefs before pointing Lighthouse or `curl` at a local
  preview). All five categories scored 1.0 — confirms the prior run's hero
  AVIF darkening (for the AA contrast fix) didn't regress performance/
  best-practices/SEO.
- `prefers-reduced-motion`: grepped this course's own `src/` (not
  `node_modules`) for `animation`/`transition`/`@keyframes` — zero matches.
  The only two custom stylesheets in the repo
  (`src/decks/theme.css`, `src/styles/card-title-contrast.css`) are a
  deck-CSS import with no rules of its own and a one-line colour override.
  Nothing to check here, confirmed rather than assumed — a legitimate
  "N/A" outcome, not a gap.

Also did a fresh live-browser pass as a marker actually would: home page at
both marking viewports (1920×1080, 390×844) screenshotted — hero title
reads cleanly at both, matching the contrast fix — plus a non-adjacent
lecture page and the week-01 deck, both console-clean. No new defects.

`pnpm check` green (6 tests) at the start. Nothing changed this run, so
nothing to push — working tree was already clean before and after.

## Next action

The technical-check battery for this repo (contrast, keyboard tab-order,
zoom, mobile viewport, audit/outdated, Lighthouse, reduced-motion,
copy-vs-behaviour) has now been run at least once each and every item
either found something real (already fixed) or came back genuinely clean.
This reads as the "battery exhausted" state doctrine's own lesson warns
against manufacturing busywork for — don't invent a fix to have a diff.
Worth trying on a future run before assuming there's truly nothing left:
(1) re-read the brief's own prose one clause at a time against the live
site's actual content, the technique that kept finding real bugs on
crit-4/crit-5 well after their sensor batteries went dry (see `MEMORY.md`'s
brief-clause-re-derivation entries) — not yet tried on this repo in that
specific form; (2) a full non-adjacent-page sweep matching the rubric's own
described marker behaviour (home, several non-adjacent weeks, an
assessment, the deck, policies) at both viewports, since this run only
sampled two pages beyond home. Not the last run — no reflection expected
(assignment, not a crit); `PROCESS.md` still accurate at 9 cited commits,
no update needed.
