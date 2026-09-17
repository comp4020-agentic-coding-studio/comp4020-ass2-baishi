# Process overview

## What I built

SLOP2474, "The Forger's Craft" — a twelve-week elective on forgery and
convincing imitation across four materials (paint, prose, currency, code),
where every studio ends with a copy not quite landing and the reason why is
that week's content. Three assessments carry the idea from craft to
detection to argument: a 30% convincing copy with a declared
materials-and-method note, a 30% detection write-up on a provided sample,
and a 40% capstone pairing a made object with a fabricated provenance file.

## How I got here

I spent the first pass on constraints before content: course-code/level,
description/tag rules, the assessment schema, and
`spec/data-integrity.test.ts`, which enforces every `date`/`due` against
`course-config.ts`'s teaching window from the built API, not frontmatter.
Designing the course record against that contract meant nothing later
needed a schema-driven redo —
[`8c8edc9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/8c8edc9).

The starter's two people didn't fit a hands-on craft course, so I replaced
the cast outright —
[`4d4c3c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/4d4c3c6).
With no image tool beyond `sharp`, I hand-authored the hero art and three
portraits as SVG (a tilted easel, paint swatches, a loupe; one bust
silhouette each, one accessory) and rendered them to AVIF —
[`43a0e81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/43a0e81).

The twelve-week arc —
[`03ce274`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/03ce274)
and
[`78bc3e8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/78bc3e8)
— follows one throughline, not twelve topics: connoisseurship, materials
science, textual forgery, currency's arms-race, provenance, and code's own
forgery problem (plagiarism, licence-laundering, rewritten history), plus
two guest weeks on synthetic media. The provenance capstone and its policy
line
([`80d8250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/80d8250))
are the payoff: graded work that's itself a declared fake needs an
integrity line at authorship, not resemblance — including generative AI.

Before trusting any of this, I wrote `spec/course-content.test.ts`
([`701b9b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/701b9b6))
asserting promises the shipped tests don't: weights sum to 100, every week
1–12 has scheduled content, every lecture/studio names a teacher, and a
deck exists — every commit passing `pnpm check` first.

Some decisions stayed prose-only. The test only checks a session or
lecture has *a* teacher, not the *right* one — pinning Naledi Osei to
weeks 9–10 would break a passing suite if a guest changed. Whether the
four-materials throughline holds, and whether the prose reads as this
course's own voice, are judgement calls no test can make — left for a
marker.

## A live-browser pass, three real defects

Both marking viewports surfaced real accessibility defects axe-core's static
sweep never flags — it reports oklch colours and image-behind-gradient text
as "incomplete," not pass/fail. `.at-card-title` inherited `--at-accent`, the
lockup gold: 3.43:1 against its background, under 4.5:1 AA. Fixed by
switching to `--at-secondary`, the palette's deeper bronze, confirmed via
`getComputedStyle` —
[`653a9e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/653a9e2).

A later pass caught a mistake in the first: I'd traced home's other
"incomplete" nodes to that same harmless gap without measuring the hero
heading itself, which sits over a photo behind a black gradient overlay —
exactly what axe can't read. Live pixels showed white text at 2.99:1, under
even the 3:1 large-text minimum; compositing over pure black is a linear
scalar, so darkening the raw hero image by a measured factor brought that
point to ~4.4:1 at both viewports —
[`2196f23`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/2196f23).

A third pass found the card-title fix only half-held: the card background
is `light-dark()`, but `--at-secondary` is a fixed hex — it clears light
mode (5.71:1) but drops to 3.51:1 in dark, a fresh AA failure the first
check had no reason to try. Primary and secondary are exact mirrors:
primary fails light (3.43:1) but clears dark (5.82:1), so `light-dark()`
now picks whichever is legible per scheme —
[`ccea0a6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/ccea0a6).

Everything else stayed clean at both viewports and colour schemes — no
console errors, 0 axe violations. Not a finishing run; `pnpm
check`/`check:evidence` green, no reflection expected.
