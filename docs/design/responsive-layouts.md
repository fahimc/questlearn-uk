# Responsive layout scenarios

## Extreme portrait: 320 × 800

- Landing actions become full-width.
- Game board remains first for spatial context; challenge card follows and page can scroll.
- Component content reflows, never shrinks below readable size.
- Profile/feedback secondary actions move to new rows.

## Common mobile: 390 × 844

- One-column landing/game browser.
- Three game cards keep full art and 44 px action targets.
- HUD uses one flex row for navigation, inventory, quest journal, help and pause; secondary labels are removed before controls shrink.
- A single drawer icon opens every owned construction block, letter and punctuation stone in a four-column overlay.
- The drawer stops world movement while open, stays above the touch controls and scrolls inside the available height.

## Tablet portrait: 768 × 1024

- Two-column component gallery and selected two-column content cards.
- Game board still sits above challenge if vertical space is stronger than width.
- Blocksmith automatically uses its low-power rendering tier on coarse-pointer tablets: DPR 0.85, no dynamic shadows, a shorter draw distance and a 60 FPS target, without removing quests, building, mining, animals or learning support.
- Hybrid touchscreen Chromebooks keep the touch controls and inventory drawer available even when the device also reports a fine trackpad pointer.

## Desktop: 1440 × 900

- Content width caps at 1180 px.
- Three game concepts sit in one row.
- Game board and challenge dock use roughly 70/30 width.

## Extreme short landscape: 844 × 390

- Nonessential brand chrome is removed in game pages.
- Game board and challenge dock appear side-by-side.
- Challenge answers use compact vertical rhythm but remain at least 40–44 px.
- Gameplay remains functional with browser/device safe areas.
- Blocksmith keeps movement and dig/place controls visible without clipping; the inventory drawer uses eight columns between the two control clusters, and its `420px` portrait safety floor is removed in this orientation.

## Blocksmith learning supports

- Learn and Hint controls stack on narrow portrait screens and remain side-by-side when width permits.
- The quest dialog scrolls within the safe viewport; opening teaching content never pushes its close or action controls outside reach.
- Mobile uses the same owned-block drawer for ordinary materials, letters and punctuation, so no second tray competes with movement controls.
- Desktop retains its fast numbered hotbar and letter tray while the mobile drawer keeps every item at a readable touch target.
- Active quest borders pulse in the 3D world while the compact current-quest tile remains available in the HUD.

## Skybound glass run

- The question is a compact DOM card over the 3D scene; the two answers stay physically attached to the left and right glass tiles.
- Learn and Hint expand inside the card and pause no gameplay state, allowing the learner to request support before jumping.
- Touch movement and Jump are independent pointer controls so the learner can run and jump at the same time.
- Portrait uses a full-width question below the HUD and bottom-corner controls. Short landscape uses a 300 px question card in the upper-left, smaller controls and the rest of the viewport for the bridge.
- All HUD elements use safe-area offsets. Gameplay controls disable selection and callouts without disabling selection in learning text.

## LexiClimb tower

- The full-screen Three.js course keeps its compact progress HUD at the top, a single next-gate objective below it and independent movement/jump controls at the bottom corners.
- The coin balance is a compact HUD button. On narrow phones all HUD items use a 36–38 px compact state so the added economy control does not overlap audio, help or pause.
- The character shop pauses traversal, uses a bounded two-column skin grid, keeps its close control visible and confines overflow to the grid. Skin cards show appearance, name and buy/owned/equipped state without relying on colour alone.
- Portrait stacks the three world choices, multiple-choice answers and completion actions into one thumb-friendly column inside a bounded onboarding card. Letter-bank gates retain five equal touch columns.
- Short landscape uses two answer columns, a ten-column letter bank and a shallower dialog so the complete challenge stays inside 844 × 390.
- The curriculum dialog owns the top layer and pauses movement; Learn and Hint expand inside its bounded scrolling area.
- Desktop and touch both retain orbital camera control without stealing the analogue or Jump pointers.

Visual baselines are generated in `docs/images/responsive/`; automated screenshots support review but do not replace physical device and assistive-technology testing.
