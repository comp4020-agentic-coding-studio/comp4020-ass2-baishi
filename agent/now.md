---
updated: 2026-09-18
deliverable: comp4020-ass2-baishi
---

# Now

## State (this run, 76h to cutoff)

Repo arrived clean, up to date with `origin/main`, `pnpm check`/
`check:evidence` both green (36 pages, 0 a11y violations, no broken links,
deck structurally sound, 6/6 tests, 10 PROCESS.md citations resolve,
PROCESS.md at exactly 600/600 words).

Tried a genuinely new angle rather than repeating the exhausted battery: a
**full-site** dark-mode contrast sweep, not just the one card-title element
a prior run's fix had verified in dark mode. Wrote a hand-rolled contrast
checker (canvas-normalized colour parsing, so it handles oklch same as
`contrast.ts`; walks up the DOM for the nearest opaque `background-color`;
WCAG AA thresholds by font size/weight) and ran it via `agent-browser eval`
against every distinct page type: home, sessions index, one lecture, one
assessment, people index, policies, lectures index, assessments index, and
the week-1 deck's current slide — all in `agent-browser set media dark`.
Every page came back clean except a flag on the home hero title
(`ratio 1.02`), which turned out to be a **false positive in my own
checker**, not a real bug: `.at-hero-title`'s colour (`--at-white: #fff`)
and its gradient scrim (`rgb(0 0 0 / 80%)` etc.) are fixed literals with no
`light-dark()` involvement anywhere, so the hero's actual rendering is
provably scheme-independent — my walk-up-for-background-color heuristic
just isn't equipped to read an image+gradient background, the same category
of blind spot axe-core has (already logged in `MEMORY.md`), now confirmed
for a hand-rolled checker too. Since it's scheme-independent, the light-mode
darkening fix from three runs ago already covers dark mode by construction
— no new code needed. See the new `MEMORY.md` entry for the full mechanism
and the generalised lesson (any bespoke contrast tool has the same
solid-color-background assumption axe does).

No commits this run — a legitimate "checked more thoroughly, confirmed
correct" outcome, not a defect.

## Next action

Nothing currently flagged as untried on the technical side. The
exemplar-comparison, clause-by-clause prose passes, keyboard/resize checks,
and now a full-site dark-mode contrast sweep are all exhausted with no real
defect across the last several runs — treat that as the expected steady
state for a repo this thoroughly worked (per the crit-4/crit-5 precedent),
not a sign something's being missed.

Not the last run — no reflection expected (assignment, not a crit). When
the prompt does call a run "last": re-verify locally once more (including
the full-site dark-mode contrast sweep after any further CSS change),
confirm `PROCESS.md` still answers the brief's "what you submit" spine
(course-design decisions encoded in the harness vs. deliberately left out —
already covered, re-check it still reads that way), commit and push, and
note that GitHub Pages deploy + repo visibility flip is harness-owned, not
this agent's job.
