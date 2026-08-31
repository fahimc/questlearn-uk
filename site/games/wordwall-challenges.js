import { createWordwallWorldLevels, WORDWALL_LEVEL_COUNT, WORDWALL_QUESTIONS_PER_LEVEL } from './wordwall-worlds.js';

export const wordwallLevels=createWordwallWorldLevels('english',0);
export const wordwallChallenges=Object.freeze(wordwallLevels.flatMap(level=>level.questions));

export function validateWordwallChallenges(levels=wordwallLevels){
  if(levels.length!==WORDWALL_LEVEL_COUNT)throw new Error(`LexiClimb needs ${WORDWALL_LEVEL_COUNT} levels.`);
  const prompts=new Set();
  for(const level of levels){if(level.questions?.length!==WORDWALL_QUESTIONS_PER_LEVEL)throw new Error(`Level ${level.number} needs ${WORDWALL_QUESTIONS_PER_LEVEL} questions.`);for(const challenge of level.questions){const prompt=challenge.prompt?.trim().toLocaleLowerCase('en-GB');if(!challenge.answer||!prompt||!challenge.hint||!challenge.learn?.text||challenge.learn.steps?.length<3||!challenge.learn.example||!challenge.learn.check)throw new Error(`Incomplete challenge ${challenge.id}`);if(prompts.has(prompt))throw new Error(`Repeated challenge prompt ${challenge.id}`);prompts.add(prompt);if(challenge.type==='choice'&&!challenge.options.includes(challenge.answer))throw new Error(`Missing answer option for ${challenge.id}`);if(challenge.type==='spell'&&[...challenge.answer].sort().join('')!==[...challenge.letters].sort().join(''))throw new Error(`Letter bank mismatch for ${challenge.id}`)}}
  return true;
}
