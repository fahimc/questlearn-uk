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

## Solid streamed underground correction

- Replaced the thin one-column reveal behaviour with a deterministic implicit voxel volume extending from each terrain surface to bedrock at Y=-48. Mining any surface or underground block now exposes the block below and the four surrounding tunnel walls, so shafts and tunnels no longer open into a hollow world.
- Added `site/games/blocksmith-underground.js` as the renderer-independent underground model. It owns voxel adjacency, surface/bedrock bounds, mined-cell exclusion and deterministic letter-stone substitution.
- Existing saved excavations are hydrated on load by rebuilding only their exposed boundary. The complete hidden underground volume is never instantiated.
- Exposed ordinary stone uses growable 1,024-instance render pages. A deep shaft adds instance data to a shared draw call rather than creating one Three.js mesh/draw call for every wall block; letter stones remain individually textured and collectible.
- Added two-block-high tunnel collision while the player is below a mined surface, preventing walking through unmined underground walls while preserving the existing above-ground step movement.
- Added a deterministic `?preview=underground&quality=low` validation scene. Desktop and phone-sized browser checks showed an enclosed three-block shaft, no console warnings, 60 FPS desktop / 56 FPS during the phone capture, and 44 calls in the phone-sized low-tier scene.
- `npm run test:all` passes 53 tests and validates 111 local files. New unit coverage verifies 48-block-deep solid terrain, six-sided excavation boundaries, mined-cell air and buried letter replacement.
- GitHub commit `37f00c8` and Netlify production deploy `6a93eda6a7bc0bbe2377da3d` published the correction. The live underground validation scene reached a steady 60 FPS at 66 calls / 65,354 triangles with no console warnings or errors.

## Skybound glass-bridge obby

- Replaced the flat Skybound canvas prototype with a full-screen third-person Three.js obby. An original block avatar crosses ten continuous left/right glass bridges above the clouds, with a safe checkpoint platform after every bridge.
- Each bridge presents one Years 3–5 maths question and renders its two options directly above the left and right glass tiles. Landing on the correct tile keeps it solid and unlocks the next checkpoint; a wrong tile turns red, drops away, and respawns the avatar at the current checkpoint.
- Added `site/games/skybound-engine.js` as the deterministic renderer-independent authority for lane allocation, answer outcomes, retries, checkpoint progression and completion. `site/games/skybound-questions.js` contains ten curriculum-linked questions covering multiplication, division, fractions, perimeter, decimals, factor pairs, percentages and volume, each with Learn, Hint and success teaching.
- Added fixed-step movement, gravity and jumping, a follow camera, animated block-character limbs, WASD/arrow/Space input, multi-touch direction and Jump controls, pause/help/welcome/completion overlays, local best-checkpoint storage, and retry-safe post-answer falls.
- Static checkpoints, posts, crowns, rings and cloud clusters use instancing. Stateful glass remains individually animated. The low-power profile renders the initial scene at 57 calls and sustains 60 FPS in the browser check.
- Added desktop, 390 × 844 mobile, Learn, and 844 × 390 short-landscape visual baselines. Browser checks confirmed start/focus, jump/landing, wrong-tile collapse and attempt-2 respawn, correct-tile safety, support content, responsive layouts and zero console errors.
- `npm run test:all` passes 61 tests and validates 118 local files. The home page now marks Skybound as playable rather than a prototype.
- GitHub commit `f54f49d` and Netlify production deploy `6a94127159eebdb51b393df7` published the game. The live wrong-tile check fell, restored attempt 2 at checkpoint 1, and sustained 60 FPS at 57 calls with no console warnings or errors.

## Skybound camera-relative controls correction

- Corrected Skybound's horizontal movement mapping for its positive-Z follow camera. On-screen Left now moves left and on-screen Right moves right for arrow keys, A/D and touch controls.
- Centralised the camera-relative direction calculation in `site/games/skybound-engine.js` and added a regression test covering left, right, forward and normalised diagonal input.
- `npm run test:all` passes 62 tests and validates 118 local files.
- GitHub commit `7b0d4e0` and Netlify production deploy `6a943a1b5e4367a3ce1076f7` published the correction.

## Skybound orbit camera controls

- Replaced the fixed follow view with a pitch-limited third-person orbit camera. Mouse/trackpad drag and Q/E rotate it on desktop; swiping the unobstructed world rotates it on touch devices.
- Player movement is transformed using the camera's actual rendered facing direction, so WASD, arrows and the touch direction pad remain screen-relative while the orbit camera is still smoothing into its new position.
- Updated the welcome/help instructions and accessible canvas label. `npm run test:all` passes 63 tests and validates 118 local files; the new regression rotates movement through a quarter-turn camera view.
- The in-app browser test connection failed before page setup, so pointer-drag runtime validation still needs a physical desktop/touch pass; syntax, static integration and renderer-independent camera movement tests passed.
- GitHub commit `ff8c9e2` and Netlify production deploy `6a9459cfeb01f7fc63226163` published the orbit controls. Live page, game module and movement engine returned 200 and contained the new camera paths.

## Skybound multi-touch repeat jumping

- Replaced shared touch booleans with a pointer-ID action map. A direction finger remains held while a separate finger presses and releases Jump repeatedly; releasing one control only clears its own action.
- Added a deterministic 200 ms jump buffer with a short coyote window. Each press creates a new request, presses just before landing are no longer discarded, and the buffer resets on pause, blur or respawn.
- Added engine and integration regressions for three successive jump requests, pre-landing buffering and per-pointer touch tracking. `npm run test:all` passes 64 tests and validates 118 local files.
- GitHub commit `919dcb2` and Netlify production deploy `6a946116eb01f71d7a226157` published the fix. The live page, game module and engine returned 200 and contained both new paths.

## Skybound analogue movement stick

- Replaced the four-button touch D-pad with a circular virtual analogue stick. It captures its own pointer independently from Jump, supports all 360-degree directions, includes a centre dead zone and exposes proportional movement speed from centre to rim.
- Extended the renderer-independent movement engine to retain partial stick magnitude while still normalising combined/diagonal input and rotating it relative to the rendered camera view. Keyboard controls remain unchanged.
- Updated touch onboarding and `docs/games/skybound-academy.md`. Refreshed and visually reviewed the 390 × 844 portrait and 844 × 390 short-landscape baselines; the stick and Jump control stay inside their safe zones without covering learning or bridge content.
- `npm run test:all` passes 65 tests and validates 118 local files. Coverage includes dead-zone rest, half-speed travel, full-speed circular clamping and diagonal camera-relative movement.
- GitHub commit `524bc85` and Netlify production deploy `6a94634fc8c5e8ad338e05cf` published the control. Live page, input module and movement engine returned 200 with stick markup, pointer tracking and proportional movement.

## Skybound procedural audio

- Added `site/games/skybound-audio.js`, a file-free Web Audio layer. A reusable deterministic noise buffer creates quiet filtered cloud wind plus landing and glass textures; short oscillator envelopes provide start, jump, safe-answer, checkpoint, respawn and completion cues.
- Audio unlocks only after player interaction, ambience fades while paused/hidden, and the HUD speaker button or M key controls a device-local mute preference. No remote or copyrighted audio assets were added.
- Integrated cues with actual physics and progression events rather than button presses, so buffered jumps sound when launched and landings/answers/checkpoints sound when resolved.
- Added four audio unit tests and static integration coverage, including a fake Web Audio graph that schedules every cue. `npm run test:all` passes 69 tests and validates 120 local files.
- Refreshed and visually reviewed the 390 × 844 and 844 × 390 Skybound baselines; compact mobile HUD sizing keeps the new speaker control clear of the learning card and other controls.
- GitHub commit `bba9b5c` and Netlify production deploy `6a949a2f07e78cd2d13b806e` published the audio layer. Live page, game module and audio module returned 200 with the toggle, event cues and wind path.

