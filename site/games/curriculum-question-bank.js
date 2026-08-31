const SUPPORT={
  number:{title:'Use place value',text:'Read each digit by its place and work from the largest place to the smallest.',example:'In 462, the 4 represents 400.'},
  calculation:{title:'Choose an operation',text:'Decide what changes in the problem, then calculate and check with the inverse operation.',example:'If 63 − 18 = 45, then 45 + 18 = 63.'},
  tables:{title:'Build equal groups',text:'Multiplication combines equal groups. Division splits a total into equal groups.',example:'4 groups of 6 make 24, so 24 ÷ 4 = 6.'},
  fractions:{title:'Think about equal parts',text:'The denominator tells you how many equal parts make the whole. The numerator tells you how many parts are used.',example:'Three of four equal parts is 3/4.'},
  measure:{title:'Keep the units',text:'Choose the correct measure, convert units when needed and write the unit with the answer.',example:'100 centimetres is the same length as 1 metre.'},
  geometry:{title:'Use shape facts',text:'Look for sides, vertices, right angles, parallel lines or the amount of turn before deciding.',example:'A right angle is a quarter turn.'},
  data:{title:'Read the scale first',text:'Check what each mark or symbol represents before comparing or calculating with the data.',example:'If one symbol means 2 votes, four symbols mean 8 votes.'},
  plants:{title:'Follow the plant system',text:'Plants use different parts to absorb water, make food, support growth and reproduce.',example:'Roots absorb water while leaves use light to help make food.'},
  animals:{title:'Connect structure and job',text:'Body parts work together. Think about what each part allows an animal or human to do.',example:'Muscles pull on bones to produce movement.'},
  materials:{title:'Observe material properties',text:'Classify a material by what it does when it is heated, cooled, mixed, stretched or tested.',example:'A liquid flows and takes the shape of its container.'},
  forces:{title:'Look for the force',text:'A force is a push or pull that can change movement, direction or shape.',example:'Friction can slow a moving object.'},
  lightSound:{title:'Trace the signal',text:'Think about where light or vibration starts and how it travels to the observer.',example:'We see an object when light from it reaches our eyes.'},
  living:{title:'Use observable features',text:'Scientists group living things by shared features and use evidence to identify them.',example:'A classification key asks one clear question at each step.'},
  electricity:{title:'Trace the circuit',text:'A working series circuit needs a complete loop and materials that let electric current pass.',example:'Closing a switch completes a circuit.'},
  earth:{title:'Model movement in space',text:'Use the movement and position of Earth, the Moon and the Sun to explain what we observe.',example:'Earth rotating once causes day and night.'},
  spelling:{title:'Use sounds and word parts',text:'Break the word into syllables, roots, prefixes and suffixes, then check the tricky letters.',example:'Unhelpful can be split into un + help + ful.'},
  vocabulary:{title:'Use context and meaning',text:'Read the whole clue or sentence, then test which word has the closest meaning.',example:'Enormous is a synonym for very large.'},
  grammar:{title:'Check the sentence job',text:'Identify what each word or phrase is doing before choosing the grammatical form.',example:'In “the noisy class”, noisy describes the noun class.'},
  punctuation:{title:'Read the sentence aloud',text:'Use capitals and punctuation to show where a sentence starts, ends, pauses or includes speech.',example:'A direct question begins with a capital and ends with a question mark.'},
  reading:{title:'Use evidence from the text',text:'Return to the exact words in the sentence and choose an answer supported by that evidence.',example:'“Mia shivered” is evidence that she may feel cold.'}
};

const SUBJECT_NAME={maths:'Maths',science:'Science',english:'English'};
const codeFor=subject=>({maths:'MAT',science:'SCI',english:'ENG'})[subject];
const optionList=(answer,wrong)=>[String(answer),...wrong.map(String)];

