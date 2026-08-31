import { buildMathsYearBank, validateDeepQuestionBank } from '../question-factory.js';

const levels=[
  [
    v=>{const digit=v+3,n=digit*100+47+v*10;return{strand:'Place value',generatorId:'place-value',prompt:`What is the value of ${digit} in ${n}?`,answer:`${digit*100}`,wrong:[`${digit*10}`,`${digit}`,`${digit*1000}`]}},
    v=>{const a=420+v*73,b=a+(v+2)*9;return{strand:'Comparing numbers',generatorId:'place-value',prompt:`Which number is greater: ${a} or ${b}?`,answer:`${b}`,wrong:[`${a}`,`${b-100}`,`${a-10}`]}},
    v=>{const start=75+v*25,step=[5,10,20,25,50][v],answer=start+step*3;return{strand:'Number sequences',generatorId:'number-sequence',prompt:`Continue the sequence: ${start}, ${start+step}, ${start+step*2}, __`,answer:`${answer}`,wrong:[`${answer-step}`,`${answer+step}`,`${answer+step*2}`]}},
    v=>{const n=238+v*111,amount=v%2?100:10,answer=n+amount;return{strand:'Mental addition',generatorId:'addition',prompt:`What is ${amount} more than ${n}?`,answer:`${answer}`,wrong:[`${n-amount}`,`${answer+10}`,`${answer-1}`]}}
  ],
  [
    v=>{const a=243+v*46,b=118+v*17,answer=a+b;return{strand:'Addition',generatorId:'addition',prompt:`What is ${a} + ${b}?`,answer:`${answer}`,wrong:[`${answer-10}`,`${answer+10}`,`${answer+100}`]}},
    v=>{const a=704+v*41,b=236+v*13,answer=a-b;return{strand:'Subtraction',generatorId:'subtraction',prompt:`What is ${a} − ${b}?`,answer:`${answer}`,wrong:[`${answer-10}`,`${answer+10}`,`${answer+100}`]}},
    v=>{const table=[3,4,8,3,4][v],factor=5+v,answer=table*factor;return{strand:'Times tables',generatorId:'multiplication',prompt:`What is ${table} × ${factor}?`,answer:`${answer}`,wrong:[`${answer-table}`,`${answer+table}`,`${table+factor}`]}},
    v=>{const divisor=[3,4,8,3,4][v],quotient=4+v,total=divisor*quotient;return{strand:'Division',generatorId:'division',prompt:`What is ${total} ÷ ${divisor}?`,answer:`${quotient}`,wrong:[`${quotient-1}`,`${quotient+1}`,`${quotient+divisor}`]}}
  ],
  [
    v=>{const denominator=v+3,total=denominator*(v+2),answer=total/denominator;return{strand:'Unit fractions',generatorId:'unit-fraction',prompt:`What is 1/${denominator} of ${total}?`,answer:`${answer}`,wrong:[`${answer+1}`,`${answer+2}`,`${total}`]}},
    v=>{const denominator=v+4,a=1+v%2,b=a+1;return{strand:'Comparing fractions',generatorId:'unit-fraction',prompt:`Which is larger: ${a}/${denominator} or ${b}/${denominator}?`,answer:`${b}/${denominator}`,wrong:[`${a}/${denominator}`,`${b}/${denominator+1}`,`${a}/${denominator+1}`]}},
    v=>{const denominator=5+v,a=1+v%2,b=2,answer=a+b;return{strand:'Adding fractions',generatorId:'fraction-addition',prompt:`What is ${a}/${denominator} + ${b}/${denominator}?`,answer:`${answer}/${denominator}`,wrong:[`${answer}/${denominator*2}`,`${a+b+1}/${denominator}`,`${answer+1}/${denominator+1}`]}},
    v=>{const tenths=2+v;return{strand:'Tenths',generatorId:'tenths',prompt:`Which decimal is the same as ${tenths}/10?`,answer:`0.${tenths}`,wrong:[`${tenths}.0`,`0.0${tenths}`,`1.${tenths}`]}}
  ],
  [
    v=>{const hour=9+v,minutes=[15,20,25,30,35][v],add=[20,25,30,35,40][v],total=minutes+add,nextHour=hour+Math.floor(total/60),nextMinutes=total%60;return{strand:'Time',generatorId:'time',prompt:`What time is ${add} minutes after ${hour}:${String(minutes).padStart(2,'0')}?`,answer:`${nextHour}:${String(nextMinutes).padStart(2,'0')}`,wrong:[`${hour}:${String(minutes).padStart(2,'0')}`,`${nextHour}:${String((nextMinutes+10)%60).padStart(2,'0')}`,`${nextHour+1}:${String(nextMinutes).padStart(2,'0')}`]}},
    v=>{const pounds=5+v,cost=1.25+v*.35,change=pounds-cost;return{strand:'Money',generatorId:'money',prompt:`You pay £${pounds.toFixed(2)} for an item costing £${cost.toFixed(2)}. What is the change?`,answer:`£${change.toFixed(2)}`,wrong:[`£${(change+.1).toFixed(2)}`,`£${(pounds+cost).toFixed(2)}`,`£${(change-1).toFixed(2)}`]}},
    v=>{const metres=2+v;return{strand:'Length',generatorId:'unit-conversion',prompt:`How many centimetres are in ${metres} metres?`,answer:`${metres*100} cm`,wrong:[`${metres*10} cm`,`${metres+100} cm`,`${metres*1000} cm`]}},
    v=>{const a=3+v,b=5+v,answer=2*(a+b);return{strand:'Perimeter',generatorId:'perimeter',prompt:`A rectangle is ${a} cm by ${b} cm. What is its perimeter?`,answer:`${answer} cm`,wrong:[`${a+b} cm`,`${a*b} cm`,`${answer+2} cm`]}}
  ],
  [
    v=>{const turns=['quarter turn','half turn','three-quarter turn','full turn','right angle'][v],answer=['90°','180°','270°','360°','90°'][v];return{strand:'Angles and turns',generatorId:'angles',prompt:`How many degrees are in one ${turns}?`,answer,wrong:['45°','120°','240°','300°'].filter(x=>x!==answer).slice(0,3)}},
    v=>{const shapes=[['triangle','3'],['quadrilateral','4'],['pentagon','5'],['hexagon','6'],['octagon','8']][v];return{strand:'Shape properties',generatorId:'shape-properties',prompt:`How many sides does a ${shapes[0]} have?`,answer:shapes[1],wrong:['3','4','5','6','8'].filter(x=>x!==shapes[1]).slice(0,3)}},
    v=>{const scale=[2,5,10,4,3][v],marks=3+v,answer=scale*marks;return{strand:'Charts and scales',generatorId:'data-scale',prompt:`A bar chart uses ${scale} votes per grid line. What value is ${marks} grid lines?`,answer:`${answer} votes`,wrong:[`${marks} votes`,`${answer+scale} votes`,`${answer-scale} votes`]}},
    v=>{const packs=3+v,each=4+v,used=2+v,answer=packs*each-used;return{strand:'Two-step problems',generatorId:'multi-step',prompt:`There are ${packs} packs of ${each} tokens. ${used} are used. How many remain?`,answer:`${answer}`,wrong:[`${packs*each}`,`${answer+1}`,`${answer-1}`]}}
  ]
];

export const year3MathsQuestions=buildMathsYearBank(3,levels);
validateDeepQuestionBank(year3MathsQuestions,{subject:'maths',year:3});
