---
title: "Tool Tax Calculation"
dimension: space
state: optimized-tools
quality: "[[lean]]"
keywords: [cognitive-overhead, maintenance, context-switching, tool-cost, audit]
tags:
  - type/technique
---

# Tool Tax Calculation

> Every tool charges a tax — the calculation tells you whether the features are worth the fee.

## Mechanism
Tools are typically evaluated on their feature value: what they enable. They are rarely evaluated on their cognitive tax: what they cost to own and operate. This asymmetry produces systematic over-investment in tool capability at the expense of system simplicity. A tool with excellent features that imposes a high cognitive tax may produce a net negative outcome relative to a simpler tool with fewer features and lower overhead.

Cognitive tax operates across three time horizons. Acquisition tax: the learning curve, setup time, and configuration cost paid when a tool is added. Maintenance tax: the ongoing cost of updates, workflow integrations, troubleshooting, and keeping proficiency current. Context-switch tax: the attentional cost of moving between tools during a session — each switch requires a brief mental reorientation even when the switch is intentional. High-feature tools often impose disproportionate context-switch tax because their complexity means each engagement requires more cognitive loading than a simpler tool would.

The calculation converts these intuitive costs into a comparable number so that tool decisions can be made on explicit tradeoffs rather than feature comparison alone. The goal is not to minimize tools — it is to identify which tools are paying for themselves (their features justify their tax) and which are net drains (their overhead exceeds their contribution to actual work quality or speed).

## Protocol
1. List your active tools. For each, estimate the following on a 1-5 scale: (a) Learning/maintenance cost — how much ongoing cognitive effort does owning this tool require? (b) Context-switch cost — how much friction does transitioning to and from this tool create during a session? (c) Failure/recovery cost — when this tool fails or misbehaves, how much does it disrupt work?
2. Sum the three scores for each tool. This is the tool's tax score (minimum 3, maximum 15).
3. For the same tool, rate its contribution on a 1-5 scale: how much does this tool improve your output quality or production speed compared to not having it? This is the tool's contribution score.
4. Calculate the net score: contribution minus tax. Positive net scores indicate the tool is paying for itself. Negative or zero net scores indicate the tool is a net drain.
5. For all tools with negative net scores, apply the subtraction test immediately. For all tools with net scores between 0-2, flag for replacement research — a different tool may accomplish the same contribution at lower tax.
6. Re-run the calculation when a tool's behavior changes (major update, integration change) or when your work context shifts significantly. Tax scores change; a tool that was worth its tax in one phase of work may not be in another.

## When to Use
- When a tool transition feels like it's costing more than it's contributing but you cannot quantify why
- Before adopting a new tool — estimate its prospective tax score before acquisition and compare to the contribution you expect
- During any tool stack simplification effort — the calculation provides a systematic basis for removal decisions

## Key Insight
> A simpler tool you use fluently produces more work than a powerful tool you have to fight — calculate the tax before committing to the features.