function choice(subject,index,year,level,strand,support,prompt,answer,wrong,generatorId){
  const help=SUPPORT[support];
  return Object.freeze({id:`${subject.slice(0,3)}-${String(index).padStart(3,'0')}`,subject,subjectName:SUBJECT_NAME[subject],objectiveId:`${codeFor(subject)}-Y${year}-${strand.toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`,year:`Year ${year}`,level,strand,type:'choice',title:strand,prompt,answer:String(answer),options:optionList(answer,wrong),hint:`Rule out choices that do not fit the ${strand.toLowerCase()} clue, then check your choice.`,learn:help,success:`Correct. ${help.example}`,generatorId:generatorId||null});
}

function spell(index,year,level,strand,prompt,answer,hint,generatorId){
  const clean=String(answer).toLocaleLowerCase('en-GB'),letters=[...clean].filter(letter=>letter!==' '),shift=index%letters.length,shuffled=[...letters.slice(shift),...letters.slice(0,shift)].reverse();
  return Object.freeze({id:`eng-${String(index).padStart(3,'0')}`,subject:'english',subjectName:'English',objectiveId:`ENG-Y${year}-${strand.toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`,year:`Year ${year}`,level,strand,type:'spell',title:strand,prompt,answer:clean.replaceAll(' ',''),letters:shuffled,hint,learn:SUPPORT.spelling,success:`Correct. ${SUPPORT.spelling.example}`,generatorId:generatorId||null});
}

const mathsRows=[
  [3,1,'Place value','number','What is the value of 6 in 462?','60',['6','600','406'],'place-value'],
  [3,1,'Addition','calculation','What is 238 + 151?','389',['379','399','489'],'addition'],
  [3,1,'Subtraction','calculation','What is 542 − 219?','323',['313','333','423'],'subtraction'],
  [3,1,'Three times table','tables','What is 3 × 7?','21',['18','24','27'],'multiplication'],
  [3,1,'Four times table','tables','What is 4 × 8?','32',['28','36','40'],'multiplication'],
  [3,1,'Eight times table','tables','What is 8 × 6?','48',['42','54','56'],'multiplication'],
  [3,1,'Simple fractions','fractions','Which fraction is one of four equal parts?','1/4',['1/2','2/3','3/4'],'unit-fraction'],
  [3,2,'Division','tables','Share 32 equally between 4 groups. How many are in each group?','8',['4','6','12'],'division'],
  [3,2,'Tenths','fractions','Which number means seven tenths?','0.7',['0.07','7.0','70'],'tenths'],
  [3,2,'Time','measure','What time is 25 minutes after 09:40?','10:05',['09:55','10:15','10:25'],'time'],
  [3,2,'Perimeter','measure','A rectangle is 6 cm by 3 cm. What is its perimeter?','18 cm',['9 cm','12 cm','36 cm'],'perimeter'],
  [3,2,'Money','measure','A book costs £3.45. You pay £5. What change should you get?','£1.55',['£1.45','£2.55','£8.45'],'money'],
  [3,2,'Angles','geometry','Which describes a right angle?','A quarter turn',['A half turn','A full turn','A small curve'],'angles'],
  [3,2,'Bar charts','data','A bar reaches 14 on a scale counting in twos. What value does it show?','14',['7','12','16'],'data-scale'],
  [4,3,'Rounding','number','Round 3,647 to the nearest 100.','3,600',['3,500','3,650','3,700'],'rounding'],
  [4,3,'Four-digit addition','calculation','What is 2,475 + 1,326?','3,801',['3,701','3,791','3,901'],'addition'],
  [4,3,'Times tables','tables','What is 9 × 7?','63',['56','64','72'],'multiplication'],
  [4,3,'Factor pairs','tables','Which pair are both factors of 36?','4 and 9',['5 and 7','6 and 7','3 and 11'],'factors'],
  [4,3,'Decimals','fractions','Which decimal is equal to 6/10?','0.6',['0.06','0.16','6.0'],'tenths'],
  [4,3,'Equivalent fractions','fractions','Which fraction is equivalent to 1/2?','4/8',['2/8','3/8','5/8'],'equivalent-fraction'],
  [4,3,'Area','measure','A rectangle is 7 cm long and 4 cm wide. What is its area?','28 cm²',['11 cm²','22 cm²','28 cm'],'area'],
  [4,4,'Negative numbers','number','The temperature rises from −3°C to 4°C. How many degrees does it rise?','7°C',['1°C','4°C','8°C'],'negative-number'],
  [4,4,'Divide by 100','fractions','What is 725 ÷ 100?','7.25',['0.725','72.5','72500'],'divide-power-ten'],
  [4,4,'Metric conversion','measure','How many centimetres are in 3.5 metres?','350 cm',['35 cm','305 cm','3,500 cm'],'unit-conversion'],
  [4,4,'Angle types','geometry','An angle measures 125°. What type is it?','Obtuse',['Acute','Right','Reflex'],'angle-type'],
  [4,4,'Coordinates','geometry','Move 3 right and 2 up from (1, 1). Where do you land?','(4, 3)',['(3, 4)','(4, 2)','(2, 3)'],'coordinates'],
  [4,4,'Multiplication','calculation','What is 326 × 4?','1,304',['1,204','1,284','1,364'],'multiplication'],
  [5,4,'Timetables','data','A train leaves at 14:38 and arrives 47 minutes later. When does it arrive?','15:25',['15:15','15:35','14:85'],'time'],
  [5,5,'Prime numbers','tables','Which number is prime?','29',['21','27','33'],'prime'],
  [5,5,'Adding fractions','fractions','What is 3/4 + 1/8?','7/8',['4/12','4/8','1 1/8'],'fraction-addition'],
  [5,5,'Percentages','fractions','What is 20% of 150?','30',['20','25','35'],'percentage'],
  [5,5,'Volume','measure','A cuboid is 4 cm × 3 cm × 2 cm. What is its volume?','24 cm³',['9 cm³','18 cm³','24 cm²'],'volume'],
  [5,5,'Metric conversion','measure','How many grams are in 2.75 kilograms?','2,750 g',['275 g','2,075 g','27,500 g'],'unit-conversion'],
  [5,5,'Multi-step problem','calculation','A club buys 6 packs of 24 balls and gives away 19. How many remain?','125',['119','134','163'],'multi-step']
];

