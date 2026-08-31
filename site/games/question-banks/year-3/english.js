import { buildEnglishYearBank, validateDeepQuestionBank } from '../question-factory.js';

const c=(term,strand,generatorId,description,example,purpose,check)=>({term,strand,generatorId,description,example,purpose,check});
const s=(word,clue,hint)=>({word,clue,hint});
const levels=[
  {concepts:[
    c('a noun','Word classes','noun','A word naming a person, place, thing or idea','“River” names a thing in “The river rushed.”','It identifies who or what a sentence is about','Ask whether the word names something'),
    c('a verb','Word classes','grammar','A word showing an action, event or state','“Whispered” shows the action in “Mina whispered.”','It tells what happens or what something is','Change the time and see whether the word changes'),
    c('an adjective','Word classes','grammar','A word describing a noun','“Silver” describes the noun moon','It adds a detail about a person, place or thing','Find the noun and ask which word describes it'),
    c('an adverb','Word classes','adverb','A word adding information about how, when or where','“Carefully” explains how the glass was carried','It makes an action or description more precise','Find the verb and ask how, when or where')],spelling:[
      s('accident','Spell the word for something unplanned that causes a mistake or harm.','It begins ac- and has a double c.'),s('actual','Spell the word meaning real or true.','Begin with act, then add -ual.'),s('address','Spell the word for the details showing where someone lives.','It has double d and double s.'),s('answer','Spell the word meaning a response to a question.','The w is not heard.')
  ]},
  {concepts:[
    c('a conjunction','Sentence structure','conjunction','A word linking words or clauses','“Because” links an action to its reason','It shows a relationship such as cause, time or contrast','Read both clauses and name their relationship'),
    c('a preposition','Sentence structure','preposition','A word showing place, time or direction','“Beneath” shows where the key was hidden','It connects a noun phrase to another part of a sentence','Picture the scene and test the location word'),
    c('a determiner','Sentence structure','determiner','A word introducing a noun and showing which or how many','“Those” introduces birds in “those birds”','It makes the following noun more specific','Look immediately before the noun'),
    c('a pronoun','Sentence structure','pronoun','A word replacing a noun or noun phrase','“She” replaces Aisha in the next sentence','It avoids unnecessary repetition and links ideas','Check that it clearly matches the right noun')],spelling:[
      s('appear','Spell the word meaning to come into view.','It begins ap- and has a double p.'),s('arrive','Spell the word meaning to reach a place.','It begins ar- and ends -ive.'),s('believe','Spell the word meaning to think something is true.','Remember lie inside the word.'),s('bicycle','Spell the word for a two-wheeled vehicle with pedals.','Use bi- for two and cycle for wheels.')
  ]},
  {concepts:[
    c('the present perfect','Verb forms','present-perfect','Has or have followed by a past participle','“She has finished” links a past action to now','It connects an earlier action with the present','Look for has or have plus the correct verb form'),
    c('direct speech','Punctuation','speech-punctuation','The exact words spoken by a character','“Wait!” called Sam. places the spoken word in marks','It lets a reader hear a character’s own words','Check capitals, inverted commas and punctuation'),
    c('a paragraph','Text organisation','paragraphs','A group of sentences about one main idea','A new paragraph begins when the story moves outside','It groups related information and signals a change','Ask whether the topic, speaker, place or time changes'),
    c('a main idea','Reading comprehension','main-idea','The central point covered by most of a paragraph','Details about nests and chicks support an idea about raising young','It helps a reader understand what the whole section is about','Choose a statement broad enough to cover every key detail')],spelling:[
      s('breath','Spell the noun for the air taken into or sent out of your lungs.','It ends -eath, not the verb ending -eathe.'),s('breathe','Spell the verb meaning to take air into your lungs.','Add a final e to the related noun.'),s('build','Spell the verb meaning to make something by joining parts.','The middle vowel is ui.'),s('busy','Spell the word meaning having a lot to do.','The first vowel sounds different from its spelling.')
  ]},
  {concepts:[
    c('retrieval','Reading skills','retrieval','Finding information stated directly in a text','A sentence names Tuesday, so Tuesday answers the question','It locates an exact fact without adding a guess','Match key words in the question to the text'),
    c('inference','Reading skills','inference','Combining text clues with sensible knowledge','Shaking hands and a racing heart suggest nervousness','It explains something the writer shows but does not state','Point to the words that support the idea'),
    c('prediction','Reading skills','inference','A sensible idea about what may happen next based on clues','Dark clouds and thunder suggest rain may follow','It uses earlier events to anticipate a likely next event','Use text evidence rather than personal preference'),
    c('a synonym','Vocabulary','synonym','A word with the same or nearly the same meaning','“Tiny” can replace “small” in many sentences','It helps vary vocabulary while keeping meaning','Replace the word and reread the whole sentence')],spelling:[
      s('calendar','Spell the word for a chart showing days, weeks and months.','It ends -dar, not -der.'),s('caught','Spell the past tense of catch.','The middle letter group is augh.'),s('centre','Spell the word for the middle point, using British spelling.','Use the British ending -tre.'),s('century','Spell the word for one hundred years.','Begin with cent, meaning one hundred.')
  ]},
  {concepts:[
    c('a prefix','Word building','prefix','Letters added before a root word to change meaning','Adding dis- to agree makes disagree','It can show ideas such as not, again or before','Separate the prefix from the unchanged root'),
    c('a suffix','Word building','suffix','Letters added after a root word to change form or meaning','Adding -ful to care makes careful','It can turn a word into a new word class','Find the root before applying the spelling rule'),
    c('a homophone','Spelling and meaning','homophone','A word sounding like another word but with different spelling and meaning','Their and there sound alike but have different jobs','It requires sentence meaning to choose the spelling','Put each spelling into the complete sentence'),
    c('a possessive apostrophe','Punctuation','apostrophe','A mark showing that something belongs to someone or something','The dog’s lead belongs to one dog','It distinguishes belonging from a simple plural','Identify the owner before placing the apostrophe')],spelling:[
      s('circle','Spell the word for a round 2D shape.','It begins cir- and ends -cle.'),s('complete','Spell the word meaning finished or having every part.','It begins com- and ends -plete.'),s('consider','Spell the verb meaning to think carefully about something.','Break it into con-sid-er.'),s('continue','Spell the verb meaning to keep going.','Break it into con-tin-ue.')
  ]}
];

export const year3EnglishQuestions=buildEnglishYearBank(3,levels);
validateDeepQuestionBank(year3EnglishQuestions,{subject:'english',year:3});
