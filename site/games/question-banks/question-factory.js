import { createCurriculumLearning } from '../curriculum-learning-guides.js';

const SUBJECT_NAMES=Object.freeze({maths:'Maths',science:'Science',english:'English'});
const SUBJECT_CODES=Object.freeze({maths:'MAT',science:'SCI',english:'ENG'});

function clean(value){return String(value).trim()}
function objectiveId(subject,year,strand){return `${SUBJECT_CODES[subject]}-Y${year}-${clean(strand).toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`}
function unique(values){return [...new Set(values.map(clean))]}
function frozenQuestion(question){if(question.type==='choice')question.options=Object.freeze(question.options);if(question.type==='spell')question.letters=Object.freeze(question.letters);return Object.freeze(question)}

export function createChoiceQuestion({id,subject,year,level,strand,prompt,answer,wrong,generatorId,hint}){
  const safeAnswer=clean(answer),options=unique([safeAnswer,...wrong]);
  if(options.length!==4)throw new Error(`${id} needs one answer and three unique distractors.`);
  const learn=createCurriculumLearning({subject,strand,generatorId});
  return frozenQuestion({id,sourceId:id,subject,subjectName:SUBJECT_NAMES[subject],objectiveId:objectiveId(subject,year,strand),year:`Year ${year}`,yearNumber:year,level,strand,type:'choice',title:strand,prompt:clean(prompt),answer:safeAnswer,options,hint:hint||`Use the ${strand.toLocaleLowerCase('en-GB')} rule, then test every choice.`,learn,success:`Correct. ${learn.example}`,generatorId});
}

export function createSpellingQuestion({id,year,level,strand='Spelling',word,clue,hint,generatorId='spelling-word'}){
  const answer=clean(word).toLocaleLowerCase('en-GB').replaceAll(' ',''),shift=(year+level+id.length)%answer.length,letters=[...answer.slice(shift),...answer.slice(0,shift)].reverse(),learn=createCurriculumLearning({subject:'english',strand,generatorId});
  return frozenQuestion({id,sourceId:id,subject:'english',subjectName:'English',objectiveId:objectiveId('english',year,strand),year:`Year ${year}`,yearNumber:year,level,strand,type:'spell',title:strand,prompt:clean(clue),answer,letters,hint:clean(hint),learn,success:`Correct. ${learn.example}`,generatorId});
}

export function buildMathsYearBank(year,levelSkills){
  return Object.freeze(levelSkills.flatMap((skills,levelIndex)=>skills.flatMap((skill,skillIndex)=>Array.from({length:5},(_,variant)=>{
    const item=skill(variant),id=`mat-y${year}-l${levelIndex+1}-${skillIndex+1}-${variant+1}`;
    return createChoiceQuestion({id,subject:'maths',year,level:levelIndex+1,...item});
  }))));
}

const CONCEPT_FIELDS=Object.freeze([
  ['description',concept=>`Which description best matches ${concept.term}?`],
  ['example',concept=>`Which example shows ${concept.term}?`],
  ['purpose',concept=>`Which job or result belongs with ${concept.term}?`],
  ['evidence',concept=>`Which observation gives evidence about ${concept.term}?`],
  ['link',concept=>`Which link involving ${concept.term} is correct?`]
]);

export function buildScienceYearBank(year,levels){
  return Object.freeze(levels.flatMap((concepts,levelIndex)=>concepts.flatMap((concept,conceptIndex)=>CONCEPT_FIELDS.map(([field,prompt],fieldIndex)=>createChoiceQuestion({
    id:`sci-y${year}-l${levelIndex+1}-${conceptIndex+1}-${fieldIndex+1}`,subject:'science',year,level:levelIndex+1,strand:concept.strand,prompt:prompt(concept),answer:concept[field],wrong:concepts.filter(item=>item!==concept).map(item=>item[field]),generatorId:concept.generatorId,hint:`Think about ${concept.term} and which choice matches the scientific evidence.`
  })))));
}

const ENGLISH_FIELDS=Object.freeze([
  ['description',concept=>`Which description matches ${concept.term}?`],
  ['example',concept=>`Which example uses ${concept.term} correctly?`],
  ['purpose',concept=>`Why do readers or writers use ${concept.term}?`],
  ['check',concept=>`Which check helps you use ${concept.term}?`]
]);

export function buildEnglishYearBank(year,levels){
  return Object.freeze(levels.flatMap(({concepts,spelling},levelIndex)=>[
    ...concepts.flatMap((concept,conceptIndex)=>ENGLISH_FIELDS.map(([field,prompt],fieldIndex)=>createChoiceQuestion({
      id:`eng-y${year}-l${levelIndex+1}-${conceptIndex+1}-${fieldIndex+1}`,subject:'english',year,level:levelIndex+1,strand:concept.strand,prompt:prompt(concept),answer:concept[field],wrong:concepts.filter(item=>item!==concept).map(item=>item[field]),generatorId:concept.generatorId,hint:`Read every choice and apply the ${concept.term} rule to the whole sentence or clue.`
    }))),
    ...spelling.map((item,index)=>createSpellingQuestion({id:`eng-y${year}-l${levelIndex+1}-spell-${index+1}`,year,level:levelIndex+1,...item}))
  ]));
}

export function validateDeepQuestionBank(bank,{subject,year,count=100}={}){
  if(!Array.isArray(bank)||bank.length!==count)throw new Error(`Year ${year} ${subject} bank must contain exactly ${count} questions.`);
  const ids=new Set(),prompts=new Set();
  for(const question of bank){const prompt=question.prompt.toLocaleLowerCase('en-GB');if(ids.has(question.id))throw new Error(`Duplicate question id ${question.id}`);if(prompts.has(prompt))throw new Error(`Duplicate prompt ${question.id}`);ids.add(question.id);prompts.add(prompt);if(question.subject!==subject||question.yearNumber!==year||question.year!==`Year ${year}`||question.level<1||question.level>5)throw new Error(`Wrong scope for ${question.id}`);if(!question.objectiveId||!question.answer||question.prompt.length<12||question.prompt.length>150||question.hint.length<10)throw new Error(`Incomplete game question ${question.id}`);if(!question.learn?.text||question.learn.steps?.length!==3||!question.learn.example||!question.learn.check)throw new Error(`Incomplete Learn support ${question.id}`);if(question.type==='choice'&&(!question.options.includes(question.answer)||question.options.length!==4||new Set(question.options).size!==4))throw new Error(`Invalid choices ${question.id}`);if(question.type==='spell'&&[...question.answer].sort().join('')!==[...question.letters].sort().join(''))throw new Error(`Invalid spelling tiles ${question.id}`)}
  for(let level=1;level<=5;level+=1)if(bank.filter(question=>question.level===level).length!==20)throw new Error(`Year ${year} ${subject} level ${level} must contain 20 questions.`);
  return true;
}