## Skybound glass-edge collision correction

- Replaced the inset point-based landing check, which made a hidden 0.12-block border around every tile, with exact circle-versus-rectangle overlap using the avatar's 0.30-block foot radius.
- Every visible outer and inner tile edge now accepts genuine foot contact. The two answer tiles retain a 0.10-block unsafe centre gap, broken tiles remain non-solid, and diagonal corner misses do not land.
- Added renderer-independent edge, overlap, centre-gap, broken-tile and corner regressions. `npm run test:all` passes 70 tests and validates 120 local files.
- GitHub commit `2a7cc84` and Netlify production deploy `6a949dc7af4b5c78e3e023ad` published the collision correction. Live game and engine modules returned 200 with the footprint helper, radius and circle intersection.

## Skybound completion sharing

- Added a Share achievement action to the final ten-bridge completion dialog. Supported phones and tablets open their native share sheet; other browsers copy the public game link to the clipboard and announce the outcome in the dialog.
- The renderer-independent share payload contains only a fixed achievement message and the canonical Skybound URL. Query strings and fragments are stripped, and learner identity, answers, checkpoint state and saved progress are never included.
- Added responsive completion actions that stack at narrow portrait widths and remain side by side in short landscape. Disposable 390 × 844 and 844 × 390 browser captures were visually reviewed with no clipping or overlap.
- `npm run test:all` passes 71 tests and validates 120 local files. New coverage verifies the exact public payload, canonical URL handling, native sharing markup and clipboard fallback integration.
- GitHub commit `5667fc2` and Netlify production deploy `6a949fd955a649f678e5dd5c` published the feature. Production HTML, game module and engine returned 200 with the share button, privacy copy, native-share path, clipboard fallback and canonical payload helper.

## LexiClimb Tower English obby

- Replaced Chronicle as the active third homepage game with LexiClimb Tower, an original third-person Three.js obby inspired by the broad long-course structure of bright floating browser parkour games without copying branding, assets, layouts or code. Chronicle remains available as an archived earlier concept.
- Built six continuous rising course sections with eight obstacles each, seven checkpoint platforms and six physical brick word walls. The obstacle plans vary stepping stones, narrow beams, alternating jumps and rising paths; falling returns the player to the latest reached checkpoint.
- Added `site/games/wordwall-engine.js` for deterministic checkpoint, answer, retry, completion and share state, plus `site/games/wordwall-challenges.js` with six Years 3–5 gates spanning missing-letter spelling, letter-tile spelling, vocabulary, homophones, punctuation and prefixes. Every item includes a curriculum objective ID, Learn support, Hint support and success teaching.
- Reused Skybound's camera-relative movement, analogue vector, buffered jumping, footprint collision, orbit camera, low-power quality selector and procedural audio. The independent joystick and Jump pointers support simultaneous movement and repeated jumping on touch.
- Added an original generated LexiClimb source cover and a 960 × 540 WebP portal derivative. The portal tile is playable and searchable under English/creative categories.
- Added four saved baselines: 390 × 844 course, 1280 × 720 course, 390 × 844 English gate and 844 × 390 English gate. Visual review found no clipping or control overlap. The optional scripted browser automation bridge failed to initialise, so runtime interaction automation remains a follow-up; deterministic rules, static integration, syntax and live WebGL rendering passed.
- `npm run test:all` passes 80 tests and validates 133 local files; `npm run screenshots` captures 41 baselines. GitHub commit `91b7ca2` and Netlify production deploy `6a94a612af4b5cacf6e023ab` published the game. Production portal, game, game module, engine, challenge bank and artwork all returned 200 with six gates, wall-collapse, analogue and Learn paths present.

## Shared obby orbit-facing correction

- Skybound Academy and LexiClimb Tower now orient their avatars from the orbit camera's forward heading on every fixed simulation step, including while the player is standing still. Forward, reverse and strafing movement remain camera-relative.
- Added the renderer-independent `getOrbitFacingYaw` helper to the shared Skybound engine and removed velocity-based avatar turning from both game controllers.
- Updated both welcome/help screens so learners know that dragging, swiping or Q/E turns the view and their character.
- Added a deterministic quarter-turn preview and regressions for idle orientation plus both game integrations. Browser captures at 1280 × 720 visually confirmed the avatars facing the rotated route with intact HUD/course framing.
- `npm run test:all` passes 81 tests and validates 133 local files. GitHub commit `cef9ac1` and Netlify production deploy `6a94a90ad8a901608db3284b` published the correction; both production pages, controllers and shared engine returned 200 with the new orientation path.

## LexiClimb solid word-wall correction

- Replaced the one-way Z-threshold gate check with the renderer-independent `resolveWordwallGateMovement` volume resolver. Closed gates now block the avatar radius across their complete width, depth and height from front, back, sides, edges and diagonal approaches.
- Collision resolves X and Z independently and zeros only the blocked velocity, allowing natural sliding without tunnelling. A gate releases collision only when its answer is correct and its falling animation begins.
- Rebuilt alternating brick rows so every row visibly spans the same seven-unit checkpoint width; the wall no longer has misleading side notches.
- A deterministic `?preview=wall&quality=low` browser scene drove the avatar continuously into the first gate and visually confirmed it stopped flush at the continuous wall. `npm run test:all` passes 82 tests and validates 133 local files.
- GitHub commit `7f90470` and Netlify production deploy `6a94ab4f26f95b6909e9646f` published the fix. The production page, controller and collision engine returned 200 with the new paths.

## LexiClimb spiral-tower redesign

- Replaced the straight +Z corridor with a deterministic one-and-a-half-turn helix around a central tower. Each of six sections advances 90 degrees, rises four world units and retains its eight-obstacle difficulty pattern; seven checkpoint platforms and six word walls now rotate with the route.
- Added `WORDWALL_SPIRAL`, `getWordwallSpiralPose` and rotated footprint/collider transforms to `site/games/wordwall-engine.js`. Platform meshes, landing footprints, gate meshes and solid gate collision now consume the same position/yaw model.
- Added a vertical support ceiling to the controller so an upper checkpoint that overlaps a lower turn in X/Z cannot teleport a player upward. Falling can still land naturally on a lower visible platform.
- Re-centred the translucent tower core and level bands, distributed clouds around the tower, aimed the initial camera along the first curve, made respawns checkpoint-local and retained free orbital control.
- Updated onboarding, homepage copy, architecture/game docs and the reusable screenshot job. Refreshed four LexiClimb responsive baselines and added the 1280 × 720 spiral overview, bringing the saved baseline count to 42.
- Browser review covered the whole-tower overview, ground-level desktop, 390 × 844 phone, rotated solid wall, 390 × 844 challenge and 844 × 390 challenge. The initial review caught and corrected upper/lower support ambiguity; the final views had no HUD clipping or unexpected teleport.
- `npm run test:all` passes 85 tests and validates 134 local files. GitHub commit `e81e3be` and Netlify production deploy `6a94aedb1e39ad5d732565af` published the redesign; the production homepage, game, controller and engine returned 200 with spiral markers.

## LexiClimb shapes, coins and skins

