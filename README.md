# EduGames

EduGames is a safe, no-ad, no-chat browser-game portal backed by the open QuestLearn UK product blueprint. It is designed for learners aged 7–10 and combines:

- a referenced review of the curricula in England, Wales, Scotland and Northern Ireland;
- three original game plans inspired by voxel building, obstacle-course platforming and 2D adventure loops;
- a modular learning-engine and game-platform architecture;
- a consistent, accessible component library;
- three playable HTML prototypes, including a free-roaming 3D voxel quest world; and
- automated checks plus responsive visual evidence.

**Live site:** [edugames-189.netlify.app](https://edugames-189.netlify.app/)

**GitHub Pages mirror:** [fahimc.github.io/questlearn-uk](https://fahimc.github.io/questlearn-uk/)

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
4. High privacy by default; no advertising, chat or dark patterns.
5. Touch, keyboard, reduced-motion and small-screen support from the start.

This is a research and prototyping toolkit, not a certified curriculum or production safeguarding assessment.
