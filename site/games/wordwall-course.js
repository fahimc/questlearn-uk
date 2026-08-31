import { getWordwallSpiralPose, sizeWordwallSupport, WORDWALL_SPIRAL } from './wordwall-engine.js';
import { WORDWALL_LEVEL_COUNT, WORDWALL_QUESTIONS_PER_LEVEL } from './wordwall-worlds.js';

export const WORDWALL_RAINBOW=Object.freeze([0xff3b21,0xffa51f,0xffed31,0x45df46,0x20d9dc,0x3677f5,0x8c45ef,0xff4fc4]);
export const WORDWALL_ROUTE_TYPES=Object.freeze(['rainbow-stairs','prism-tunnel','uphill-runway','donut-rings','sky-ribbons']);
export const WORDWALL_TOTAL_WALLS=WORDWALL_LEVEL_COUNT*WORDWALL_QUESTIONS_PER_LEVEL;

const ROUTES=Object.freeze({
  'rainbow-stairs':Object.freeze({count:9,width:6.2,depth:2.35,shape:'box'}),
  'prism-tunnel':Object.freeze({count:8,width:6.4,depth:2.55,shape:'box'}),
  'uphill-runway':Object.freeze({count:7,width:7.2,depth:3.25,shape:'box'}),
  'donut-rings':Object.freeze({count:5,width:5.8,depth:5.8,shape:'ring'}),
  'sky-ribbons':Object.freeze({count:8,width:4.2,depth:3.4,shape:'box'})
});

function routeTypeFor(levelIndex,wallInLevel){return WORDWALL_ROUTE_TYPES[(levelIndex+wallInLevel)%WORDWALL_ROUTE_TYPES.length]}
function ribbonShape(step){return ['circle','box','triangle','box'][step%4]}
function ribbonOffset(step){return [0,-1.45,1.45,-.75,1.15,-1.35,.65,0][step%8]}

function createRouteSupports(stageIndex,levelIndex,wallInLevel,type,spiral){
  const route=ROUTES[type],supports=[];
  for(let step=0;step<route.count;step+=1){
    const progress=(step+1)/(route.count+1),offset=type==='sky-ribbons'?ribbonOffset(step):type==='donut-rings'?(step%2?-.55:.55):0,pose=getWordwallSpiralPose(stageIndex,progress,offset,spiral),shape=type==='sky-ribbons'?ribbonShape(step):route.shape,width=type==='sky-ribbons'?(shape==='triangle'?5.2:shape==='circle'?4.6:4.4):route.width,depth=type==='sky-ribbons'?(shape==='triangle'?5:shape==='circle'?4.6:3.6):route.depth,sized=sizeWordwallSupport({shape,width,depth,holeRadius:shape==='ring'?width*.17:undefined});
    supports.push(Object.freeze({...pose,...sized,shape,color:WORDWALL_RAINBOW[(step+stageIndex)%WORDWALL_RAINBOW.length],kind:'obstacle',index:stageIndex,routeType:type,level:levelIndex+1,wall:wallInLevel+1,step}));
  }
  return Object.freeze(supports);
}

function createTunnelFrames(type,supports,stageIndex){if(type!=='prism-tunnel')return Object.freeze([]);return Object.freeze(supports.filter((_,index)=>index%2===0).map((support,index)=>Object.freeze({x:support.x,y:support.top,z:support.z,yaw:support.yaw,width:7.4,height:5.9,colorOffset:(stageIndex+index)%WORDWALL_RAINBOW.length}))) }

export function createWordwallCoursePlan({levelCount=WORDWALL_LEVEL_COUNT,wallsPerLevel=WORDWALL_QUESTIONS_PER_LEVEL,spiral=WORDWALL_SPIRAL}={}){
  const totalWalls=levelCount*wallsPerLevel,checkpoints=Object.freeze(Array.from({length:totalWalls+1},(_,index)=>Object.freeze({...getWordwallSpiralPose(index,0,0,spiral),index,level:Math.min(levelCount,Math.floor(index/wallsPerLevel)+1),wall:index%wallsPerLevel}))),segments=[];
  for(let stageIndex=0;stageIndex<totalWalls;stageIndex+=1){const levelIndex=Math.floor(stageIndex/wallsPerLevel),wallInLevel=stageIndex%wallsPerLevel,type=routeTypeFor(levelIndex,wallInLevel),supports=createRouteSupports(stageIndex,levelIndex,wallInLevel,type,spiral),checkpoint=checkpoints[stageIndex+1],gate=Object.freeze({x:checkpoint.x+checkpoint.forwardX*2.65,z:checkpoint.z+checkpoint.forwardZ*2.65,top:checkpoint.top,yaw:checkpoint.yaw,index:stageIndex,level:levelIndex+1,wall:wallInLevel+1});segments.push(Object.freeze({index:stageIndex,level:levelIndex+1,wall:wallInLevel+1,type,supports,tunnelFrames:createTunnelFrames(type,supports,stageIndex),checkpoint,gate}))}
  return Object.freeze({levelCount,wallsPerLevel,totalWalls,checkpoints,segments:Object.freeze(segments)});
}

export function validateWordwallCoursePlan(plan=createWordwallCoursePlan()){
  if(plan.totalWalls!==plan.levelCount*plan.wallsPerLevel||plan.checkpoints.length!==plan.totalWalls+1||plan.segments.length!==plan.totalWalls)throw new Error('LexiClimb course totals do not match.');
  for(let level=1;level<=plan.levelCount;level+=1){const circuit=plan.segments.filter(segment=>segment.level===level);if(circuit.length!==plan.wallsPerLevel||new Set(circuit.map(segment=>segment.type)).size!==WORDWALL_ROUTE_TYPES.length)throw new Error(`Level ${level} must contain every route circuit.`)}
  for(const segment of plan.segments){if(!segment.supports.length||segment.supports.some(support=>support.clearance<(support.shape==='ring'?1.05:1.1)))throw new Error(`Unsafe path sizing at wall ${segment.index+1}.`);if(segment.type==='prism-tunnel'&&!segment.tunnelFrames.length)throw new Error(`Missing tunnel frames at wall ${segment.index+1}.`)}
  return true;
}