- Replaced the box-only obstacle rhythm with collision-accurate boxes, circles and triangles at varied widths and depths. The renderer and `isWordwallFootprintOnSupport` share the same rotated shape data, including avatar-radius edge contact.
- Added five deterministic coins to each of the six sections. Stable renderer-independent IDs make all 30 rewards one-time claims; a single dynamic `InstancedMesh` renders and animates them without adding a draw call per coin.
- Added a versioned local profile for validated balances, collected IDs, owned skins and the equipped skin. Candy Climber is free; Ocean Explorer, Solar Sprinter and Galaxy Hero cost 5, 9 and 14 coins. Purchases cannot overdraw, buying equips, and owned skins can be re-equipped freely.
- Added a compact HUD balance, coin/purchase audio cues and a responsive in-game character shop. The shop pauses traversal and ambience, clearly labels buy/owned/equipped states, and states that progress stays on the device.
- Browser review covered a 1280 × 720 spiral overview, 390 × 844 gameplay/coin claim, 390 × 844 shop and 844 × 390 shop. The narrow HUD, modal, controls and course remained unclipped; the live coin check awarded exactly one and showed the updated balance/toast.
- `npm run test:all` passes 89 tests and validates 137 local files; `npm run screenshots` captures 44 baselines. GitHub commit `4b85255` and Netlify production deploy `6a94b496eb01f7d32e226155` published the feature. Production homepage, HTML, controller, economy engine and shop stylesheet returned 200 with their expected markers, and the live mobile shop matched the local review.

## LexiClimb solid buffered-shape correction

- Added renderer-independent shape sizing before mesh/collider creation. Minimum safe-centre radii are 0.75 for boxes, 0.90 for circles and 1.05 for triangles; undersized authored shapes scale up automatically, so the smallest triangles now fit the avatar with visible margin.
- Added a 0.48-radius player body resolver for the complete side volumes of rotated boxes, circles and triangles. Axis-separated resolution blocks entry and preserves sliding while ignoring a platform the player is already standing above.
- Added underside collision so upward jumps stop at a platform base instead of passing through it. Existing top-face landing, edge tolerance and multi-level support ceilings remain intact.
- Refreshed the mobile, desktop and whole-tower baselines. Local and production 390 × 844 captures showed the enlarged first-course triangle and intact HUD/control framing.
- `npm run test:all` passes 93 tests and validates 137 local files. GitHub commit `dbc51d6` and Netlify production deploy `6a9570d517fd480c20bedad2` published the correction; the live controller and engine returned 200 with buffered sizing, side collision and underside collision markers.

## Constraints and follow-ups

- This is a product/research prototype, not a certified curriculum, legal opinion, completed DPIA or production safeguarding assessment.
- Blocksmith and Skybound are functional Three.js vertical slices; Chronicle remains a lightweight interaction prototype. Production engine/device validation is still required.
- Before classroom pilots: nation-specific qualified educator review, content item bank expansion, real-device/accessibility testing, DPIA and safeguarding/threat review.

## Resume point

EduGames now has three active Three.js games on Netlify and GitHub: Blocksmith Worlds, Skybound Academy and LexiClimb Tower. The repository has 93 passing tests, 137 validated local files and 44 saved visual baselines. LexiClimb supplies the English movement/mastery route as a six-section spiral tower with buffered, fully solid box/circle/triangle supports, 30 locally saved collectible coins, four character skins and fully solid rotated checkpoint word walls; Skybound supplies ten physical-answer maths bridges; Blocksmith supplies the open voxel build-and-language world. All three use mobile-first controls and local/private progress boundaries, and Skybound/LexiClimb provide privacy-safe completion sharing. Both obby avatars turn with their orbit camera even while idle. Physical Chromebook/tablet heat and full interaction testing remain follow-ups, along with a motor-assist option, animal collision and saved constructions for Blocksmith, expanded educator-reviewed item banks and teacher evidence export.

## LexiClimb curriculum worlds and 100-question bank

- Added a validated 100-item Years 3–5 bank: 34 Maths, 33 Science and 33 English questions. Each item includes stable curriculum metadata, five-level difficulty, answerable choices or exact spelling tiles, separate Learn/Hint support and success teaching.
- Added deterministic hybrid generation. Maths produces fresh seeded operands for addition, tables, equivalent fractions, area and percentages; Science and English rotate only through authored fact/language pools and deterministically shuffle choices or spelling tiles. Forty generated sets per subject are regression-tested for stability, progression and answerability.
- LexiClimb now offers three selectable themed worlds: Word Quest, Number Nebula and Discovery Canopy. Every world is one continuous five-level spiral with the same traversal count, Level 1–5 physical flags, five curriculum gates and a rising Year 3 → Year 5 question route.
- Rebalanced collectible placement to six coins per level, preserving 30 per world. Coin IDs include world/set scope, replay advances the question-set seed, and completion sharing names the selected world while excluding learner state.
- Updated the homepage subject filters, mobile/short-landscape onboarding, game/engine/question-bank documentation and visual baseline index. New 390 × 844 and 844 × 390 world-selector captures plus themed Maths/Science/English course and challenge captures were visually reviewed without clipping or overlap.
- `npm run test:all` passes 97 tests and validates 144 local links/files. GitHub commit `25e359b` and Netlify production deploy `6a958417ce55f035cfd494db` published the release. Production returned 200 for the homepage, Wordwall HTML, 100-question module and world-definition module; the live HTML exposes all three choices.

## Updated resume point

EduGames now has a reusable cross-subject curriculum content layer and LexiClimb is no longer English-only. The active game at `https://edugames-189.netlify.app/games/wordwall.html` defaults to Word Quest and accepts `?world=maths` or `?world=science`; `set` selects a deterministic question route. The repository has 97 passing tests, 144 validated local files and 46 saved visual baselines. The next high-value product work is educator review/versioning of the bank, misconception tagging and evidence capture, followed by motor-assist and physical Chromebook/tablet testing.

## LexiClimb ten-question levels

- Corrected the learning model so each of the five physical levels contains a ten-question round rather than one question. Each world now requires 50 correct answers; answers 1–9 advance inside the same open challenge dialog and keep the wall solid, while answer 10 completes the level and collapses its wall.
- Added deterministic `createLevelQuestionSet` generation and grouped world content into five validated level bundles. Every generated question in a bundle retains the matching Level 1–5 curriculum difficulty, and a new `set` seed creates another reproducible 50-question world.
- Added renderer-independent question index, within-level and total-correct state. The objective HUD and challenge card show `Question X of 10`; completion and privacy-safe share copy state all 50 questions.
- Updated onboarding, responsive guidance, architecture and game documentation. Refreshed phone and 844 × 390 challenge/world-selector baselines; visual review confirmed the counter and all choices/Learn/Hint actions remain unclipped.
- `npm run test:all` passes 98 tests and validates 144 local links/files. Regression coverage proves wrong answers preserve the current question, questions 1–9 do not unlock a wall, question 10 does, and all 50 complete the world.
- GitHub commit `9d4bf93` and Netlify production deploy `6a95875d86ad817a251188d2` published the correction. Production returned 200 and exposes the ten-per-level constant, per-question state and `Question 1 of 10` UI marker.

## Latest resume point

