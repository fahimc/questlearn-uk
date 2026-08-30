function normalise(value){return String(value??'').trim().toLocaleLowerCase('en-GB').replace(/[’]/g,"'")}
function assertChallenges(challenges){if(!Array.isArray(challenges)||!challenges.length)throw new TypeError('Wordwall Tower needs challenges.')}

export const WORDWALL_SPIRAL=Object.freeze({radius:13,stageArc:Math.PI/2,stageRise:4,startAngle:-Math.PI/2});
export const WORDWALL_GATE_COLLIDER=Object.freeze({width:7,depth:.72,height:3.15});

export function getWordwallSpiralPose(stageIndex,progress=0,radialOffset=0,spiral=WORDWALL_SPIRAL){
  const routeProgress=stageIndex+Math.max(0,Math.min(1,progress)),angle=spiral.startAngle+routeProgress*spiral.stageArc,radius=spiral.radius+radialOffset,radialX=Math.cos(angle),radialZ=Math.sin(angle),forwardX=-radialZ,forwardZ=radialX;
  return{x:radialX*radius,z:radialZ*radius,top:routeProgress*spiral.stageRise,angle,yaw:-angle,radialX,radialZ,forwardX,forwardZ};
}

function worldToLocal(x,z,originX,originZ,yaw){const dx=x-originX,dz=z-originZ,c=Math.cos(yaw),s=Math.sin(yaw);return{x:c*dx-s*dz,z:s*dx+c*dz}}
function localToWorld(x,z,originX,originZ,yaw){const c=Math.cos(yaw),s=Math.sin(yaw);return{x:originX+c*x+s*z,z:originZ-s*x+c*z}}

export function isWordwallFootprintOnSupport(x,z,support,radius=.3){
  if(!support?.solid)return false;const local=worldToLocal(x,z,support.x,support.z,support.yaw||0),outsideX=Math.max(0,Math.abs(local.x)-support.width/2),outsideZ=Math.max(0,Math.abs(local.z)-support.depth/2);return Math.hypot(outsideX,outsideZ)<=radius+1e-9;
}

export function resolveWordwallGateMovement({previousX,previousZ,nextX,nextZ,playerY},gate,{radius=.3,playerHeight=2.2}={}){
  const clear={x:nextX,z:nextZ,blockedX:false,blockedZ:false};
  if(!gate||gate.open||playerY>=gate.bottom+gate.height||playerY+playerHeight<=gate.bottom)return clear;
  const yaw=gate.yaw||0,previous=worldToLocal(previousX,previousZ,gate.x,gate.z,yaw),next=worldToLocal(nextX,nextZ,gate.x,gate.z,yaw),halfWidth=gate.width/2+radius,halfDepth=gate.depth/2+radius,inside=(x,z)=>Math.abs(x)<=halfWidth&&Math.abs(z)<=halfDepth;
  let localX=next.x,localZ=previous.z;if(inside(localX,localZ))localX=previous.x;localZ=next.z;if(inside(localX,localZ))localZ=previous.z;if(inside(localX,localZ)){localX=previous.x;localZ=previous.z}const resolved=localToWorld(localX,localZ,gate.x,gate.z,yaw),blockedX=Math.abs(resolved.x-nextX)>1e-9,blockedZ=Math.abs(resolved.z-nextZ)>1e-9;return{x:resolved.x,z:resolved.z,blockedX,blockedZ};
}

export function createWordwallRun(challenges){assertChallenges(challenges);return{solvedCount:0,checkpointIndex:0,status:'running',activeChallenge:null,attempts:1,completed:false}}
export function reachWordwallCheckpoint(state,challenges,checkpointIndex){assertChallenges(challenges);if(state.completed||state.status!=='running'||checkpointIndex!==state.solvedCount+1)return state;return{...state,checkpointIndex,status:'challenge',activeChallenge:state.solvedCount,attempts:1}}
export function submitWordwallAnswer(state,challenges,answer){assertChallenges(challenges);if(state.status!=='challenge'||state.activeChallenge===null)return{state,correct:false};const challenge=challenges[state.activeChallenge],correct=normalise(answer)===normalise(challenge.answer);if(!correct)return{state:{...state,attempts:state.attempts+1},correct:false};const solvedCount=state.solvedCount+1,completed=solvedCount===challenges.length;return{state:{...state,solvedCount,status:completed?'complete':'running',activeChallenge:null,completed},correct:true}}
export function respawnWordwallRun(state){return{...state,status:state.completed?'complete':'running',activeChallenge:null}}
export function getWordwallChallenge(state,challenges){assertChallenges(challenges);return state.activeChallenge===null?null:challenges[state.activeChallenge]}
export function createWordwallShareData(pageUrl){const url=new URL(pageUrl);url.search='';url.hash='';return{title:'LexiClimb Tower achievement',text:'I completed all 6 English gates in LexiClimb Tower on EduGames!',url:url.href}}
