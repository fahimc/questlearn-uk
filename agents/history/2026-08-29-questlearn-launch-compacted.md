# QuestLearn UK launch handoff

## Purpose

Research UK curricula for ages 7–10 and deliver a GitHub-hosted blueprint/toolkit with three educational game plans, shared architecture, responsive component library, playable prototypes, tests and visual evidence.

## Confirmed requirements and decisions

- Education is devolved; England Years 3–5 is the detailed baseline while Wales, Scotland and Northern Ireland map through jurisdiction-neutral skill nodes.
- Product separates game runtimes from a shared challenge/evidence learning contract.
- Original concepts: 3D voxel-style Blocksmith Worlds, 3D obby-style Skybound Academy and 2D narrative Chronicle Keepers.
- Child-first boundary: no adverts, loot boxes, open chat, public child leaderboards, streak loss or privacy-reducing nudges.
- Mobile-first semantic DOM learning UI, with Phaser/Babylon.js as production candidates; dependency-free HTML/Canvas prototypes for this release.

## Completed

- Referenced curriculum, learning evidence, privacy and inclusion research under `docs/research/`.
- Platform, learning engine, game engine, safety and content schema under `docs/architecture/`.
- Three detailed game plans under `docs/games/`.
- Design system, reusable components and responsive scenarios under `docs/design/`.
- Static toolkit and three playable prototypes under `site/`.
- Twelve isolated component PNGs and six responsive captures under `docs/images/`.
- Node unit/content/site checks and GitHub Actions verification/deployment workflows.

## Verification

- `npm run test:all`: 13 tests pass; local link check passes.
- `npm run screenshots`: 18 PNGs captured and key mobile/desktop/short-landscape views visually reviewed.

## Constraints and follow-ups

- This is a product/research prototype, not a certified curriculum, legal opinion, completed DPIA or production safeguarding assessment.
- The 3D plans are represented by lightweight interaction prototypes; production engine choice needs low-end device spikes.
- Before classroom pilots: nation-specific qualified educator review, content item bank expansion, real-device/accessibility testing, DPIA and safeguarding/threat review.

## Resume point

Check GitHub Actions Pages deployment and live smoke test. Next product phase is a production vertical slice of one Blocksmith mission plus educator authoring/reporting, not more disconnected mini-games.