LexiClimb has three subject worlds with five continuous physical levels and ten curriculum questions at every level. The wall is a level boundary, not a one-question boundary. Future progression changes must preserve the five-level/50-question distinction and the Level 1–5 difficulty grouping. The repository has 98 passing tests and 144 validated local links/files. The live game is `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb five-wall rainbow circuits

- This release supersedes the ten-question-at-one-wall model above. Each subject world now has five continuous levels; every level is a circuit of five paths ending at five separate walls, and each wall asks exactly one question. Clearing wall 5 completes that level, for 25 questions/walls per world.
- Added `site/games/wordwall-course.js` as a deterministic course planner. Every level contains one rainbow staircase, prism tunnel, uphill runway, true donut-ring route and mixed-shape sky-ribbon route, rotated around the rising tower. There are 25 path segments and 26 checkpoint platforms.
- Enlarged paths and gates for child-friendly clearance, added real annulus collision so donut centres remain holes, retained solid sides/undersides, and raised movement to 8.4 units/s with 9.6 jump velocity.
- Batched static support shapes, tunnel bars, checkpoint rings, clouds and coins with instanced rendering to keep the expanded course practical on lower-power devices. The five circuits retain 30 one-time coin rewards and the existing local skin economy.
- Updated onboarding, HUD, completion/share copy, responsive documentation and screenshot automation. Visually reviewed portrait phone, short landscape, desktop, tower overview, challenge, rainbow-tunnel and donut-ring renders; the mobile HUD correctly shows `0/5` and the challenge shows `Level 1 · Wall 1 of 5`.
- `npm run test:all` passes 100 tests and validates 147 local links/files. Coverage verifies one question per wall, every-fifth-wall level completion, all five route families in every circuit, safe shape sizing/collision, faster movement, 25-wall completion and privacy-safe sharing.
- GitHub commit `dad7278` and Netlify production deploy `6a958e9eadf31a65ccb36e91` published the release. Production HTML and modules expose the 5-question level constant, all five route types, 25-wall course plan and new movement settings.

## Current resume point

LexiClimb's authoritative progression is now **five levels × five one-question walls = 25 walls per world**. A wall is a single question boundary, not a ten-question round. Each level must retain five varied traversal paths and should finish only after its fifth wall. The live game remains `https://edugames-189.netlify.app/games/wordwall.html`; GitHub `main` includes the production release at `dad7278`.

## LexiClimb hidden-grid course rebuild

- Replaced percentage-based support placement, which compressed oversized slabs into overlapping volumes, with a renderer-independent 0.5-world-unit grid in `site/games/wordwall-course.js`.
- Every checkpoint centre is 52 cells/26 world units from the next. Circular 6-unit checkpoints reserve 6 cells at each end and leave an exact 40-cell/20-unit route span. Continuous stairs, tunnel floors and uphill slabs meet edge-to-edge with zero negative interval; their bodies extend down to the prior step so no false vertical sky gaps appear.
- Donut routes now contain exactly three 6-unit rings with 1.5-unit centre holes and 2-cell/1-unit fall gaps. Mixed-shape ribbons retain deliberate jump gaps. Final sized mesh footprints, not just authored grid cells, are validated for non-overlap.
- The helix now uses radius 26, 60-degree turns and 5-unit rises. Circular checkpoints remove rotation-dependent square-corner intrusion, grid-aligned walls sit at route exits, and camera/fog/world bounds were expanded for the larger 125-unit tower.
- Refreshed all LexiClimb responsive baselines and added dedicated uphill-runway and sky-ribbon captures. Browser review covered phone stairs, tunnel, uphill, rings, ribbons, challenge layout and whole-tower overview; the immutable production donut render matched local output.
- `npm run test:all` passes 103 tests and validates 149 local files. New regressions cover grid alignment, post-sizing overlap, zero-gap continuous routes, checkpoint tangency and exact donut dimensions/gaps.
- GitHub commit `b3ec7b7` and Netlify production deploy `6a95944bf63f3766780a342e` published the rebuild. Production exposes the half-unit grid, overlap guard, circular checkpoints, 6-unit rings, 1-unit gaps, radius 26 and rise 5.

## Latest resume point

LexiClimb still uses five levels × five one-question walls. Course geometry must now be authored through `WORDWALL_COURSE_GRID`; do not place route meshes by percentage or bypass `validateWordwallCoursePlan`. Continuous route pieces must have zero grid/world overlap and zero horizontal gap, while intentional jump routes must declare positive measured gaps. The live game remains `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb reliable wall-question activation

- Replaced the landing-only learning-wall trigger with a single guarded opener shared by checkpoint landing, closed-wall contact, wall proximity and the on-screen fallback control. Progression remains sequential and the shared run-state transition prevents duplicate questions.
- Added renderer-independent `isWordwallPlayerNearGate` geometry. It recognises either wall face across the playable width, respects rotated gates and vertical tiers, and ignores distant or already-open walls.
- Added a responsive **Open question** button below the objective HUD. It opens only when the avatar is in the same wall proximity zone; farther away it gives clear movement guidance instead of bypassing the route.
- Browser review covered 390 × 844 portrait, 844 × 390 short landscape and 1280 × 720 automatic wall activation. The button remained separate from HUD/movement controls, and the wall preview opened its question without requiring a precise landing event.
- `npm run test:all` passes 104 tests and validates 152 local links/files. GitHub commit `c8a7694` and Netlify production deploy `6a95997f25663bb4755688e9` published the fix; production HTML, controller and engine returned 200 with fallback, handler and proximity markers.

## Current resume point

The current LexiClimb wall can activate through checkpoint landing, touching/approaching either wall face, or the proximity-gated fallback button. Future wall changes should keep those inputs routed through `openCurrentWallChallenge` and preserve `isWordwallPlayerNearGate` as the renderer-independent geometry authority. The live game is `https://edugames-189.netlify.app/games/wordwall.html` and GitHub `main` contains the feature at `c8a7694`.

## LexiClimb wider donut walking bands

- Reduced every 6-unit donut's centre opening from a 1.5-unit radius to a 1.5-unit diameter. The resulting radial walking band grows from 1.5 to 2.25 units, while the three-ring route and measured 1-unit inter-ring fall gaps remain unchanged.
- Added `ringHoleDiameterCells: 3` to the authoritative half-unit course grid. Course collision consumes the same value, and the instanced Torus geometry derives its inner ratio and vertical scale from it so visible and physical dimensions stay aligned.
- Replaced the generic fixed 0.8 ring-hole clamp with a player-footprint-derived minimum. This preserves the authored 0.75 radius without permitting holes too small to function as holes.
- `npm run test:all` passes 104 tests and validates 152 local files. Desktop, 390 × 844 local and immutable-production donut previews show the thicker standable bands with intact gaps and HUD framing.
- GitHub commit `8306398` and Netlify production deploy `6a959afe0b463ecb88e143a9` published the update. The immutable course, engine and controller returned 200 with the new grid, clamp and torus-ratio markers.

## Latest resume point

LexiClimb donut routes remain three 6-unit rings separated by 1-unit fall gaps, but their authoritative hole radius is now 0.75 and their walking-band width is 2.25. Keep `WORDWALL_COURSE_GRID.ringHoleDiameterCells`, course collision and `renderSupportBatches` geometry ratios synchronised if ring sizing changes again. The live game remains `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb screenshot-scale double-size rings

- This release corrects the prior donut update, which widened the band but mistakenly left the outer diameter at 6 units. Every donut platform is now a true 12 units across—exactly 2× the previous outer diameter—with a 0.75-unit hole radius and a 5.25-unit radial walking band.
- Replaced the rounded torus presentation with a flat, solid extruded annulus to match the supplied obby reference more closely. The instanced visual footprint and renderer-independent annulus collision share the same grid-derived outer and inner dimensions.
- Expanded the half-unit course grid from 26 to 44 units checkpoint-to-checkpoint, with 38 usable path units. Each donut route still contains three rings and measured 1-unit gaps without overlap; continuous route depths were redistributed across the larger span.
- Increased the spiral radius from 26 to 44 and the movement world bound from 36 to 58. Whole-tower and normal mobile-start reviews confirmed continuous geometry and unchanged HUD/control framing.
- The corrected donut preview places the avatar on the first walking band and aims down the route. At 1280 × 720, the foreground ring spans about 11 avatar widths, closely matching the supplied reference's roughly 10–11 avatar widths; 390 × 844 also keeps the player and next rings readable.
- `npm run test:all` passes 104 tests. GitHub commit `2c2b538` and Netlify production deploy `6a959d4ccf34d7e681de4c66` published the correction. Immutable production returned 200 for course, engine and controller with 24-cell diameter, 88-cell span, radius-44 and flat-extrusion markers.

## Current resume point

LexiClimb's authoritative donut size is now **12 world units / 24 half-unit cells**, not 6 units. Rings use flat `ExtrudeGeometry`, a 1.5-unit-diameter hole, a 5.25-unit walking band and 1-unit inter-ring fall gaps. The tower uses radius 44 and 44-unit checkpoint spans so the three rings never overlap. The live game remains `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb stair collision correction

