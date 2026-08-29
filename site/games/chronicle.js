import { literacyChallenges } from '../assets/question-bank.js';
import { mountChallenge, toast } from '../assets/game-common.js';
let relics=0;const copy=document.querySelector('[data-story]');const scenes=['The map brightened. A silver path now led from the library to a watchtower drawn at the edge of the sea.','A note appeared in the margin: “Evidence opens doors that guesses cannot.”','The final line returned, and the keeper crest glowed above the archive door.'];
mountChallenge({challenges:literacyChallenges,onCorrect:()=>{relics=Math.min(5,relics+1);document.querySelector('[data-relics]').textContent=`${relics} / 5`;document.querySelectorAll('.relic')[relics-1]?.classList.add('earned');copy.textContent=scenes[(relics-1)%scenes.length];toast('Page restored')}});

