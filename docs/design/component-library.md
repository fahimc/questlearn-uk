# Reusable component library

The live examples and image-capture routes are in [`site/components.html`](../../site/components.html). Each component owns its responsive behaviour and exposes content slots rather than curriculum-specific text.

| Component | Contract | Responsive behaviour | Accessibility |
|---|---|---|---|
| Action button | label, intent, disabled/loading | full width on narrow action rows | native button; focus; no icon-only primary |
| Objective header | plain objective, optional audio | wraps text; action stays 44 px | heading relationship; audio label |
| Answer choice | key, content, state, reason | stacked by default; 2 cols only for short options | button/radio semantics; icon + text state |
| Feedback panel | outcome, explanation, action | 3 cols → stacked | `role=status`; focus only when needed |
| Skill meter | skill, label, evidence summary | label stacks above meter | human label; do not expose false precision |
| Mission card | game, subject, duration, objective, action | vertical → horizontal | clear heading; one primary link |
| Game HUD | mission and essential counters | hides secondary labels on narrow/short | landmark label; pause always present |
| Touch controls | logical actions + key bindings | thumb zones; scales for short landscape | keyboard equivalent; labelled controls |
| Pause modal | state, save note, continue/finish | centred → full-height sheet on very narrow | native dialog target; focus trap in production |
| Learner profile | pseudonym, avatar token, skill summary | action moves below profile | avatar decorative or labelled correctly |
| Teacher insight | group, skill, action label | bars collapse to list; never horizontal scroll | text values accompany visuals |
| Empty state | explanation and first action | constrained readable width | no blame; actionable label |

## Composition rules

- Learning challenge = objective header + prompt + answer group + feedback + skill evidence.
- Game viewport = HUD + render surface + touch controls + toast; toast is never essential.
- Mission browser = filter + mission cards + empty state.
- Session end = evidence recap + reflection + next/finish actions of equal visual weight.

## Versioning

Component breaking changes require a migration note. Curriculum content must never contain raw layout markup; it supplies structured content. Games may theme tokens within contrast/motion boundaries but cannot replace feedback semantics.

## Preview images

`npm run screenshots` captures each isolated component to `docs/images/components/` and responsive whole-page views to `docs/images/responsive/`. The query format is `components.html?component=feedback`.