- Fixed a capsule/riser boundary error in `site/games/wordwall-engine.js`: radius-expanded contact with the next stair no longer counts as a pre-existing core overlap, so an airborne player cannot enter a stair body and lose the supporting surface below.
- Added grounded autostep for the authored 0.5- and 1-unit stair rises, with a 1.05-unit maximum, so continuous rainbow stairs climb smoothly without bypassing taller obstacle sides.
- Added swept downward landing against the highest crossed solid top. A frame can no longer tunnel through a staircase top even when it moves from above to below the surface.
- Regression coverage checks all 40 staircase blocks and all 40 checkpoint/stair or stair/stair transitions across the five generated rainbow stair routes. `npm run test:all` passes 105 tests and validates 162 local files.
- Local desktop and 390 × 844 browser runs traversed the complete first staircase; a mobile-sized run also jumped mid-route, landed at Y=5 and opened the checkpoint challenge at 60 FPS. The same jump traversal passed against immutable production.
- GitHub commit `958f872` and Netlify production deploy `6a95c2db4d0e5ffbc027fdd5` published the fix. Production HTML and both Wordwall JavaScript modules returned 200 with the swept-landing and safe-step markers.

## Latest resume point

LexiClimb stair physics now uses fixed-step horizontal body collision, bounded grounded autostep, underside collision and swept top-surface landing. Keep rendered support dimensions, `isWordwallFootprintOnSupport` and the three movement/ceiling/landing resolvers aligned when changing course shapes or heights. The live game remains `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb non-repeating curriculum and checkpoint recovery

- Expanded the reviewed Years 3–5 bank from 100 to 150 items: exactly 50 Maths, 50 Science and 50 English questions, with 10 items per subject at every Level 1–5 difficulty. The 25-wall world draws five without replacement per level; the following set draws the disjoint half of each level pool, preventing immediate replay repetition.
- Added `site/games/curriculum-learning-guides.js` with topic-specific explanations across the three subjects. Each Learn panel now shows the live strand's rule or concept, a three-step method, a different worked example and a self-check without displaying the live answer. The panel remains scrollable in short landscape.
- Added checkpoint-relative fall recovery. The controller respawns as soon as the avatar is more than 3.5 world units below the latest checkpoint, before a lower circuit can catch them, and restores the exact saved checkpoint without changing solved progress.
- Strengthened bank, generated-question and world validators for detailed support and duplicate prompts. Regression sampling covers 500 complete sets per subject plus every adjacent set pair; there are no repeated prompts within a world and no reused authored item in the immediately following set.
- `npm run test:all` passes 110 tests and validates 166 local links/files. Learn views were reviewed at 390 × 844, 844 × 390 and 1280 × 720; the immutable production phone capture matches the local layout.
- GitHub commit `98889f9` and Netlify production deploy `6a95c8655dc99989ad583b2b` published the release. The immutable HTML, bank, guide, generator, engine and controller all returned 200 with the new markers.

## Latest resume point

LexiClimb remains five levels × five one-question walls. Its authoritative bank is now 150 items, with 10 reviewed questions per subject/level and non-repeating five-item batches. Keep new Learn content in `curriculum-learning-guides.js`, preserve the no-replacement selector and checkpoint-relative fall threshold, and add regression coverage when introducing new generators. The live game is `https://edugames-189.netlify.app/games/wordwall.html`.

## LexiClimb year-tailored 900-question curriculum release

- Replaced the cross-year 150-item pool with nine explicit banks under `site/games/question-banks/year-{3,4,5}`: 100 English, 100 Maths and 100 Science questions for each of Years 3, 4 and 5. `curriculum-year-banks.js` exposes and validates the 900-item registry.
- Each year-and-subject scope has 20 questions at each of five in-year difficulty levels. A world draws five per level; sets 0–3 partition all 100 source records into four 25-wall runs without repetition. Selection only shuffles reviewed records and never crosses the selected year.
- Added a Year 3/4/5 selector before the subject selector. Year remains in replay URLs, HUD/challenge labels, coin scopes, completion copy and sharing. A visual review caught and fixed a `data-year` selector collision that erased the body; page metadata now uses `data-wordwall-year`.
- Added strict suitability checks for stable metadata, unique prompts, exact spelling tiles, four distinct choices, compact presentation and complete Learn/Hint support. Extended topic guides for new number, fraction, geometry and science concepts.
- Added deep research/review files for each year, refreshed game and architecture documentation, and saved 390 × 844 selector/challenge/Learn plus 1024 × 576 selector baselines. Short landscape now hides the onboarding guide up to 620 px high so the Start action remains visible.
- `npm run test:all` passes 111 tests and validates 185 local files. Production verification found three year choices, the 900 marker, year-scoped controller wiring, safe page metadata and the 900-item registry.
- GitHub commit `d7d9999` and Netlify production deploy `6a95d00fd784ce3463c11df7` published the release.

## Current resume point

LexiClimb's authoritative content model is **3 years × 3 subjects × 100 questions = 900**, with 20 records at every in-year level and 25 one-question walls per run. The selected year is a hard question boundary. Preserve the nine bank files, `curriculum-year-banks.js` validation, four-set non-repeating partition and `data-wordwall-year` metadata when extending the game. The live selector supports `?world=english|maths|science&year=3|4|5&set=0..` at `https://edugames-189.netlify.app/games/wordwall.html`.

## Skybound year-tailored curriculum routes

- Replaced Skybound's ten hard-coded mixed-year Maths questions with `createSkyboundQuestions`, an adapter over the shared 900-question registry. Players choose Year 3–5 and English, Maths or Science; the selected year is a hard content boundary.
- Every ten-bridge run draws two questions from each of five in-year levels. Sets 0–9 partition all 100 source records in the selected year/subject without repetition; adjacent sets do not overlap. Four-option questions retain one reviewed distractor, while spelling questions use a same-length deterministic transposition error.
- Added responsive year and subject selectors, subject-themed copy, scoped replay/progress/share state, detailed three-step Learn support and question-linked Hint support.
- Long English and Science answers now wrap across up to four lines on larger world-space signs. A compact HUD legend repeats the visible left/right choices for mobile readability. Corrected the physical lane map to `left: +1.75`, `right: -1.75`, matching the camera-relative control axes and screen position.
- Updated the homepage, game plan, curriculum-bank and engine documentation. Saved phone selector, 1024 × 576 selector, Year 5 Science bridge and Year 4 English Learn visual baselines.
- `npm run test:all` passes 115 tests and validates 190 local files. Production verification found three year choices, three subject choices, the 900-bank marker, scoped generator, answer legend, corrected lane map and ten-bridge partition markers.
- GitHub commit `eb81f1a` and Netlify production deploy `6a95f7604d0e5f59a527fc18` published the release.

## Latest resume point

Skybound and LexiClimb now share the same 900-question year/subject registry. Skybound's authoritative run is **ten bridges = two questions per Level 1–5**, and ten sets exhaust a selected 100-question scope. Preserve the corrected visual lane coordinates, readable HUD answer legend, wrapped sign rendering, source non-repetition and scoped replay URL when changing the bridge. The live route accepts `?year=3|4|5&subject=english|maths|science&set=0..` at `https://edugames-189.netlify.app/games/skybound.html`.

## Blocksmith year-tailored curriculum expeditions

