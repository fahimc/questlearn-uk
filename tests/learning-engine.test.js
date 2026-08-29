import test from 'node:test';
import assert from 'node:assert/strict';
import { createLearnerState, feedbackFor, recordAttempt, selectChallenge } from '../site/assets/learning-engine.js';
import { mathsChallenges } from '../site/assets/question-bank.js';

test('creates a minimal learner state',()=>{assert.deepEqual(createLearnerState().skills,{});assert.equal(createLearnerState().schemaVersion,1)});
test('records correct evidence without mutating the prior state',()=>{const before=createLearnerState();const after=recordAttempt(before,{objectiveId:'skill.one',correct:true,responseMs:2500});assert.equal(before.totalAttempts,0);assert.equal(after.totalAttempts,1);assert.equal(after.skills['skill.one'].correct,1);assert.ok(after.skills['skill.one'].mastery>0.2)});
test('incorrect evidence lowers estimate but preserves a nonzero floor',()=>{let state=createLearnerState();for(let index=0;index<10;index+=1)state=recordAttempt(state,{objectiveId:'skill.one',correct:false});assert.equal(state.skills['skill.one'].mastery,.05);assert.equal(state.skills['skill.one'].streak,0)});
test('invalid evidence is rejected',()=>{assert.throws(()=>recordAttempt(createLearnerState(),{correct:true}),TypeError)});
test('selector prefers an unpractised low-confidence objective',()=>{let state=createLearnerState();const first=mathsChallenges[0];for(let index=0;index<4;index+=1)state=recordAttempt(state,{objectiveId:first.objectiveId,correct:true});const chosen=selectChallenge(mathsChallenges,state,{subject:'maths'});assert.notEqual(chosen.objectiveId,first.objectiveId)});
test('selector rejects an empty candidate set',()=>{assert.throws(()=>selectChallenge(mathsChallenges,createLearnerState(),{subject:'music'}),RangeError)});
test('feedback explains correct and incorrect choices',()=>{const challenge=mathsChallenges[0];assert.equal(feedbackFor(challenge,challenge.answer).correct,true);assert.match(feedbackFor(challenge,'12').message,/rows/i)});

