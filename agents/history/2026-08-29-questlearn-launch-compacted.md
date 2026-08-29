# EduGames launch handoff

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
- Static EduGames portal, toolkit and three playable prototypes under `site/`.
- Twelve isolated component PNGs, eighteen responsive captures and four generated artwork sources under `docs/images/`.
- Node unit/content/site checks and GitHub Actions verification/deployment workflows.

## Verification

- `npm run test:all`: 44 tests pass; 104 local files pass the link check.
- `npm run screenshots`: 30 PNGs captured and key mobile/desktop/mining/onboarding/flight/active-quest/English-Land/Learn/short-landscape views visually reviewed.
- GitHub repository created at `https://github.com/fahimc/questlearn-uk`; Pages configured to deploy from Actions.

## EduGames portal and Netlify release

- Renamed the public experience to EduGames and rebuilt `site/index.html` as an original dark game-discovery portal with a compact subject rail, central search, category shelf, featured game and responsive game grid.
- The portal states ages 7–10, no adverts, no chats and no account needed in the first viewport. It does not use CrazyGames branding, copy or assets.
- Blocksmith Worlds is the first and featured game. Search and subject/category filters are functional across the three game cards.
- Generated an original EduGames block-mark and thumbnails for Blocksmith Worlds, Skybound Academy and Chronicle Keepers. Full PNG sources are in `docs/images/generated/`; compressed web derivatives are in `site/assets/edugames/`.
- Added `netlify.toml` with static publishing, security headers and immutable generated-asset caching.
- Netlify production project: `edugames-189`, project ID `14593ede-4f8c-438c-8e1b-662ae138de35`, public URL `https://edugames-189.netlify.app`.
- Disabled Netlify's injected public built-with badge at project level so the child-facing page stays free of promotional overlays.
- Added homepage content/ordering/filter/asset tests and responsive portal screenshots at 320×800, 768×1024, 1440×900 and 844×390.

## Blocksmith 3D vertical slice update

- Replaced the original isometric tile demo with a free-roaming Three.js first-person voxel island in `site/games/blocksmith.html` and `site/games/blocksmith.js`.
- Four labelled, regrowing resource patches now support digging and collection of moss, wood, stone and glass. Placing spends the selected material; removing unfinished blocks returns it; inventory persists locally.
- Six scattered maths beacons now progress through Years 3–5: fraction-of-quantity and arrays, perimeter and equivalent fractions, then cuboid volume and percentages. Validation inspects counts, material combinations and block geometry rather than accepting a detached answer.
- Quest language exposes the year, strand and age band in child-readable briefs. Feedback names the count, material or arrangement to change, following the research feedback ladder.
- Added desktop pointer-lock/WASD/place/remove/hotbar controls, mobile drag look/movement/action controls, local progress, pause and quest journal.
- Quest definitions and pure validation live in `site/games/blocksmith-quests.js`; ten focused Blocksmith tests contribute to a 26-test suite.
- Material counts, a dig action and responsive short-landscape overrides are covered by site checks. Desktop, mobile, mobile quest and 844 × 390 touch captures are stored under `docs/images/responsive/`.

## Mineable world update

- Replaced the decorative flat ground with a 41 × 41 instanced voxel surface. Every grass cell can be mined for moss; removing it reveals a separate stone block that can also be mined.
- Rebuilt scenery trees from individual collectible wood and leaf voxels. Surface rock clusters are collectible stone; renewable labelled piles remain available so a saved world cannot run out of quest materials.
- Natural terrain and tree damage persist in `blocksmith-v3-mined`; inventory and completed quests retain their existing storage keys.
- Added occupancy checks so placed blocks cannot overlap unmined natural blocks and filtered inactive terrain instances out of subsequent raycasts.
- Desktop controls now match the familiar block-game convention: left click mines and right click places. Touch keeps explicit mine, place and jump buttons.
- Browser interaction checks confirmed grass 12→13 with “Dug 1 moss block”, exposed stone 8→9 with “Dug 1 stone block”, and wood 9→10 with “Chopped 1 wood block”.
- Added a deterministic `?preview=mine` scene and `docs/images/responsive/blocksmith-mining-desktop.png` for visual regression evidence.
- Netlify production deploy `6a932971c6d91ad67b37a4ef` published the mineable world at `https://edugames-189.netlify.app/games/blocksmith.html`.