const scienceRows=[
  [3,1,'Plant parts','plants','Which plant part usually absorbs water from the soil?','Roots',['Flowers','Fruit','Petals'],'plant-parts'],
  [3,1,'Plant growth','plants','Which is essential for a healthy plant to make food?','Light',['Plastic','Paint','Sandpaper'],'plant-needs'],
  [3,1,'Skeletons','animals','What is one job of the skeleton?','Support the body',['Digest food','Make sunlight','Pump air'],'body-parts'],
  [3,1,'Nutrition','animals','Why do animals need food?','For energy and growth',['To make shadows','To become magnets','To stop breathing'],'animal-needs'],
  [3,1,'Rocks','materials','Which property can be used to compare rocks?','Hardness',['Birthday','Favourite colour','Name length'],'rock-properties'],
  [3,1,'Light','lightSound','Why can you see a book in daylight?','Light reflects from it into your eyes',['The book makes sound','Your eyes send out light','Air pushes the picture'],'light'],
  [3,1,'Magnets','forces','What happens when two north poles meet?','They repel',['They attract','They melt','They make light'],'magnets'],
  [3,2,'Water transport','plants','Which plant part carries water from roots towards leaves?','Stem',['Petal','Seed coat','Fruit skin'],'plant-parts'],
  [3,2,'Muscles','animals','How do muscles help the body move?','They pull on bones',['They turn into food','They reflect light','They make soil'],'body-parts'],
  [3,2,'Fossils','materials','How can a fossil form?','Remains are buried and minerals replace them',['A shadow freezes','A magnet grows','A cloud becomes stone'],'rocks'],
  [3,2,'Soil','materials','Which can be part of soil?','Tiny rock pieces and decayed material',['Only clean water','Only metal','Only air'],'rocks'],
  [3,2,'Shadows','lightSound','What usually makes a shadow larger?','Move the object nearer the light',['Turn off gravity','Move it behind your eyes','Make the object colder'],'shadows'],
  [3,2,'Friction','forces','On which surface will a toy car usually slow fastest?','Rough carpet',['Smooth tile','Polished wood','Ice'],'friction'],
  [3,2,'Fair tests','living','In a fair test, what should usually change?','One variable',['Every variable','No measurements','The conclusion'],'fair-test'],
  [4,3,'Classification','living','Which feature helps classify a vertebrate?','Whether it has feathers, fur or scales',['Its pet name','Its age in days','Where you first saw it'],'classification'],
  [4,3,'Food chains','animals','What is the producer in a grass → rabbit → fox food chain?','Grass',['Rabbit','Fox','Sunlight'],'food-chain'],
  [4,3,'Digestion','animals','Where does digestion begin?','Mouth',['Lungs','Heart','Bones'],'digestion'],
  [4,3,'Teeth','animals','Which teeth are mainly used for grinding food?','Molars',['Incisors','Canines','Milk teeth'],'teeth'],
  [4,3,'States of matter','materials','Which state keeps its volume but takes the shape of its container?','Liquid',['Solid','Gas','Light'],'states'],
  [4,3,'Sound','lightSound','What starts a sound?','A vibration',['A shadow','A colour','A magnet pole'],'sound'],
  [4,3,'Circuits','electricity','What is needed for a bulb to light in a simple circuit?','A complete loop',['An open switch','A paper wire','Only one terminal'],'circuits'],
  [4,4,'Habitats','living','Why can habitat change harm a species?','It may lose food or shelter',['It gains a new name','It stops needing water','All predators disappear'],'habitats'],
  [4,4,'Water cycle','materials','What is evaporation?','Liquid water changing to water vapour',['Gas changing to liquid','Ice changing straight to soil','Rain entering a cloud'],'water-cycle'],
  [4,4,'Pitch','lightSound','Which change usually gives a string a higher pitch?','Make it tighter',['Make it looser','Stop it vibrating','Cover your ears'],'sound'],
  [4,4,'Conductors','electricity','Which material is usually an electrical conductor?','Copper',['Rubber','Dry wood','Plastic'],'conductors'],
  [4,4,'Switches','electricity','What does an open switch do in a series circuit?','Breaks the circuit',['Adds a battery','Makes a magnet','Stores sound'],'circuits'],
  [4,4,'Scientific evidence','living','Why repeat a measurement?','To make results more reliable',['To change the question','To avoid recording data','To guarantee an idea is true'],'fair-test'],
  [5,5,'Life cycles','living','Which stage comes after a butterfly egg?','Larva',['Adult butterfly','Pupa','Seed'],'life-cycles'],
  [5,5,'Dissolving','materials','What forms when salt dissolves completely in water?','A solution',['A new planet','A solid-only mixture','A gas circuit'],'solutions'],
  [5,5,'Separating mixtures','materials','Which method can separate sand from water?','Filtering',['Magnetism','Freezing sunlight','Using a switch'],'separation'],
  [5,5,'Earth and space','earth','What causes day and night on Earth?','Earth rotating',['The Sun circling Earth daily','Clouds covering the Moon','Earth changing shape'],'earth-space'],
  [5,5,'Gravity','forces','Which force pulls objects towards Earth?','Gravity',['Sound','Electric current','Upthrust only'],'gravity'],
  [5,5,'Air resistance','forces','Why does a wide parachute slow a fall?','It creates more air resistance',['It removes gravity','It makes the person lighter','It turns air into solid'],'air-resistance']
];

