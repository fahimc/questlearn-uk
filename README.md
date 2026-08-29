# QuestLearn UK

QuestLearn UK is an open product blueprint and interactive toolkit for mobile-first educational games aimed at learners aged 7–10. It combines:

- a referenced review of the curricula in England, Wales, Scotland and Northern Ireland;
- three original game plans inspired by voxel building, obstacle-course platforming and 2D adventure loops;
- a modular learning-engine and game-platform architecture;
- a consistent, accessible component library;
- three dependency-free playable HTML prototypes; and
- automated checks plus responsive visual evidence.

**Live toolkit:** [fahimc.github.io/questlearn-uk](https://fahimc.github.io/questlearn-uk/)

The detailed baseline is England's Key Stage 2 curriculum (Years 3–5 are the closest fit for ages 7–10). Devolved-nation mappings are explicit because there is no single UK-wide school curriculum.

## Explore

- [Research index](docs/research/README.md)
- [Platform architecture](docs/architecture/platform-architecture.md)
- [Design system](docs/design/design-system.md)
- [Game plans](docs/games/README.md)
- [Decision log](docs/decisions.md)
- [Component and responsive preview images](docs/images/README.md)

## Run locally

```sh
npm run dev
```

Open `http://127.0.0.1:4173`. The site is static and can also be opened directly from `site/index.html`.

## Verify

```sh
npm run test:all
npm run screenshots
```

## Project principles

1. Learning objective before game mechanic.
2. Evidence before mastery claims.
3. Challenge without shame; no public ranking of children.
4. High privacy by default; no advertising or dark patterns.
5. Touch, keyboard, reduced-motion and small-screen support from the start.

This is a research and prototyping toolkit, not a certified curriculum or production safeguarding assessment.
