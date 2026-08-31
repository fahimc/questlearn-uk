import { createLevelQuestionSet } from './curriculum-question-generator.js';
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS } from './curriculum-year-banks.js';

export const BLOCKSMITH_QUEST_COUNT=20;
export const BLOCKSMITH_YEARS=CURRICULUM_YEARS;
export const BLOCKSMITH_SUBJECT_IDS=CURRICULUM_SUBJECTS;
export const BLOCKSMITH_SETS=5;

export const BLOCKSMITH_SUBJECTS=Object.freeze({
  english:Object.freeze({id:'english',name:'English',worldName:'Wordcraft Expedition',description:'Spelling, grammar, vocabulary and reading quests.',accent:'#c38cff'}),
  maths:Object.freeze({id:'maths',name:'Maths',worldName:'Numbercraft Expedition',description:'Number, calculation, fractions, measures and reasoning quests.',accent:'#45e0d5'}),
  science:Object.freeze({id:'science',name:'Science',worldName:'Discovery Expedition',description:'Living things, materials, forces, Earth and evidence quests.',accent:'#9fe66f'})
});

export const BLOCKSMITH_ANSWER_MATERIALS=Object.freeze(['moss','wood','stone','glass']);

const slots=[
  [-30,-29],[-20,-29],[8,-29],[18,-29],
  [-30,-16],[-20,-16],[8,-16],[18,-16],
  [-30,-3],[-20,-3],[8,-3],[18,-3],
  [-30,10],[-20,10],[8,10],[18,10],
  [-30,23],[-20,23],[8,23],[18,23]
].map(([x,z])=>({zone:{x,z,width:6,depth:6},position:{x:x+2,z:z+7}}));
const colours=[0x45e0d5,0xffd166,0xff7a66,0x9d7bff,0x71dc83,0x5eb6ff,0xff9f43,0x5ee6a8,0xf06faf,0xa5d65c];
const ages={3:'7–8',4:'8–9',5:'9–10'};

function cleanScope({year=3,subject='maths',set=0}={}){
  const yearNumber=Number(year),safeSubject=BLOCKSMITH_SUBJECT_IDS.includes(subject)?subject:'maths';
  if(!BLOCKSMITH_YEARS.includes(yearNumber))throw new RangeError('Blocksmith year must be 3, 4 or 5.');
  return{year:yearNumber,subject:safeSubject,set:Math.max(0,Math.floor(Number(set)||0))%BLOCKSMITH_SETS};
}

function choiceQuest(question,index,scope){
  const answerIndex=question.options.indexOf(question.answer),answerMaterial=BLOCKSMITH_ANSWER_MATERIALS[answerIndex];
  return{
    ...question,id:`blocksmith-${question.id}`,number:String(index+1).padStart(2,'0'),age:ages[scope.year],interaction:'material-choice',
    title:`Level ${question.level} · ${question.title}`,targetBlocks:1,materialPlan:{[answerMaterial]:1},shape:{type:'count',label:'one answer block'},
    answerKey:question.options.map((option,optionIndex)=>({material:BLOCKSMITH_ANSWER_MATERIALS[optionIndex],option})),
    reward:{moss:2,wood:2,stone:2,glass:2},collectHint:'Mine or collect a material, then place one block matching the answer key inside the glowing pad.',
    success:`Correct: ${question.answer}.`,learn:{...question.learn,examples:[...question.learn.steps,question.learn.example,question.learn.check]},
    ...slots[index],colour:colours[index%colours.length]
  };
}

function spellingQuest(question,index,scope){
  const expected=question.answer.toLocaleUpperCase('en-GB');
  return{
    ...question,id:`blocksmith-${question.id}`,number:String(index+1).padStart(2,'0'),age:ages[scope.year],interaction:'spell',
    title:`Level ${question.level} · ${question.title}`,expected,targetBlocks:expected.length,materialPlan:null,
    shape:{type:'word-line',expectedSymbols:expected,label:'one straight reading line'},reward:{moss:2,wood:2,stone:2,glass:2},
    collectHint:'Letter stones are hidden underground at different depths. Dig across the world, then build the spelling in one straight line.',
    success:`Correct: ${question.answer} is the spelling.`,learn:{...question.learn,examples:[...question.learn.steps,question.learn.example,question.learn.check]},
    ...slots[index],colour:colours[index%colours.length]
  };
}

export function getBlocksmithSubject(subject='maths'){return BLOCKSMITH_SUBJECTS[subject]||BLOCKSMITH_SUBJECTS.maths}

export function createBlocksmithCurriculumQuests(options={}){
  const scope=cleanScope(options),selected=[];
  for(let level=1;level<=5;level+=1)selected.push(...createLevelQuestionSet({subject:scope.subject,year:scope.year,level,set:scope.set,count:4}));
  return Object.freeze(selected.map((question,index)=>Object.freeze(question.type==='spell'?spellingQuest(question,index,scope):choiceQuest(question,index,scope))));
}

export function validateBlocksmithCurriculumQuests(quests,{year=quests[0]?.yearNumber,subject=quests[0]?.subject}={}){
  if(!Array.isArray(quests)||quests.length!==BLOCKSMITH_QUEST_COUNT)throw new TypeError(`Blocksmith needs exactly ${BLOCKSMITH_QUEST_COUNT} quests.`);
  const ids=new Set(),sources=new Set();
  quests.forEach((quest,index)=>{
    if(!quest.id||ids.has(quest.id)||!quest.sourceId||sources.has(quest.sourceId))throw new TypeError('Blocksmith quest and source IDs must be unique.');
    ids.add(quest.id);sources.add(quest.sourceId);
    if(quest.number!==String(index+1).padStart(2,'0')||quest.yearNumber!==Number(year)||quest.subject!==subject||quest.level!==Math.floor(index/4)+1)throw new TypeError(`${quest.id} is outside the selected progression.`);
    if(!quest.objectiveId||!quest.hint||!quest.learn?.text||quest.learn.steps?.length!==3||quest.learn.examples?.length<5)throw new TypeError(`${quest.id} is missing learning support.`);
    if(quest.interaction==='material-choice'){
      if(quest.answerKey?.length!==4||new Set(quest.answerKey.map(item=>item.material)).size!==4||quest.materialPlan?.[quest.answerKey.find(item=>item.option===quest.answer)?.material]!==1)throw new TypeError(`${quest.id} has an invalid material answer key.`);
    }else if(quest.interaction==='spell'){
      if(quest.shape?.expectedSymbols!==quest.answer.toLocaleUpperCase('en-GB')||quest.targetBlocks!==[...quest.answer].length)throw new TypeError(`${quest.id} has an invalid spelling build.`);
    }else throw new TypeError(`${quest.id} has an unsupported interaction.`);
  });
  return true;
}

export const blocksmithCurriculumQuests=createBlocksmithCurriculumQuests();
validateBlocksmithCurriculumQuests(blocksmithCurriculumQuests);
