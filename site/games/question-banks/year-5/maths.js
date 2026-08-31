import { buildMathsYearBank, validateDeepQuestionBank } from '../question-factory.js';

const levels=[
  [
    v=>{const digit=v+4,n=digit*100000+37642+v*1000;return{strand:'Place value to one million',generatorId:'place-value',prompt:`What is the value of ${digit} in ${n.toLocaleString('en-GB')}?`,answer:`${(digit*100000).toLocaleString('en-GB')}`,wrong:[`${digit*10000}`,`${digit*1000}`,`${digit*100}`]}},
    v=>{const n=[10,100,1000,10000,100000][v];return{strand:'Powers of 10',generatorId:'place-value',prompt:`How many times greater is ${n.toLocaleString('en-GB')} than ${n/10}?`,answer:'10 times',wrong:['2 times','100 times','1,000 times']}},
    v=>{const n=124653+v*13791,unit=[10,100,1000,10000,100000][v],answer=Math.round(n/unit)*unit;return{strand:'Rounding',generatorId:'rounding',prompt:`Round ${n.toLocaleString('en-GB')} to the nearest ${unit.toLocaleString('en-GB')}.`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-unit).toLocaleString('en-GB'),(answer+unit).toLocaleString('en-GB'),n.toLocaleString('en-GB')]}},
    v=>{const start=-15+v*2,finish=8+v*3,answer=finish-start;return{strand:'Negative numbers',generatorId:'negative-number',prompt:`A lift moves from floor ${start} to floor ${finish}. How many floors does it rise?`,answer:`${answer}`,wrong:[`${finish}`,`${Math.abs(start)}`,`${answer-5}`]}}
  ],
  [
    v=>{const a=23845+v*3417,b=12679+v*1221,answer=a+b;return{strand:'Addition',generatorId:'addition',prompt:`What is ${a.toLocaleString('en-GB')} + ${b.toLocaleString('en-GB')}?`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-100).toLocaleString('en-GB'),(answer+100).toLocaleString('en-GB'),(answer+1000).toLocaleString('en-GB')]}},
    v=>{const a=68420+v*2351,b=25178+v*937,answer=a-b;return{strand:'Subtraction',generatorId:'subtraction',prompt:`What is ${a.toLocaleString('en-GB')} − ${b.toLocaleString('en-GB')}?`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-100).toLocaleString('en-GB'),(answer+100).toLocaleString('en-GB'),(answer+1000).toLocaleString('en-GB')]}},
    v=>{const n=1234+v*271,factor=6+v,answer=n*factor;return{strand:'Multiplication',generatorId:'multiplication',prompt:`What is ${n.toLocaleString('en-GB')} × ${factor}?`,answer:answer.toLocaleString('en-GB'),wrong:[(answer-factor*100).toLocaleString('en-GB'),(answer+factor*100).toLocaleString('en-GB'),(n+factor).toLocaleString('en-GB')]}},
    v=>{const divisor=4+v,quotient=612+v*83,total=divisor*quotient;return{strand:'Division',generatorId:'division',prompt:`What is ${total.toLocaleString('en-GB')} ÷ ${divisor}?`,answer:quotient.toLocaleString('en-GB'),wrong:[(quotient-10).toLocaleString('en-GB'),(quotient+10).toLocaleString('en-GB'),`${divisor}`]}}
  ],
  [
    v=>{const n=7+v,d=4+v,whole=Math.floor(n/d),remainder=n%d;return{strand:'Improper and mixed fractions',generatorId:'mixed-fraction',prompt:`Write ${n}/${d} as a mixed number.`,answer:`${whole} ${remainder}/${d}`,wrong:[`${whole} ${d}/${remainder}`,`${remainder} ${whole}/${d}`,`${whole+1} ${remainder}/${d}`]}},
    v=>{const a=1+v%2,b=2+v%3,d1=3+v,d2=d1*2,answer=`${a*2+b}/${d2}`;return{strand:'Adding fractions',generatorId:'fraction-addition',prompt:`What is ${a}/${d1} + ${b}/${d2}?`,answer,wrong:[`${a+b}/${d2}`,`${a+b}/${d1+d2}`,`${a*2+b+1}/${d2}`]}},
    v=>{const n=2+v,d=5+v,m=2+v%3;return{strand:'Multiplying fractions',generatorId:'fraction-multiply',prompt:`What is ${n}/${d} × ${m}?`,answer:`${n*m}/${d}`,wrong:[`${n*m+1}/${d}`,`${n}/${d*m}`,`${n*m}/${d*m}`]}},
    v=>{const n=1+v,d=4+v,scale=2+v%3;return{strand:'Equivalent fractions',generatorId:'equivalent-fraction',prompt:`Which fraction is equivalent to ${n}/${d}?`,answer:`${n*scale}/${d*scale}`,wrong:[`${n+scale}/${d+scale}`,`${n*scale}/${d}`,`${n}/${d*scale}`]}}
  ],
  [
    v=>{const decimal=(1.235+v*.417).toFixed(3);return{strand:'Decimal place value',generatorId:'decimal-place',prompt:`What is the value of the digit in the hundredths place in ${decimal}?`,answer:`${decimal[3]}/100`,wrong:[`${decimal[2]}/10`,`${decimal[4]}/1000`,`${decimal[3]}/10`]}},
    v=>{const percent=[10,20,25,40,50][v],divisor=100/percent,total=divisor*(12+v*4),answer=total*percent/100;return{strand:'Percentages',generatorId:'percentage',prompt:`What is ${percent}% of ${total}?`,answer:`${answer}`,wrong:[`${answer+divisor}`,`${answer-divisor}`,`${answer*2}`]}},
    v=>{const kg=1.5+v*.75;return{strand:'Metric conversion',generatorId:'unit-conversion',prompt:`How many grams are in ${kg} kilograms?`,answer:`${(kg*1000).toLocaleString('en-GB')} g`,wrong:[`${kg*100} g`,`${kg*10} g`,`${(kg*1000+100).toLocaleString('en-GB')} g`]}},
    v=>{const hours=1+v,minutes=25+v*7,total=hours*60+minutes;return{strand:'Time conversion',generatorId:'time',prompt:`How many minutes are in ${hours} hours and ${minutes} minutes?`,answer:`${total} minutes`,wrong:[`${hours*100+minutes} minutes`,`${total-60} minutes`,`${total+60} minutes`]}}
  ],
  [
    v=>{const a=8+v,b=5+v,answer=a*b;return{strand:'Area',generatorId:'area',prompt:`A rectangle is ${a} m by ${b} m. What is its area?`,answer:`${answer} m²`,wrong:[`${2*(a+b)} m²`,`${a+b} m²`,`${answer} m`]}},
    v=>{const a=3+v,b=4+v,c=2+v%3,answer=a*b*c;return{strand:'Volume',generatorId:'volume',prompt:`A cuboid is ${a} cm × ${b} cm × ${c} cm. What is its volume?`,answer:`${answer} cm³`,wrong:[`${a*b} cm³`,`${a+b+c} cm³`,`${answer} cm²`]}},
    v=>{const angle=35+v*12,answer=180-angle;return{strand:'Angles on a straight line',generatorId:'angles',prompt:`One angle on a straight line is ${angle}°. What is the other angle?`,answer:`${answer}°`,wrong:[`${180+angle}°`,`${90-angle}°`,`${answer+10}°`]}},
    v=>{const rows=4+v,columns=6+v,each=5+v,answer=rows*columns*each;return{strand:'Tables and multi-step data',generatorId:'multi-step',prompt:`A table has ${rows} rows and ${columns} columns. Each cell records ${each} points. What is the total?`,answer:`${answer}`,wrong:[`${rows*columns}`,`${(rows+columns)*each}`,`${answer-each}`]}}
  ]
];

export const year5MathsQuestions=buildMathsYearBank(5,levels);
validateDeepQuestionBank(year5MathsQuestions,{subject:'maths',year:5});
