# Game plan 2: Skybound Academy

## Playable promise

Skybound Academy is a third-person, block-character glass-bridge obby for UK learners aged 7–10. Ten bridges form one continuous route above the clouds. Each safe checkpoint presents a curriculum question; its two possible answers are rendered on the left and right glass tiles, so the learner answers through movement rather than a detached quiz button.

The game uses an original EduGames world, character, interface and question set. It borrows the general physical-choice loop found in glass-bridge and obstacle-course games without using another game's names, characters, artwork, level layout or code.

## Core loop

`Reach checkpoint → read question → use Learn or Hint if needed → jump to an answer tile → cross safe glass or fall → retry the same bridge → reach the next checkpoint`.

- A correct tile turns green and remains solid.
- A wrong tile turns red, cracks away and drops the avatar below the clouds.
- Falling always returns the learner to the checkpoint immediately before that bridge.
- Checkpoint progress is local and private. There is no timer, public ranking, chat, lives system or paid skip.
- Completing the tenth bridge opens a natural session ending with replay and choose-another-game actions.

## Curriculum route

`site/games/skybound-questions.js` contains ten two-option maths questions:

| Bridge | Year | Focus |
|---|---|---|
| 1 | Year 3 | Multiplication as equal groups |
| 2 | Year 3 | Equal sharing and division |
| 3 | Year 3 | One third of an amount |
| 4 | Year 4 | Rectangle perimeter |
| 5 | Year 4 | Three quarters of an amount |
| 6 | Year 4 | Tenths and decimals |
| 7 | Year 4 | Factor pairs |
| 8 | Year 5 | 25% as one quarter |
| 9 | Year 5 | Cuboid volume |
| 10 | Year 5 | Two fifths of an amount |

Every question includes a curriculum objective ID, child-readable success explanation, learner-controlled hint, and short teaching example that uses different numbers from the live answer.

## Runtime architecture

- `site/games/skybound-engine.js` is the deterministic, renderer-independent state machine. It owns left/right answer allocation, correct/falling/crossing states, checkpoint advancement, retries and completion.
- `site/games/skybound.js` owns Three.js presentation, block-character animation, fixed-step movement, jumping, platform collision, glass collapse, camera follow, touch/keyboard input and local best-checkpoint storage.
- Static checkpoint geometry and cloud clusters use instanced rendering. The twenty answer tiles remain separate because each can change material, break and fall independently.
- The existing low-power quality selector reduces pixel density, antialiasing and shadows on ChromeOS and coarse-pointer devices without changing questions or mechanics.

## Controls and responsive behaviour

- Desktop: WASD or arrow keys move; Space jumps.
- Touch: a pressure-free analogue stick provides 360-degree direction and variable speed while the separate Jump pointer fires independently.
- The full-screen canvas owns the viewport. The compact question card, safe-area HUD and touch controls occupy separate zones.
- Portrait mobile keeps the question above the active tiles and the controls at the bottom corners. Short landscape compacts the question into the upper-left while preserving a clear view of the bridge.
- Text selection and touch callouts are disabled only on the gameplay controls.

## Evidence and tests

Pure tests cover the ten-question curriculum contract, deterministic lane assignment, wrong-tile retry, safe-tile checkpoint advancement, post-answer falls and full-run completion. Browser checks cover desktop and mobile rendering, Learn support, wrong-tile collapse, checkpoint respawn, safe-tile feedback, steady frame rate and console errors.

## Risks before classroom use

- Physical skill may still mask knowledge. A later motor-assist option should widen tiles and add guided jumps without changing mathematics.
- The two-choice format is appropriate for retrieval but weak evidence for open problem solving; combine it with Blocksmith construction evidence.
- Production acceptance still requires physical Chromebook/tablet heat testing, keyboard-only review, screen-reader review of the question/support layer, and child usability testing.