const englishChoiceRows=[
  [3,1,'Vocabulary','vocabulary','Which word means very small?','tiny',['enormous','furious','ancient'],'synonym'],
  [3,1,'Conjunctions','grammar','Choose the best word: “We stayed inside ___ it was raining.”','because',['under','slowly','beforehand'],'conjunction'],
  [3,1,'Prepositions','grammar','Which word completes the sentence? “The key is ___ the box.”','inside',['quickly','and','shouted'],'preposition'],
  [3,1,'Sentence punctuation','punctuation','Which sentence is punctuated correctly?','Where is my coat?',['where is my coat?','Where is my coat.','where is my coat.'],'punctuation'],
  [3,1,'Reading evidence','reading','“Ava pulled up her hood as rain drummed on the path.” What is the weather like?','Wet',['Hot','Snowy','Windless'],'inference'],
  [3,2,'Homophones','spelling','Choose the correct word: “Put the bag over ___.”','there',['their',"they're",'theer'],'homophone'],
  [3,2,'Present perfect','grammar','Which sentence uses the present perfect?','I have finished my model.',['I finish my model.','I finished my model yesterday.','I will finish my model.'],'present-perfect'],
  [3,2,'Direct speech','punctuation','Which sentence punctuates speech correctly?','“Stop!” called Sam.',['“Stop”! called Sam.','Stop!” called Sam.','“stop!” called Sam.'],'speech-punctuation'],
  [3,2,'Main idea','reading','A paragraph explains how bees collect nectar and carry pollen. What is its main idea?','How bees gather food and help plants',['Why all insects sting','How to build a hive from wood','Why flowers only grow in summer'],'main-idea'],
  [3,2,'Word meaning','vocabulary','Which word is closest in meaning to exhausted?','very tired',['very loud','very tidy','very brave'],'synonym'],
  [4,3,'Pronouns','grammar','Choose the pronoun: “Mina found the map and she opened it.”','she',['found','map','opened'],'pronoun'],
  [4,3,'Paragraphs','reading','When should a writer usually start a new paragraph?','When the main idea, place or time changes',['After every three words','Only at the end of a page','Whenever a noun appears'],'paragraphs'],
  [4,3,'Possessive apostrophes','punctuation','Which phrase means the helmet belonging to one climber?','the climber’s helmet',['the climbers helmet','the climbers’ helmet','the climber,s helmet'],'apostrophe'],
  [4,3,'Homophones','spelling','Choose the correct word: “___ team won the match.”','Our',['Hour','Are','Oar'],'homophone'],
  [4,3,'Inference','reading','“Leon checked the clock twice and tapped his foot.” How is Leon probably feeling?','Impatient',['Sleepy','Proud','Confused by colour'],'inference'],
  [4,3,'Vocabulary','vocabulary','Which word means to look quickly?','glance',['stare','sleep','announce'],'synonym'],
  [4,4,'Fronted adverbials','grammar','Which sentence begins with a fronted adverbial?','Before sunrise, we packed the bags.',['We packed the bags.','The heavy bags were packed.','We carefully packed.'],'fronted-adverbial'],
  [4,4,'Commas','punctuation','Which sentence uses a comma after a fronted adverbial?','Without warning, the gate opened.',['Without, warning the gate opened.','Without warning the gate, opened.','Without warning the gate opened.'],'comma'],
  [4,4,'Summary','reading','A text describes a seed sprouting, growing leaves and becoming a flower. Which is the best summary?','The stages of plant growth',['A list of garden tools','Why every seed fails','How to paint a flower'],'summary'],
  [4,4,'Prefixes','spelling','Which word means not fair?','unfair',['refair','prefair','fairless'],'prefix'],
  [4,4,'Word classes','grammar','Which word is the adverb? “The fox moved silently.”','silently',['fox','moved','the'],'adverb'],
  [5,5,'Relative clauses','grammar','Which words form the relative clause? “The tower, which touched the clouds, swayed.”','which touched the clouds',['The tower','swayed','the clouds swayed'],'relative-clause'],
  [5,5,'Modal verbs','grammar','Which word shows possibility? “We might reach the summit.”','might',['we','reach','summit'],'modal-verb'],
  [5,5,'Fact and opinion','reading','Which sentence is an opinion?','The blue route is the most exciting.',['The route has five platforms.','The sign says Level 5.','The bridge is 10 metres long.'],'fact-opinion'],
  [5,5,'Cohesion','grammar','Choose the best linking word: “The path was steep; ___, the team continued.”','however',['because','under','yesterday'],'cohesion'],
  [5,5,'Punctuation','punctuation','Which sentence uses brackets correctly?','The Moon (Earth’s satellite) reflects sunlight.',['The Moon Earth’s (satellite reflects) sunlight.','The Moon) Earth’s satellite (reflects sunlight.','The Moon (Earth’s satellite reflects sunlight.'],'brackets'],
  [5,5,'Author language','reading','“The wind clawed at the tent.” What does clawed suggest?','The wind felt fierce and forceful',['The wind had real fingers','The tent was underground','The air was completely still'],'figurative-language']
];

