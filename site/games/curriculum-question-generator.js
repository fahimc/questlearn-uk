import { getCurriculumQuestions } from './curriculum-question-bank.js';

function hashSeed(value){let hash=2166136261;for(const character of String(value)){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
function randomFrom(seed){let state=hashSeed(seed)||1;return()=>{state+=0x6d2b79f5;let value=state;value=Math.imul(value^value>>>15,value|1);value^=value+Math.imul(value^value>>>7,value|61);return((value^value>>>14)>>>0)/4294967296}}
function integer(random,min,max){return Math.floor(random()*(max-min+1))+min}
function shuffle(values,random){const result=[...values];for(let index=result.length-1;index>0;index-=1){const swap=integer(random,0,index);[result[index],result[swap]]=[result[swap],result[index]]}return result}
function uniqueOptions(answer,candidates,random){const strings=[String(answer),...candidates.map(String)].filter((value,index,array)=>array.indexOf(value)===index);return shuffle(strings.slice(0,4),random)}
function format(value){return Number(value).toLocaleString('en-GB')}
function withVariant(template,seed,patch){const answer=String(patch.answer??template.answer),random=randomFrom(`${seed}:options`),type=patch.type||template.type,question={...template,...patch,id:`${template.id}-v${hashSeed(seed).toString(36)}`,answer,generatorSeed:String(seed)};if(type==='choice')question.options=uniqueOptions(answer,patch.wrong||template.options.filter(option=>option!==template.answer),random);if(type==='spell')question.letters=shuffle([...answer.replaceAll(' ','')],random);delete question.wrong;return Object.freeze(question)}

function mathsVariant(level,seed,template){
  const random=randomFrom(`maths:${level}:${seed}`);
  if(level===1){const a=integer(random,120,680),b=integer(random,40,290),answer=a+b;return withVariant(template,seed,{strand:'Addition',title:'Addition',prompt:`What is ${format(a)} + ${format(b)}?`,answer,wrong:[answer-10,answer+10,a+b+100]})}
  if(level===2){const table=[3,4,8][integer(random,0,2)],factor=integer(random,3,12),answer=table*factor;return withVariant(template,seed,{strand:'Times tables',title:'Equal groups',prompt:`What is ${table} × ${factor}?`,answer,wrong:[answer-table,answer+table,table+factor]})}
  if(level===3){const denominator=[4,6,8,10,12][integer(random,0,4)],numerator=integer(random,1,Math.floor(denominator/2)),scale=integer(random,2,5),answer=`${numerator*scale}/${denominator*scale}`;return withVariant(template,seed,{strand:'Equivalent fractions',title:'Equivalent fraction',prompt:`Which fraction is equivalent to ${numerator}/${denominator}?`,answer,wrong:[`${numerator+scale}/${denominator+scale}`,`${numerator*scale}/${denominator}`,`${numerator}/${denominator*scale}`]})}
  if(level===4){const width=integer(random,4,12),height=integer(random,3,9),answer=width*height;return withVariant(template,seed,{strand:'Area',title:'Find the area',prompt:`A platform is ${width} m long and ${height} m wide. What is its area?`,answer:`${answer} m²`,wrong:[`${width+height} m²`,`${2*(width+height)} m²`,`${answer} m`]})}
  const percentages=[10,20,25,50],percent=percentages[integer(random,0,percentages.length-1)],unit=percent===25?4:percent===20?5:percent===10?10:2,total=unit*integer(random,6,40),answer=total*percent/100;return withVariant(template,seed,{strand:'Percentages',title:'Find the percentage',prompt:`What is ${percent}% of ${total}?`,answer,wrong:[answer+unit,Math.max(1,answer-unit),total/percent]});
}

function pooledVariant(subject,level,seed){
  const pool=getCurriculumQuestions({subject,level}),random=randomFrom(`${subject}:${level}:${seed}`),template=pool[integer(random,0,pool.length-1)];
  if(template.type==='spell')return withVariant(template,seed,{type:'spell'});
  return withVariant(template,seed,{options:shuffle(template.options,random)});
}

export function generateCurriculumQuestion({subject,level,seed=0}){
  if(!['maths','science','english'].includes(subject))throw new RangeError('A supported curriculum subject is required.');
  if(!Number.isInteger(Number(level))||Number(level)<1||Number(level)>5)throw new RangeError('Question level must be from 1 to 5.');
  const numericLevel=Number(level),pool=getCurriculumQuestions({subject,level:numericLevel});if(!pool.length)throw new Error(`No ${subject} questions exist at level ${numericLevel}.`);
  if(subject==='maths'){const generatorId=['addition','multiplication','equivalent-fraction','area','percentage'][numericLevel-1],template=pool.find(question=>question.generatorId===generatorId)||pool[0];return mathsVariant(numericLevel,seed,template)}
  return pooledVariant(subject,numericLevel,seed);
}

export function createInfiniteQuestionSet({subject,set=0,count=5}={}){
  const safeSet=Math.max(0,Math.floor(Number(set)||0)),safeCount=Math.max(1,Math.floor(Number(count)||5));
  return Object.freeze(Array.from({length:safeCount},(_,index)=>generateCurriculumQuestion({subject,level:index%5+1,seed:`${safeSet}:${index}`})));
}

export function validateGeneratedQuestion(question){
  if(!question?.id||!question.answer||!question.prompt||!question.learn?.text)return false;
  if(question.type==='choice')return question.options.includes(question.answer)&&new Set(question.options).size===question.options.length;
  if(question.type==='spell')return [...question.answer].sort().join('')===[...question.letters].sort().join('');
  return false;
}