## Grid-layout correction

- Added `site/games/blocksmith-world-layout.js` as the single definition for integer world bounds, river and banks, spawn clearance, resource footprints/signs, trees and rock clusters.
- Quest beacons now occupy separate columns outside their build pads. The Timber Row Camp and Stone Storehouse pads moved completely clear of the river and bank columns.
- Replaced stretched two-cell banks and boundary hedges with one-cell repeated geometry. Resource signs now use explicit integer cells.
- Decorations consult the reservation map, so flowers cannot appear inside later-added resources or other fixtures. Runtime placement protects reserved columns and only permits blocks on the active quest's pad.
- Protected terrain under pads, paths, signs, spawn and fixed decorations cannot be mined into holes; old saved holes in newly protected columns are restored on load.
- Billboard labels now respect scene depth and a short visibility distance, preventing distant quest/resource labels from stacking through the world.
- The layout test asserts zero conflicting columns and integer coordinates for quest, resource, tree and rock fixtures.
- Netlify production deploy `6a932c7025f232e8b4e76122` published the grid correction and was visually checked at 1440 × 900.

## Persistent active-quest control

- Accepting a Blocksmith quest now reveals an always-available current-quest tile. Mobile shows a large quest-number icon and placed-block count; desktop also shows the full quest title.
- The tile's live progress and accessible label update whenever a quest block is placed or removed, and the tile disappears after successful completion.
- Tapping or clicking the tile reopens the complete brief. Its primary action changes to “Back to building”, preserving the active quest and all placed blocks instead of restarting it.
- Added deterministic 390 × 844 and 1280 × 720 active-quest baselines plus a static regression check. Local and production browser click-throughs verified accept → reopen → return.
- Netlify production deploy `6a93418208adfae8fbad1441` published the active-quest control at `https://edugames-189.netlify.app/games/blocksmith.html`.

## Physics, onboarding, flight and 20-question progression

- Reworked player height as an actual world-space foot position. `site/games/blocksmith-physics.js` applies gravity, jump velocity, landing and flight movement against the highest reachable voxel surface in the current column. Mining turf drops the player onto exposed stone; mining that stone drops them to bedrock.
- Added a four-step welcome/getting-started guide that swaps desktop and touch instructions. It covers movement, looking, mining, placing, material selection, beacons, jumping and flight, and is always reopenable from the HUD.
- Added desktop flight with F, Space to rise and Shift to descend. Touch has a dedicated Fly button; double-tapping Jump also toggles flight, and Jump rises while flight is active.
- Expanded the island from 41 × 41 to 65 × 65 and arranged twenty non-overlapping 6 × 6 quest pads, separate beacons, larger resource patches and revised scenery through the shared reservation map.
- Replaced six answer-revealing briefs with twenty Years 3–5 build questions spanning equal sharing, arrays, fractions, decimals, factor pairs, perimeter, area, percentages, volume and fraction towers. The question, journal, collection messages and pre-success feedback do not render internal solution counts.
- Added tower-height validation for equal towers and one-third/two-thirds tower pairs up to 24 blocks tall. Build placement now supports height 24 and flight makes tall construction practical.
- Added the child-facing question list and feedback policy in `docs/games/blocksmith-maths-quest-bank.md`, plus deterministic mobile welcome and flight captures.
- Local and production browser checks verified all four onboarding steps, reopening help, flight toggling, the hidden-answer question brief and accepted-quest tracking. Netlify deploy `6a9346d42536cbbcf0d0bb12` published the final update.

## Seeded terrain, learning support and English Land