const englishSpells=[
  [28,3,1,'Spelling','Spell the word meaning a two-wheeled vehicle.','bicycle','It begins bi and ends cycle.','spelling-word'],
  [29,3,2,'Spelling','Spell the word meaning something you do often.','regular','Say reg-u-lar slowly.','spelling-word'],
  [30,4,3,'Spelling','Spell the word meaning important or needed.','necessary','It has one c and two s letters.','spelling-word'],
  [31,4,4,'Suffixes','Add -ful to spell the word meaning full of care.','careful','Keep the e in care before adding ful.','suffix'],
  [32,5,5,'Prefixes','Add a prefix to spell the opposite of possible.','impossible','The two-letter prefix ends with m.','prefix'],
  [33,5,5,'Spelling','Spell the word meaning a place where people live together.','community','Break it into com-mu-ni-ty.','spelling-word']
];

export const curriculumQuestionBank=Object.freeze([
  ...mathsRows.map((row,index)=>choice('maths',index+1,...row)),
  ...scienceRows.map((row,index)=>choice('science',index+1,...row)),
  ...englishChoiceRows.map((row,index)=>choice('english',index+1,...row)),
  ...englishSpells.map(row=>spell(...row))
]);

export const CURRICULUM_BANK_COUNTS=Object.freeze({total:100,maths:34,science:33,english:33});

