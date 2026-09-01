export const OUTBREAK_YEARS=Object.freeze([3,4,5]);
export const OUTBREAK_LEVEL_COUNT=5;

function hash(value){let result=2166136261;for(const character of String(value)){result^=character.charCodeAt(0);result=Math.imul(result,16777619)}return result>>>0}
function number(seed,min,max){return min+hash(seed)%(max-min+1)}
const ages={3:'7–8',4:'8–9',5:'9–10'};

function year3(level,seed){
  if(level===1){const a=number(`${seed}:a`,2,6),b=number(`${seed}:b`,2,6);return{equation:`${a} + ${b}`,answer:a+b,strand:'Addition',learn:{title:'Add in parts',text:'Addition combines two amounts. Start with the larger number and count on the smaller amount.',steps:[`Start at ${Math.max(a,b)}.`,`Count on ${Math.min(a,b)} more.`,`Check by counting all ${a} and ${b} together.`]}}}
  if(level===2){const answer=number(`${seed}:answer`,4,9),take=number(`${seed}:take`,2,6);return{equation:`${answer+take} − ${take}`,answer,strand:'Subtraction',learn:{title:'Subtract by counting back',text:'Subtraction finds what remains after an amount is removed.',steps:[`Start at ${answer+take}.`,`Count back ${take}.`,`Add the removed amount back to check.`]}}}
  if(level===3){const a=number(`${seed}:a`,2,4),b=number(`${seed}:b`,2,3);return{equation:`${a} × ${b}`,answer:a*b,strand:'Multiplication',learn:{title:'Use equal groups',text:'Multiplication combines equal groups. You can skip-count or picture an array.',steps:[`Make ${a} equal groups.`,`Put ${b} in each group.`,`Count every item to check.`]}}}
  if(level===4){const divisor=number(`${seed}:d`,2,4),answer=number(`${seed}:a`,3,5);return{equation:`${divisor*answer} ÷ ${divisor}`,answer,strand:'Division',learn:{title:'Share equally',text:'Division shares a total into equal groups.',steps:[`Make ${divisor} equal groups.`,`Share ${divisor*answer} between them.`,`Check by multiplying the size of one group by ${divisor}.`]}}}
  const a=number(`${seed}:a`,2,4),b=number(`${seed}:b`,2,3),remove=number(`${seed}:r`,1,2);return{equation:`(${a} × ${b}) − ${remove}`,answer:a*b-remove,strand:'Two-step calculations',learn:{title:'Follow the brackets first',text:'A two-step equation is solved one operation at a time. Brackets tell you what to do first.',steps:[`Work out ${a} × ${b}.`,`Subtract ${remove} from that result.`,`Read the whole equation again to check the order.`]}}
}

function year4(level,seed){
  if(level===1){const a=number(`${seed}:a`,4,8),b=number(`${seed}:b`,3,6);return{equation:`${a} + ${b}`,answer:a+b,strand:'Mental addition',learn:{title:'Bridge through ten',text:'Partition one addend to reach the next ten, then add what remains.',steps:[`Start with ${a}.`,`Split ${b} into a helpful part and the rest.`,`Check by adding in the opposite order.`]}}}
  if(level===2){const factor=number(`${seed}:f`,3,5),answer=number(`${seed}:a`,2,3);return{equation:`${factor} × ${answer}`,answer:factor*answer,strand:'Times tables',learn:{title:'Recall multiplication facts',text:'Times-table facts describe equal groups and can be checked with repeated addition.',steps:[`Picture ${factor} groups of ${answer}.`,`Skip-count ${factor} times.`,`Reverse the factors to check.`]}}}
  if(level===3){const divisor=number(`${seed}:d`,3,6),answer=number(`${seed}:a`,3,5);return{equation:`${divisor*answer} ÷ ${divisor}`,answer,strand:'Division facts',learn:{title:'Use the inverse',text:'Multiplication and division are inverse operations, so one can check the other.',steps:[`Ask what times ${divisor} makes ${divisor*answer}.`,`Use a known times-table fact.`,`Multiply your answer by ${divisor} to check.`]}}}
  if(level===4){const whole=number(`${seed}:w`,3,7)*2;return{equation:`½ of ${whole}`,answer:whole/2,strand:'Fractions of quantities',learn:{title:'Find one half',text:'One half means splitting a whole into two equal groups.',steps:[`Share ${whole} into 2 equal groups.`,`Count one group.`,`Double your answer to check it returns to ${whole}.`]}}}
  const a=number(`${seed}:a`,3,4),b=number(`${seed}:b`,2,3),add=number(`${seed}:c`,2,3);return{equation:`(${a} × ${b}) + ${add}`,answer:a*b+add,strand:'Two-step calculations',learn:{title:'Complete one step at a time',text:'Brackets identify the first calculation. Use its result in the second step.',steps:[`Calculate ${a} × ${b}.`,`Add ${add}.`,`Estimate whether the final answer is sensible.`]}}
}

