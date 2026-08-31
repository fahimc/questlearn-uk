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
- **English:** spelling patterns, statutory words, homophones, prefixes, suffixes and punctuation assembled from mined letter stones.
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

The browser prototype is a free-roaming first-person 3D voxel world split into Numberland and English Land. The learner can mine the turf for moss, dig through multiple exposed layers, fall into excavated holes, chop voxel trees for wood, clear leaves and harvest glass crystals. Hidden stone blocks carrying letters or punctuation are distributed across the whole world at one, two and three blocks deep, with no surface indicator. Entering English Land shows one short, auto-dismissing discovery message explaining that digging reveals them. Natural changes and collected symbols persist on the device. Colour-coded resource piles still regrow so exploration or a mistake cannot permanently block progress. Placing a block spends that material or symbol; removing an unfinished block returns it.

The terrain is procedural but predefined: a fixed seed and value-noise height function produce the same uneven Minecraft-like hills on every fresh load. Terrain ranges across several block heights while all reserved fixtures and a one-tile ring around every quest remain level. The world layout uses one integer-column reservation map. River tiles, one-cell banks, quest pads, beacons, resource patches and signs, 45 trees, rocks, boundary hedges and the spawn area are allocated before 210 seeded flower attempts and buried letters are added. Decorations use their column's terrain height. Twelve original voxel farm animals—sheep, pigs, cows and chickens—roam deterministic loops around their own spawn areas. A validation test fails if two fixtures claim the same column. Quest beacons sit outside their pads, and only the active quest may place blocks on its reserved pad.

The prototype has a low-power rendering path for Chromebooks, tablets and constrained devices. The deterministic terrain is split into 16 × 16 instance chunks and culled outside the active draw radius. Trees, leaves, rocks, resource piles, flowers, hedges and riverbanks are rendered in shared instance batches instead of hundreds of separate draw calls, while individual blocks remain mineable and renewable. The low tier caps device pixel ratio at 0.85, uses a 34-block draw distance, disables antialiasing and shadows, and follows the display refresh up to a 60 FPS target. Movement and gravity run in fixed 60 Hz simulation steps so a slow render frame does not slow the player. DOM, radar, labels and chunk visibility update at a slower cadence than the movement loop; rendering falls to 20 FPS behind an open dialog and pauses in a hidden tab. A low-tier browser capture reports 42 draw calls and 65,060 triangles for the initial world view. `?quality=low` and `?quality=high` provide deterministic test overrides.

The welcome screen now lets a learner select Year 3, Year 4 or Year 5 and English, Maths or Science. Each selection creates a 20-beacon expedition with four questions from each of five difficulty levels. Five deterministic expeditions consume all 100 reviewed questions in that Year/subject scope without repeating a source question, so Blocksmith can use the same 900-question registry as LexiClimb and Skybound. The shared source and review notes are documented in the [Year 3](../research/question-banks/year-3.md), [Year 4](../research/question-banks/year-4.md) and [Year 5](../research/question-banks/year-5.md) bank files.

Every multiple-choice question becomes a physical answer-block task. Its four shuffled options are mapped visibly to moss, wood, stone and glass; the learner works out the answer, mines the corresponding material and places exactly one block inside the active pad. This supports all Maths, Science and English knowledge questions without turning the world into a detached overlay quiz. Curriculum spelling questions keep the deeper interaction: letters are hidden underground and must be arranged in one straight reading line. Quest completion is stored separately for each Year, subject and expedition, while collected materials and excavations remain shared across the world.

A learner reads a short question, collects the needed block, builds inside the active pad and asks the game to check the actual material or symbol sequence. The accepted quest gains a bright pulsing boundary and its beacon bobs more strongly so the build site is unmistakable. The journal shows the selected scope and progress out of 20. Correct builds remain as monuments and award a balanced material bundle for free building. The original authored construction progression remains documented in [`blocksmith-maths-quest-bank.md`](blocksmith-maths-quest-bank.md) and [`blocksmith-english-quest-bank.md`](blocksmith-english-quest-bank.md); it is retained as a validator reference while the playable route uses the deeper shared bank.

Every quest includes **Learn this** and **Show a hint** controls. Learn explains the transferable concept with different worked examples; Hint gives a smaller cue about the current task. Neither is forced open, and failed checks point back to support without automatically showing it.

After a quest is accepted, a persistent current-quest tile stays visible on mobile and desktop. It shows the quest number and live placed-block count; tapping it reopens the complete child-friendly brief without losing or restarting build progress.

| Selection | Curriculum progression | Physical evidence |
|---|---|---|
| Year 3, ages 7–8 | Foundational lower-Key-Stage-2 English, Maths or Science | One material answer block, or an ordered mined-letter line |
| Year 4, ages 8–9 | Broader application, vocabulary and reasoning in the selected subject | One material answer block, or an ordered mined-letter line |
| Year 5, ages 9–10 | Upper-Key-Stage-2 concepts, evidence and multi-step reasoning | One material answer block, or an ordered mined-letter line |

This sequence follows the research in [`docs/research/england-years-3-5.md`](../research/england-years-3-5.md): Year 3 uses simple fractions and multiplication representations plus lower-Key-Stage-2 spelling and punctuation; Year 4 applies perimeter, fractions, homophones and word structure; and Year 5 applies volume, percentages and upper-Key-Stage-2 spelling patterns. It also follows the project feedback ladder: the game describes the observable mismatch and allows immediate revision instead of giving only correct/incorrect effects.

Desktop supports pointer-lock mouse look, WASD, gravity, jump, place/dig, numbered hotbar keys and optional flight with F, Space to rise and Shift to descend. The canvas receives keyboard focus whenever gameplay resumes, so completing the welcome guide or closing a panel cannot strand movement on a hidden button. Touch devices receive drag-to-look, movement, jump, place, dig and a dedicated flight toggle; double-tapping jump also toggles flight. Movement buttons capture their own pointer while held, and jump fires on pointer-down so a second finger can jump without releasing movement. Hybrid touchscreen Chromebooks expose the touch HUD even when a trackpad is also present. On mobile, one drawer button pauses movement and opens all owned materials, letters and punctuation in a responsive grid, replacing the overlapping hotbar and letter strip. Players fall into mined holes and can jump or fly back out. A four-step device-aware welcome guide explains movement, looking, mining, placing, materials, beacons, jumping and flight, and can be reopened from the HUD. Material inventory and quest completion are stored locally. Prototype: [`site/games/blocksmith.html`](../../site/games/blocksmith.html).

## Production MVP boundary

Add full body collision, saved player constructions, science/design build validators, accessibility alternatives to first-person navigation, richer original textures/audio and teacher evidence export. The prototype uses Three.js from a pinned CDN module; production should bundle and integrity-audit the engine.

## Risks and tests

- **Creativity becomes constrained worksheet:** test whether briefs allow multiple valid designs.
- **Building overwhelms objective:** compare explanation/transfer after build vs quiz-only control.
- **3D controls exclude learners:** provide tap-to-place 2.5D fallback and test motor/access needs.
- **Incorrect simulation teaches misconception:** educator/science review and explicit model limitations.
