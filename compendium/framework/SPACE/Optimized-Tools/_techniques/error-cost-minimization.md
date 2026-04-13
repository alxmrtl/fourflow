---
title: "Error Cost Minimization"
dimension: space
state: optimized-tools
quality: "[[lean]]"
keywords: [mistakes, penalty, recovery, momentum, safety-net]
tags:
  - type/technique
---

# Error Cost Minimization

Design your environment so that mistakes are cheap and reversible — because exploratory work is only possible when the cost of being wrong is low enough to try.

## Protocol

1. Identify the current cost of a mistake in your work environment: lost time, lost data, lost relationship, lost money. Be specific.
2. For each high-cost error type, find one structural way to reduce it: version control, backups, smaller test batches, a reversibility step before committing.
3. Build recovery speed into your workflow. How quickly can you return to the pre-error state? Compress that time.
4. Before beginning any exploratory or experimental work, verify that the error cost is acceptable. If it isn't, reduce it before starting — don't rely on being careful enough.
5. Track errors and recovery time for one month. The pattern reveals which areas most need structural protection.

*Pair with [[speed-of-consequence]]: fast consequence + low error cost = maximum safe iteration rate.*

## When to Use

- Before experimental or creative sessions where mistakes are likely and the stakes currently feel high
- When fear of being wrong is visibly slowing your rate of attempting
- When recovering from errors is taking long enough to break momentum

## Key Insight

> "You can't explore freely when mistakes are expensive — reduce the cost first, then experiment."

## Recall

**Hook**: You can't explore freely when mistakes are expensive — reduce the cost first, then experiment.
**Mechanism**: High error costs activate threat detection and shift the brain to defensive mode; low error costs restore exploratory behavior, which is the prerequisite for skill development and flow.
**Anchor**: Make it safe to be wrong. Reversibility = permission to try.
