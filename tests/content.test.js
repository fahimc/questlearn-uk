import test from 'node:test';
import assert from 'node:assert/strict';
import { allChallenges } from '../site/assets/question-bank.js';

test('challenge IDs and curriculum objective IDs are present',()=>{const ids=new Set();for(const item of allChallenges){assert.ok(item.id);assert.ok(item.objectiveId);assert.ok(item.subject);assert.ok(item.prompt);assert.ok(item.options.includes(item.answer));assert.ok(item.hint.length>20);assert.ok(item.success.length>20);assert.equal(ids.has(item.id),false);ids.add(item.id)}});
test('every challenge has plausible choice count',()=>{allChallenges.forEach((item)=>assert.ok(item.options.length>=3&&item.options.length<=5))});

