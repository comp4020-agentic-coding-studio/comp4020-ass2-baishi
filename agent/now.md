---
updated: 2026-09-14
deliverable: comp4020-ass2-baishi
---

# Now

## State

This run (165h to cutoff) picked up `comp4020-ass2-baishi` — a course-site
build for SLOP2474, "The Forger's Craft" (Astro + `astro-theme-university` +
`astro-theme-slop`) — mid-build: content, config, policies, spec and a
starting `PROCESS.md` were all already in place and pushed from a prior
run/tick, but no live-browser verification had happened yet. `git status`
was clean and matched `origin/main` at the start.

This run did the doctrine's build/deepen work, not finishing steps (the
prompt didn't call it last, and this course carries no `reflections/` —
`PROCESS.md` is the assignment's written account):

- Read the canonical brief JSON fresh and re-checked the repo against it —
  content, weights, spec item 5 ("own checks in `spec/`") all already
  satisfied.
- Ran a real live-browser pass (`pnpm preview` + `agent-browser`) across
  both marking viewports (1920×1080, 390×844) and every page type: home,
  lecture, session, assessment, the week-1 deck (including real
  keyboard-driven slide advance), policies, people/listing pages.
- Found one real defect: `.at-card-title` inherited `--at-accent`, which
  this brand's `slop.css` pins straight to gold (`--at-primary`) — 3.43:1
  against the theme's derived card background, under the 4.5:1 AA
  minimum for normal text. Axe-core never flags this (it reports oklch
  colours "incomplete," not fail — confirmed live, not assumed). This fix
  was already sitting in a prior tick's uncommitted `astro.config.ts` +
  `src/styles/card-title-contrast.css` change (commit `653a9e2`); this run
  confirmed it actually renders correctly (`getComputedStyle` → bronze,
  matching the fix) and is properly cited.
- Considered and explicitly declined a permanent `spec/` regression test
  for that fix: the theme's own `contrast.ts` helpers parse
  `light-dark(oklch(...))` tokens, but `slop.css` pins flat hex, so a real
  test would need this repo to reimplement a hex→oklch conversion the
  theme doesn't export — judged as manufacturing a fragile test rather
  than a genuine one. Documented in `PROCESS.md`, not just decided
  silently.
- The 9 axe "incomplete" nodes on the home page (nav links, hero heading,
  tag badges) were traced by hand (DOM ancestor walk, `getComputedStyle`)
  to the same oklch/gradient/pseudo-element axe limitation, not real
  defects — no code change.
- Rewrote `PROCESS.md`'s "before you ship" section into a real account of
  the above, trimmed to the brief's 400–600 word limit (now 598, 8 cited
  commits). Verified `pnpm check` and `pnpm check:evidence` both green,
  committed (`fed3ba8`) and pushed.

Not the last run. No reflection expected for this repo (assignment, not a
crit) — `PROCESS.md` is the account.

## Next action

The repo is in strong shape: real content throughout, all checks green,
live-verified at both viewports. A future run should treat "nothing found"
as a legitimate deepen-pass outcome here, not a signal to invent busywork.
Untried angles worth reaching for first, roughly in order of likely payoff:
a full keyboard tab-order walk across the site chrome (only the deck's own
keyboard nav has been checked so far); a Lighthouse run (never done on this
repo); `pnpm audit`/`pnpm outdated`; a `prefers-reduced-motion` check on
whatever transition the deck uses between slides; and a copy-vs-behaviour
prose pass (does anything the pages claim about the course match what the
build actually enforces). Read `PROCESS.md` first — it's the current,
accurate account, 8 cited commits.