- Expanded the world to 121 × 121 columns. `site/games/blocksmith-terrain.js` uses fixed-seed value noise for a predefined but uneven -1 to 4-height terrain; reservations and a one-cell ring around all quests remain level.
- Extended digging to layered ground down to bedrock with gravity support at each exposed block height. Terrain, fixtures, flowers and rune markers share integer columns and terrain-aware heights.
- Added `site/games/blocksmith-english-quests.js` with 10 Years 3–5 spelling, homophone, prefix, suffix and punctuation builds, taking the progression to 30 quests total.
- Added 298 deterministic buried letter/punctuation deposits in English Land. Glowing surface runes point to deposits without showing the symbol; mined symbols enter a persistent, responsive letter-stone tray and can be placed into ordered word lines.
- Every maths and English quest now has learner-controlled Learn and Hint support. Learn uses different examples to teach the method; failed checks do not automatically expose the hint or internal answer.
- Accepting a quest activates a pulsing perimeter, stronger pad glow and more obvious beacon bob. The persistent quest tile continues to reopen the brief.
- Added `docs/games/blocksmith-english-quest-bank.md`, updated the world and responsive documentation, and added English Land, mobile Learn and highlighted-pad screenshots.
- `npm run test:all` passes 44 tests and 104-file link validation; `npm run screenshots` captures 30 baselines. Desktop, 390 × 844 mobile and 844 × 390 short landscape were visually reviewed.
- Netlify production deploy `6a934dea0b60df96d21b87ab` is live at `https://edugames-189.netlify.app/games/blocksmith.html`; live checks returned 200 and confirmed the 30-quest journal, Learn/Hint markup, English quest bank and terrain seed module.

## Mobile inventory, hidden-symbol exploration and voxel wildlife

- Replaced Blocksmith's competing mobile hotbar, material pill and letter tray with one `▦` owned-block drawer. Its four-column portrait and eight-column short-landscape grids contain ordinary materials plus collected letters and punctuation; world movement pauses while the overlay is open.
- Rebuilt the top HUD as a compact flex row for home, inventory, quest journal, help and pause. The radar, current quest/check action, transient message and bottom touch controls occupy separate responsive safe zones. Text selection and touch callouts remain disabled on controls.
- Removed every buried-letter surface marker. The seeded allocator now distributes all 298 letter/punctuation deposits through twelve bands spanning the complete 121 × 121 world, with deposits hidden one, two or three blocks deep. Entering English Land shows a 5.6-second discovery message once per session.
- Increased reserved tree locations from 15 to 45 and decorative flower attempts from 90 to 210 without allowing scenery to overlap quest or fixture reservations.
- Added `site/games/blocksmith-animals.js` with twelve deterministic roaming voxel sheep, pigs, cows and chickens. Rendering remains in Three.js while pure movement state is independently tested.
- Added exact 341 × 772 narrow/mobile-inventory captures and a 1280 × 720 animal capture. `npm run screenshots` now produces 33 baselines; the narrow, active-quest, flight, short-landscape, English-message and animal views were visually inspected.
- `npm run test:all` passes 46 tests and validates 108 local files. Coverage includes whole-world/depth-balanced letters, 45-tree reservations, deterministic bounded animal movement, the drawer contract, hidden indicators and animal integration.
- Netlify production deploy `6a93576f25f232e13de76139` is live. Page, game module and animal module returned 200; a live 341 × 772 inventory capture matched the local baseline.

## English prompt answer-safety correction

- Removed longer target answers from every pre-success English quest title and prompt. E02 is now `Reason Bridge`, asking learners to infer a seven-letter conjunction from sentence context; E07 and E08 use age-appropriate vocabulary definitions, and E10 asks learners to derive a noun-forming suffix.
- Added a regression test that fails when any English target of four or more symbols appears in its title or prompt. `npm run test:all` passes 47 tests and the 108-file link check.
- Netlify deploy `6a93589a2ecfe64740cf728f` is live; the production quest module contains the new inference prompt and no longer contains `Because Bridge` or the answer-revealing sentence.

## Chromebook and tablet performance pass

