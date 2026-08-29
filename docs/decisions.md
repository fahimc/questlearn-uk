# Architecture and product decisions

## ADR-001: England detail plus explicit UK crosswalk

**Decision:** use England Years 3–5 as detailed starter content and represent Wales, Scotland and Northern Ireland through jurisdiction links to a neutral skill graph.

**Why:** education is devolved; a fake single UK year map would be inaccurate.

## ADR-002: Learning engine separate from game engines

**Decision:** games request challenges and return evidence through versioned contracts.

**Why:** curriculum updates, adaptation and reporting must remain consistent across genres.

## ADR-003: DOM learning UI over rendered game surface

**Decision:** prompts, controls and feedback use semantic DOM overlays.

**Why:** stronger reflow, keyboard, screen-reader and localisation behaviour than canvas-only UI.

## ADR-004: No external runtime in the prototype

**Decision:** prototypes use HTML/CSS/Canvas and native JavaScript; Babylon.js/Phaser are production candidates.

**Why:** the toolkit deploys as a transparent, dependency-free GitHub Pages site while engine selection remains subject to device spikes.

## ADR-005: Ethical engagement boundary

**Decision:** keep expressive movement, creation, immediate feedback and short goals; reject ads, loot boxes, public child ranks, streak loss and infinite-session pressure.

**Why:** the product is likely to be accessed by children and must place their best interests before retention metrics.

