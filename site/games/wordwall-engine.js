function normalise(value){return String(value??'').trim().toLocaleLowerCase('en-GB').replace(/[’]/g,"'")}
function assertChallenges(challenges){if(!Array.isArray(challenges)||!challenges.length)throw new TypeError('Wordwall Tower needs challenges.')}

export const WORDWALL_GATE_COLLIDER=Object.freeze({width:7,depth:.72,height:3.15});
export function resolveWordwallGateMovement({previousX,previousZ,nextX,nextZ,playerY},gate,{radius=.3,playerHeight=2.2}={}){
  const clear={x:nextX,z:nextZ,blockedX:false,blockedZ:false};
  if(!gate||gate.open||playerY>=gate.bottom+gate.height||playerY+playerHeight<=gate.bottom)return clear;
  const halfWidth=gate.width/2+radius,halfDepth=gate.depth/2+radius,inside=(x,z)=>x>=gate.x-halfWidth&&x<=gate.x+halfWidth&&z>=gate.z-halfDepth&&z<=gate.z+halfDepth;
  let x=nextX,z=previousZ,blockedX=false,blockedZ=false;if(inside(x,z)){x=previousX;blockedX=true}z=nextZ;if(inside(x,z)){z=previousZ;blockedZ=true}if(inside(x,z)){x=previousX;z=previousZ;blockedX=blockedZ=true}return{x,z,blockedX,blockedZ};
}

export function createWordwallRun(challenges){assertChallenges(challenges);return{solvedCount:0,checkpointIndex:0,status:'running',activeChallenge:null,attempts:1,completed:false}}
export function reachWordwallCheckpoint(state,challenges,checkpointIndex){assertChallenges(challenges);if(state.completed||state.status!=='running'||checkpointIndex!==state.solvedCount+1)return state;return{...state,checkpointIndex,status:'challenge',activeChallenge:state.solvedCount,attempts:1}}
export function submitWordwallAnswer(state,challenges,answer){assertChallenges(challenges);if(state.status!=='challenge'||state.activeChallenge===null)return{state,correct:false};const challenge=challenges[state.activeChallenge],correct=normalise(answer)===normalise(challenge.answer);if(!correct)return{state:{...state,attempts:state.attempts+1},correct:false};const solvedCount=state.solvedCount+1,completed=solvedCount===challenges.length;return{state:{...state,solvedCount,status:completed?'complete':'running',activeChallenge:null,completed},correct:true}}
export function respawnWordwallRun(state){return{...state,status:state.completed?'complete':'running',activeChallenge:null}}
export function getWordwallChallenge(state,challenges){assertChallenges(challenges);return state.activeChallenge===null?null:challenges[state.activeChallenge]}
export function createWordwallShareData(pageUrl){const url=new URL(pageUrl);url.search='';url.hash='';return{title:'LexiClimb Tower achievement',text:'I completed all 6 English gates in LexiClimb Tower on EduGames!',url:url.href}}
