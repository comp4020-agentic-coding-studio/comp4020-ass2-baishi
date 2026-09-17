---
updated: 2026-09-17
deliverable: comp4020-ass2-baishi
---

# Now

## State (this run, 93h to cutoff)

Tried a genuinely new angle rather than repeat the seven-run-exhausted
technical-sensor/prose-reread/exemplar-comparison battery: checked whether
the existing AA-contrast fixes were ever verified in **dark mode**, not just
light. They hadn't — every prior contrast check in this repo's history used
`agent-browser`'s default light rendering.

Found a real, previously-unverified defect: `.at-card-title`'s existing fix
(`653a9e2`, from a much earlier run) pins the title to `--at-secondary`, a
**fixed hex** (`#8a5c13`, from `astro-theme-slop`'s `slop.css`), while the
card background it sits on is theme-derived via `light-dark()`. Measured
live with `agent-browser set media dark` + a canvas-based oklch→sRGB
readback (same WCAG contrast maths as the theme's own `contrast.ts`, since
that module's parser only handles brand tokens declared the `light-dark(oklch(...))`
way, not this brand's flat hex pins — see the existing `MEMORY.md` entry on
this exact gap): light mode holds at 5.71:1, dark mode drops to 3.51:1,
under the 4.5:1 AA minimum for the title's actual computed size/weight
(20.25px/600, not "large text" by the common ≥700-bold convention).

The fix turned out elegant: `--at-primary` (the lockup gold that originally
*failed* light mode at 3.43:1, the reason `653a9e2` existed) clears dark
mode at 5.82:1 — primary and secondary are exact mirrors of each other
across the two schemes. Now `color: light-dark(var(--at-secondary),
var(--at-primary))`, verified live in both schemes, `pnpm check` green
throughout. Grepped the repo for every other brand-colour literal/token
reference — this is the only one in this course's own content, so no
sibling instances to fix. Fixed and pushed
(`ccea0a6`/`5d47b76`), `PROCESS.md` updated to cite it as a third live-browser
defect, held to 600/600 words by tightening the "How I got here" prose
(no content cut, just condensed) rather than trimming a moment out.

`gh api`/repo-visibility still harness-owned, not re-tried this run.

## Next action

**General technique worth reapplying to any future `astro-theme-university`
deliverable, not just this one:** any brand-layer CSS override that pins a
colour to defeat an AA failure needs checking against **both**
`light-dark()` states if the thing it's tested against (a card background,
a page background) is itself `light-dark()`-derived — a fix verified in
only one scheme is only half-verified. This repo's `slop.css` pins flat hex
brand tokens (not `light-dark()`), so any accent-coloured text sitting on a
theme surface is a candidate for this exact asymmetry.

For this repo specifically: not the last run — no reflection expected
(assignment, not a crit). Nothing else currently flagged as untried on the
technical side; the exemplar-comparison and clause-by-clause prose passes
from prior runs still stand as exhausted. When the prompt does call a run
"last": re-verify locally (including this dark-mode check one more time
after any further CSS change), confirm `PROCESS.md` still answers the
brief's "what you submit" prose, commit and push, and note that GitHub
Pages deploy + repo visibility flip is harness-owned, not this agent's job.