- Added `site/games/blocksmith-performance.js`, a renderer-independent quality selector. ChromeOS, coarse-pointer devices, devices with four or fewer hardware threads and devices reporting 4 GB memory or less automatically use the low-power tier; `?quality=low|high` gives deterministic test overrides.
- Split the 121 × 121 procedural surface into 16 × 16 instanced terrain chunks and cull chunks outside the active draw radius. Trees, leaves, rocks, resource piles, flowers, hedges and riverbanks now use shared instance batches while individual mineable resources retain their inventory, persistence and renewable behaviour.
- Removed 30 quest PointLights, bounded desktop DPR at 1.35, reduced shadow cost, and configured the low tier for DPR 1, no antialiasing, no shadows, a 42-block draw distance and a 45 FPS target.
- Throttled radar, labels, nearest-quest detection and world visibility to 8 Hz; distant animals stop animating, overlays render at 20 FPS, and hidden tabs stop rendering. Surface collision now probes only the player's voxel column instead of scanning every natural and placed block each frame.
- Added a 1024 × 600 low-power tablet baseline at `docs/images/responsive/blocksmith-low-power-tablet.png` and documented the runtime path in the game, engine and responsive-layout notes.
- `npm run test:all` passes 49 tests and validates 110 local links. Syntax checks pass. Local and production low-tier runtime checks both report 57 draw calls and 74,340 triangles for the initial world view.
- Netlify production deploy `6a935bf9df6f2933a38b6c92` is live at `https://edugames-189.netlify.app/games/blocksmith.html`; the live module contains batching and no Three.js PointLights.

## Movement and frame-pacing correction

- Corrected the low-tier 45 FPS limiter: on a 60 Hz display it skipped alternate frames and effectively produced roughly 30 FPS. Active gameplay now renders on every animation frame and runs player movement/gravity in bounded fixed 60 Hz simulation substeps; dialogs retain a 20 FPS render limit.
- Reduced low-tier DPR from 1 to 0.85 and draw distance from 42 to 34 blocks. The initial low-tier scene now reports 42 draw calls and 65,060 triangles instead of 57 / 74,340.
- Made `#worldCanvas` focusable and explicitly restore focus after entering the world and closing quest, inventory, pause or journal panels. This fixes WASD and Space being ignored while a hidden welcome/panel button retained focus.
- Touch movement buttons capture their own pointers and clear held state on release, cancellation, focus loss or tab hiding. Jump, fly, dig and place execute on pointer-down so a second touch works while movement remains held.
- Hybrid touchscreen Chromebooks now expose the touch HUD even when their trackpad reports a fine pointer; the inventory drawer replaces the hotbar/letter strip in that mode.
- Real-browser local and production checks verified welcome → canvas focus, keyboard movement, touch-held movement, a 0.9-block jump and landing. The live low tier sustained 60 FPS in the test browser at 42 calls / 65,060 triangles with no console warnings or errors.
- `npm run test:all` passes 50 tests and validates 110 links. `npm run screenshots` rebuilt 34 baselines, including the 1024 × 600 low-power touch-tablet capture.
- Netlify production deploy `6a9360f26fded0651c88bd6e` is live at `https://edugames-189.netlify.app/games/blocksmith.html`.

## Constraints and follow-ups

- This is a product/research prototype, not a certified curriculum, legal opinion, completed DPIA or production safeguarding assessment.
- Blocksmith is a functional Three.js vertical slice; Skybound and Chronicle remain lightweight interaction prototypes. Production engine/device validation is still required.
- Before classroom pilots: nation-specific qualified educator review, content item bank expansion, real-device/accessibility testing, DPIA and safeguarding/threat review.

## Resume point

The corrected Chromebook/tablet build is live on Netlify with 50 passing tests, 110 validated links and 34 visual baselines. Production browser checks confirm movement, jump, 60 FPS and 42 calls / 65,060 triangles on the low tier while mining, building, procedural terrain, quests and animals remain enabled. Next product phase is physical Chromebook/tablet heat and sustained frame-time profiling, horizontal voxel/animal collision, saved constructions and teacher evidence export.
