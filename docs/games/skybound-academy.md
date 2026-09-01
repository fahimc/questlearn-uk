# Game plan 2: Skybound Academy

## Playable promise

Skybound Academy is a third-person, block-character glass-bridge obby for learners aged 7–10. The player chooses **Year 3**, **Year 4** or **Year 5**, then English, Maths or Science. Ten bridges form one continuous route above the clouds. Each checkpoint presents a question from that exact year-and-subject scope; two possible answers appear on the left and right glass, so the learner answers through movement rather than a detached quiz button.

The game uses an original EduGames world, character and interface. It applies the general physical-choice loop of glass-bridge obstacle games without copying another game's characters, artwork, course or code.

## Core loop

`Choose year and subject → reach checkpoint → read the question → use Learn or Hint → jump to an answer tile → cross safe glass or fall → retry the same bridge`.

- A correct tile turns green and remains solid.
- A wrong tile turns red, cracks away and drops the avatar below the clouds.
- Falling returns the learner to the checkpoint immediately before that bridge.
- The current left and right answers appear both on world-space signs above the glass and in a compact accessible legend on the question card.
- World-space signs wrap up to four lines and scale type for longer English and Science answers.
- Landing uses the avatar's foot area, so visible glass edges remain usable while the gap stays unsafe.
- There is no timer, public ranking, chat, lives system, advertising or paid skip.

## Year-tailored curriculum route

Skybound shares the validated [900-question curriculum bank](curriculum-question-bank.md) with LexiClimb:

| Selection dimension | Choices |
|---|---|
| School year | Year 3, Year 4, Year 5 |
| Subject | English, Maths, Science |
| Questions in each scope | 100 |
| Bridges per run | 10 |
| In-year progression | two questions from each of Levels 1–5 |
| Non-repeating cycle | ten complete runs exhaust all 100 source records |

`site/games/skybound-questions.js` is the bridge adapter. Four-option records are reduced deterministically to the correct answer and one plausible reviewed distractor. Spelling records become a correct spelling and a deterministic transposition error. The adapter never changes the answer, curriculum metadata, Learn support or selected year.

Every run has ten unique source questions. Sets 0–9 partition all 100 records in the selected year and subject; adjacent sets do not overlap. A later set wraps to the reviewed source pool. Selecting another year or subject resets the set to zero.

## Learning support

Every question exposes a separate Hint and Learn action. Learn shows:

1. a topic explanation tied to the live strand;
2. three steps for solving or checking the task;
3. a worked example that does not expose the live answer;
4. a final self-check.

The bridge remains a two-choice retrieval/application interaction. It is useful for fast practice, but it should not be interpreted as open-response mastery evidence.

## Runtime architecture

- `site/games/curriculum-year-banks.js` owns the validated 900-question registry.
- `site/games/curriculum-question-generator.js` supplies deterministic, year-scoped level batches.
- `site/games/skybound-questions.js` creates ten two-option bridge records and validates source uniqueness, year, subject, progression and support.
- `site/games/skybound-engine.js` is the renderer-independent state machine for answer lanes, falls, retries, checkpoints, completion and privacy-safe sharing.
- `site/games/skybound.js` owns Three.js presentation, wrapped sign textures, fixed-step movement, jumping, collision, glass collapse, orbit camera and responsive controls.
- `site/games/skybound-audio.js` synthesises ambience and cues with Web Audio; no audio files are downloaded.
- Checkpoints, posts and clouds are instanced. The twenty answer tiles remain individual because they change material and fall independently.

## Responsive behaviour

- Desktop uses WASD/arrows, Space, mouse orbit and Q/E.
- Touch uses an independent analogue stick, Jump pointer and swipe-to-orbit canvas.
- Portrait mobile gives the selector card one deliberate scroll region. Gameplay keeps a shallow question strip and two-column left/right legend above the tiles, leaving most of the bridge visible with controls at opposite bottom corners.
- Short landscape hides onboarding guidance, preserving all year/subject choices and the Start action without covering the bridge.
- Detailed Learn content appears only on request and scrolls inside a separate bounded teaching panel below the compact question strip.
- Text selection and callouts are disabled only on gameplay controls.

## Evidence and tests

Pure tests cover all nine year/subject combinations, 100-source exhaustion across ten runs, deterministic set creation, no adjacent overlap, two distinct options, spelling distractors, lane assignment, wrong-tile retry, checkpoint advancement, completion and private sharing. Browser review covers phone portrait, 1024 × 576 landscape, long Science answer signs and detailed English Learn support.

## Risks before classroom use

- Physical skill can mask curriculum knowledge. A future motor-assist option should widen tiles or offer guided jumps without changing questions.
- Formal classroom use still needs educator review of local sequencing, accessibility, reading load and misconception coverage.
- Physical Chromebook/tablet heat, keyboard-only, screen-reader and child usability testing remain required.
