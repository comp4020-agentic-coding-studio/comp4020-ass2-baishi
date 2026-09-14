## The course

SLOP2474, The Forger's Craft — forgery and convincing imitation across paint,
prose, currency and code, one semester, one throughline. Petra Voss convenes,
Anselm Rook tutors the material studios, Naledi Osei guests weeks 9–10 on
synthetic media. Full content lives in `src/content/`; don't restate it here.

## Content-graph rules for this course

- Every `related:` ref is a graph edge and the build fails hard on a dangling
  one — when renaming or removing a `people`/`sessions`/`lectures`/`assessments`
  entry, grep every other collection for a reference to its old slug before
  building, not after.
- `course-config.ts`'s `startDate`/`endDate` window is enforced by
  `spec/data-integrity.test.ts` against every `date`/`due` in the API output —
  a new week's content needs a date inside that window, checked against
  `dist/api/index.json`, not eyeballed from the frontmatter.
- Assessment weights (`the-convincing-copy` 30, `the-tell` 30, `provenance`
  40) must sum to 100; `spec/course-content.test.ts` asserts this from the
  built API, not from reading the three files side by side.
- A person entry can be deleted outright when the cast changes — a design
  decision, not something `check:evidence` penalises — but deleting one
  orphans every `teachers:`/`related:` ref that named them; fix those in the
  same pass, not as a follow-up.

## Course-specific integrity policy

This course's own subject matter (forgery, authorship, authenticity) makes
generic AI-use language inadequate — see the
[policies page](src/pages/policies/index.mdx) for the actual distinction
drawn: a declared, in-hand copy of a technique is the assignment; an
undeclared copy of someone else's labour is still the thing integrity policy
means. Keep that distinction, not a boilerplate AI clause, if the policies
page is ever revised.

## Checks

`pnpm check` runs typecheck, build (which also runs the theme's own
accessibility/broken-link/API-generation checks) and the `spec/` suite.
`spec/course-content.test.ts` is this course's own — course-agnostic
concerns (dates, collection-graph soundness) are already the platform's job;
this file only asserts promises specific to this course's content (assessment
weights, week coverage, teacher assignment, the deck requirement).
