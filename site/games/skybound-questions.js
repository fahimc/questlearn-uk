import { createLevelQuestionSet } from './curriculum-question-generator.js';
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS } from './curriculum-year-banks.js';

export const SKYBOUND_QUESTION_COUNT=10;
export const SKYBOUND_YEARS=CURRICULUM_YEARS;
export const SKYBOUND_SUBJECT_IDS=CURRICULUM_SUBJECTS;

export const SKYBOUND_SUBJECTS=Object.freeze({
  english:Object.freeze({id:'english',name:'English',worldName:'Word Skyway',description:'Spelling, grammar, vocabulary and reading challenges.',accent:'#ff70c8'}),
  maths:Object.freeze({id:'maths',name:'Maths',worldName:'Number Skyway',description:'Number, calculation, fractions, measures and reasoning.',accent:'#54e4ef'}),
  science:Object.freeze({id:'science',name:'Science',worldName:'Discovery Skyway',description:'Living things, materials, forces, Earth and scientific evidence.',accent:'#9fe66f'})
});

function hashText(value){let hash=2166136261;for(const character of String(value)){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
function cleanScope({year=3,subject='maths',set=0}={}){const yearNumber=Number(year),safeSubject=SKYBOUND_SUBJECT_IDS.includes(subject)?subject:'maths';if(!SKYBOUND_YEARS.includes(yearNumber))throw new RangeError('Skybound year must be 3, 4 or 5.');return{year:yearNumber,subject:safeSubject,set:Math.max(0,Math.floor(Number(set)||0))}}
function createMisspelling(answer,seed){const letters=[...answer],start=hashText(seed)%Math.max(1,letters.length-1);for(let offset=0;offset<letters.length-1;offset+=1){const index=(start+offset)%(letters.length-1);if(letters[index]!==letters[index+1]){[letters[index],letters[index+1]]=[letters[index+1],letters[index]];return letters.join('')}}return `${answer.slice(0,-1)}${answer.at(-1)}${answer.at(-1)}`}
function adaptQuestion(question,{number,set}){const wrong=question.type==='choice'?question.options.filter(option=>option!==question.answer)[hashText(`${question.sourceId}:${set}:distractor`)%3]:createMisspelling(question.answer,`${question.sourceId}:${set}`);return Object.freeze({...question,id:`sky-${question.id}`,number,sourceType:question.type,type:'choice',options:Object.freeze([question.answer,wrong]),success:question.type==='spell'?`${question.answer} is the correct spelling.`:`${question.answer} is correct.`})}

export function getSkyboundSubject(subject='maths'){return SKYBOUND_SUBJECTS[subject]||SKYBOUND_SUBJECTS.maths}

export function createSkyboundQuestions(options={}){
  const scope=cleanScope(options),questions=[];
  for(let level=1;level<=5;level+=1){const selected=createLevelQuestionSet({subject:scope.subject,year:scope.year,level,set:scope.set,count:2});for(const question of selected)questions.push(adaptQuestion(question,{number:questions.length+1,set:scope.set}))}
  return Object.freeze(questions);
}

export const skyboundQuestions=createSkyboundQuestions();

export function validateSkyboundQuestions(questions=skyboundQuestions,{year=questions[0]?.yearNumber,subject=questions[0]?.subject}={}){
  if(!Array.isArray(questions)||questions.length!==SKYBOUND_QUESTION_COUNT)throw new TypeError(`Skybound needs exactly ${SKYBOUND_QUESTION_COUNT} questions.`);
  const ids=new Set(),sources=new Set();
  questions.forEach((question,index)=>{if(!question?.id||ids.has(question.id)||!question.sourceId||sources.has(question.sourceId))throw new TypeError('Skybound question and source IDs must be unique.');ids.add(question.id);sources.add(question.sourceId);if(question.number!==index+1||question.yearNumber!==Number(year)||question.subject!==subject||question.level!==Math.floor(index/2)+1)throw new TypeError(`${question.id} is outside the selected progression.`);if(question.options?.length!==2||new Set(question.options).size!==2||!question.options.includes(question.answer))throw new TypeError(`${question.id} needs two distinct options containing its answer.`);if(!question.objectiveId||question.prompt.length<12||!question.hint||!question.learn?.text||question.learn.steps?.length!==3||!question.learn.example||!question.learn.check||!question.success)throw new TypeError(`${question.id} is missing learning support.`)});
  return true;
}

validateSkyboundQuestions();
