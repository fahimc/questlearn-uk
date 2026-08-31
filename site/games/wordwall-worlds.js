import { createLevelQuestionSet, validateGeneratedQuestion } from './curriculum-question-generator.js';

export const WORDWALL_WORLD_IDS=Object.freeze(['english','maths','science']);
export const WORDWALL_LEVEL_COUNT=5;
export const WORDWALL_QUESTIONS_PER_LEVEL=10;

export const WORDWALL_WORLDS=Object.freeze({
  english:Object.freeze({id:'english',name:'Word Quest',subject:'english',subjectName:'English',icon:'Aa',description:'Spelling, vocabulary, grammar and reading clues.',sky:0x79d9ef,fog:0x79d9ef,core:0x5640a2,groundLight:0x604b8b,palette:Object.freeze([0xff62c7,0x835cff,0x45d9e8,0xffc94f,0x61dd88])}),
  maths:Object.freeze({id:'maths',name:'Number Nebula',subject:'maths',subjectName:'Maths',icon:'×',description:'Number, tables, fractions, measure and problem solving.',sky:0x6bb4ff,fog:0x6bb4ff,core:0x174b8c,groundLight:0x17345f,palette:Object.freeze([0x31d6ff,0x2f7cf6,0x6e62ff,0xffc83d,0xff6b6b])}),
  science:Object.freeze({id:'science',name:'Discovery Canopy',subject:'science',subjectName:'Science',icon:'⚗',description:'Plants, animals, materials, forces, circuits and space.',sky:0x8ce1c1,fog:0x8ce1c1,core:0x176b57,groundLight:0x255b4d,palette:Object.freeze([0x37d67a,0x18b7a0,0xe3c94c,0xff8d4d,0x6c73ff])})
});

export function getWordwallWorld(worldId='english'){return WORDWALL_WORLDS[worldId]||WORDWALL_WORLDS.english}

export function createWordwallWorldLevels(worldId='english',set=0){
  const world=getWordwallWorld(worldId);
  return Object.freeze(Array.from({length:WORDWALL_LEVEL_COUNT},(_,index)=>{const level=index+1,questions=createLevelQuestionSet({subject:world.subject,level,set,count:WORDWALL_QUESTIONS_PER_LEVEL}).map((question,questionIndex)=>Object.freeze({...question,number:questionIndex+1,worldId:world.id,levelNumber:level}));return Object.freeze({id:`${world.id}-level-${level}`,worldId:world.id,number:level,level,year:questions[0].year,title:`Level ${level}`,questions:Object.freeze(questions)})}));
}

export function createWordwallWorldQuestions(worldId='english',set=0){return Object.freeze(createWordwallWorldLevels(worldId,set).flatMap(level=>level.questions))}

export function validateWordwallWorlds(worlds=WORDWALL_WORLDS){
  for(const id of WORDWALL_WORLD_IDS){const world=worlds[id];if(!world||world.id!==id||!world.subjectName||world.palette.length!==WORDWALL_LEVEL_COUNT)throw new Error(`Invalid Wordwall world ${id}`);const levels=createWordwallWorldLevels(id,0);if(levels.length!==WORDWALL_LEVEL_COUNT)throw new Error(`Invalid level route for ${id}`);for(const [index,level] of levels.entries()){if(level.number!==index+1||level.questions.length!==WORDWALL_QUESTIONS_PER_LEVEL||level.questions.some(question=>question.level!==level.number||!validateGeneratedQuestion(question)))throw new Error(`Invalid question route for ${id} level ${index+1}`)}}return true;
}
