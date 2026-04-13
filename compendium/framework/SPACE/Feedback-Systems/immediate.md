---
title: Immediate
dimension: space
state: feedback-systems
quality_type: maintain
keywords:
  - latency
  - response
  - loop
  - real-time
  - signal
  - dopamine
  - prediction-error
  - csikszentmihalyi
  - reinforcement
definition: "The loop between action and information is short — consequences arrive while they can still steer."
tags:
  - type/quality
---

# Immediate
*The Maintain quality of Feedback Systems*

## What it is

When this quality is present, what you just did has already told you something. You act, and the consequence arrives in the same window of attention — close enough to connect, close enough to correct. When absent, there's a gap: you do the work and then wait, and in the waiting the connection between cause and effect loosens. You can't tell which decision produced which result. The session becomes a series of isolated outputs with no steering mechanism, and the intrinsic reward that comes from navigating toward a target in real time disappears.

## Science

Csikszentmihalyi identified immediate feedback as one of three canonical structural conditions for flow — alongside clear goals and challenge-skill balance. Not a preference, but a load-bearing structural requirement: without it, flow cannot emerge regardless of how well the other conditions are met.

The neurological mechanism runs through the dopamine prediction error system. Schultz et al. (1997) showed that dopamine neurons fire not at reward delivery but at the moment of accurate prediction — the brain rewards itself for correctly modeling cause and effect. Immediate feedback enables high-fidelity attribution: when action and consequence are close in time, the brain can accurately connect the specific decision to its result and update its model cleanly. Delayed feedback scrambles this: by the time the consequence arrives, subsequent actions have created interference, attribution fails, and the learning signal weakens.

Temporal discounting compounds the effect. Research (Ainslie, 1975; Laibson, 1997) shows that delayed rewards are neurologically devalued relative to immediate ones — the brain systematically undervalues feedback that arrives in the future. A feedback signal five minutes late is not 80% as reinforcing as an immediate signal; in many cases it is negligible.

## Techniques

- [[speed-of-consequence]] — designs systems where the result of an action is felt as close to instantly as possible
- [[micro-review-loop]] — inserts brief self-checks at short intervals to maintain real-time situational awareness
- [[live-output-check]] — monitors output quality in real time rather than deferring review to after the session

## Recall

**Hook**: A gap between action and information is a gap in the flow state.
**Mechanism**: Immediate feedback keeps attention anchored to the present action by making every move consequential in the moment; delayed feedback forces the mind to hold context across time, breaking immersion and collapsing the dopamine-driven learning signal.
**Anchor**: Real-time signal = real-time engagement. Delay = drift. Design systems so consequences are visible within seconds, not minutes.
