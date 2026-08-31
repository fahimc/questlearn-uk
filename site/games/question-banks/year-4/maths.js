import { buildMathsYearBank, validateDeepQuestionBank } from '../question-factory.js';

const roman=['XL','L','LX','LXX','LXXX'];
const levels=[
  [
    v=>{const digit=v+4,n=digit*1000+628+v*10;return{strand:'Place value',generatorId:'place-value',prompt:`What is the value of ${digit} in ${n.toLocaleString('en-GB')}?`,answer:`${(digit*1000).toLocaleString('en-GB')}`,wrong:[`${digit*100}`,`${digit*10}`,`${digit}`]}},
    v=>{const n=1246+v*713,unit=[10,100,1000,100,10][v],answer=Math.round(n/unit)*unit;return{strand:'Rounding',generatorId:'rounding',prompt:`Round ${n.toLocaleString('en-GB')} to the nearest ${unit.toLocaleString('en-GB')}.`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-unit).toLocaleString('en-GB'),(answer+unit).toLocaleString('en-GB'),n.toLocaleString('en-GB')]}},
    v=>{const start=-8+v,finish=3+v*2,answer=finish-start;return{strand:'Negative numbers',generatorId:'negative-number',prompt:`The temperature rises from ${start}°C to ${finish}°C. How many degrees does it rise?`,answer:`${answer}°C`,wrong:[`${finish}°C`,`${Math.abs(start)}°C`,`${answer-2}°C`]}},
    v=>{const values=[40,50,60,70,80][v];return{strand:'Roman numerals',generatorId:'roman-numerals',prompt:`Which Roman numeral represents ${values}?`,answer:roman[v],wrong:roman.filter((_,i)=>i!==v).slice(0,3)}}
  ],
  [
    v=>{const a=2345+v*417,b=1234+v*126,answer=a+b;return{strand:'Addition',generatorId:'addition',prompt:`What is ${a.toLocaleString('en-GB')} + ${b.toLocaleString('en-GB')}?`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-100).toLocaleString('en-GB'),(answer+100).toLocaleString('en-GB'),(answer+1000).toLocaleString('en-GB')]}},
    v=>{const a=6842+v*311,b=2517+v*83,answer=a-b;return{strand:'Subtraction',generatorId:'subtraction',prompt:`What is ${a.toLocaleString('en-GB')} − ${b.toLocaleString('en-GB')}?`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-100).toLocaleString('en-GB'),(answer+100).toLocaleString('en-GB'),(answer+10).toLocaleString('en-GB')]}},
    v=>{const table=[6,7,9,11,12][v],factor=7+v,answer=table*factor;return{strand:'Times tables',generatorId:'multiplication',prompt:`What is ${table} × ${factor}?`,answer:`${answer}`,wrong:[`${answer-table}`,`${answer+table}`,`${table+factor}`]}},
    v=>{const n=123+v*41,factor=3+v,answer=n*factor;return{strand:'Multiplication',generatorId:'multiplication',prompt:`What is ${n} × ${factor}?`,answer:`${answer}`,wrong:[`${answer-factor*10}`,`${answer+factor*10}`,`${n+factor}`]}}
  ],
  [
    v=>{const n=[2,3,4,5,6][v],d=[3,4,5,6,8][v],scale=2+v%3;return{strand:'Equivalent fractions',generatorId:'equivalent-fraction',prompt:`Which fraction is equivalent to ${n}/${d}?`,answer:`${n*scale}/${d*scale}`,wrong:[`${n+scale}/${d+scale}`,`${n*scale}/${d}`,`${n}/${d*scale}`]}},
    v=>{const n=[47,63,85,92,76][v],divisor=v%2?100:10,answer=n/divisor;return{strand:'Dividing by 10 and 100',generatorId:'divide-power-ten',prompt:`What is ${n} ÷ ${divisor}?`,answer:`${answer}`,wrong:[`${n/(divisor/10)}`,`${n*10}`,`${answer+1}`]}},
    v=>{const a=(1.2+v*.31).toFixed(2),b=(1.3+v*.31).toFixed(2);return{strand:'Comparing decimals',generatorId:'decimal-place',prompt:`Which decimal is greater: ${a} or ${b}?`,answer:b,wrong:[a,`${Number(a)+1}`,`0.${v+2}`]}},
    v=>{const d=6+v,a=1+v%3,b=2,answer=a+b;return{strand:'Adding fractions',generatorId:'fraction-addition',prompt:`What is ${a}/${d} + ${b}/${d}?`,answer:`${answer}/${d}`,wrong:[`${answer}/${d*2}`,`${answer+1}/${d}`,`${a+b}/${d+1}`]}}
  ],
  [
    v=>{const km=2+v*.5,answer=km*1000;return{strand:'Metric conversion',generatorId:'unit-conversion',prompt:`How many metres are in ${km} kilometres?`,answer:`${answer.toLocaleString('en-GB')} m`,wrong:[`${km*100} m`,`${answer+100} m`,`${km} m`]}},
    v=>{const a=6+v,b=4+v,answer=2*(a+b);return{strand:'Perimeter',generatorId:'perimeter',prompt:`A rectangle is ${a} m by ${b} m. What is its perimeter?`,answer:`${answer} m`,wrong:[`${a+b} m`,`${a*b} m`,`${answer+2} m`]}},
    v=>{const a=5+v,b=3+v,answer=a*b;return{strand:'Area',generatorId:'area',prompt:`A rectangle is ${a} m by ${b} m. What is its area?`,answer:`${answer} m²`,wrong:[`${2*(a+b)} m²`,`${a+b} m²`,`${answer} m`]}},
    v=>{const hour=13+v,minutes=[15,25,35,45,50][v];return{strand:'Time conversion',generatorId:'time',prompt:`Write ${hour}:${String(minutes).padStart(2,'0')} in 12-hour time.`,answer:`${hour-12}:${String(minutes).padStart(2,'0')} pm`,wrong:[`${hour}:${String(minutes).padStart(2,'0')} pm`,`${hour-12}:${String(minutes).padStart(2,'0')} am`,`${hour-11}:${String(minutes).padStart(2,'0')} pm`]}}
  ],
  [
    v=>{const degrees=[35,68,112,145,170][v],answer=degrees<90?'acute':'obtuse';return{strand:'Angle types',generatorId:'angle-type',prompt:`What type of angle is ${degrees}°?`,answer,wrong:['right','reflex','straight'].filter(x=>x!==answer).slice(0,3)}},
    v=>{const items=[['square','4 equal sides and 4 right angles'],['rectangle','opposite sides equal and 4 right angles'],['rhombus','4 equal sides but not always right angles'],['trapezium','one pair of parallel sides'],['kite','two pairs of adjacent equal sides']][v];return{strand:'Quadrilaterals',generatorId:'shape-properties',prompt:`Which property describes a ${items[0]}?`,answer:items[1],wrong:['exactly 3 sides','no straight sides','exactly 5 right angles']}},
    v=>{const x=2+v,y=1+v,dx=1+v%2,dy=2;return{strand:'Coordinates',generatorId:'coordinates',prompt:`Move ${dx} right and ${dy} up from (${x}, ${y}). Where do you land?`,answer:`(${x+dx}, ${y+dy})`,wrong:[`(${x-dx}, ${y+dy})`,`(${x+dx}, ${y-dy})`,`(${x+dy}, ${y+dx+1})`]}},
    v=>{const scale=5+v*5,steps=3+v,answer=scale*steps;return{strand:'Charts and time graphs',generatorId:'data-scale',prompt:`A graph scale rises by ${scale} each step. What value is ${steps} steps?`,answer:`${answer}`,wrong:[`${steps}`,`${answer-scale}`,`${answer+scale}`]}}
  ]
];

export const year4MathsQuestions=buildMathsYearBank(4,levels);
validateDeepQuestionBank(year4MathsQuestions,{subject:'maths',year:4});
