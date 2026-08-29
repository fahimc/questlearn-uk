# Safeguarding, privacy and inclusion

This is a design baseline, not legal advice or a completed DPIA/safeguarding review.

## Children’s Code product requirements

The ICO Children’s Code applies to information society services likely to be accessed by children. It contains 15 standards and places the child’s best interests first.

- High privacy by default.
- Collect and retain only the minimum personal data needed.
- Geolocation off by default and not required for learning missions.
- Profiling off by default unless there is a compelling, documented best-interests reason; learning adaptation must be explainable and bounded.
- No nudge that encourages unnecessary disclosure or weaker privacy.
- Age-appropriate explanations and accessible privacy controls.
- Complete a DPIA before production launch; maintain policy and community-standard enforcement.

For this product, guest play should work without an account. School accounts should use school-managed pseudonymous IDs. Never include advertising SDKs, cross-site trackers, biometric identification or precise location.

## Online interaction model

Default to solo, local co-play and teacher-controlled groups. No open direct messages, public usernames, user-supplied profile photos or public world publishing for ages 7–10. If collaboration is added, use curated phrases/emotes, teacher-created rooms, reporting/blocking, moderation, audit retention boundaries and clear adult supervision.

England’s online-safety guidance says pupils should learn respectful online behaviour, risks, reporting, personal data and persuasive design. The product should model these behaviours and can also teach them explicitly.

## Accessibility and inclusion

- WCAG 2.2 AA target for the surrounding interface.
- 44 × 44 CSS-pixel minimum interactive targets; no hover-only action.
- Keyboard alternatives for all touch/game actions and visible focus.
- Reduced-motion mode, pause controls, screen-shake toggle and no essential timed response by default.
- Captions/transcripts for speech; independent controls for music, effects and narration.
- Plain-language instructions with replayable audio and symbol support.
- Do not encode correctness by colour alone; add icon, label and text.
- Support zoom, narrow portrait (320 px), short landscape and touch-safe areas.
- Avoid penalising reading speed when the objective is not reading fluency.
- Content variants should preserve the same objective for dyslexia, visual, hearing, motor, attention and language needs.

## Session wellbeing

Use missions with clear endings. After roughly 20 minutes, offer a neutral stopping prompt. Never threaten streak/reward loss. Provide a “finish for now” path equal in visual weight to “continue”.

References: [ICO Age Appropriate Design Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/), [GOV.UK teaching online safety](https://www.gov.uk/government/publications/teaching-online-safety-in-schools/teaching-online-safety-in-schools), [Primary relationships education](https://www.gov.uk/government/publications/relationships-education-relationships-and-sex-education-rse-and-health-education/relationships-education-primary).

