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
- GitHub repository created at `https://github.com/fahimc/questlearn-uk`; Pages configured to deploy from Actions.

## Blocksmith 3D vertical slice update

- Replaced the original isometric tile demo with a free-roaming Three.js first-person voxel island in `site/games/blocksmith.html` and `site/games/blocksmith.js`.
- Six scattered maths beacons now open build quests. Quest-pad blocks are free; the actual placed count is validated, and success awards permanent creative inventory.
- Added desktop pointer-lock/WASD/place/remove/hotbar controls, mobile drag look/movement/action controls, local progress, pause and quest journal.
- Quest definitions and pure validation live in `site/games/blocksmith-quests.js`; five focused tests raise the suite total to 18.
- Added desktop world and mobile quest screenshots; visual baseline total is now 20.

## Constraints and follow-ups

- This is a product/research prototype, not a certified curriculum, legal opinion, completed DPIA or production safeguarding assessment.
- Blocksmith is a functional Three.js vertical slice; Skybound and Chronicle remain lightweight interaction prototypes. Production engine/device validation is still required.
- Before classroom pilots: nation-specific qualified educator review, content item bank expansion, real-device/accessibility testing, DPIA and safeguarding/threat review.

## Resume point

Verify the updated Pages deployment and live Blocksmith module. Next product phase is collision/terrain physics, persistent builds and teacher evidence export for Blocksmith rather than more disconnected mini-games.
