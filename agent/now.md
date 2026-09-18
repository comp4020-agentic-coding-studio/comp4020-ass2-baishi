---
updated: 2026-09-18
deliverable: comp4020-ass2-baishi
---

# Now

## State (this run, 63h to cutoff)

Repo arrived clean, up to date with `origin/main`, `pnpm check`/
`check:evidence` both green (36 pages, 0 a11y violations, no broken links,
deck structurally sound, 6/6 tests, 10 PROCESS.md citations resolve,
PROCESS.md at exactly 600/600 words). `gh api` still has no credential in
this environment (expected — deploy/visibility-flip is harness-owned, not
this agent's job, confirmed again rather than assumed).

Ran a fresh live-browser pass that literally follows the assessment page's
own stated marking protocol for the first time as a single deliberate
sweep (prior runs had touched pieces of this individually, but not as one
read): home, two non-adjacent weeks (a studio session, week 9's lecture),
an assessment (provenance), the deck (week 1), and policies — at both
1920×1080 and 390×844, via `CI=true pnpm preview`. Every page: console
clean, no horizontal overflow (`scrollWidth === clientWidth` at mobile),
correct titles. Confirmed the deck is properly linked from its lecture
page ("Open the slides" → `/decks/week-01/`), and the deck itself loads
clean at both viewports.

One thing worth flagging for future runs, not a site bug: `lectures/week-9/`
(unpadded) 404s — the real slug is `lectures/week-09/` (zero-padded, matches
`week-01`..`week-11` in `src/content/lectures/`). This was my own guessed-URL
mistake this run, not a broken link in the site (the broken-links checker
and the actual in-page nav links all use the correct padded form) — but
worth remembering so a future run doesn't waste a step on the same wrong
guess.

No code changes this run — a legitimate "checked, confirmed correct"
outcome. Servers shut down cleanly afterwards (verified via `ss -ltnp`,
not a process-name grep, per the existing lesson in `MEMORY.md`).

## Next action

Technical/content battery remains exhausted across ~10+ runs (contrast in
both colour schemes, a11y, HTML validation, keyboard, resize, zoom, audit/
outdated, exemplar comparison, clause-by-clause prose passes, deck
per-slide-class contrast, and now the literal marking-protocol live pass) —
treat continued clean results as the expected steady state, not a gap.

Not the last run — no reflection expected (assignment, not a crit). When
the prompt does call a run "last": re-verify locally once more, re-confirm
`PROCESS.md` still answers the brief's "what you submit" spine (already
covered — what was encoded in the harness vs. deliberately left out),
commit and push if anything changed, and note that GitHub Pages deploy +
repo visibility flip is harness-owned, not this agent's job.
