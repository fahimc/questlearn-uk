import { buildEnglishYearBank, validateDeepQuestionBank } from '../question-factory.js';

const c=(term,strand,generatorId,description,example,purpose,check)=>({term,strand,generatorId,description,example,purpose,check});
const s=(word,clue,hint)=>({word,clue,hint});
const levels=[
  {concepts:[
    c('a relative clause','Sentence structure','relative-clause','A clause adding information about a noun and often beginning who, which or whose','“The pilot, who remained calm, landed safely.”','It adds detail without starting a separate sentence','Find the noun and the clause describing it'),
    c('a modal verb','Verb choices','modal-verb','A verb showing possibility, certainty, ability or obligation','“You must stop” shows strong obligation','It lets a writer control how certain or forceful a statement sounds','Compare might, could, should, will and must'),
    c('an adverb of possibility','Verb choices','modal-verb','An adverb showing how likely something is','“Perhaps the path will reopen.”','It qualifies the certainty of a whole statement','Remove it and notice how the certainty changes'),
    c('parenthesis','Punctuation','brackets','Extra information inserted into a sentence','“The tower (built in 1890) overlooks the bay.”','It adds a useful aside without changing the main grammar','Read the sentence without the extra words')],spelling:[
      s('accommodate','Spell the verb meaning to provide enough room for.','It has double c and double m.'),s('accompany','Spell the verb meaning to go somewhere with someone.','It has double c but one m.'),s('according','Spell the word used in the phrase meaning as stated by.','It begins acc- and contains ord.'),s('achieve','Spell the verb meaning to succeed in reaching a goal.','It begins ach- and ends -ieve.')
  ]},
  {concepts:[
    c('cohesive linking','Cohesion','cohesion','Using words and phrases to show how ideas relate','“However” signals contrast with the previous point','It guides readers through addition, cause, contrast or result','Name the relationship before choosing the link'),
    c('paragraph cohesion','Text organisation','paragraphs','Connecting sentences in one paragraph around a controlled focus','Repeated key terms and clear pronouns maintain the topic','It prevents a paragraph becoming a list of unrelated sentences','Summarise the paragraph and test every sentence against it'),
    c('tense consistency','Verb forms','present-perfect','Keeping time relationships clear across connected verbs','“She opened the gate and walked through” stays in past tense','It prevents confusing jumps between past and present','Underline every verb and compare its time'),
    c('formal vocabulary','Audience and purpose','synonym','Words chosen to suit an official or serious audience','“Request assistance” is more formal than “ask for help”','It matches language to purpose and reader','Replace conversational words and reread the tone')],spelling:[
      s('aggressive','Spell the word describing forceful or hostile behaviour.','It has double g and double s.'),s('amateur','Spell the noun for someone doing an activity without being a professional.','Remember the ending -teur.'),s('ancient','Spell the word meaning belonging to the very distant past.','It begins anci- and ends -ent.'),s('apparent','Spell the word meaning clearly visible or seeming to be true.','It has double p and ends -ent.')
  ]},
  {concepts:[
    c('evidence-based inference','Reading comprehension','inference','A conclusion supported by precise clues and background knowledge','A character hiding a torn letter suggests worry or secrecy','It explains an implied motive, feeling or event','Quote the clue and explain the link to the conclusion'),
    c('a concise summary','Reading comprehension','summary','A short account preserving the central ideas and sequence','Several storm details become “The expedition turned back.”','It captures the whole text without minor examples','Check that each sentence adds an essential point'),
    c('fact and opinion','Reading comprehension','fact-opinion','The difference between checkable claims and personal judgements','“The bridge is 40 m long” is checkable','It helps a reader evaluate how a text makes its claims','Look for evidence versus value words such as best'),
    c('authorial language','Reading comprehension','figurative-language','Words deliberately chosen to shape image, mood or viewpoint','“The corridor swallowed the light” creates a threatening mood','It affects how a reader imagines and feels about a scene','Identify the image and connect it to the intended effect')],spelling:[
      s('appreciate','Spell the verb meaning to value or understand something.','It begins app- and contains -reci-.'),s('attached','Spell the word meaning joined or fastened to something.','It begins att- and ends -ached.'),s('available','Spell the word meaning ready to be used or obtained.','Break it into a-vail-a-ble.'),s('average','Spell the word for a typical value or amount.','It begins aver- and ends -age.')
  ]},
  {concepts:[
    c('commas for clarity','Punctuation','comma','Commas placed to prevent ambiguity or separate sentence parts','“After eating, the lions rested” keeps the meaning clear','They show boundaries that affect interpretation','Read once without the comma and check for another meaning'),
    c('punctuation for parenthesis','Punctuation','brackets','Pairs of commas, brackets or dashes marking extra information','“The route—our safest option—was still steep.”','It separates an aside from the main sentence','Remove the marked section and test the remaining grammar'),
    c('speech punctuation','Punctuation','speech-punctuation','Inverted commas and nearby punctuation marking exact speech','“I agree,” replied Noor. keeps the comma inside the marks','It separates spoken words from the reporting clause','Check opening and closing marks plus the speaker punctuation'),
    c('possessive apostrophes','Punctuation','apostrophe','Apostrophes placed according to singular or plural ownership','“The children’s books” uses an irregular plural owner','They make clear who owns an object or idea','Identify the complete owner word before adding the mark')],spelling:[
      s('awkward','Spell the word meaning difficult to manage or uncomfortable.','It begins awk- and ends -ward.'),s('bargain','Spell the noun for something bought at a good price.','It ends with the letters ain.'),s('bruise','Spell the noun for a dark mark caused by an injury.','The vowel group is ui.'),s('category','Spell the noun for a group of things sharing features.','Break it into cat-e-gor-y.')
  ]},
  {concepts:[
    c('a meaning-changing prefix','Word building','prefix','A prefix altering direction, repetition, degree or opposition','Misread means read incorrectly','It changes meaning while leaving a recognisable root','Separate the prefix and explain its contribution'),
    c('a word-class suffix','Word building','suffix','A suffix changing a root into a noun, verb, adjective or adverb','Adding -ment turns develop into development','It lets a root perform a different sentence job','Compare the root and completed word classes'),
    c('an advanced homophone','Spelling and meaning','homophone','One of two same-sounding words selected by grammar and meaning','“The council met” differs from “She gave counsel”','It demands meaning and word class, not sound alone','Define each spelling before placing it in the sentence'),
    c('morphological spelling','Spelling patterns','spelling-word','Using roots, prefixes and suffixes to remember complex spelling','Conscience connects with conscious despite a sound change','It preserves meaning links when pronunciation is unhelpful','Mark the root and every added morpheme')],spelling:[
      s('cemetery','Spell the noun for a place where people are buried.','It has three e sounds and ends -ery.'),s('committee','Spell the noun for a group appointed to make decisions.','It has double m, double t and double e.'),s('communicate','Spell the verb meaning to share information.','It begins comm- and ends -icate.'),s('community','Spell the noun for people living or working together.','It begins comm- and ends -unity.')
  ]}
];

export const year5EnglishQuestions=buildEnglishYearBank(5,levels);
validateDeepQuestionBank(year5EnglishQuestions,{subject:'english',year:5});
