import test from 'node:test';
import assert from 'node:assert/strict';
import { blocksmithQuests, isInsideQuestZone, validateQuestBuild } from '../site/games/blocksmith-quests.js';

test('Blocksmith provides six distinct curriculum-linked build quests',()=>{assert.equal(blocksmithQuests.length,6);assert.equal(new Set(blocksmithQuests.map(quest=>quest.id)).size,6);blocksmithQuests.forEach(quest=>{assert.ok(quest.objectiveId);assert.ok(quest.prompt);assert.ok(quest.targetBlocks>0);assert.ok(quest.reward>0)})});
test('half of 24 quest validates twelve actual blocks',()=>{const quest=blocksmithQuests.find(item=>item.id==='half-24');assert.equal(validateQuestBuild(quest,12).complete,true);assert.equal(validateQuestBuild(quest,11).difference,-1);assert.equal(validateQuestBuild(quest,13).difference,1)});
test('quest feedback tells the learner exactly how many blocks to change',()=>{const quest=blocksmithQuests[1];assert.match(validateQuestBuild(quest,4).message,/Add 2 more blocks/);assert.match(validateQuestBuild(quest,8).message,/Remove 2 blocks/)});
test('zone boundaries include the marked cells and exclude neighbours',()=>{const quest=blocksmithQuests[0];assert.equal(isInsideQuestZone(quest,quest.zone.x,quest.zone.z),true);assert.equal(isInsideQuestZone(quest,quest.zone.x+quest.zone.width-1,quest.zone.z+quest.zone.depth-1),true);assert.equal(isInsideQuestZone(quest,quest.zone.x-1,quest.zone.z),false)});
test('invalid build counts are rejected',()=>{assert.throws(()=>validateQuestBuild(blocksmithQuests[0],-1),TypeError);assert.throws(()=>validateQuestBuild(null,1),TypeError)});

