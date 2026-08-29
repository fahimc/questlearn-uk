# Game plan 1: Blocksmith Worlds

## Promise

Build places that work because you understand the world. A child receives a meaningful brief—create a flood-safe river settlement, a pollinator garden or a Roman supply fort—and plans, measures, builds, tests and explains it.

## Core loop

```mermaid
flowchart LR
  B[Choose build brief] --> P[Plan with constraints]
  P --> E[Earn/select materials through short skill tasks]
  E --> C[Construct freely]
  C --> T[Simulate/test]
  T --> R[Reflect and improve]
  R -->|new brief| B
```

## Modern game feel

First-person/third-person 3D voxel interaction, low input latency, strong placement preview, readable material effects, satisfying build sounds and instant undo. Cosmetic expression comes from mission discovery and design—not random paid rewards. Friends can co-build only in teacher-managed/local modes.

## Learning integration

- **Maths:** arrays, multiplication, perimeter/area/volume, fractions of plots, money/budget, coordinates, scale and data.
- **Science:** plants, habitats, rocks/materials, states of matter, circuits, forces and fair tests.
- **Geography/history:** maps, settlements, rivers/biomes/resources and evidence-constrained historical builds.
- **Computing/D&T:** automation sequences, variables, sensors, structures and iterative evaluation.

Example brief: “Build a 24-plot habitat. Half must support flowering plants, one quarter water, and the rest shelter. The fence has a budget of 28 edge pieces.” The geometry is the actual build constraint, not a detached quiz.

## Mission structure

1. **Brief (1–2 min):** objective, context, success criteria and optional worked example.
2. **Plan (3–5 min):** sketch/ghost blocks; prediction recorded.
3. **Build (8–15 min):** material access via applied choices and construction.
4. **Test (2–4 min):** simulation reveals habitat/material/measurement consequences.
5. **Improve and explain (2–4 min):** child revises, then selects or records a structured justification.

## Failure and feedback

No destruction of hours of work. Failed simulation freezes, highlights observable effects and offers undo/retry. Feedback names the relevant concept. A hint may show a grid overlay or worked mini-model, recorded as support evidence.

## Playable prototype

The browser prototype is now a small free-roaming first-person 3D voxel world. Six original quest beacons are distributed across the island. A learner approaches or taps a beacon, accepts a build prompt, constructs the numerical answer inside a glowing pad and asks the game to validate the actual block count. Correct builds become permanent monuments and award creative inventory for construction anywhere else.

Included tasks cover half of 24, one third of 18, one quarter of 28, a 3 × 5 array, double 8 and the difference between 20 and 7. Desktop supports pointer-lock mouse look, WASD, jump, place/remove and numbered hotbar keys. Touch devices receive drag-to-look, movement, jump and place/remove controls. Quest/inventory completion is stored locally. Prototype: [`site/games/blocksmith.html`](../../site/games/blocksmith.html).

## Production MVP boundary

Add collision/terrain physics, authored tutorials, saved player constructions, science/design build validators, accessibility alternatives to first-person navigation, richer original textures/audio and teacher evidence export. The prototype uses Three.js from a pinned CDN module; production should bundle and integrity-audit the engine.

## Risks and tests

- **Creativity becomes constrained worksheet:** test whether briefs allow multiple valid designs.
- **Building overwhelms objective:** compare explanation/transfer after build vs quiz-only control.
- **3D controls exclude learners:** provide tap-to-place 2.5D fallback and test motor/access needs.
- **Incorrect simulation teaches misconception:** educator/science review and explicit model limitations.
