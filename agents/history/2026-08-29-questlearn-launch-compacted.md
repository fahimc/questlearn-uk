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

- `npm run test:all`: 26 tests pass; local link check passes.
- `npm run screenshots`: 21 PNGs captured and key mobile/desktop/short-landscape views visually reviewed.
- GitHub repository created at `https://github.com/fahimc/questlearn-uk`; Pages configured to deploy from Actions.

## Blocksmith 3D vertical slice update

- Replaced the original isometric tile demo with a free-roaming Three.js first-person voxel island in `site/games/blocksmith.html` and `site/games/blocksmith.js`.
- Four labelled, regrowing resource patches now support digging and collection of moss, wood, stone and glass. Placing spends the selected material; removing unfinished blocks returns it; inventory persists locally.
- Six scattered maths beacons now progress through Years 3–5: fraction-of-quantity and arrays, perimeter and equivalent fractions, then cuboid volume and percentages. Validation inspects counts, material combinations and block geometry rather than accepting a detached answer.
- Quest language exposes the year, strand and age band in child-readable briefs. Feedback names the count, material or arrangement to change, following the research feedback ladder.
- Added desktop pointer-lock/WASD/place/remove/hotbar controls, mobile drag look/movement/action controls, local progress, pause and quest journal.
- Quest definitions and pure validation live in `site/games/blocksmith-quests.js`; ten focused Blocksmith tests contribute to a 26-test suite.
- Material counts, a dig action and responsive short-landscape overrides are covered by site checks. Desktop, mobile, mobile quest and 844 × 390 touch captures are stored under `docs/images/responsive/`.

## Constraints and follow-ups

- This is a product/research prototype, not a certified curriculum, legal opinion, completed DPIA or production safeguarding assessment.
- Blocksmith is a functional Three.js vertical slice; Skybound and Chronicle remain lightweight interaction prototypes. Production engine/device validation is still required.
- Before classroom pilots: nation-specific qualified educator review, content item bank expansion, real-device/accessibility testing, DPIA and safeguarding/threat review.

## Resume point

Verify the updated Pages deployment and live Blocksmith module. Next product phase is player/world collision, saved constructions and teacher evidence export rather than more disconnected mini-games.
