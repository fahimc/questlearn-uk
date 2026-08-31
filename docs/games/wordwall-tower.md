# Game plan 3: LexiClimb Tower

## Playable promise

LexiClimb Tower is a third-person, block-character curriculum obby for UK learners aged 7–10. The player chooses **Word Quest**, **Number Nebula** or **Discovery Canopy**, then climbs five large, continuous circuits around a rising spiral. Every circuit contains five paths and five learning walls. Each world has the same traversal length and difficulty rhythm but its own English, Maths or Science question route.

The route mixes broad rainbow staircases, hexagonal prism tunnels, uphill runways, traversable donut rings and floating ribbons of boxes, circles and triangles. Falling returns the player to the latest wall checkpoint without losing learning progress. Bright browser obbies inform the broad genre pattern, but the world, character, routes, interface, questions, artwork and code are original EduGames work.

## Core loop

`Choose a subject world → cross a rainbow path → reach a wall → answer one question with Learn or Hint available → collapse the wall → continue to the next path`.

- Five levels each contain five complete path-to-wall sections. Every level rotates through all five path families so the traversal rhythm changes before each question.
- The entire course is authored on an invisible 0.5-world-unit grid. Each 26-unit checkpoint-to-checkpoint span reserves 3 units for each circular checkpoint and exactly 20 units for the path between them.
- Stair, tunnel-floor and uphill pieces use integer grid footprints that meet edge-to-edge. Their visible bodies extend down to the previous step so there are no interpenetrating slabs or false sky gaps between continuous pieces.
- Donut sections use three large 6-unit rings. Each has a 1.5-unit centre hole and a measured 1-unit fall gap before the next ring; those gaps are intentional jump spaces rather than placement errors.
- A sizing guard expands every platform to a safe-centre radius: 1.10 for boxes, 1.20 for circles, 1.35 for triangles and 1.05 across a donut walkway.
- Solid 0.48-radius body collision blocks platform sides; underside collision stops upward jumps through bases.
- Each path turns 60 degrees around a 26-unit-radius tower and rises 5 world units. Twenty-six circular checkpoint platforms connect all 25 paths without a level-loading break.
- Large physical **LEVEL 1–5** flags mark the start of each five-wall circuit. The HUD separately shows the current wall from 0/5 to 5/5.
- One coin sits on each path and a bonus coin appears on every fifth path, preserving 30 rewards per world in one instanced render batch.
- Each closed wall blocks its full front, back, sides and corners. One correct answer releases that wall; every fifth wall completes the current curriculum level.
- Repeated platforms, checkpoint rings and tunnel frames are instanced so the larger course remains practical on low-power tablets and Chromebooks.
- There is no timer, lives counter, public leaderboard, advertising or chat.

## Worlds and progression

| Level | Suggested stage | Word Quest | Number Nebula | Discovery Canopy |
|---|---|---|---|---|
| 1 | Year 3 foundation | spelling, vocabulary or sentence basics | place value and one-step calculation | identify plant, animal, rock, light or force facts |
| 2 | Year 3 application | homophones, reading and grammar in context | tables, division, fraction and measure application | connect plant/body/material/force systems |
| 3 | Year 4 foundation | paragraphs, inference, pronouns and punctuation | rounding, factors, decimals, fractions and area | classification, food chains, matter, sound and circuits |
| 4 | Year 4 independence | fronted adverbials, summary, affixes and word class | negative numbers, conversion, angles and coordinates | habitats, water cycle, pitch, conductors and evidence |
| 5 | Year 5 application | clauses, modal verbs, cohesion and author language | primes, fractions, percentage, volume and multi-step work | life cycles, solutions, separation, space and forces |

All three worlds always contain five levels ordered Levels 1–5, with five questions and five separate walls at each level: 25 questions in a completed world. Every question in a circuit uses that level's curriculum difficulty. “New question set” advances the deterministic seed and builds another 25-wall route at the same progression. See [`curriculum-question-bank.md`](curriculum-question-bank.md) for the 100-item authored bank and generation limits.

Every gate has a learner-controlled explanation, separate hint, age-readable feedback and teaching example. Learn text explains a transferable method and does not simply reveal the live answer.

## Coins and character skins

- The HUD coin button opens a responsive character shop and pauses movement and ambient sound.
- Candy Climber is free. Ocean Explorer costs 5 coins, Solar Sprinter costs 9 and Galaxy Hero costs 14; one 30-coin world can unlock all three.
- Coin IDs include world and set scope. Reloading or falling cannot duplicate an already collected coin, while a genuinely new question set has a new reward route.
- The validated, versioned profile stores balance, collected IDs, owned skins and equipped skin only on the device. Sharing never includes this data.

## Runtime and responsive behaviour

- `curriculum-question-bank.js` owns the validated 100 authored items; `curriculum-question-generator.js` owns deterministic variants.
- `wordwall-worlds.js` owns the three subject themes and guarantees five progressive levels with five deterministic questions in each.
- `wordwall-course.js` owns the deterministic 25-path plan, hidden-grid placement, non-overlap validation, route-family rotation, minimum sizing and tunnel/ring metadata.
- `wordwall-engine.js` is renderer-independent and owns one-question-per-wall progression, level boundaries, collision, support sizing, rewards, skins and privacy-safe sharing.
- `wordwall.js` composes batched Three.js presentation with faster camera-relative movement, higher buffered jumping, analogue input, orbit camera, procedural audio and low-power selection.
- Each current wall has three guarded activation routes: landing on its checkpoint, touching or stepping close to either face, and an on-screen **Open question** fallback that works only within the same proximity zone.
- Desktop uses WASD/arrows, Space, mouse drag and Q/E. Touch uses an independent analogue pointer, Jump pointer and swipe-to-orbit canvas.
- Portrait layouts stack world choices and challenge options inside a bounded scrolling card. Short landscape hides the onboarding guide, keeps all three world choices visible and preserves the game view.

## Risks and next tests

- Motor difficulty can mask curriculum knowledge. A future assist mode should widen platforms without changing gate content.
- The bank is a prototype sampling of the curriculum, not a diagnostic assessment. Production needs teacher review, misconception codes and spaced retrieval.
- Physical Chromebook/tablet heat, keyboard-only, screen-reader challenge-layer and child usability testing remain required before classroom use.
