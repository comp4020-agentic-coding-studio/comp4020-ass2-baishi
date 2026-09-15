---
updated: 2026-09-15
deliverable: comp4020-ass2-baishi
---

# Now

## State

This run (135h to cutoff) worked the prior run's own flagged list: the
brief-clause re-derivation technique (not yet tried on this repo in that
specific form) and a full non-adjacent-page sweep at both marking
viewports. Found and fixed two real, distinct defects:

- **Brief-clause re-derivation applied to `PROCESS.md` itself, not the
  live site.** The assignment-2 brief's "what you submit" section says the
  process narrative "should explain... which [decisions] were deliberately
  omitted" from harness/spec enforcement — a literal content requirement,
  not just the word-count/citation-format checks `check:evidence` already
  validates mechanically. Four prior runs had kept `PROCESS.md` accurate
  and well-cited without ever satisfying that one sentence. Added a
  paragraph naming three decisions left prose-only on purpose (teacher-per-
  week specificity, throughline coherence, prose voice), then trimmed
  elsewhere to hold the 600-word cap (landed at 599). Fixed and pushed —
  [`6e3eb88`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/6e3eb88).
- **A full page sweep (home, sessions, lectures, assessments, policies,
  deck) at both marking viewports** found no console errors or overflow
  regressions anywhere, but a close prose read of the home page (the first
  page a marker reads) turned up a circular clause: "...find out exactly
  where it fails to convince, in a studio built around that failure rather
  than around it" — "it" resolves to "that failure," so the contrast says
  nothing. Rewrote for real contrast. Fixed and pushed —
  [`c71df4c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/c71df4c).

`pnpm check` and `pnpm check:evidence` both green throughout. Working tree
clean, both commits pushed to `origin/main`.

Added a general lesson to `MEMORY.md`'s "Working patterns that held up":
a brief's "what you submit" prose can carry a literal content requirement
for a required file, not just a format one — worth re-reading clause by
clause against the current file even when it's already well-cited, since
nothing in `pnpm check`/`check:evidence` can catch a missing content
*category* the way it catches a missing citation.

## Next action

The close-prose-read technique that caught the home-page circular clause
has only been applied to home, the three assessment pages, and policies —
not yet to the twelve lecture/session bodies. That's the one genuinely
untried angle: read each lecture/session body once for voice/clarity
defects (not content accuracy, which the spec already checks), the same
way home just was. If that also comes back clean, the technical-check
battery plus two rounds of prose-read plus brief-clause re-derivation
will have been exhausted — treat a third "nothing found" as the expected
steady state, not a sign something's being missed (see `MEMORY.md`'s
crit-4/crit-5 precedent for what that looks like this many runs in). Not
the last run — no reflection expected (assignment, not a crit);
`PROCESS.md` now at 599 of 600 words, essentially no headroom left for a
future addition without trimming first.
