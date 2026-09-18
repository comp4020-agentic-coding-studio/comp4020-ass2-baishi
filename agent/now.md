---
updated: 2026-09-18
deliverable: comp4020-ass2-baishi
---

# Now

## State (this run, 69h to cutoff)

Repo still clean, up to date with `origin/main`, `pnpm check` green (36
pages, 0 a11y violations, no broken links, 6/6 tests) at the start.

Tried a genuinely new angle: swept the week-1 **deck**'s contrast across
*all 8 slides and all 4 slide classes* (default, `impact`, `quote`,
`centered`) — every prior deck check (resize-mid-interaction, the tenth
run's dark-mode sweep) had only ever looked at slide 1. First confirmed the
deck is a fixed dark surface: `set media dark`/`light` produces byte-identical
computed colours (`body` stays `rgb(13,13,13)`/text `rgb(230,230,230)`
either way) — the deck's own `theme.css` comment ("Deck pages are dark
surfaces") is literally true, so no prior or future "dark-mode" check on
this specific page is exercising anything a media-query toggle could
change. See the new `MEMORY.md` entry for the mechanism and why this
matters for how future runs should read "checked in dark mode" claims
about deck pages specifically.

Along the way, hit two false positives from my own contrast checker,
confirmed as non-bugs before writing anything off — see the new
`MEMORY.md` entry for both: (1) the slide-1 title's H1, which the checker
first flagged as `ratio 1.00` (near-invisible), turned out to have its own
opaque amber local background (a highlight-box heading style) that the
checker wasn't reading — same class of blind spot as the already-logged
background-image/gradient one, but for a plain solid local background the
checker needed to check on the *element itself* before walking up
ancestors; (2) the theme's own `.at-heading-anchor` permalink icon (present
on every H1/H2/H3 site-wide, not course content) reads as
identical-color-to-background by design — it's a zero-size hover-reveal
affordance, confirmed via `getBoundingClientRect()` returning 0×0 when
inactive, not a real defect and out of scope anyway (theme code).

After both fixes to the checker itself, swept all 8 slides clean — every
heading/paragraph/list-item/link/blockquote passes AA at its own real
local background. "Checked, confirmed correct," no code change, no commit.

## Previous run's finding (76h, kept for context)

Full-site dark-mode contrast sweep (home, indexes, one lecture, one
assessment, policies, deck slide 1) all clean — see prior `MEMORY.md`
entry for the hero-title false-positive mechanism found then.

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
full-site dark-mode contrast sweep, and now the deck's per-slide-class
contrast sweep are all exhausted with no real defect across the last several
runs — treat that as the expected steady state for a repo this thoroughly
worked (per the crit-4/crit-5 precedent), not a sign something's being
missed. One thing that *did* change this run: any future contrast-checker
script should check an element's own local background before walking up to
its ancestors (see `MEMORY.md`) — reuse that corrected version rather than
the earlier one if the tenth run's snippet is ever revived.

Not the last run — no reflection expected (assignment, not a crit). When
the prompt does call a run "last": re-verify locally once more, confirm
`PROCESS.md` still answers the brief's "what you submit" spine
(course-design decisions encoded in the harness vs. deliberately left out —
already covered, re-check it still reads that way), commit and push, and
note that GitHub Pages deploy + repo visibility flip is harness-owned, not
this agent's job.
