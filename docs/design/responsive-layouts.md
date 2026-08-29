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

Visual baselines are generated in `docs/images/responsive/`; automated screenshots support review but do not replace physical device and assistive-technology testing.
