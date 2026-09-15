# Process overview

## What I built

SLOP2474, "The Forger's Craft" — a twelve-week elective about forgery and
convincing imitation across four materials (paint, prose, currency, code),
where every studio ends with a copy not quite landing and the reason why is
the week's actual content. Three assessments carry that idea from craft to
detection to argument: a 30% convincing copy with a declared
materials-and-method note, a 30% detection write-up on a provided sample, and
a 40% capstone pairing a made object with a fabricated provenance file.

## How I got here

I spent the first pass on constraints before any content decision: the
course-code/level pairing, description-length and tag-count rules, the
assessment schema, and `spec/data-integrity.test.ts`, which enforces every
`date`/`due` inside `course-config.ts`'s teaching window from the built API,
not frontmatter. Designing the course record against that contract meant
nothing afterwards needed a schema-driven redo —
[`8c8edc9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/8c8edc9).

The starter's two people entries didn't fit a hands-on craft course, so I
replaced the cast outright —
[`4d4c3c6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/4d4c3c6).
With no image tool beyond `sharp`, I hand-authored the hero art and three
portraits as SVG (a tilted easel, paint swatches, a loupe; one bust
silhouette, one accessory per person) and rendered them to AVIF at the
required size —
[`43a0e81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/43a0e81).

The twelve-week arc —
[`03ce274`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/03ce274)
and
[`78bc3e8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/78bc3e8)
— was written to one throughline rather than twelve independent topics:
connoisseurship, materials science, textual forgery, currency's design
arms-race, provenance, and code's own forgery problem (plagiarism,
licence-laundering, rewritten history), plus two guest weeks on synthetic
media. The provenance capstone and its policy line
([`80d8250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/80d8250))
are the payoff: graded work that's itself a declared fake needs an
integrity line drawn at authorship, not resemblance — including for
generative AI.

Before treating any of this as safe, I wrote a course-specific
`spec/course-content.test.ts`
([`701b9b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/701b9b6))
asserting the promises the shipped tests don't: assessment weights sum to
100, every week 1–12 has scheduled content, every lecture/studio names a
teacher, and at least one deck exists — every commit passing `pnpm check`
before landing.

Some decisions stayed prose-only on purpose. The test only checks a session
or lecture has *a* teacher, not the *right* one — pinning Naledi Osei to
weeks 9–10 in a spec would make swapping a guest break a passing suite for
no reason. Whether the four-materials throughline holds together, and
whether the prose reads as this course's own voice, are judgement calls no
test can make — left for a marker to read.

## A live-browser pass, and two real defects it caught

Both marking viewports surfaced two real accessibility defects axe-core's
static sweep never flags — it reports oklch colours and image-behind-gradient
text as "incomplete," not pass/fail. `.at-card-title` inherited `--at-accent`,
the lockup gold: 3.43:1 against its background, under the 4.5:1 AA minimum.
Fixed by switching to `--at-secondary`, the same palette's deeper bronze,
confirmed via `getComputedStyle` —
[`653a9e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/653a9e2).

A later pass caught a mistake in the first: I'd traced home's other
"incomplete" nodes — nav links, hero heading, tag badges — to that same
harmless gap without measuring the heading itself. Nav links and tags are
genuine false positives (solid oklch tokens, 8+:1 by hand); the
hero title sits over a photo behind a black gradient overlay, exactly what
axe can't read. Live pixels showed white text at 2.99:1, under even the 3:1
large-text minimum — compositing over pure black is a linear scalar, so
darkening the raw hero image by a measured factor brought that point to
~4.4:1 at both viewports —
[`2196f23`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/2196f23).

Everything else stayed clean at both viewports — no console errors, 0 axe
violations. Not a finishing run; `pnpm check`/`check:evidence` green, no
reflection expected yet.
