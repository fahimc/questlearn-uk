# Curriculum question bank and infinite variants

## Scope

The playable bank contains exactly **100 questions** for England Years 3–5: **34 Maths, 33 Science and 33 English**. The content is derived from the subject progression in [`england-years-3-5.md`](../research/england-years-3-5.md). It is prototype content for ages 7–10, not a replacement for teacher sequencing or assessment.

Every item has a stable ID, subject, curriculum objective ID, suggested year, difficulty level, strand, prompt, answer, interaction type, choices or letter tiles, a separate hint, a short Learn explanation and a worked example. Validation rejects duplicate IDs, missing support, invalid progression, choices without the answer, duplicate choices and spelling banks whose letters cannot construct the answer.

## Five-level progression

| Level | Suggested curriculum stage | Intended demand | Maths items | Science items | English items |
|---|---|---|---:|---:|---:|
| 1 | Year 3 foundation | one-step recall, recognise and identify | 7 | 7 | 6 |
| 2 | Year 3 application | use a familiar rule in context | 7 | 7 | 6 |
| 3 | Year 4 foundation | connect facts and representations | 7 | 7 | 7 |
| 4 | Year 4 independence / Year 5 bridge | select a method and interpret evidence | 7 | 6 | 6 |
| 5 | Year 5 application | multi-step reasoning and precise language | 6 | 6 | 8 |
| **Total** |  |  | **34** | **33** | **33** |

### Maths coverage

Place value; addition and subtraction; 3, 4, 8 and later times tables; division; tenths and decimals; simple and equivalent fractions; time; money; perimeter, area and volume; rounding; factor pairs and primes; negative numbers; metric conversion; angles; coordinates; tables and charts; percentages; and multi-step problems.

### Science coverage

Plants; nutrition, skeletons, muscles, digestion and teeth; rocks, fossils and soil; light and shadows; magnets, friction, gravity and air resistance; classification, habitats and food chains; states and changes of matter; sound; circuits and conductors; fair testing and reliable evidence; life cycles; separation; and Earth and space.

### English coverage

Year 3–4 spelling patterns and words; prefixes and suffixes; homophones; vocabulary; conjunctions, prepositions, pronouns and adverbs; present perfect; direct speech; apostrophes and commas; paragraphs; retrieval, inference, main idea and summary; Year 5 relative clauses, modal verbs and cohesion; fact/opinion; punctuation; and authorial language.

## Infinite-set rules

`curriculum-question-generator.js` accepts a subject, level and seed. The same seed always gives the same child-visible question and answer order, which makes bugs and classroom reports reproducible.

- Maths produces fresh operands for addition, selected times tables, equivalent fractions, rectangular area and percentages. Distractors are recalculated from each answer rather than copied from another item.
- Science rotates through an educator-authored fact pool and deterministically changes question and choice order. Scientific facts are never invented from free-form text.
- English rotates through an educator-authored language pool, changes choice order and reshuffles spelling tiles while preserving the exact answer letters.
- Every world set contains five level circuits in order, with five questions at the matching difficulty in each circuit: 25 questions in total. Each question belongs to its own physical wall. A new set changes the seed without changing the learning progression.
- Generated questions pass the same answerability checks as authored items. Seeds do not include learner names, answers or progress.

The generator is deliberately hybrid. Numeric relationships can vary parametrically; spelling, grammar and science claims stay inside reviewed pools. This avoids the unsafe claim that unreviewed prose is “curriculum correct” merely because it was generated.

## Runtime files

- `site/games/curriculum-question-bank.js`: canonical materialised 100-item bank and validator.
- `site/games/curriculum-question-generator.js`: deterministic seeded variants and configurable level-set builder.
- `site/games/wordwall-worlds.js`: subject-world definitions, themes and five-level, 25-question routes.
- `site/games/wordwall-course.js`: five path families repeated across 25 one-question wall checkpoints.
- `tests/curriculum-question-bank.test.js`: count, progression, deterministic generation and answerability checks.

## Review boundary

Correct completion is one piece of evidence, not proof of mastery. Attempts, Learn/Hint use, transfer to a changed seed and teacher judgement remain important. Before classroom release, educators should review wording, accessibility, misconception quality and local sequence; science facts and English word pools should be versioned when changed.
