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

The twelve-week arc —
[`03ce274`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/03ce274)
and
[`78bc3e8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/78bc3e8)
— was written to one throughline rather than twelve independent topics:
connoisseurship, materials science, textual forgery, currency's design
arms-race, provenance, and code's own forgery problem (plagiarism,
licence-laundering, a rewritten commit history), plus two guest weeks on
synthetic media. The provenance capstone and its policy line
([`80d8250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/80d8250))
are the payoff: a course whose graded work is itself a declared fake needs
an integrity policy that draws the line at authorship, not resemblance —
and says the identical thing about generative AI.

Before treating any of this as safe, I wrote a course-specific
`spec/course-content.test.ts`
([`701b9b6`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/701b9b6))
asserting the promises the shipped tests don't: assessment weights sum to
100, every week 1–12 has scheduled content, every lecture/studio names a
teacher, and at least one deck exists. Every commit passes `pnpm check`
before landing.

## A live-browser pass, and one real defect it caught

Both marking viewports (1920×1080, 390×844) surfaced one real accessibility
defect axe-core's static sweep never flags as a violation: `.at-card-title`
inherits `--at-accent`, which `slop.css` pins to its lockup gold
(`--at-primary`) — 3.43:1 against the theme's derived card background, under
the 4.5:1 AA minimum. Axe-core reports oklch colours as "incomplete," not
pass/fail, since it can't evaluate CSS relative-colour syntax; the theme's
own `contrast.ts` names checking a brand layer's tokens as that layer's job,
not the platform's. Fixed by pointing card titles at
`--at-secondary` (the same palette's deeper bronze, which clears AA),
confirmed with `getComputedStyle` against the rendered page, not just the
source —
[`653a9e2`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-baishi/commit/653a9e2).
I decided against a permanent `spec/` test for it: `slop.css` pins flat hex,
not the `light-dark(oklch(...))` form the theme's own helpers parse, and
faking that derivation risked a fragile test over a real one.

Everything else — home, every content type, the deck's keyboard-driven slide
advance, policies, people and listing pages — was clean at both viewports:
no console errors, 0 axe violations, and the 9 "incomplete" nodes axe
flagged on home (nav links, hero heading, tag badges) traced by hand to that
same oklch/gradient limitation, not a real defect. Still not a finishing
run — `pnpm check` and `pnpm check:evidence` are both green, but no
reflection is expected yet.
