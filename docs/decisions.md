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

## ADR-004: Static hosting with a pinned 3D runtime

**Decision:** the toolkit remains a static GitHub Pages site. Blocksmith uses a pinned Three.js browser module for its 3D vertical slice; the smaller prototypes use native HTML, CSS and JavaScript.

**Why:** static hosting keeps the prototype transparent and portable while a proven rendering runtime makes the voxel interaction testable. Production still requires bundling, integrity review and representative-device performance testing.

## ADR-005: Ethical engagement boundary

**Decision:** keep expressive movement, creation, immediate feedback and short goals; reject ads, loot boxes, public child ranks, streak loss and infinite-session pressure.

**Why:** the product is likely to be accessed by children and must place their best interests before retention metrics.

## ADR-006: Materials are learning evidence, not a detached reward

**Decision:** Blocksmith quests require learners to dig named materials and use them in count, array, perimeter, fraction, volume and percentage builds. Validators inspect the placed materials and geometry.

**Why:** collecting remains meaningful play while the construction itself demonstrates the curriculum idea. Regrowing deposits and returned unfinished blocks prevent scarcity from punishing experimentation.

## ADR-007: EduGames uses a game-portal discovery pattern

**Decision:** rename the public experience EduGames and use an original dark, search-led portal with a subject rail, category shelf, featured game and image-led game grid. Keep “No ads” and “No chats” visible in the first viewport. Generated artwork is original and carries no third-party branding or embedded copy.

**Why:** familiar game discovery reduces friction for children, while original identity and explicit safety messaging distinguish the educational purpose and avoid copying another portal’s protected branding or assets.

## ADR-008: Netlify is the primary preview host

**Decision:** publish the static `site/` directory to Netlify using `netlify.toml`; keep GitHub Pages as a mirror.

**Why:** Netlify provides a direct production preview and cache/security header configuration without changing the dependency-free static architecture.
