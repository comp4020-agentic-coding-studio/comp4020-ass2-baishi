---
updated: 2026-09-15
deliverable: comp4020-ass2-baishi
---

# Now

## State

This run (146.5h to cutoff) worked the exact list the prior run's `now.md`
flagged — a full keyboard tab-order walk beyond home, a 200%-zoom reflow
check, and a real mobile-viewport (390×844) pass — and found the most
significant defect of the deliverable's history so far, correcting a claim a
prior run itself had made:

- The second run's `PROCESS.md` said all 9 axe "incomplete" nodes on home
  (nav links, hero heading, tag badges) traced to the theme's documented
  oklch/gradient contrast-checking gap, not a real defect. That was true for
  8 of them (confirmed by hand-computing oklch token contrast: 8.89:1 and
  8.45:1) but the hero heading itself had never actually been measured, only
  assumed to match the pattern. Pixel-sampling the live rendered page (white
  title text over the darkest visible strip of the hero photo, behind the
  theme's fixed black gradient overlay) found a real, marginal AA failure —
  as low as 2.99:1, under even the 3:1 large-text minimum.
- Fixed by darkening the raw hero AVIF (`sharp(...).linear(0.78, 0)`):
  compositing over a **pure black** foreground is a linear scalar
  (`compositeOver(black, alpha, bg) = bg * (1-alpha)`), so scaling the
  source image's brightness by a factor darkens the on-page composite by
  that same factor regardless of alpha or which vertical band a given
  viewport's responsive crop shows. Confirmed at ~4.4:1 at both marking
  viewports after the fix, and confirmed no visible quality regression.
  Committed `2196f23`.
- Corrected `PROCESS.md`'s now-inaccurate claim in the same pass (it can't
  just be appended to — the old sentence was actively wrong), restaying
  under the 400–600 word cap by tightening prose elsewhere rather than only
  adding. Committed `096dcf0`. Still 9 cited commits, still green on
  `pnpm check:evidence`.
- Added a `MEMORY.md` correction/extension on the existing oklch/contrast.ts
  entry: axe's "incomplete" label names a category it can't evaluate, not a
  verdict — confirming a few nodes in that category are false positives
  doesn't license writing off the rest without measuring each one. Also
  recorded the pure-black-compositing linear-scalar darkening technique as
  reusable for any future image-behind-gradient contrast fix.

Other angles came back clean or correctly out-of-scope, not defects to fix
in this repo:

- 200%-zoom reflow check (`document.documentElement.style.zoom = '2'`):
  clean at both marking viewports on every page type (lecture, session,
  assessment, people, policies, deck, home) — no horizontal overflow, no
  console errors.
- Full mobile-viewport (390×844) pass across every page type: clean,
  matches the desktop-only checks a prior run had already done.
- Full keyboard tab-order walk beyond home: found two real gaps, both
  confirmed to be upstream `astro-theme-university`/`astromotion` platform
  code, not this course's own content (grepped `src/` for both, found
  nothing) — logged, not fixed, per the established platform/content
  boundary:
  - The footer's `.at-footer-theme-toggle` (`node_modules/astro-theme-
    university/styles/components.css`) resets `all: unset` with no
    `:focus-visible` re-added — a real keyboard-focus-visibility gap on the
    theme toggle specifically.
  - The deck's structural controls (astromotion) aren't reachable via Tab
    at all — only the arrow-key/Space navigation the deck's own docs name
    as its intended input model. Real, but a deliberate platform design
    choice, not a content bug.

`pnpm check` and `pnpm check:evidence` both green throughout. All commits
pushed to `origin/main`. Not the last run — no reflection expected
(assignment, not a crit).

## Next action

Read `PROCESS.md` first (598 words, 9 cited commits). The technical-check
battery for this repo is now genuinely close to exhausted: contrast (both
oklch-token math and live pixel-sampling), keyboard tab-order (full site),
200%-zoom reflow, mobile viewport, `pnpm audit`/`outdated`, Lighthouse, and
a copy-vs-behaviour prose pass have all been run at least once, each
finding something real or confirming clean. Worth trying next, in rough
priority order: (1) re-run `pnpm audit`/`outdated` — cheap, and enough time
has passed since the last clear that a new transitive advisory is plausible;
(2) re-run Lighthouse now that the hero image has changed, to confirm the
darkening didn't regress any score (it's a content asset a `pnpm check`
green can't see the visual/perceptual effect of); (3) a `prefers-reduced-
motion` check on anything in this course's own content (not just the
astromotion deck's already-confirmed-unverifiable help-hint) — hasn't been
tried since this is a mostly-static site, so it may come back "nothing to
check," which is itself a fine outcome to record. If none of these turn up
anything, that's a legitimate "battery exhausted" state, not a sign
something's being missed — record it plainly rather than manufacturing
busywork.
