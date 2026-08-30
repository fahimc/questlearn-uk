export const SKYBOUND_LANES=Object.freeze(['left','right']);

function hashText(value){let hash=2166136261;for(const character of value){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
function assertQuestions(questions){if(!Array.isArray(questions)||!questions.length)throw new TypeError('Skybound needs a non-empty question list.')}
function laneAnswers(question,stageIndex){const answerLeft=(hashText(`${question.id}:${stageIndex}`)&1)===0,wrong=question.options.find(option=>option!==question.answer);return answerLeft?{left:question.answer,right:wrong}:{left:wrong,right:question.answer}}

export function createSkyboundRun(questions,{startStage=0}={}){
  assertQuestions(questions);
  if(!Number.isInteger(startStage)||startStage<0||startStage>=questions.length)throw new RangeError('Invalid Skybound start stage.');
  return{stageIndex:startStage,checkpointStage:startStage,status:'ready',attempt:1,selectedLane:null,brokenLane:null,laneAnswers:laneAnswers(questions[startStage],startStage),completed:false};
}

export function chooseSkyboundLane(state,questions,lane){
  assertQuestions(questions);
  if(!SKYBOUND_LANES.includes(lane))throw new TypeError('Lane must be left or right.');
  if(state.status!=='ready')return state;
  const correct=state.laneAnswers[lane]===questions[state.stageIndex].answer;
  return{...state,status:correct?'crossing':'falling',selectedLane:lane,brokenLane:correct?null:lane};
}

export function reachSkyboundCheckpoint(state,questions){
  assertQuestions(questions);
  if(state.status!=='crossing')return state;
  const nextStage=state.stageIndex+1;
  if(nextStage>=questions.length)return{...state,checkpointStage:questions.length,status:'complete',completed:true};
  return{stageIndex:nextStage,checkpointStage:nextStage,status:'ready',attempt:1,selectedLane:null,brokenLane:null,laneAnswers:laneAnswers(questions[nextStage],nextStage),completed:false};
}

export function respawnSkyboundStage(state){
  if(state.completed)return state;
  return{...state,status:'ready',attempt:state.attempt+1,selectedLane:null,brokenLane:null};
}

export function getSkyboundStage(state,questions){assertQuestions(questions);return questions[state.stageIndex]||null}
