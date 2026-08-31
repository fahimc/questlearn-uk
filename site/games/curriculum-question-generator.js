import { getCurriculumQuestions } from './curriculum-question-bank.js';
import { createCurriculumLearning } from './curriculum-learning-guides.js';

function hashSeed(value){let hash=2166136261;for(const character of String(value)){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
function randomFrom(seed){let state=hashSeed(seed)||1;return()=>{state+=0x6d2b79f5;let value=state;value=Math.imul(value^value>>>15,value|1);value^=value+Math.imul(value^value>>>7,value|61);return((value^value>>>14)>>>0)/4294967296}}
function integer(random,min,max){return Math.floor(random()*(max-min+1))+min}
function shuffle(values,random){const result=[...values];for(let index=result.length-1;index>0;index-=1){const swap=integer(random,0,index);[result[index],result[swap]]=[result[swap],result[index]]}return result}
function uniqueOptions(answer,candidates,random){const strings=[String(answer),...candidates.map(String)].filter((value,index,array)=>array.indexOf(value)===index);return shuffle(strings.slice(0,4),random)}
function format(value){return Number(value).toLocaleString('en-GB')}
function withVariant(template,seed,patch={}){const answer=String(patch.answer??template.answer),random=randomFrom(`${seed}:options`),type=patch.type||template.type,question={...template,...patch,id:`${template.id}-v${hashSeed(seed).toString(36)}`,sourceId:template.id,answer,generatorSeed:String(seed)};question.learn=patch.learn||createCurriculumLearning(question);question.success=`Correct. ${question.learn.example}`;if(type==='choice')question.options=uniqueOptions(answer,patch.wrong||template.options.filter(option=>option!==template.answer),random);if(type==='spell')question.letters=shuffle([...answer.replaceAll(' ','')],random);delete question.wrong;return Object.freeze(question)}

function mathsLearning(template,context){return createCurriculumLearning({...template,context})}

function mathsVariant(level,seed,template){
  const random=randomFrom(`maths:${level}:${seed}`);
  if(template.generatorId==='addition'){const a=level>=3?integer(random,1200,6800):integer(random,120,680),b=level>=3?integer(random,400,2900):integer(random,40,290),answer=a+b,context={text:`This question combines ${format(a)} and ${format(b)}. Keep digits in the same place-value columns so ones, tens, hundreds and thousands are added correctly.`,steps:['Write the larger number above the other with place values aligned.','Add from right to left, exchanging whenever a column totals 10 or more.','Estimate by rounding both numbers, then compare the estimate with your exact total.'],example:'For 356 + 127, add ones, tens and hundreds in columns to get 483.'};return withVariant(template,seed,{strand:'Addition',title:'Addition',prompt:`What is ${format(a)} + ${format(b)}?`,answer,wrong:[answer-10,answer+10,answer+100],learn:mathsLearning({...template,strand:'Addition'},context)})}
  if(template.generatorId==='multiplication'){if(level>=4){const a=integer(random,120,480),factor=integer(random,2,8),answer=a*factor,context={text:`This question multiplies ${format(a)} by ${factor}. Partition the larger number by place value, multiply each part, then recombine.`,steps:[`Split ${format(a)} into hundreds, tens and ones.`,`Multiply each part by ${factor}.`,'Add the partial products and check with an estimate.'],example:'For 214 × 3, calculate 200 × 3, 10 × 3 and 4 × 3, then combine them to get 642.'};return withVariant(template,seed,{prompt:`What is ${format(a)} × ${factor}?`,answer:format(answer),wrong:[format(answer-factor*10),format(answer+factor*10),format(answer+100)],learn:mathsLearning(template,context)})}const laterTables=[6,7,9,11,12],table=level<=2?[3,4,8][integer(random,0,2)]:laterTables[integer(random,0,laterTables.length-1)],factor=integer(random,3,12),answer=table*factor,context={text:`This question asks for ${table} equal groups of ${factor}. Use a known multiplication fact, repeated addition or partition one factor.`,steps:[`Represent ${table} × ${factor} as equal groups.`,`Use a nearby known fact if needed, then adjust by one group of ${factor}.`,'Check by dividing your total by one factor.'],example:`For ${table} × ${Math.max(2,factor-1)}, count ${table} equal groups and check with division.`};return withVariant(template,seed,{strand:'Times tables',title:'Equal groups',prompt:`What is ${table} × ${factor}?`,answer,wrong:[answer-table,answer+table,table+factor],learn:mathsLearning({...template,strand:'Times tables'},context)})}
  if(template.generatorId==='equivalent-fraction'){const denominator=[4,6,8,10,12][integer(random,0,4)],numerator=integer(random,1,Math.max(1,Math.floor(denominator/2))),scale=integer(random,2,5),answer=`${numerator*scale}/${denominator*scale}`,context={text:`To make a fraction equivalent to ${numerator}/${denominator}, scale the numerator and denominator by exactly the same number. This keeps the proportion unchanged.`,steps:['Choose one whole-number scale factor.',`Multiply both ${numerator} and ${denominator} by that factor.`,'Check that the new numerator and denominator simplify back to the starting fraction.'],example:'For 2/5, multiplying both parts by 3 gives the equivalent fraction 6/15.'};return withVariant(template,seed,{strand:'Equivalent fractions',title:'Equivalent fraction',prompt:`Which fraction is equivalent to ${numerator}/${denominator}?`,answer,wrong:[`${numerator+scale}/${denominator+scale}`,`${numerator*scale}/${denominator}`,`${numerator}/${denominator*scale}`],learn:mathsLearning({...template,strand:'Equivalent fractions'},context)})}
  if(template.generatorId==='area'){const width=integer(random,4,12),height=integer(random,3,9),answer=width*height,context={text:`The platform is a rectangle measuring ${width} m by ${height} m. Area counts the square metres covering its inside, not the distance around it.`,steps:[`Use area = length × width.`,`Multiply ${width} by ${height}.`,'Write m² and compare with a rough square count.'],example:'A different 5 m by 4 m rectangle has area 20 m².'};return withVariant(template,seed,{strand:'Area',title:'Find the area',prompt:`A platform is ${width} m long and ${height} m wide. What is its area?`,answer:`${answer} m²`,wrong:[`${width+height} m²`,`${2*(width+height)} m²`,`${answer} m`],learn:mathsLearning({...template,strand:'Area'},context)})}
  if(template.generatorId==='percentage'){const percentages=[10,20,25,50],percent=percentages[integer(random,0,percentages.length-1)],unit=percent===25?4:percent===20?5:percent===10?10:2,total=unit*integer(random,6,40),answer=total*percent/100,divisor=100/percent,context={text:`${percent}% means ${percent} out of 100. For this percentage, finding ${percent}% of ${total} is the same as dividing ${total} by ${divisor}.`,steps:[`Rewrite ${percent}% as the fraction 1/${divisor}.`,`Divide ${total} into ${divisor} equal parts.`,'Multiply back by the divisor to check the parts recreate the whole.'],example:`For a different total of ${divisor*8}, ${percent}% is ${divisor*8} ÷ ${divisor} = 8.`};return withVariant(template,seed,{strand:'Percentages',title:'Find the percentage',prompt:`What is ${percent}% of ${total}?`,answer,wrong:[answer+unit,Math.max(1,answer-unit),total/percent],learn:mathsLearning({...template,strand:'Percentages'},context)})}
  return withVariant(template,seed);
}

function pooledVariant(subject,level,seed,selectedTemplate){
  const pool=getCurriculumQuestions({subject,level}),random=randomFrom(`${subject}:${level}:${seed}`),template=selectedTemplate||pool[integer(random,0,pool.length-1)];
  if(template.type==='spell')return withVariant(template,seed,{type:'spell'});
  return withVariant(template,seed,{options:shuffle(template.options,random)});
}

function generateFromTemplate(subject,level,seed,template){return subject==='maths'?mathsVariant(level,seed,template):pooledVariant(subject,level,seed,template)}
function questionFingerprint(question){return `${question.prompt.trim().toLocaleLowerCase('en-GB')}|${question.answer.trim().toLocaleLowerCase('en-GB')}`}
function selectLevelTemplates(subject,level,set,count){const pool=getCurriculumQuestions({subject,level});if(count>pool.length)throw new RangeError(`Only ${pool.length} non-repeating ${subject} questions exist at level ${level}.`);const batches=Math.floor(pool.length/count),safeBatches=Math.max(1,batches),batch=set%safeBatches,ordered=shuffle(pool,randomFrom(`${subject}:${level}:nonrepeat-order`));return ordered.slice(batch*count,batch*count+count)}

export function generateCurriculumQuestion({subject,level,seed=0}){
  if(!['maths','science','english'].includes(subject))throw new RangeError('A supported curriculum subject is required.');
  if(!Number.isInteger(Number(level))||Number(level)<1||Number(level)>5)throw new RangeError('Question level must be from 1 to 5.');
  const numericLevel=Number(level),pool=getCurriculumQuestions({subject,level:numericLevel});if(!pool.length)throw new Error(`No ${subject} questions exist at level ${numericLevel}.`);
  if(subject==='maths'){const generatorId=['addition','multiplication','equivalent-fraction','area','percentage'][numericLevel-1],template=pool.find(question=>question.generatorId===generatorId)||pool[0];return mathsVariant(numericLevel,seed,template)}const random=randomFrom(`${subject}:${numericLevel}:${seed}:template`),template=pool[integer(random,0,pool.length-1)];return generateFromTemplate(subject,numericLevel,seed,template);
}

export function createInfiniteQuestionSet({subject,set=0,count=5}={}){
  const safeSet=Math.max(0,Math.floor(Number(set)||0)),safeCount=Math.max(1,Math.floor(Number(count)||5));
  return Object.freeze(Array.from({length:safeCount},(_,index)=>generateCurriculumQuestion({subject,level:index%5+1,seed:`${safeSet}:${index}`})));
}

export function createLevelQuestionSet({subject,level,set=0,count=10}={}){
  const safeSet=Math.max(0,Math.floor(Number(set)||0)),safeCount=Math.max(1,Math.floor(Number(count)||10)),numericLevel=Number(level),templates=selectLevelTemplates(subject,numericLevel,safeSet,safeCount),questions=[],fingerprints=new Set();
  for(const [index,template] of templates.entries()){let question,attempt=0;do{question=generateFromTemplate(subject,numericLevel,`${safeSet}:level-${numericLevel}:question-${index}:attempt-${attempt}`,template);attempt+=1}while(fingerprints.has(questionFingerprint(question))&&attempt<32);const fingerprint=questionFingerprint(question);if(fingerprints.has(fingerprint))throw new Error(`Could not create a unique ${subject} question for level ${numericLevel}.`);fingerprints.add(fingerprint);questions.push(question)}
  return Object.freeze(questions);
}

export function validateGeneratedQuestion(question){
  if(!question?.id||!question.sourceId||!question.answer||!question.prompt||!question.learn?.text||question.learn.steps?.length<3||!question.learn.example||!question.learn.check)return false;
  if(question.type==='choice')return question.options.includes(question.answer)&&new Set(question.options).size===question.options.length;
  if(question.type==='spell')return [...question.answer].sort().join('')===[...question.letters].sort().join('');
  return false;
}