function year5(level,seed){
  if(level===1){const answer=number(`${seed}:a`,5,12),add=number(`${seed}:b`,4,9);return{equation:`${answer+add} − ${add}`,answer,strand:'Mental subtraction',learn:{title:'Use inverse operations',text:'Subtraction can be checked by adding the removed amount back.',steps:[`Start at ${answer+add}.`,`Subtract ${add} in helpful parts.`,`Add ${add} to your answer to check.`]}}}
  if(level===2){const a=number(`${seed}:a`,3,5),b=number(`${seed}:b`,2,3);return{equation:`${a} × ${b}`,answer:a*b,strand:'Multiplication',learn:{title:'Partition a multiplication',text:'Break one factor into smaller known facts, then combine their products.',steps:[`Split ${a} into helpful parts.`,`Multiply each part by ${b}.`,`Add the partial products.`]}}}
  if(level===3){const whole=number(`${seed}:w`,3,6)*4;return{equation:`25% of ${whole}`,answer:whole/4,strand:'Percentages',learn:{title:'Connect 25% and one quarter',text:'Twenty-five percent is equivalent to one quarter, so divide the whole into four equal groups.',steps:[`Rewrite 25% as ¼.`,`Divide ${whole} by 4.`,`Multiply the answer by 4 to check.`]}}}
  if(level===4){const unit=number(`${seed}:u`,3,5),numerator=number(`${seed}:n`,1,2);return{equation:`${numerator}/3 of ${unit*3}`,answer:unit*numerator,strand:'Fractions of quantities',learn:{title:'Find the unit fraction first',text:'Divide by the denominator to find one part, then multiply by the numerator.',steps:[`Divide ${unit*3} by 3.`,`Take ${numerator} of those equal parts.`,`Check the result is smaller than the whole.`]}}}
  const a=number(`${seed}:a`,3,4),b=number(`${seed}:b`,2,3),subtract=number(`${seed}:s`,1,3);return{equation:`${a} × (${b} + 1) − ${subtract}`,answer:a*(b+1)-subtract,strand:'Order of operations',learn:{title:'Use the operation order',text:'Work inside brackets first, then multiply, then subtract.',steps:[`Calculate ${b} + 1 inside the brackets.`,`Multiply that result by ${a}.`,`Subtract ${subtract} last.`]}}
}

export function createOutbreakRounds({year=3,set=0}={}){
  const yearNumber=Number(year),safeSet=Math.max(0,Math.floor(Number(set)||0));if(!OUTBREAK_YEARS.includes(yearNumber))throw new RangeError('Outbreak year must be 3, 4 or 5.');
  const factory=yearNumber===3?year3:yearNumber===4?year4:year5;
  return Object.freeze(Array.from({length:OUTBREAK_LEVEL_COUNT},(_,index)=>{const level=index+1,question=factory(level,`year-${yearNumber}:set-${safeSet}:level-${level}`);if(!Number.isInteger(question.answer)||question.answer<3||question.answer>15)throw new Error(`Outbreak answer ${question.answer} is outside the playable swarm range.`);return Object.freeze({id:`outbreak-y${yearNumber}-s${safeSet}-l${level}`,yearNumber,year:`Year ${yearNumber}`,age:ages[yearNumber],level,...question,target:question.answer,swarmSize:question.answer+4,hint:`The answer is the number of zombies to tag. Use the ${question.strand.toLocaleLowerCase('en-GB')} method, then keep count.`,success:`${question.equation} = ${question.answer}. Exact count confirmed.`})}));
}

export function validateOutbreakRounds(rounds,{year=rounds[0]?.yearNumber}={}){if(!Array.isArray(rounds)||rounds.length!==OUTBREAK_LEVEL_COUNT)throw new TypeError('Maths Outbreak needs five rounds.');const ids=new Set();rounds.forEach((round,index)=>{if(!round.id||ids.has(round.id)||round.yearNumber!==Number(year)||round.level!==index+1||round.target!==round.answer||round.swarmSize<=round.target||round.target<3||round.target>15||!round.learn?.text||round.learn.steps?.length!==3)throw new TypeError(`Invalid Outbreak round ${round?.id||index}.`);ids.add(round.id)});return true}

export const outbreakRounds=createOutbreakRounds();
validateOutbreakRounds(outbreakRounds);