export function getCurriculumQuestions({subject,year,level}={}){
  return curriculumQuestionBank.filter(question=>(!subject||question.subject===subject)&&(!year||question.year===`Year ${year}`||question.year===year)&&(!level||question.level===Number(level)));
}

export function validateCurriculumQuestionBank(bank=curriculumQuestionBank){
  if(!Array.isArray(bank)||bank.length!==CURRICULUM_BANK_COUNTS.total)throw new Error('The curriculum bank must contain exactly 100 questions.');
  const ids=new Set();
  for(const question of bank){
    if(ids.has(question.id))throw new Error(`Duplicate curriculum question ${question.id}`);ids.add(question.id);
    if(!['maths','science','english'].includes(question.subject))throw new Error(`Unknown subject for ${question.id}`);
    if(!['Year 3','Year 4','Year 5'].includes(question.year)||question.level<1||question.level>5)throw new Error(`Invalid progression for ${question.id}`);
    if(!question.prompt||!question.answer||!question.hint||!question.learn?.text||!question.learn?.example)throw new Error(`Incomplete curriculum question ${question.id}`);
    if(question.type==='choice'&&(!Array.isArray(question.options)||!question.options.includes(question.answer)||new Set(question.options).size!==question.options.length))throw new Error(`Invalid choices for ${question.id}`);
    if(question.type==='spell'&&[...question.answer].sort().join('')!==[...question.letters].sort().join(''))throw new Error(`Invalid letter bank for ${question.id}`);
  }
  for(const [subject,count] of Object.entries(CURRICULUM_BANK_COUNTS))if(subject!=='total'&&bank.filter(question=>question.subject===subject).length!==count)throw new Error(`Expected ${count} ${subject} questions.`);
  return true;
}
