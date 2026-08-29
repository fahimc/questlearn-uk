/** Small reference implementation of the architecture documented in /docs. */
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function createLearnerState(seed = {}) {
  return {
    schemaVersion: 1,
    totalAttempts: 0,
    recentObjectives: [],
    skills: {},
    ...seed,
  };
}

export function recordAttempt(state, event) {
  if (!event?.objectiveId || typeof event.correct !== 'boolean') {
    throw new TypeError('An attempt needs objectiveId and correct');
  }
  const previous = state.skills[event.objectiveId] ?? { attempts: 0, correct: 0, mastery: 0.2, streak: 0 };
  const speedFactor = event.responseMs && event.responseMs < 3000 ? 0.02 : 0;
  const delta = event.correct ? 0.14 + speedFactor : -0.09;
  const nextSkill = {
    attempts: previous.attempts + 1,
    correct: previous.correct + Number(event.correct),
    mastery: Number(clamp(previous.mastery + delta, 0.05, 0.98).toFixed(2)),
    streak: event.correct ? previous.streak + 1 : 0,
  };
  return {
    ...state,
    totalAttempts: state.totalAttempts + 1,
    recentObjectives: [event.objectiveId, ...state.recentObjectives.filter((id) => id !== event.objectiveId)].slice(0, 5),
    skills: { ...state.skills, [event.objectiveId]: nextSkill },
  };
}

export function selectChallenge(challenges, state, options = {}) {
  const candidates = challenges.filter((item) => !options.subject || item.subject === options.subject);
  if (!candidates.length) throw new RangeError('No matching challenges');
  return [...candidates].sort((a, b) => {
    const aMastery = state.skills[a.objectiveId]?.mastery ?? 0.2;
    const bMastery = state.skills[b.objectiveId]?.mastery ?? 0.2;
    const aRecent = state.recentObjectives.indexOf(a.objectiveId);
    const bRecent = state.recentObjectives.indexOf(b.objectiveId);
    const aScore = aMastery + (aRecent === -1 ? -0.12 : (5 - aRecent) * 0.025);
    const bScore = bMastery + (bRecent === -1 ? -0.12 : (5 - bRecent) * 0.025);
    return aScore - bScore;
  })[0];
}

export function feedbackFor(challenge, choice) {
  const correct = String(choice) === String(challenge.answer);
  return {
    correct,
    title: correct ? 'That reasoning works!' : 'Good try — inspect the clue',
    message: correct ? challenge.success : challenge.hint,
    nextAction: correct ? 'Continue' : 'Try again',
  };
}

export function loadLocalState(key = 'questlearn-progress') {
  try { return createLearnerState(JSON.parse(localStorage.getItem(key) || '{}')); }
  catch { return createLearnerState(); }
}

export function saveLocalState(state, key = 'questlearn-progress') {
  try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* guest progress remains in memory */ }
}

