# Responsive layout scenarios

## Extreme portrait: 320 × 800

- Landing actions become full-width.
- Game board remains first for spatial context; challenge card follows and page can scroll.
- Component content reflows, never shrinks below readable size.
- Profile/feedback secondary actions move to new rows.

## Common mobile: 390 × 844

- One-column landing/game browser.
- Three game cards keep full art and 44 px action targets.
- HUD uses compact pills; build grid remains tappable.

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

Visual baselines are generated in `docs/images/responsive/`; automated screenshots support review but do not replace physical device and assistive-technology testing.

