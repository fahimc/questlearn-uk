import { createCurriculumLearning } from './curriculum-learning-guides.js';

const SUBJECT_NAME={maths:'Maths',science:'Science',english:'English'};
const codeFor=subject=>({maths:'MAT',science:'SCI',english:'ENG'})[subject];
const optionList=(answer,wrong)=>[String(answer),...wrong.map(String)];

function choice(subject,index,year,level,strand,support,prompt,answer,wrong,generatorId){
  const learn=createCurriculumLearning({subject,strand,generatorId});
  return Object.freeze({id:`${subject.slice(0,3)}-${String(index).padStart(3,'0')}`,subject,subjectName:SUBJECT_NAME[subject],objectiveId:`${codeFor(subject)}-Y${year}-${strand.toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`,year:`Year ${year}`,level,strand,type:'choice',title:strand,prompt,answer:String(answer),options:optionList(answer,wrong),hint:`Rule out choices that do not fit the ${strand.toLowerCase()} clue, then check your choice.`,learn,success:`Correct. ${learn.example}`,generatorId:generatorId||null});
}

function spell(index,year,level,strand,prompt,answer,hint,generatorId){
  const clean=String(answer).toLocaleLowerCase('en-GB'),letters=[...clean].filter(letter=>letter!==' '),shift=index%letters.length,shuffled=[...letters.slice(shift),...letters.slice(0,shift)].reverse();
  const learn=createCurriculumLearning({subject:'english',strand,generatorId});
  return Object.freeze({id:`eng-${String(index).padStart(3,'0')}`,subject:'english',subjectName:'English',objectiveId:`ENG-Y${year}-${strand.toUpperCase().replace(/[^A-Z0-9]+/g,'-')}`,year:`Year ${year}`,level,strand,type:'spell',title:strand,prompt,answer:clean.replaceAll(' ',''),letters:shuffled,hint,learn,success:`Correct. ${learn.example}`,generatorId:generatorId||null});
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

const mathsExtensionRows=[
  [3,1,'Place value','number','What is the value of 7 in 2,741?','700',['70','7','7,000'],'place-value'],
  [3,1,'Addition','calculation','What is 10 more than 689?','699',['679','690','789'],'addition'],
  [3,1,'Comparing numbers','number','Which number is greatest?','3,402',['3,240','3,024','3,399'],'place-value'],
  [3,2,'Division','tables','What is 48 ÷ 8?','6',['5','7','8'],'division'],
  [3,2,'Fractions of amounts','fractions','What is 3/4 of 20?','15',['5','12','16'],'unit-fraction'],
  [3,2,'Time','measure','What time is 40 minutes after 11:35?','12:15',['11:75','12:05','12:25'],'time'],
  [4,3,'Rounding','number','Round 5,286 to the nearest 10.','5,290',['5,280','5,300','5,200'],'rounding'],
  [4,3,'Times tables','tables','What is 12 × 8?','96',['88','92','108'],'multiplication'],
  [4,3,'Perimeter','measure','A rectangle is 9 cm by 4 cm. What is its perimeter?','26 cm',['13 cm','36 cm','22 cm'],'perimeter'],
  [4,4,'Negative numbers','number','The temperature rises from −6°C to 2°C. How many degrees does it rise?','8°C',['4°C','6°C','10°C'],'negative-number'],
  [4,4,'Metric conversion','measure','How many centimetres are in 4.2 metres?','420 cm',['42 cm','402 cm','4,200 cm'],'unit-conversion'],
  [4,4,'Coordinates','geometry','Move 2 left and 4 up from (6, 1). Where do you land?','(4, 5)',['(8, 5)','(4, 3)','(2, 7)'],'coordinates'],
  [5,5,'Prime numbers','tables','Which of these is a prime number greater than 30?','37',['33','39','49'],'prime'],
  [5,5,'Adding fractions','fractions','What is 2/3 + 1/6?','5/6',['3/9','3/6','1'],'fraction-addition'],
  [5,5,'Volume','measure','A cuboid is 5 cm × 3 cm × 4 cm. What is its volume?','60 cm³',['12 cm³','40 cm³','60 cm²'],'volume'],
  [5,5,'Multi-step problem','calculation','A coach has 8 bags of 15 cones and gives away 17. How many remain?','103',['97','105','137'],'multi-step']
];

const scienceExtensionRows=[
  [3,1,'Seed dispersal','plants','Why do some seeds have wing-like shapes?','To be carried by wind',['To make their own soil','To attract magnets','To stop needing water'],'plant-parts'],
  [3,1,'Light sources','lightSound','Which object is a light source?','A lit torch',['The Moon','A mirror','A book'],'light'],
  [3,1,'Magnetic materials','forces','Which object is most likely attracted to a magnet?','An iron nail',['A wooden spoon','A glass marble','A rubber band'],'magnets'],
  [3,2,'Plant investigation','plants','A plant is kept dark while an identical plant has light. What is being changed?','The light',['The plant type','The pot size','The amount measured'],'fair-test'],
  [3,2,'Joints','animals','What do joints allow bones to do?','Move relative to each other',['Make food','Absorb light','Turn into muscle'],'body-parts'],
  [3,2,'Transparent materials','lightSound','Which material lets most light pass through clearly?','Clear glass',['Cardboard','Brick','Thick wood'],'light'],
  [4,3,'Changes of state','materials','What is melting?','A solid changing to a liquid',['A liquid changing to a gas','A gas changing to a liquid','A liquid changing to a solid'],'states'],
  [4,3,'Sound volume','lightSound','What usually makes a drum sound louder?','Hit it with more force',['Stop the skin vibrating','Move it into a vacuum','Touch it very gently'],'sound'],
  [4,3,'Food chains','animals','In algae → tadpole → fish, which animal eats the producer?','Tadpole',['Fish','Algae','Neither animal'],'food-chain'],
  [4,4,'Condensation','materials','Why do droplets form on the outside of a cold glass?','Water vapour cools and condenses',['The glass creates new water','Ice passes through the glass','Gravity changes air into water'],'water-cycle'],
  [4,4,'Circuit investigation','electricity','To test how bulb number affects brightness, what should stay the same?','The battery',['The number of bulbs','The measured brightness','The question'],'fair-test'],
  [4,4,'Habitat evidence','living','Which observation best shows a pond supports frogs?','Frogspawn and tadpoles are present',['The water looks blue','A sign names the pond','The bank has one stone'],'habitats'],
  [4,4,'Sound travel','lightSound','Why can you hear a bell through air?','Vibrations travel through the air',['Light carries the sound','The bell pulls your ears','Air stops all vibration'],'sound'],
  [5,5,'Plant reproduction','living','Which part of a flower receives pollen?','Stigma',['Root hair','Stem','Seed coat'],'life-cycles'],
  [5,5,'Reversible changes','materials','Which change is reversible?','Melting and refreezing ice',['Burning paper','Baking a cake','Rusting iron'],'states'],
  [5,5,'Moon movement','earth','What does the Moon orbit?','Earth',['Mars','The North Star','Only itself'],'earth-space'],
  [5,5,'Levers','forces','How can a lever make lifting easier?','It increases the turning effect of a force',['It removes mass','It switches off gravity','It turns solids into gases'],'forces']
];

const englishExtensionRows=[
  [3,1,'Nouns','grammar','Which word is the noun? “The rabbit hopped quickly.”','rabbit',['hopped','quickly','the'],'noun'],
  [3,1,'Vocabulary','vocabulary','Which word means very angry?','furious',['gentle','tiny','silent'],'synonym'],
  [3,1,'Sentence punctuation','punctuation','Which statement has the correct capital letter and end mark?','The race starts today.',['the race starts today.','The race starts today?','the race starts today'],'punctuation'],
  [3,1,'Reading retrieval','reading','“The red kite landed beside the oak tree.” Where did the kite land?','Beside the oak tree',['On the roof','Inside a cave','Across the river'],'retrieval'],
  [3,2,'Conjunctions','grammar','Choose the best word: “We packed boots ___ the path was muddy.”','because',['under','quietly','tomorrow'],'conjunction'],
  [3,2,'Adverbs','grammar','Which word tells how the owl flew? “The owl flew silently.”','silently',['owl','flew','the'],'adverb'],
  [3,2,'Main idea','reading','A paragraph explains how to plant, water and care for a bean. What is its main idea?','How to grow a bean plant',['Why beans are blue','How to cook every vegetable','Why soil is made of metal'],'main-idea'],
  [3,2,'Suffixes','spelling','Which word means someone who teaches?','teacher',['teachful','unteach','teachment'],'suffix'],
  [4,3,'Determiners','grammar','Which word is the determiner? “Those birds built a nest.”','Those',['birds','built','nest'],'determiner'],
  [4,3,'Possessive apostrophes','punctuation','Which phrase means the den belonging to several foxes?','the foxes’ den',['the fox’s den','the foxes den','the foxes,s den'],'apostrophe'],
  [4,3,'Inference','reading','“Priya grinned and held the trophy above her head.” How does Priya probably feel?','Proud',['Bored','Hungry','Lost'],'inference'],
  [4,4,'Pronouns','grammar','Which pronoun best replaces “the two climbers”?','they',['it','he','this'],'pronoun'],
  [4,4,'Commas','punctuation','Which sentence correctly uses a comma after an opening phrase?','During the night, snow covered the path.',['During, the night snow covered the path.','During the night snow, covered the path.','During the night snow covered the path.'],'comma'],
  [4,4,'Prefixes','spelling','Which word means to build again?','rebuild',['unbuild','prebuild','buildless'],'prefix'],
  [4,4,'Reading evidence','reading','“The puddles had frozen and each breath made a cloud.” Which detail shows it was cold?','The puddles had frozen',['There were puddles','Someone was breathing','A cloud was seen'],'retrieval'],
  [5,5,'Relative clauses','grammar','Which words form the relative clause? “The bridge, which crossed the ravine, shook.”','which crossed the ravine',['The bridge','shook','the ravine shook'],'relative-clause'],
  [5,5,'Modal verbs','grammar','Which modal verb shows strong obligation? “You ___ wear a helmet.”','must',['might','could','may'],'modal-verb']
];

export const curriculumQuestionBank=Object.freeze([
  ...mathsRows.map((row,index)=>choice('maths',index+1,...row)),
  ...mathsExtensionRows.map((row,index)=>choice('maths',index+35,...row)),
  ...scienceRows.map((row,index)=>choice('science',index+1,...row)),
  ...scienceExtensionRows.map((row,index)=>choice('science',index+34,...row)),
  ...englishChoiceRows.map((row,index)=>choice('english',index+1,...row)),
  ...englishSpells.map(row=>spell(...row)),
  ...englishExtensionRows.map((row,index)=>choice('english',index+34,...row))
]);

export const CURRICULUM_BANK_COUNTS=Object.freeze({total:150,maths:50,science:50,english:50});

export function getCurriculumQuestions({subject,year,level}={}){
  return curriculumQuestionBank.filter(question=>(!subject||question.subject===subject)&&(!year||question.year===`Year ${year}`||question.year===year)&&(!level||question.level===Number(level)));
}

export function validateCurriculumQuestionBank(bank=curriculumQuestionBank){
  if(!Array.isArray(bank)||bank.length!==CURRICULUM_BANK_COUNTS.total)throw new Error('The curriculum bank must contain exactly 150 questions.');
  const ids=new Set();
  for(const question of bank){
    if(ids.has(question.id))throw new Error(`Duplicate curriculum question ${question.id}`);ids.add(question.id);
    if(!['maths','science','english'].includes(question.subject))throw new Error(`Unknown subject for ${question.id}`);
    if(!['Year 3','Year 4','Year 5'].includes(question.year)||question.level<1||question.level>5)throw new Error(`Invalid progression for ${question.id}`);
    if(!question.prompt||!question.answer||!question.hint||!question.learn?.text||!question.learn?.example||question.learn.steps?.length<3||!question.learn.check)throw new Error(`Incomplete curriculum question ${question.id}`);
    if(question.type==='choice'&&(!Array.isArray(question.options)||!question.options.includes(question.answer)||new Set(question.options).size!==question.options.length))throw new Error(`Invalid choices for ${question.id}`);
    if(question.type==='spell'&&[...question.answer].sort().join('')!==[...question.letters].sort().join(''))throw new Error(`Invalid letter bank for ${question.id}`);
  }
  for(const [subject,count] of Object.entries(CURRICULUM_BANK_COUNTS))if(subject!=='total'&&bank.filter(question=>question.subject===subject).length!==count)throw new Error(`Expected ${count} ${subject} questions.`);
  return true;
}
