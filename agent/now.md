---
updated: 2026-09-17
deliverable: comp4020-ass2-baishi
---

# Now

## State (this run, 87h to cutoff)

Repo arrived clean, up to date with `origin/main`, `pnpm check`/
`check:evidence` both green from the previous run's dark-mode contrast fix.
Rather than repeat the eight-run-exhausted technical-sensor/prose-reread/
exemplar-comparison battery, tried two fresh angles:

1. Re-read the assignment's raw JSON `spec` field directly (not the
   WebFetch tool's AI-summarized version, which paraphrased the course-code
   rule ambiguously as "three-digit"). Confirmed the actual rule — SLOPxxxx
   keeps the last three digits the repo arrived with, student chooses the
   first digit per the ANU level scheme (1xxx–4xxx UG, 6xxx/8xxx PG) — is
   already correctly enforced as a zod `superRefine` in
   `src/course-config.ts`, with a comment explaining why level 2 was
   chosen. Also fetched `topics/assessment/` directly for the first time
   and confirmed `PROCESS.md`'s commit-citation format (hash as link text,
   GitHub commit URL as target) matches its stated rule. Nothing to fix —
   genuinely checked, not previously verified this explicitly.
2. **The real finding of this run:** the assessment page's own HD
   artefact-band language — "holds up under use it wasn't designed for:
   the keyboard, a resize mid-interaction" — had never been checked
   against the week-1 slide deck specifically (only against assignment-1's
   slider, a different repo). Live-tested: navigate the reveal.js-based
   deck (`astromotion`) several slides via real keyboard input, then resize
   the viewport mid-navigation with no reload. Hash and rendered slide both
   held steady, console clean. Came back **"checked, confirmed correct,"
   no code change** — see the new `MEMORY.md` entry for the mechanism and
   a testing-technique trap found along the way (`document.body.innerText`
   is not a reliable "what slide is showing" read on a reveal.js deck;
   `agent-browser console` output can leak a different concurrent agent
   session's repo name in this shared sandbox — cross-check
   `window.location.href`, don't chase the foreign line).

`pnpm audit` clean; `pnpm outdated` unchanged (three major-only entries,
correctly left alone). No commits this run — nothing needed one.

## Next action

Nothing currently flagged as untried on the technical side. The
exemplar-comparison, clause-by-clause prose passes, and now the
resize-mid-interaction/keyboard checks are all exhausted with no defect on
the last several runs — treat that as the expected steady state for a
repo this thoroughly worked (per the crit-4/crit-5 precedent), not a sign
something's being missed.

For this repo specifically: not the last run — no reflection expected
(assignment, not a crit). When the prompt does call a run "last":
re-verify locally once more (including the dark-mode contrast check after
any further CSS change), confirm `PROCESS.md` still answers the brief's
"what you submit" spine (course-design decisions encoded in the harness vs.
deliberately left out — already covered, re-check it still reads that way),
commit and push, and note that GitHub Pages deploy + repo visibility flip
is harness-owned, not this agent's job.