- Added `site/games/blocksmith-curriculum-quests.js`, an adapter over the shared 900-question registry. Blocksmith now offers Year 3, 4 and 5 plus English, Maths and Science selection on its welcome screen.
- Each run contains 20 beacons: four questions from every in-year Level 1–5. Sets 0–4 partition all 100 source questions in a Year/subject scope without repeats. The next-set link cycles through the complete scope, and completion state is stored separately by year, subject and set while inventory and mining remain shared.
- Multiple-choice questions are translated into physical answer-block tasks. Their four shuffled choices map visibly to moss, wood, stone and glass; validation accepts exactly one block of the material attached to the correct answer. English spelling records retain the deeper interaction: learners mine hidden letter stones and build the exact word in one straight line.
- Every generated quest keeps the source objective, strand, Hint and question-specific Learn guide. The mobile dialog lays out long Science and English options without overlap and keeps both Keep exploring and Accept build quest visible in the first viewport.
- Replaced fixed world signs with the selected expedition/year label, updated the journal to show the selected scope and 20-quest total, added five responsive baselines, and refreshed the homepage/game documentation.
- Regression coverage proves all nine year/subject combinations, Level 1–5 grouping, physical answer-material mapping, exact spelling validation and complete five-set exhaustion of all 100 source records. `npm run test:all` passes 119 tests and validates 196 local files.
- Visual QA covered 320 × 568, 360 × 800, 390 × 844 and 1280 × 720 for selection, material-answer and spelling routes. GitHub commit `47dca72` and Netlify production deploy `6a960e428a0be003b7146e83` published the release. Production returned HTTP 200 for the game HTML, curriculum adapter, controller and homepage with selector/adapter markers present.

## Latest resume point

All three active learning games now share the same hard Year 3–5 and English/Maths/Science content boundaries. Blocksmith's authoritative run is **20 physical build quests = four questions per Level 1–5**, and five sets exhaust a selected 100-question scope. Preserve the four-material option mapping, spelling-letter build route, scoped completion key and mobile two-action footer when extending it. The live route accepts `?year=3|4|5&subject=english|maths|science&set=0..4` at `https://edugames-189.netlify.app/games/blocksmith.html`.

## Maths Outbreak first-person learning game

- Added the fourth active EduGames title, Maths Outbreak, at `site/games/outbreak.html`. It is an original, no-gore first-person swarm game on the 32 × 32 tiled Gridlock Courtyard rather than a copied commercial map. The three-lane arena includes two warehouses, a central court, cover crates, crouch-only service tunnels and five sequential checkpoints.
- Each Year 3–5 operation contains five deterministic equations with answers bounded from 3–15. The learner tags a self-chosen number of pooled block zombies and presses Confirm; neither the HUD nor the question-specific Learn panel displays the answer. An incorrect count restarts only the current swarm with neutral feedback, while a correct count opens the next checkpoint.
- Added renderer-independent `outbreak-engine.js`, `outbreak-map.js` and `outbreak-questions.js` plus reusable `game-input.js` analogue-stick/hold controls. The game supports WASD/mouse/Shift/C/F/E and mobile stick/drag/Run/Duck/Fire, crouched hiding near cover, checkpoint respawn, synthesised audio and persistent mute.
- Floor tiles, walls, cover, tunnel ceilings and zombie body parts use instanced rendering. Low-power/coarse-pointer/ChromeOS mode disables shadows and antialiasing and caps pixel density. The reviewed scene reports 34 draw calls and about 22,700 triangles.
- Added the portal tile/thumbnail, architecture and component documentation, a full game plan and five responsive visual baselines covering welcome, desktop, phone touch controls, short landscape checkpoint and question-specific Learn.
- `npm run test:all` passes 128 tests and validates 212 local links/files. Coverage includes 300 deterministic question sets, hidden-answer confirmation, map path reachability, collision/low clearance, five-checkpoint completion, checkpoint recovery, deterministic swarm pooling and crouch hiding.
- GitHub commit `2072d8b` and Netlify production deploy `6a96b67b1b7dc26e589148f3` published the release. Production portal, HTML, controller, engine, map and thumbnail return HTTP 200; the public WebGL diagnostic reports ready with no runtime error.

## Current resume point

EduGames now has four active Three.js games. Maths Outbreak is live at `https://edugames-189.netlify.app/games/outbreak.html` and accepts `?year=3|4|5&set=0..`. Preserve the hidden-answer counter, neutral incorrect retry, five-checkpoint order, map-grid collision authority and instanced low-power path when extending it. Physical Chromebook/tablet performance, keyboard-only accessibility and child playtesting remain required before a classroom pilot.

## Maths Outbreak Gridlock Garden environment pass

- Replaced the dark industrial presentation with the bright daytime Gridlock Garden district. Number Works, Puzzle Depot and Count Court now have distinct warm, cool and purple landmark palettes, readable signs, repeated windows, awnings, roofs, trim, rooftop equipment and skylights.
- Added deterministic surface zoning, lane markings, planted cover, streetlights, distant low-poly trees and stylised clouds. The South Safe Room moved to a nearby clear tile and starts angled into the landmark view instead of facing the old cover wall.
- Kept visual dressing separate from game physics. `outbreak-environment-plan.js` is renderer-independent; streetlights occupy existing solid wall cells, shrubs sit on existing cover and trees remain outside the map. `outbreak-environment.js` consumes the plan with shared materials and instanced geometry, so the visual pass adds no invisible blockers.
- Corrected instance-colour materials during browser QA, refreshed the portal thumbnail and desktop/portrait/short-landscape reference images, and made `?touch=1` exercise the real low-power tier. Production low-power WebGL reports ready with no runtime error, 49 calls and 21,222 triangles; the high-tier local reference reports 64 calls and 26,778 triangles.
- `npm run test:all` passes 129 tests and validates 540 local links/files. New regression coverage validates the two building plans, distinct surface zones and decoration placement against the collision map.
- GitHub commit `59a80a8` and Netlify production deploy `6a96bdacd11446b10aa71304` published the update. Production HTML, environment renderer, environment plan and refreshed thumbnail return HTTP 200; the live WebGL diagnostic exposes two buildings and 48 window instances.

## Latest resume point

Maths Outbreak is live at `https://edugames-189.netlify.app/games/outbreak.html` with the Gridlock Garden art direction. Keep `outbreak-map.js` authoritative for collision and navigation, add future scenery through the deterministic environment plan, and preserve the low-power instanced path. The current visual plan is `gridlock-garden-v1`.

## Maths Outbreak full-body hitscan correction

- Fixed the torso-only shot query in `site/games/outbreak.js`. The raycaster now includes the head, torso, arms and legs instanced meshes, with stable hit-zone metadata on every body batch.
- Added renderer-independent `resolveOutbreakShotIntersections` in `outbreak-engine.js`. It sorts hits by distance, accepts all four known body zones, preserves the shared zombie instance index, rejects out-of-range hits and lets the nearest wall, cover crate or service-tunnel ceiling block a target behind it.
- Headshots use the same one-zombie/one-count learning rule as every other body hit but now provide explicit `Headshot!` feedback. A deterministic `preview=headshot` browser fixture places one stationary target on the crosshair for real Three.js integration testing.
- Regression coverage checks each body zone, blocker ordering and range. `npm run test:all` passes 131 tests and validates 215 local files. Local and production browser runs both exposed four hit meshes, registered the actual head intersection and advanced the counter from 0 to 1 without runtime errors.
- GitHub commit `6ce1108` and Netlify production deploy `6a96c4b311a4f329740737ab` published the correction.

## Latest resume point

Maths Outbreak shots must remain routed through `resolveOutbreakShotIntersections`; do not reduce `shotMeshes` back to the torso batch. Each visible zombie body mesh owns an `outbreakHitZone`, while map blockers own `blocksOutbreakShots`. The live game is `https://edugames-189.netlify.app/games/outbreak.html`.

## Maths Outbreak upright FPS camera correction

