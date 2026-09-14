---
title: Synthetic media II — detection, and its own failure modes
description:
  The second guest lecture — how synthetic-media detection actually works
  today, and the honest limits of a field that is still losing some rounds.
week: 10
date: 2027-09-28
teachers:
  - naledi-osei
related:
  - sessions/10-the-tell-work-time
  - assessments/the-tell
---

Detection tooling for synthetic video and audio mostly works the way
week 3's materials science worked for paintings — it looks for an artefact
the generator left behind that the generator's own designer didn't think to
hide, a compression signature, a blink rate, a spectral gap no real
microphone produces. The uncomfortable half of this lecture is what happens
next: publishing a detector teaches the next generation of generators exactly
what to fix, so the arms race from week 6's banknotes runs here too, faster
and more publicly. Naledi is direct in this session about which of her own
team's tools are already behind, and that honesty is deliberate: a course
about fakes that pretended its own experts always win would be telling one.

## Outline

- how current detectors actually work, artefact by artefact
- the adversarial dynamic: publishing a detector trains its evasion
- what "we can't currently tell" looks like from inside a real detection team
- studio work time on "The Tell," due the following week
