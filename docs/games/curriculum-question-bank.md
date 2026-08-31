# Year-tailored curriculum question bank

## Scope

The playable bank contains exactly **900 reviewed question records** for England Years 3–5: 100 English, 100 Maths and 100 Science questions in each year. That is 300 questions per year and 300 per subject. The content follows the subject progression in [`england-years-3-5.md`](../research/england-years-3-5.md) and the deep year reviews for [Year 3](../research/question-banks/year-3.md), [Year 4](../research/question-banks/year-4.md) and [Year 5](../research/question-banks/year-5.md).

This is age-tailored practice content, not a replacement for teacher sequencing or diagnostic assessment. Selecting a year is a hard content boundary: a Year 3 run cannot receive a Year 4 or Year 5 source item.

## Bank dimensions

| Year | English | Maths | Science | Total |
|---|---:|---:|---:|---:|
| Year 3 (ages 7–8) | 100 | 100 | 100 | 300 |
| Year 4 (ages 8–9) | 100 | 100 | 100 | 300 |
| Year 5 (ages 9–10) | 100 | 100 | 100 | 300 |
| **Total** | **300** | **300** | **300** | **900** |

Each year-and-subject bank has five in-year difficulty levels with 20 questions per level. A LexiClimb world draws five questions from each level, producing 25 one-question walls. Four consecutive question sets therefore exhaust all 100 source records in that selected year and subject without repetition.

## Game-suitability contract

Every record has a stable ID, jurisdiction, year, subject, level, strand, curriculum objective, concise prompt, interaction type, answer, answer options or exact spelling tiles, hint and question-linked Learn support. Automated validation rejects:

- counts other than 100 per year and subject or 20 per in-year level;
- duplicate IDs or duplicate visible prompts within a year-and-subject scope;
- missing answers, hints, teaching explanations, worked examples or self-checks;
- multiple-choice tasks without exactly one answer among four distinct options;
- spelling tasks whose tile multiset does not exactly construct the answer;
- prompts that expose a spelling answer;
- overlong prompts or options that do not fit the wall interaction.

Questions use short, single-focus interactions suitable for movement games. Maths relationships may be materialised from bounded deterministic templates; English examples and Science claims remain in reviewed author data. Distractors represent plausible nearby misconceptions without trick wording.

## Runtime selection

`curriculum-question-generator.js` accepts `subject`, `year`, `level`, `set` and `count`. It shuffles only reviewed records and their presentation order; it does not invent new facts or move content between years.

- The same selection produces the same sequence, making gameplay bugs reproducible.
- A 25-wall world has five disjoint questions at every level and no repeated prompt.
- Sets 0–3 partition the 20 questions at each level into four groups of five. Across four complete worlds, all 100 records are seen once.
- A later set wraps predictably to the reviewed pool. Adjacent sets remain disjoint at the wrap boundary.
- Learn support explains the live skill, gives a three-step method, uses a different worked example and ends with a check. It teaches the method without printing the live answer.

## Runtime files

- `site/games/question-banks/year-{3,4,5}/{english,maths,science}.js`: nine deep 100-question banks.
- `site/games/question-banks/question-factory.js`: shared constructors and strict per-bank validation.
- `site/games/curriculum-year-banks.js`: 900-item registry, scoped lookup and aggregate validation.
- `site/games/curriculum-question-bank.js`: compatibility export for existing consumers.
- `site/games/curriculum-learning-guides.js`: question-aware teaching explanations and checks.
- `site/games/curriculum-question-generator.js`: deterministic, year-scoped selection.
- `site/games/wordwall-worlds.js`: year-and-subject routes with five levels and 25 walls.
- `tests/curriculum-question-bank.test.js`: counts, year boundaries, presentation safety and non-repetition tests.

## Review boundary

The content was reviewed for curriculum fit, arithmetic consistency, answerability, concise game presentation and support quality. Before formal classroom assessment use, educators should still review local sequencing, reading load, SEND accessibility, misconception coverage and scientific phrasing. Correct wall completion is evidence of one response, not proof of mastery.
