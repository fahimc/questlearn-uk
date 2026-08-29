# Blocksmith English quest bank

## Purpose

English Land turns spelling, vocabulary and punctuation into physical collection and construction. Learners dig beneath glowing rune markers, collect stone blocks carrying letters or punctuation, and arrange the blocks in a straight reading line. The validator reads the placed symbols in either approach direction, so camera orientation never changes whether a correct word is accepted.

The ten prototype quests apply the English progression summarised in [`england-years-3-5.md`](../research/england-years-3-5.md): Years 3–4 spelling patterns, prefixes, suffixes and homophones; increasingly accurate punctuation; and Year 5 statutory-pattern vocabulary. Year labels are recommended sequencing rather than a claim that schools must teach every item in the same term.

## Support design

Every quest has two learner-controlled support levels:

1. **Learn this** explains the concept or method with two different examples. It teaches the transferable idea without spelling the current answer.
2. **Show a hint** gives one next-step cue for the current challenge without supplying the finished word or punctuation.

Incorrect checks do not automatically expose the hint. They direct the learner back to these controls, preserving choice and productive struggle. Correct feedback may name the completed word because the learner has already demonstrated it with blocks.

## Quest sequence

| Quest | Suggested year | Focus | Build evidence | Learn focus | Hint approach |
|---|---|---|---|---|---|
| E01 The Missing Tile | Year 3 | Missing letter | One letter stone completing a common word | Test a sound between known letters | Say the complete word slowly |
| E02 Because Bridge | Year 3 | Statutory spelling | Seven ordered letter stones | Chunk and reread a longer word | Listen for the middle vowels |
| E03 Homophone Hollow | Year 3 | Homophones | Five ordered letters fitting sentence meaning | Choose spelling from context | Identify that the gap describes place |
| E04 Apostrophe Arch | Year 4 | Contractions | Seven symbols including an apostrophe | Apostrophe marks omitted letters | Expand the phrase to two words |
| E05 Question Quarry | Year 3 | End punctuation | One punctuation stone | Questions ask for information | Decide whether the sentence asks or tells |
| E06 Warning Woods | Year 4 | Exclamation marks | One punctuation stone | Strong commands and feelings | Read the warning with expression |
| E07 Beautiful Build | Year 4 | Statutory spelling | Nine ordered letter stones | Chunk and proofread tricky spelling | Check the unusual vowel group |
| E08 Separate Stones | Year 5 | Unstressed vowels | Eight ordered letter stones | Recall spelling patterns that speech obscures | Check the middle syllable |
| E09 Prefix Peak | Year 5 | Negative prefixes | Two ordered prefix letters | Prefix spelling may adapt to the next sound | Notice the first sound in the base word |
| E10 Suffix Summit | Year 5 | Noun-forming suffixes | Four ordered suffix letters | Add `-ness` to form an abstract noun | Decide what kind of word is needed |

## Buried block distribution

The English region begins east of the river. A fixed seeded allocator selects unreserved grid columns and places 298 deposits: repeated A–Z letters, extra high-frequency letters, and `?`, `!`, apostrophe, full stop and comma stones. Deposits do not occupy quests, beacons, trees, rocks, paths or resource fixtures. A small glowing rune on the turf makes a deposit easy to discover without revealing its symbol before digging.

Mining state and collected letter inventory persist locally. Removing an unfinished letter build returns its symbol to the tray. Completed word builds lock in place as monuments and award ordinary construction materials.

## Validation and safeguards

- Only letter and allowed punctuation symbols count for an English quest.
- Every symbol must be placed at one height in one uninterrupted horizontal axis.
- The exact symbol count must match the prompt before order is checked.
- Reversed world-axis order is accepted so the same visible word works when approached from either side.
- Prompts, Learn examples, hints and failure messages do not expose an internal answer plan.
- Automated tests cover correct order, reversed approach, incorrect symbols, non-linear placement and deterministic deposits.

