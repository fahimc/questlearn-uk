# Game plan 3: LexiClimb Tower

## Playable promise

LexiClimb Tower is a third-person, block-character English obby for UK learners aged 7–10. The player climbs six large, continuous floating course sections made from stepping stones, narrow beams, alternating jumps and rising stairs. Falling returns them to the latest checkpoint without losing learning progress.

The visual direction uses the broad genre pattern visible in bright browser obbies—long floating routes, readable colours and immediate movement—but the world, character, level plan, interface, questions, artwork and code are original EduGames work.

## Core loop

`Traverse course → reach checkpoint → open English word wall → use Learn or Hint if needed → solve → watch wall collapse → continue upward`.

- Each course has eight traversable obstacles and a distinct colour/shape rhythm.
- A checkpoint is secured before its challenge opens, so a later fall never erases a solved or reached section.
- The blocking wall remains physically closed until the challenge is correct, then its brick group drops from the route.
- There is no timer, lives counter, public leaderboard, advertising or chat.
- The summit provides replay, choose-another-game and privacy-safe sharing.

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

- `site/games/wordwall-engine.js` is deterministic and renderer-independent. It owns checkpoint activation, challenge attempts, solved-gate progression, completion and the privacy-safe share payload.
- `site/games/wordwall-challenges.js` is the validated six-gate item bank.
- `site/games/wordwall.js` composes Three.js presentation with shared Skybound movement, footprint collision, buffered jumping, analogue input, orbit camera, procedural audio and low-power device selection.
- Desktop uses WASD/arrows, Space, mouse drag and Q/E. Touch uses an independent analogue pointer, Jump pointer and swipe-to-orbit canvas.
- Orbiting turns the avatar to the view's forward heading even when idle; forward, reverse and strafing controls stay relative to that view.
- Portrait stacks challenge options and completion actions; short landscape compacts the modal while preserving the course view.

## Risks and next tests

- Motor difficulty can still mask literacy knowledge. A future assist mode should widen platforms or offer guided traversal without changing gate content.
- Six items demonstrate the mechanic but are not a sufficient assessment bank. Production needs educator-reviewed variants, misconception codes and spaced retrieval.
- Physical Chromebook/tablet heat, keyboard-only, screen-reader challenge-layer and child usability testing remain required before classroom use.