- Replaced the default Three.js `XYZ` Euler orientation with the conventional first-person `YXZ` order. Yaw now rotates only around the upright world axis, pitch only looks up/down and camera roll is reset to zero every frame.
- Added renderer-independent `site/games/outbreak-look.js`. Mouse and touch both route through `updateOutbreakLook`, which normalises yaw after repeated full turns and clamps pitch to ±(π/2 − 0.12), about 83°, before inversion is possible.
- Added diagnostics for camera order, yaw, pitch and roll. Real browser touch tests dragged left/up and right/down, confirming independent expected direction changes, an exact return to the starting orientation, `YXZ` order, zero roll and safe extreme-pitch clamping.
- `npm run test:all` passes 132 tests and validates 216 local files. Production reports ready with no runtime error and the same four-way touch behaviour.
- GitHub commit `66636b5` and Netlify production deploy `6a96c638466cb59170358656` published the correction.

## Latest resume point

Maths Outbreak camera rotation must remain `YXZ` with zero roll. Keep both pointer-lock mouse input and touch drag routed through `updateOutbreakLook`; do not directly mutate Euler components or remove the pitch clamp. The live game is `https://edugames-189.netlify.app/games/outbreak.html`.

## Maths Outbreak directional damage and survival audio

- Added renderer-independent nearest-attacker bearing logic in `outbreak-engine.js`. Damage is classified as front, left, right or behind relative to the upright FPS yaw and also yields a stereo pan value.
- Damage now produces a full-screen red edge vignette, a crosshair-relative direction marker, an explicit `Hit from …!` label and a direction-aware toast. The health stat pulses below 30 health. The visual remains readable at 390 × 844, 844 × 390 and 1280 × 720; `preview=damage` provides a deterministic behind-hit fixture.
- Expanded the asset-free Web Audio layer with stereo hurt cues, nearby-zombie warnings, footsteps and a low-health heartbeat. Existing firing, hit, checkpoint, down, ambience and persistent mute behaviour remain intact.
- `npm run test:all` passes 134 tests and validates 216 local files. Production HTML/controller/audio source checks found all release markers, and the immutable browser render matched local QA without runtime failure.
- GitHub commit `b5815e0` and Netlify production deploy `6a96d3dcc60f3e5d0ea849fa` published the release.

## Latest resume point

Keep damage bearing based on player yaw rather than camera Euler state, preserve the stereo-panner fallback and ensure new survival cues respect the persistent mute flag. The live game is `https://edugames-189.netlify.app/games/outbreak.html`.

## Maths Outbreak portal key art refresh

- Replaced the flat gameplay-capture thumbnail with original cinematic 3D key art matching the Blocksmith, Skybound and LexiClimb discovery tiles. The scene keeps Maths Outbreak child-safe through a toy-like number tagger, playful block zombies, bright Gridlock Garden architecture and floating maths tokens, with no baked-in title or UI.
- Archived the full 1536 × 1024 generated source at `docs/images/generated/maths-outbreak-source.png` and published a centred 960 × 640 WebP derivative at `site/assets/edugames/maths-outbreak.webp`. The optimized 126 KB asset is smaller than the deleted 175 KB screenshot PNG.
- Desktop and 390 px production portal captures preserve the learner, closest zombies, maths tokens and landmark within the responsive tile crop. `npm run test:all` passes 134 tests and validates 217 local files.
- GitHub commit `1e4cb2e` and Netlify production deploy `6a96e3e9b6b95196135bfada` published the refresh. Production serves the new WebP with HTTP 200 and the updated accessible description.

## Latest resume point

The four active discovery thumbnails now share high-saturation, polished 3D key-art direction with titles kept in HTML. Keep the full generated source in `docs/images/generated/` and serve an optimized derivative from `site/assets/edugames/` when refreshing future artwork.

## Maths Outbreak camera-relative left/right correction

- Corrected the Three.js right-axis sign after horizontal turns. The camera basis is now consistently forward `(-sin(yaw), -cos(yaw))` and right `(cos(yaw), -sin(yaw))`.
- Added renderer-independent `outbreakMovementVector` and routed desktop/touch strafing through it. Damage labels, indicator arrows and stereo warning pans use the same corrected basis, so movement and feedback remain aligned at north, east and west headings.
- Added cardinal-heading regression tests plus deterministic `preview=damage-left` and `preview=damage-right` fixtures. Local and production short-landscape captures show the left arrow/label on the left and right arrow/label on the right.
- `npm run test:all` passes 135 tests and validates 217 local files. GitHub commit `aba8b5a` and Netlify production deploy `6a96e52dd7e92eb062bd1a48` published the correction.

## Latest resume point

Keep all Maths Outbreak movement, damage bearings and positional audio derived from the shared camera-relative basis in `outbreak-engine.js`; do not reintroduce inline yaw formulas in the renderer adapter.

## Skybound compact mobile question HUD

- Reworked the portrait question card into a shallow persistent strip: Year/strand metadata, the prompt, Learn/Hint and a two-column left/right answer legend now remain visible without stacking over half the playfield. The redundant jump instruction is hidden on narrow screens.
- Learn and Hint keep their teaching detail on demand in a separately bounded, scrollable panel. Its safe bottom boundary reserves the analogue-stick and Jump region rather than covering gameplay controls.
- Added a compact short-landscape variant with inline support actions and horizontal answers. Documentation and a CSS regression test now preserve both responsive contracts.
- Visual QA covered the user's short 393 × 550 browser viewport, 390 × 844 portrait and 844 × 390 landscape. The public 393 × 550 capture leaves the bridge, avatar, both answer tiles, stick and Jump fully visible.
- `npm run test:all` passes 136 tests and validates 217 local files. GitHub commit `b31986d` and Netlify production deploy `6a96e81e11fab3be3ba4af65` published the correction.

## Latest resume point

Skybound's mobile question HUD is intentionally persistent but shallow. Keep the two physical answer tiles visible, preserve the two-column narrow-screen legend, and put longer teaching content in the bounded on-demand panel. The live route remains `https://edugames-189.netlify.app/games/skybound.html`.

## One Block Academy educational sky-island game

- Researched the original OneBlock format from IJAMinecraft's creator page, Minecraft.net's play article and the original CurseForge listing. The implementation keeps the abstract renewable-block survival loop but uses original phases, names, artwork, textures, code and curriculum interactions; it does not reproduce or redistribute the original protected map.
- Added the fifth active EduGames title at `site/games/oneblock.html`. One renewable core regenerates immediately after every mine, grants a deterministic weighted resource, and lets the learner expand a grid-snapped floating island through first-person mining and placement.
- `oneblock-engine.js` owns ten original ten-mine phases, seeded material rolls, challenge locking, inventory/rewards, Afterglow free play and bounded save restoration. The Three.js adapter reuses Blocksmith's voxel style, fixed-step gravity, collision, analogue input and low-power selection while keeping the smaller island performant.
- Every phase ends at a paused Year 3–5 English, Maths or Science knowledge gate adapted from the shared 900-question bank. Ten questions are selected without repetition for the chosen scope; each gate has tailored Learn and Hint support, physical block-like answer choices and a persistent HUD fallback until solved.
- Added responsive onboarding, desktop WASD/mouse controls, touch drag/analogue/Mine/Place/Jump controls, void respawn without progress loss, synthesised cues, local scoped saves, original generated key art and the homepage discovery tile.
- Added research, game, engine, responsive and image documentation plus four visual baselines at 1280 × 720, 390 × 844, 360 × 740 and 844 × 390. `npm run test:all` passes 143 tests and validates 230 local links/files.
- GitHub commit `339c7b3` and Netlify production deploy `6a97192894d8e312251bbf75` published the game. The live portal, game HTML, pure engine and optimized artwork all return HTTP 200; the production 390 × 844 WebGL capture matches the local touch baseline.

## Latest resume point

