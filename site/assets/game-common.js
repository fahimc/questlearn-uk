import { feedbackFor, loadLocalState, recordAttempt, saveLocalState, selectChallenge } from './learning-engine.js';

export function mountChallenge({ challenges, subject, onCorrect = () => {}, onWrong = () => {} }) {
  let state = loadLocalState();
  let challenge = selectChallenge(challenges, state, { subject });
  let started = Date.now();
  const prompt = document.querySelector('[data-prompt]');
  const objective = document.querySelector('[data-objective]');
  const answers = document.querySelector('[data-answers]');
  const feedback = document.querySelector('[data-feedback]');
  const progress = document.querySelector('[data-progress]');

  function render() {
    prompt.textContent = challenge.prompt;
    objective.textContent = challenge.objectiveId;
    const mastery = state.skills[challenge.objectiveId]?.mastery ?? .2;
    progress.style.setProperty('--progress', `${Math.round(mastery * 100)}%`);
    answers.innerHTML = '';
    feedback.className = 'feedback';
    feedback.innerHTML = '';
    challenge.options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'answer';
      button.textContent = option;
      button.addEventListener('click', () => choose(option, button));
      answers.append(button);
    });
    started = Date.now();
  }

  function choose(choice, button) {
    const result = feedbackFor(challenge, choice);
    state = recordAttempt(state, { objectiveId: challenge.objectiveId, correct: result.correct, responseMs: Date.now() - started });
    saveLocalState(state);
    answers.querySelectorAll('button').forEach((item) => { item.disabled = true; });
    button.classList.add(result.correct ? 'correct' : 'incorrect');
    feedback.className = 'feedback show';
    feedback.innerHTML = `<strong>${result.title}</strong>${result.message}`;
    if (result.correct) {
      onCorrect(challenge, state);
      setTimeout(() => { challenge = selectChallenge(challenges.filter((item) => item.id !== challenge.id), state, { subject }); render(); }, 1250);
    } else {
      onWrong(challenge, state);
      setTimeout(() => { answers.querySelectorAll('button').forEach((item) => { item.disabled = false; item.classList.remove('incorrect'); }); }, 1000);
    }
  }
  render();
  return { getState: () => state };
}

export function toast(message) {
  const element = document.querySelector('[data-toast]');
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 1100);
}

