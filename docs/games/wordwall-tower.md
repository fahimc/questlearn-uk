# Game plan 3: LexiClimb Tower

## Playable promise

LexiClimb Tower is a third-person, block-character English obby for UK learners aged 7–10. The player climbs six large, continuous floating course sections that form a one-and-a-half-turn rising spiral around the tower core. The route mixes stepping stones, narrow beams, alternating jumps and rising stairs. Falling returns them to the latest checkpoint without losing learning progress.

The visual direction uses the broad genre pattern visible in bright browser obbies—long floating routes, readable colours and immediate movement—but the world, character, level plan, interface, questions, artwork and code are original EduGames work.

## Core loop

`Traverse varied shapes → collect coins → reach checkpoint → use Learn or Hint if needed → solve the English wall → spend coins on a skin → continue upward`.

- Each course has eight traversable obstacles and a distinct colour/shape rhythm. Boxes, circles and triangles vary in width and depth, and the landing engine uses the same rotated footprint as the visible mesh. A sizing guard expands every platform to a shape-specific safe-centre radius: 0.75 for boxes, 0.90 for circles and 1.05 for triangles, before the mesh and collider are created.
- Platform bodies are solid as well as landable. A 0.48-radius body collider blocks walking through box, circle and triangle side faces, while an underside check stops upward jumps through their bases. Players already standing on a top face remain free to move.
- Each section curves through 90 degrees around the core and rises four world units. Seven rotated checkpoint platforms join the sections into one readable helix rather than a straight corridor.
- Five coins sit on each section's intended route. Collection is immediate, idempotent and rendered as one instanced batch, so the 30 rewards do not create 30 extra draw calls.
- A checkpoint is secured before its challenge opens, so a later fall never erases a solved or reached section.
- The blocking wall remains physically closed until the challenge is correct. Its full brick width, depth and height block the avatar from the front, back, sides and corners; then the collider releases as the brick group drops from the route.
- There is no timer, lives counter, public leaderboard, advertising or chat.
- The summit provides replay, choose-another-game and privacy-safe sharing.

## Coins and character skins

- The HUD coin button opens a responsive character shop without leaving the game. It pauses movement and ambient sound while open.
- Candy Climber is always available. Ocean Explorer costs 5 coins, Solar Sprinter costs 9 and Galaxy Hero costs 14, so one complete 30-coin climb can unlock all three optional looks.
- Buying a skin also equips it. Any owned skin can later be equipped without another charge.
- Coin IDs are one-time rewards. Reloading or falling cannot duplicate a collected coin, while uncollected coins remain available on a later attempt.
- Balance, collected IDs, owned skins and the equipped skin use a validated, versioned local profile. They stay on the device and are not shared, uploaded or attached to achievement links.

## English gate route

| Gate | Year | Interaction | Learning focus |
|---|---|---|---|
| 1 | Year 3 | choose a missing letter | spelling a multisyllabic word |
| 2 | Year 3 | assemble letter tiles | spelling from a child-readable definition |
| 3 | Year 4 | find the matching word | vocabulary and synonyms |
| 4 | Year 4 | choose a sentence homophone | their / there / they’re |
| 5 | Year 5 | choose the complete sentence | capitals and question marks |
| 6 | Year 5 | assemble letter tiles | prefixes and opposite meaning |

The objectives map to the spelling, vocabulary and grammar strands documented in [`docs/research/england-years-3-5.md`](../research/england-years-3-5.md). Every gate has a learner-controlled explanation, a separate hint, age-readable feedback and a teaching example that does not simply repeat the live answer.

## Runtime and responsive behaviour

- `site/games/wordwall-engine.js` is deterministic and renderer-independent. It owns checkpoint activation, challenge attempts, solved-gate progression, completion, shape footprints, idempotent token claims, skin purchase/equip rules, profile validation and the privacy-safe share payload.
- The same engine owns the spiral pose formula, rotated support footprints and rotated word-wall collision. Three.js consumes those values for mesh position and yaw so visuals and physics share one layout.
- `site/games/wordwall-challenges.js` is the validated six-gate item bank.
- `site/games/wordwall.js` composes Three.js presentation with shared Skybound movement, footprint collision, buffered jumping, analogue input, orbit camera, procedural audio and low-power device selection.
- Desktop uses WASD/arrows, Space, mouse drag and Q/E. Touch uses an independent analogue pointer, Jump pointer and swipe-to-orbit canvas.
- Orbiting turns the avatar to the view's forward heading even when idle; forward, reverse and strafing controls stay relative to that view.
- Portrait stacks challenge options and completion actions; short landscape compacts the modal while preserving the course view. The skin shop uses two touch-friendly columns in both orientations and owns the only scrolling region inside its bounded dialog.

## Risks and next tests

- Motor difficulty can still mask literacy knowledge. A future assist mode should widen platforms or offer guided traversal without changing gate content.
- Six items demonstrate the mechanic but are not a sufficient assessment bank. Production needs educator-reviewed variants, misconception codes and spaced retrieval.
- Physical Chromebook/tablet heat, keyboard-only, screen-reader challenge-layer and child usability testing remain required before classroom use.
