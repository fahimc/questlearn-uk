export const SKYBOUND_LANES=Object.freeze(['left','right']);
export const SKYBOUND_PLAYER_FOOT_RADIUS=.3;

export function createSkyboundShareData(pageUrl,{year=3,subjectName='Maths'}={}){
  const url=new URL(pageUrl);url.search='';url.hash='';
  return{title:'Skybound Academy achievement',text:`I completed all 10 Year ${year} ${subjectName} bridges in Skybound Academy on EduGames!`,url:url.href};
}

function analogAxis(value){return Number.isFinite(value)?Math.max(-1,Math.min(1,value)):0}
export function getOrbitFacingYaw(cameraYaw=0){return Number.isFinite(cameraYaw)&&cameraYaw!==0?-cameraYaw:0}
export function getSkyboundJoystickVector(clientX,clientY,bounds){
  const radius=Math.max(1,Math.min(bounds.width,bounds.height)*.29),rawX=(clientX-(bounds.left+bounds.width/2))/radius,rawY=((bounds.top+bounds.height/2)-clientY)/radius,magnitude=Math.hypot(rawX,rawY);if(magnitude<.08)return{x:0,y:0,knobX:0,knobY:0};const scale=Math.min(1,magnitude)/magnitude,x=rawX*scale,y=rawY*scale;return{x,y,knobX:x*radius,knobY:-y*radius};
}
export function getSkyboundMovementAxes(input={},cameraYaw=0){
  const forward=Number(Boolean(input.forward))-Number(Boolean(input.back))+analogAxis(input.moveY),left=Number(Boolean(input.left))-Number(Boolean(input.right))-analogAxis(input.moveX),x=left*Math.cos(cameraYaw)-forward*Math.sin(cameraYaw),z=left*Math.sin(cameraYaw)+forward*Math.cos(cameraYaw),scale=Math.max(1,Math.hypot(x,z));
  return{x:x/scale,z:z/scale};
}

export function isSkyboundFootprintOnSupport(x,z,support,radius=SKYBOUND_PLAYER_FOOT_RADIUS){if(!support?.solid)return false;const outsideX=Math.max(0,Math.abs(x-support.x)-support.width/2),outsideZ=Math.max(0,Math.abs(z-support.z)-support.depth/2);return Math.hypot(outsideX,outsideZ)<=radius}

export function createSkyboundJumpControl(){return{bufferRemaining:0,coyoteRemaining:0}}
export function queueSkyboundJump(state){return{...state,bufferRemaining:.2}}
export function stepSkyboundJump(state,{delta,grounded}){
  let bufferRemaining=Math.max(0,state.bufferRemaining-delta),coyoteRemaining=grounded?.1:Math.max(0,state.coyoteRemaining-delta);const jumped=bufferRemaining>0&&coyoteRemaining>0;
  if(jumped){bufferRemaining=0;coyoteRemaining=0}return{state:{bufferRemaining,coyoteRemaining},jumped};
}

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
