# Process overview

## What I built

SLOP2474, "The Forger's Craft" — a twelve-week elective about forgery and
convincing imitation across four materials (paint, prose, currency, code),
where every studio ends with someone's copy not quite landing and the reason
it didn't is the week's actual content. Three assessments carry that idea
from craft to detection to argument: a 30% convincing copy with a declared
materials-and-method note, a 30% detection write-up on a provided sample, and
a 40% capstone pairing a made object with a fabricated but plausible
provenance file.

## How I got here

I spent the first pass entirely on constraints before making a single
content decision: reverse-engineering the course-code/level pairing, the
description-length and tag-count rules, the assessment weight/marking-mode
schema, and — critically — `spec/data-integrity.test.ts`, which enforces
every `date`/`due` inside `course-config.ts`'s teaching window from the built
API rather than from frontmatter alone. Designing the course record
(`SLOP2474`, dates, tags) against that known contract meant nothing I wrote
afterwards needed a schema-driven redo —
[`8c8edc9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/8c8edc9).

The starter's two people entries didn't fit a hands-on craft course, so I
replaced the cast outright rather than relabelling it —
[`4d4c3c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/4d4c3c6).
For the hero art and three portraits I had no image tool beyond the project's
own `sharp` dependency, so I hand-authored SVG (a tilted easel, paint
swatches, a loupe; a shared bust silhouette with one accessory per person)
and rendered it directly to AVIF at the exact required dimensions —
[`43a0e81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/43a0e81).
One real snag along the way: a temporary Node script placed outside the repo
(`/tmp`) couldn't resolve the project's `sharp` install at all — Node's ESM
resolver walks up from the *importing file's own directory*, not the shell's
cwd, so a script has to actually live inside the project to see its
`node_modules`. Moving the script in, running it, then deleting it fixed this
in one step.

The twelve-week arc —
[`03ce274`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/03ce274)
and
[`78bc3e8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/78bc3e8)
— was written to one throughline rather than twelve independent topics:
connoisseurship, materials science, textual and signature forgery,
currency's own design arms-race, provenance, and code as its own forgery
problem (plagiarism, licence-laundering, a rewritten commit history), with
two guest weeks on synthetic media. The provenance capstone and its policy
line
([`80d8250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/80d8250))
are the deliberate payoff: a course whose graded work is itself a declared
fake needs an integrity policy that draws the line at authorship, not
resemblance, and says the identical thing about generative AI.

Before treating any of this as safe, I wrote a course-specific
`spec/course-content.test.ts`
([`701b9b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/701b9b6))
asserting the promises the shipped tests don't: assessment weights sum to
100, every week 1–12 has scheduled content, every lecture/studio names a
teacher, and at least one lecture carries a real deck. All ten commits pass
`pnpm check` (typecheck, build, and both spec files) before landing.

## Before you ship

Not yet — this is a mid-build snapshot, not a finishing run. `CLAUDE.md`,
the spec, and every `STARTER_CONTENT` marker are already in place; what's
left is a live-browser pass at both marking viewports and the final
reflection-equivalent check before this repo is called done.
