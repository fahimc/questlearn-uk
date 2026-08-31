import { validateDeepQuestionBank } from './question-banks/question-factory.js';
import { year3MathsQuestions } from './question-banks/year-3/maths.js';
import { year3ScienceQuestions } from './question-banks/year-3/science.js';
import { year3EnglishQuestions } from './question-banks/year-3/english.js';
import { year4MathsQuestions } from './question-banks/year-4/maths.js';
import { year4ScienceQuestions } from './question-banks/year-4/science.js';
import { year4EnglishQuestions } from './question-banks/year-4/english.js';
import { year5MathsQuestions } from './question-banks/year-5/maths.js';
import { year5ScienceQuestions } from './question-banks/year-5/science.js';
import { year5EnglishQuestions } from './question-banks/year-5/english.js';

export const CURRICULUM_YEARS=Object.freeze([3,4,5]);
export const CURRICULUM_SUBJECTS=Object.freeze(['english','maths','science']);
export const QUESTIONS_PER_YEAR_SUBJECT=100;

export const curriculumYearBanks=Object.freeze({
  3:Object.freeze({english:year3EnglishQuestions,maths:year3MathsQuestions,science:year3ScienceQuestions}),
  4:Object.freeze({english:year4EnglishQuestions,maths:year4MathsQuestions,science:year4ScienceQuestions}),
  5:Object.freeze({english:year5EnglishQuestions,maths:year5MathsQuestions,science:year5ScienceQuestions})
});

export const curriculumQuestionBank=Object.freeze(CURRICULUM_YEARS.flatMap(year=>CURRICULUM_SUBJECTS.flatMap(subject=>curriculumYearBanks[year][subject])));
export const CURRICULUM_BANK_COUNTS=Object.freeze({total:900,perYear:300,perYearSubject:100,maths:300,science:300,english:300});

export function getCurriculumQuestions({subject,year,level}={}){
  const yearNumber=year===undefined?undefined:Number(String(year).replace(/\D/g,''));
  return curriculumQuestionBank.filter(question=>(!subject||question.subject===subject)&&(!yearNumber||question.yearNumber===yearNumber)&&(!level||question.level===Number(level)));
}

export function validateCurriculumQuestionBank(bank=curriculumQuestionBank){
  if(!Array.isArray(bank)||bank.length!==CURRICULUM_BANK_COUNTS.total)throw new Error('The curriculum bank must contain exactly 900 questions.');
  for(const year of CURRICULUM_YEARS)for(const subject of CURRICULUM_SUBJECTS)validateDeepQuestionBank(bank.filter(question=>question.yearNumber===year&&question.subject===subject),{subject,year});
  const ids=new Set(),promptsByScope=new Map();
  for(const question of bank){if(ids.has(question.id))throw new Error(`Duplicate curriculum question ${question.id}`);ids.add(question.id);const scope=`${question.yearNumber}:${question.subject}`,prompts=promptsByScope.get(scope)||new Set(),prompt=question.prompt.toLocaleLowerCase('en-GB');if(prompts.has(prompt))throw new Error(`Duplicate prompt in ${scope}: ${question.id}`);prompts.add(prompt);promptsByScope.set(scope,prompts)}
  return true;
}

validateCurriculumQuestionBank();
