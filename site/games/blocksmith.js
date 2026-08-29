import { mathsChallenges } from '../assets/question-bank.js';
import { mountChallenge, toast } from '../assets/game-common.js';

let materials = 3;
const materialCount = document.querySelector('[data-materials]');
const grid = document.querySelector('[data-build-grid]');
for (let index = 0; index < 42; index += 1) {
  const tile = document.createElement('button');
  tile.className = 'build-tile';
  tile.setAttribute('aria-label', `Build tile ${index + 1}`);
  tile.addEventListener('click', () => {
    if (tile.classList.contains('built')) return;
    if (materials < 1) return toast('Solve a brief to earn more blocks');
    tile.classList.add('built');
    tile.disabled = true;
    materials -= 1;
    materialCount.textContent = materials;
    toast(materials ? 'Block placed' : 'Nice build — earn more materials');
  });
  grid.append(tile);
}
mountChallenge({ challenges: mathsChallenges, subject: 'maths', onCorrect: () => { materials += 2; materialCount.textContent = materials; toast('+2 building blocks'); } });

