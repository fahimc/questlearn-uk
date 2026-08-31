import { buildEnglishYearBank, validateDeepQuestionBank } from '../question-factory.js';

const c=(term,strand,generatorId,description,example,purpose,check)=>({term,strand,generatorId,description,example,purpose,check});
const s=(word,clue,hint)=>({word,clue,hint});
const levels=[
  {concepts:[
    c('a fronted adverbial','Sentence structure','fronted-adverbial','An opening word or phrase explaining when, where or how','“Before sunrise, we left.” begins with time information','It sets the circumstances before the main clause','Find the main clause and inspect the opening phrase'),
    c('a comma after an opener','Punctuation','comma','A mark separating a fronted adverbial from the main clause','“Across the valley, lights flickered.” uses one after place','It makes the sentence boundary clear to the reader','Read to the end of the opening information'),
    c('an expanded noun phrase','Description','grammar','A noun phrase enlarged with precise modifiers','“The narrow, moonlit path” adds two details to path','It builds a clearer picture of a person, place or thing','Find the head noun and check every modifier describes it'),
    c('a possessive apostrophe','Punctuation','apostrophe','A mark showing ownership for singular or plural nouns','“The players’ boots” belong to several players','It distinguishes ownership from an ordinary plural','Identify the owner and decide whether it is singular or plural')],spelling:[
      s('decide','Spell the verb meaning to make a choice.','Remember the ending -cide.'),s('describe','Spell the verb meaning to give details about something.','It begins de- and ends -scribe.'),s('different','Spell the word meaning not the same.','Break it into dif-fer-ent.'),s('difficult','Spell the word meaning not easy.','It begins diff- and ends -icult.')
  ]},
  {concepts:[
    c('pronoun cohesion','Cohesion','pronoun','Using pronouns with clear noun references across sentences','“Maya lifted the map. She unfolded it.” keeps both references clear','It links ideas without repeating every noun','Trace each pronoun back to one unambiguous noun'),
    c('paragraphing','Text organisation','paragraphs','Grouping related sentences and starting a new group when focus changes','A new speaker begins a new paragraph in a conversation','It guides readers through changes in topic, place, time or speaker','Summarise each group in a few words'),
    c('a causal conjunction','Sentence structure','conjunction','A linking word showing that one clause gives a reason or result','“We sheltered because the rain grew heavier.”','It explains why something happened','Check whether the second clause truly gives a cause'),
    c('a prepositional phrase','Sentence structure','preposition','A phrase beginning with a preposition and adding place, time or direction','“Beyond the old bridge” tells where','It locates an action or noun more precisely','Find the preposition and the noun phrase following it')],spelling:[
      s('disappear','Spell the verb meaning to go out of sight.','Add dis- to appear and keep the double p.'),s('early','Spell the word meaning before the expected time.','It begins ear- and ends -ly.'),s('earth','Spell the word for the planet or soil beneath us.','It uses the letter group ear.'),s('eight','Spell the number that comes after seven.','The middle group is eigh.')
  ]},
  {concepts:[
    c('punctuated direct speech','Punctuation','speech-punctuation','Spoken words enclosed by inverted commas with suitable punctuation','“Come here,” Dad called. places the comma before the closing mark','It shows exactly where speech begins and ends','Check the capital, closing punctuation and reporting clause'),
    c('the present perfect','Verb forms','present-perfect','Has or have plus a past participle connected to the present','“They have explored the cave.”','It shows an earlier action with present relevance','Find has or have and test the following verb form'),
    c('standard English','Grammar choices','grammar','Forms accepted in formal spoken and written English','“We were ready” uses the standard plural form','It helps writing remain clear across audiences','Reread the subject and verb together for agreement'),
    c('a determiner','Word classes','determiner','A word before a noun showing which, whose or how many','“Several bright stars” uses several before stars','It makes the noun reference more exact','Look directly before the noun phrase')],spelling:[
      s('enough','Spell the word meaning as much as is needed.','It ends with the sound written -ough.'),s('exercise','Spell the noun or verb connected with physical activity or practice.','It begins exer- and ends -cise.'),s('experience','Spell the word for knowledge gained by doing something.','Break it into ex-per-i-ence.'),s('experiment','Spell the word for a scientific test.','Break it into ex-per-i-ment.')
  ]},
  {concepts:[
    c('retrieval with evidence','Reading comprehension','retrieval','Locating a directly stated detail and showing where it appears','A timetable states 14:20, so that exact time is retrieved','It answers factual questions precisely','Match key words and quote or point to the relevant line'),
    c('evidence-based inference','Reading comprehension','inference','Using several text clues to support an unstated idea','Locked doors and whispers suggest secrecy','It explains implied feelings, motives or events','Name the clue before stating the inference'),
    c('a summary','Reading comprehension','summary','A short account containing central ideas but not minor detail','A whole rescue scene becomes “The crew escaped the storm.”','It helps a reader retain the important sequence or point','Remove examples and repetition while preserving meaning'),
    c('word meaning from context','Vocabulary','synonym','Working out an unfamiliar word by reading surrounding clues','“The arid ground was cracked and dry” suggests arid means dry','It builds understanding without interrupting reading','Replace the word with a likely synonym and reread')],spelling:[
      s('famous','Spell the word meaning known by many people.','Remember the ending -ous.'),s('favourite','Spell the word meaning liked more than the others, using British spelling.','It contains our before -ite.'),s('February','Spell the second month of the year.','Remember the first r after Feb.'),s('forward','Spell the direction opposite to backward.','It begins for- and ends -ward.')
  ]},
  {concepts:[
    c('the prefix re-','Word building','prefix','A prefix usually meaning again or back','Rebuild means build again','It changes the root meaning without changing its core spelling','Remove re- and check that a real root remains'),
    c('the suffix -ation','Word building','suffix','A suffix often turning a verb into a noun','Inform becomes information','It names a process or result','Find the root and check any spelling change before the suffix'),
    c('a homophone choice','Spelling and meaning','homophone','Choosing between same-sounding words using sentence meaning','“Whose coat is this?” asks about ownership','It prevents a correct sound from producing the wrong meaning','Substitute each spelling and explain its sentence job'),
    c('a spelling family','Spelling patterns','spelling-word','A group of related words sharing a root or pattern','Sign, signal and signature share a meaning link','It helps unfamiliar spellings connect to known words','Underline the root and note where pronunciation changes')],spelling:[
      s('fruit','Spell the word for the sweet part of a plant containing seeds.','The vowel group is ui.'),s('grammar','Spell the word for rules governing language structure.','It ends -mar, not -mer.'),s('group','Spell the word for a collection of people or things.','The vowel group is ou.'),s('guard','Spell the verb meaning to protect.','The middle letters are ua.')
  ]}
];

export const year4EnglishQuestions=buildEnglishYearBank(4,levels);
validateDeepQuestionBank(year4EnglishQuestions,{subject:'english',year:4});
