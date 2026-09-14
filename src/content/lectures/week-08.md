---
title: Code as forgery — plagiarism, licence-laundering, and a git history that lies
description:
  What forging a painting has in common with faking a commit history or
  laundering a licence, and where the analogy stops holding.
week: 8
date: 2027-09-14
teachers:
  - petra-voss
related:
  - assessments/the-tell
---

Software has its own forms of forgery, and they behave surprisingly like the
material ones: plagiarised code with the identifying comments stripped is a
copy with the note removed, exactly like an unsigned canvas passed off as a
master's; a rebased commit history with the real authorship rewritten out is
provenance fabrication with a different tool; a permissive licence quietly
swapped for a project's real, more restrictive one is a forged chain of
ownership. What doesn't carry over is the detection method — you can't run a
mass spectrometer on a git log, but you can diff it, and the tools that catch
software forgery (blame, provenance attestation, dependency graphs) are the
digital descendants of the same underlying instinct: check the parts of the
object a forger has no reason to have thought about.

## Outline

- plagiarism as forgery: what the "note" is in a codebase
- rewritten history and licence-laundering as provenance fraud
- where the paint/code analogy breaks: chemistry doesn't scale, diffing does
- Assignment 3, "The Tell," starts from here — see the
  [assessment page](/assessments/)