EduGames now has five active Three.js titles. One Block Academy is live at `https://edugames-189.netlify.app/games/oneblock.html`. Preserve the central renewable core, exact ten-mine phase gate, deterministic weighted phase resources, grid-snapped island placement, challenge fallback button, scoped Year/subject/set save and non-repeating ten-question curriculum route when extending it.

## One Block edge-building correction

- Corrected the missing first-island expansion interaction. Side-face placement still uses exact voxel adjacency, while aiming at a block's top face now resolves to the nearest horizontal edge (or the camera-forward edge at the centre) instead of stacking upward. A learner can mine one resource and immediately place it beside the renewable core without stepping off.
- Added Minecraft-style ledge protection: desktop holds Shift and touch toggles a fourth Sneak action. Grounded sneaking rejects movement into unsupported space but does not suppress jumping, so deliberate void risk remains.
- Updated onboarding/help, game and research notes, phone and short-landscape baselines, and deterministic engine/site coverage. `npm run test:all` passes 145 tests and validates 230 local links/files.
- GitHub commit `8e2c5c5` and Netlify production deploy `6a9723d9906017297bf4f2d4` published the correction. The live HTML and engine expose the Sneak control and placement resolver, and the production 390 × 844 capture shows the four-button layout without overlap.

## Latest resume point

One Block Academy supports safe first-block expansion through both precise side-face placement and forgiving top-face edge placement. Preserve `resolveOneBlockPlacement`, `oneBlockSneakAllowsStep`, desktop held Shift, the touch Sneak toggle and jump-while-sneaking behavior when changing construction or movement.

## EduGames opening hero carousel

- Replaced the static Blocksmith featured panel with a six-slide opening carousel. The first slide is original generated child-safety artwork carrying the exact promise “Kid Safe Games · No Ads · No Chat · Learning Built In”; the next five slides promote Blocksmith Worlds, One Block Academy, Skybound Academy, LexiClimb Tower and Maths Outbreak with accessible HTML copy and direct play links.
- Added 6.5-second automatic rotation plus previous/next arrows, labelled slide dots, pause/resume, left/right keyboard navigation and horizontal swipe. Automatic motion pauses while hovered, focused or hidden and is disabled for `prefers-reduced-motion`.
- Kept inactive slide links out of the tab order and disabled live announcements during automatic movement. Manual navigation uses a polite status region.
- Phone and short-landscape layouts contain the complete safety artwork so its wording is never cropped. Desktop and game slides retain cinematic cover treatment; mobile height was reduced to keep categories and games close to the first viewport.
- Archived the generated 1774 × 887 source at `docs/images/generated/kid-safe-games-hero-source.png` and serves the optimized 1600 × 900 WebP from `site/assets/edugames/kid-safe-games-hero.webp`. Refreshed all four homepage visual baselines and updated design/image documentation.
- `npm run test:all` passes 146 tests and validates 232 local links/files. GitHub commit `8bfa725` and Netlify production deploy `6a972c8ea292686bd9f1e7d9` published the carousel. Production mobile safety and desktop timed game slides were visually verified.

## Latest resume point

The EduGames homepage now begins with the safety promise followed by five timed game banners. Preserve the safety slide as the first item, its exact four-part promise, manual pause/navigation controls, focus/visibility/reduced-motion pauses and narrow-screen no-crop treatment when changing portal discovery. The live portal remains `https://edugames-189.netlify.app/`.

## Maths Outbreak key-art gameplay pass

- Reworked the live Gridlock Garden presentation to match the Maths Outbreak thumbnail's defining visual language without changing the 32 × 32 collision/navigation map. `gridlock-garden-keyart-v2` uses saturated teal/orange checker paving, taller layered Number Works/Puzzle Depot façades and a stepped Count Court school entrance with orange framing, clock tower and flag.
- Added bounded hero decoration: four floating glowing maths tiles, stronger planting and flowers. The environment exposes a lightweight update hook for tile bob/turn motion; low-power mode reduces flowers and still uses instanced repeated geometry.
- Rebuilt zombies as larger toy-like targets with varied green heads, colourful shirts, bright eyes, pupils, mouths and maths badges. The decorative face meshes are deliberately excluded from hitscan; the enlarged head, torso, arms and legs remain the four authoritative full-body zones.
- Replaced the dark rectangular weapon with a compact teal/cyan/orange number blaster. Its illuminated panel mirrors the current tagged count and remains below the main sightline in desktop, portrait and short-landscape layouts.
- Added key-art contract tests, refreshed desktop/mobile/checkpoint baselines, added a close-zombie baseline and made all six Outbreak captures reproducible through `scripts/capture-previews.mjs`.
- `npm run test:all` passes 148 tests and validates 233 local links/files. GitHub commit `53927d3` and Netlify production deploy `6a97318f4fef0d66ecf75da4` published the pass. Production desktop, portrait and headshot captures match local output.

## Latest resume point

Maths Outbreak now uses the `gridlock-garden-keyart-v2` art plan. Keep `outbreak-map.js` authoritative for collision/navigation, `zombieHitMeshes` restricted to the four visible body zones and the blaster counter synchronised through `updateHud`. Add future repeated scenery through instancing and preserve the coarse-pointer low-power reductions. The live game remains `https://edugames-189.netlify.app/games/outbreak.html`.

## Maths Outbreak child-readable actions

- Replaced the abbreviated world sign `CP` with the full label `CHECKPOINT` and resized/repositioned the sign and posts so its complete wording remains visible while entering the pad.
- Renamed the count submission from the vague `Confirm` action to `Check answer`. The persistent desktop action displays an `ENTER` keycap; the nearby checkpoint action displays `E`. Mission copy, onboarding, Help, canvas accessibility text and documentation repeat the same action/key mapping.
- Kept touch layouts concise: plain-language Check answer and Enter checkpoint buttons remain visible, while keyboard-only keycaps are hidden. A deterministic `input=desktop` preview mode makes the desktop contract reproducible in headless visual QA.
- Added a desktop checkpoint baseline and refreshed the desktop gameplay and short-landscape checkpoint references. Production captures verify the full CHECKPOINT sign, Check answer/Enter and Enter checkpoint/E actions.
- `npm run test:all` passes 149 tests and validates 234 local links/files. GitHub commit `23699ff` and Netlify production deploy `6a973fdf7e385d8c1e4e0f7c` published the correction.

## Latest resume point

Keep the child-facing terms `Check answer` and `Enter checkpoint` aligned across mission copy, action buttons, onboarding and Help. Desktop must retain the visible `ENTER` and `E` keycaps; touch must retain clear labels without keyboard-only clutter. Do not reintroduce the `CP` abbreviation. The live route remains `https://edugames-189.netlify.app/games/outbreak.html`.

## Maths Outbreak rotating number-block alignment

- Fixed the floating maths-token labels drifting away from their coloured blocks. The old label was a camera-facing Three.js sprite inside a rotating group, so its orientation diverged from the block and its local front-face offset appeared beside the geometry.
- `illustratedTile` now uses centred PlaneGeometry labels attached directly to both the front and back physical faces. The symbol, border and block therefore share the same transform through the complete rotation; the reverse face remains readable while a naturally edge-on block also makes its label edge-on.
- Added deterministic `preview=math-tile`, a close 800 × 600 baseline and a regression contract for both attached faces. Local captures checked front, edge and reverse rotations; the production close-up matches the aligned local result.
- `npm run test:all` passes 150 tests and validates 235 local links/files. GitHub commit `25d523a` and Netlify production deploy `6a9741be757ca3d99dc603f7` published the correction.

## Latest resume point

Keep floating maths-token labels as physical attached planes rather than camera-facing sprites. Preserve both front and back faces and the `preview=math-tile` visual fixture when changing token geometry or animation. The live route remains `https://edugames-189.netlify.app/games/outbreak.html`.
