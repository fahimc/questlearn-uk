import { createWordwallWorldQuestions, WORDWALL_LEVEL_COUNT } from './wordwall-worlds.js';

export const wordwallChallenges=createWordwallWorldQuestions('english',0);

export function validateWordwallChallenges(challenges=wordwallChallenges){
  if(challenges.length!==WORDWALL_LEVEL_COUNT)throw new Error(`LexiClimb needs ${WORDWALL_LEVEL_COUNT} gate challenges.`);
  for(const challenge of challenges){if(!challenge.answer||!challenge.prompt||!challenge.hint||!challenge.learn?.text)throw new Error(`Incomplete challenge ${challenge.id}`);if(challenge.type==='choice'&&!challenge.options.includes(challenge.answer))throw new Error(`Missing answer option for ${challenge.id}`);if(challenge.type==='spell'&&[...challenge.answer].sort().join('')!==[...challenge.letters].sort().join(''))throw new Error(`Letter bank mismatch for ${challenge.id}`)}
  return true;
}
