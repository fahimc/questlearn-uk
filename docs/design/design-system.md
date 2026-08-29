# Design system: Quest UI

## Character

Confident, playful and calm. The visual language uses chunky geometry and tactile depth from games, balanced by high-legibility learning surfaces. It avoids toddler styling for older primary learners and avoids casino-like reward spectacle.

## Foundations

| Token | Value | Role |
|---|---:|---|
| `night` | `#071226` | immersive game shell, high-contrast surface |
| `ink` | `#08142B` | primary text |
| `paper` | `#F7F9FC` | learning/background surface |
| `quest-cyan` | `#41D9D0` | primary action and active progress |
| `action-coral` | `#FF6B5E` | physical challenge and emphasis |
| `reward-gold` | `#FFD166` | earned acknowledgement, focus outline |
| `story-violet` | `#9D7BFF` | narrative identity |
| `success-green` | `#73D58C` | correct state, always with icon/text |

Typography uses the system UI stack for speed and language coverage. Display headings are tightly tracked; learning copy uses comfortable normal tracking and 1.45–1.6 line height. Body text never relies on all caps.

## Shape and depth

14 px controls, 18–22 px cards, asymmetric 11/11/5/11 px brand tile. Depth is a single solid shadow/edge for press feedback, not ornamental gradients. Touch actions visually move on press.

## Responsive layout rules

- **320–479 px portrait:** one column, bottom/inline game controls, full-width primary actions, simplified HUD labels.
- **480–799 px:** one/two-column content; game board above challenge dock.
- **800–1199 px:** game board and learning dock side by side; component gallery two columns.
- **1200 px+:** cap reading/content width at 1180 px; do not stretch cards indefinitely.
- **Short landscape (<560 px height):** minimise chrome; game/canvas and challenge share horizontal space; safe scrolling remains in challenge dock.

Use `dvh` for game height, safe-area padding for notched devices and container-aware component internals where production support allows. Never assume portrait.

## Motion and audio

Motion communicates state: placement, landing, unlock and feedback. Standard UI transitions 120–250 ms. Respect `prefers-reduced-motion`; remove parallax, shake and large zoom. Audio channels: narration, effects and music independently controlled. Never use sound as the only feedback.

## Voice

- Specific: “4 × 8 = 32” rather than “Amazing!”
- Recoverable: “Inspect the equal rows” rather than “Wrong”.
- Non-judgemental: describe strategy and evidence, not intelligence.
- Child-readable: explain curriculum labels in plain language.
- Honest: “This is one piece of evidence” rather than “Mastered!”.

## Accessibility acceptance criteria

Keyboard and touch parity, visible focus, 44 px targets, semantic DOM overlay, 4.5:1 text contrast where required, state not colour-only, zoom/reflow, reduced motion, captions/transcripts, untimed option and manual orientation testing.

