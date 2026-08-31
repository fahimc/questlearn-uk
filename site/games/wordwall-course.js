import { getWordwallSpiralPose, sizeWordwallSupport, WORDWALL_SPIRAL } from './wordwall-engine.js';
import { WORDWALL_LEVEL_COUNT, WORDWALL_QUESTIONS_PER_LEVEL } from './wordwall-worlds.js';

export const WORDWALL_RAINBOW=Object.freeze([0xff3b21,0xffa51f,0xffed31,0x45df46,0x20d9dc,0x3677f5,0x8c45ef,0xff4fc4]);
export const WORDWALL_ROUTE_TYPES=Object.freeze(['rainbow-stairs','prism-tunnel','uphill-runway','donut-rings','sky-ribbons']);
export const WORDWALL_TOTAL_WALLS=WORDWALL_LEVEL_COUNT*WORDWALL_QUESTIONS_PER_LEVEL;
export const WORDWALL_COURSE_GRID=Object.freeze({unit:.5,platformHeight:1,checkpointCells:12,centreDistanceCells:52,pathCells:40,ringDiameterCells:12,ringGapCells:2});

const CONTINUOUS_ROUTE_TYPES=Object.freeze(['rainbow-stairs','prism-tunnel','uphill-runway']);
const ROUTES=Object.freeze({
  'rainbow-stairs':Object.freeze({pieces:8,depthCells:5,widthCells:Object.freeze([18,18,16,14,14,16,18,18]),shape:'box',gapCells:0,leadCells:0}),
  'prism-tunnel':Object.freeze({pieces:8,depthCells:5,widthCells:16,shape:'box',gapCells:0,leadCells:0}),
  'uphill-runway':Object.freeze({pieces:5,depthCells:8,widthCells:18,shape:'box',gapCells:0,leadCells:0}),
  'donut-rings':Object.freeze({pieces:3,depthCells:12,widthCells:12,shape:'ring',gapCells:2,leadCells:0}),
  'sky-ribbons':Object.freeze({pieces:4,depthCells:8,widthCells:Object.freeze([8,8,10,8]),shape:Object.freeze(['circle','box','triangle','circle']),gapCells:2,leadCells:1})
});

function routeTypeFor(levelIndex,wallInLevel){return WORDWALL_ROUTE_TYPES[(levelIndex+wallInLevel)%WORDWALL_ROUTE_TYPES.length]}
function valueAt(value,index){return Array.isArray(value)?value[index%value.length]:value}
function gridValue(cells,grid=WORDWALL_COURSE_GRID){return cells*grid.unit}
function segmentFrame(start,end){const dx=end.x-start.x,dz=end.z-start.z,distance=Math.hypot(dx,dz),forwardX=dx/distance,forwardZ=dz/distance,sideX=forwardZ,sideZ=-forwardX;return Object.freeze({distance,forwardX,forwardZ,sideX,sideZ,yaw:Math.atan2(forwardX,forwardZ)})}

function createRouteSupports(stageIndex,levelIndex,wallInLevel,type,start,end,grid){
  const route=ROUTES[type],frame=segmentFrame(start,end),supports=[];
  let cursor=grid.checkpointCells/2+route.leadCells,previousTopCells=0;
  for(let step=0;step<route.pieces;step+=1){
    const depthCells=valueAt(route.depthCells,step),widthCells=valueAt(route.widthCells,step),shape=valueAt(route.shape,step),startCell=cursor,endCell=startCell+depthCells,centreCell=(startCell+endCell)/2,sideCells=type==='sky-ribbons'?[0,-2,2,0][step]:0,topCells=Math.round((step+1)/route.pieces*((end.top-start.top)/grid.unit)),distance=gridValue(centreCell,grid),side=gridValue(sideCells,grid),width=gridValue(widthCells,grid),depth=gridValue(depthCells,grid),sized=sizeWordwallSupport({shape,width,depth,holeRadius:shape==='ring'?width*.25:undefined});
    const height=CONTINUOUS_ROUTE_TYPES.includes(type)?grid.platformHeight+gridValue(topCells-previousTopCells,grid):grid.platformHeight;
    supports.push(Object.freeze({x:start.x+frame.forwardX*distance+frame.sideX*side,z:start.z+frame.forwardZ*distance+frame.sideZ*side,top:start.top+gridValue(topCells,grid),height,yaw:frame.yaw,...sized,shape,color:WORDWALL_RAINBOW[(step+stageIndex)%WORDWALL_RAINBOW.length],kind:'obstacle',index:stageIndex,routeType:type,level:levelIndex+1,wall:wallInLevel+1,step,gridX:sideCells,gridZ:centreCell,gridTop:topCells,gridWidth:widthCells,gridDepth:depthCells,gridStart:startCell,gridEnd:endCell,gapBefore:step?route.gapCells:route.leadCells}));
    previousTopCells=topCells;
    cursor=endCell+(step<route.pieces-1?route.gapCells:0);
  }
  const trailingCells=grid.centreDistanceCells-grid.checkpointCells/2-cursor;
  return Object.freeze({supports:Object.freeze(supports),frame,trailingCells});
}

function createTunnelFrames(type,supports,stageIndex){if(type!=='prism-tunnel')return Object.freeze([]);return Object.freeze(supports.filter((_,index)=>index%2===0).map((support,index)=>Object.freeze({x:support.x,y:support.top,z:support.z,yaw:support.yaw,width:9,height:6.8,colorOffset:(stageIndex+index)%WORDWALL_RAINBOW.length})))}

export function createWordwallCoursePlan({levelCount=WORDWALL_LEVEL_COUNT,wallsPerLevel=WORDWALL_QUESTIONS_PER_LEVEL,spiral=WORDWALL_SPIRAL,grid=WORDWALL_COURSE_GRID}={}){
  const totalWalls=levelCount*wallsPerLevel,checkpoints=Object.freeze(Array.from({length:totalWalls+1},(_,index)=>Object.freeze({...getWordwallSpiralPose(index,0,0,spiral),index,level:Math.min(levelCount,Math.floor(index/wallsPerLevel)+1),wall:index%wallsPerLevel}))),segments=[];
  for(let stageIndex=0;stageIndex<totalWalls;stageIndex+=1){
    const levelIndex=Math.floor(stageIndex/wallsPerLevel),wallInLevel=stageIndex%wallsPerLevel,type=routeTypeFor(levelIndex,wallInLevel),start=checkpoints[stageIndex],checkpoint=checkpoints[stageIndex+1],route=createRouteSupports(stageIndex,levelIndex,wallInLevel,type,start,checkpoint,grid),nextCheckpoint=checkpoints[stageIndex+2],exitFrame=nextCheckpoint?segmentFrame(checkpoint,nextCheckpoint):route.frame,gate=Object.freeze({x:checkpoint.x+exitFrame.forwardX*2.5,z:checkpoint.z+exitFrame.forwardZ*2.5,top:checkpoint.top,yaw:exitFrame.yaw,index:stageIndex,level:levelIndex+1,wall:wallInLevel+1});
    segments.push(Object.freeze({index:stageIndex,level:levelIndex+1,wall:wallInLevel+1,type,start,frame:route.frame,supports:route.supports,trailingCells:route.trailingCells,tunnelFrames:createTunnelFrames(type,route.supports,stageIndex),checkpoint,gate}));
  }
  return Object.freeze({levelCount,wallsPerLevel,totalWalls,grid:Object.freeze({...grid}),checkpoints,segments:Object.freeze(segments)});
}

export function getWordwallGridGap(previous,next){return next.gridStart-previous.gridEnd}
export function getWordwallWorldGap(previous,next,frame){const dx=next.x-previous.x,dz=next.z-previous.z,travel=dx*frame.forwardX+dz*frame.forwardZ;return travel-(previous.depth+next.depth)/2}

export function validateWordwallCoursePlan(plan=createWordwallCoursePlan()){
  if(plan.totalWalls!==plan.levelCount*plan.wallsPerLevel||plan.checkpoints.length!==plan.totalWalls+1||plan.segments.length!==plan.totalWalls)throw new Error('LexiClimb course totals do not match.');
  if(plan.grid.pathCells!==plan.grid.centreDistanceCells-plan.grid.checkpointCells)throw new Error('Course grid path span is inconsistent.');
  for(let level=1;level<=plan.levelCount;level+=1){const circuit=plan.segments.filter(segment=>segment.level===level);if(circuit.length!==plan.wallsPerLevel||new Set(circuit.map(segment=>segment.type)).size!==WORDWALL_ROUTE_TYPES.length)throw new Error(`Level ${level} must contain every route circuit.`)}
  for(const segment of plan.segments){
    if(Math.abs(segment.frame.distance-gridValue(plan.grid.centreDistanceCells,plan.grid))>1e-8)throw new Error(`Wall ${segment.index+1} does not fit the hidden grid.`);
    if(!segment.supports.length||segment.supports.some(support=>support.clearance<(support.shape==='ring'?1.05:1.1)))throw new Error(`Unsafe path sizing at wall ${segment.index+1}.`);
    if(segment.supports.some(support=>![support.gridX,support.gridTop,support.gridWidth,support.gridDepth,support.gridStart,support.gridEnd].every(Number.isInteger)||!Number.isInteger(support.gridZ*2)))throw new Error(`Off-grid support at wall ${segment.index+1}.`);
    for(let index=1;index<segment.supports.length;index+=1){const previous=segment.supports[index-1],support=segment.supports[index],gap=getWordwallGridGap(previous,support),worldGap=getWordwallWorldGap(previous,support,segment.frame);if(gap<0||worldGap<-.000001)throw new Error(`Overlapping supports at wall ${segment.index+1}.`);if(CONTINUOUS_ROUTE_TYPES.includes(segment.type)&&(gap!==0||Math.abs(worldGap)>.000001))throw new Error(`Unexpected path gap at wall ${segment.index+1}.`);if(segment.type==='donut-rings'&&(gap!==plan.grid.ringGapCells||Math.abs(worldGap-gridValue(plan.grid.ringGapCells,plan.grid))>.000001))throw new Error(`Donut gap is not grid-sized at wall ${segment.index+1}.`)}
    if(segment.trailingCells!==ROUTES[segment.type].leadCells)throw new Error(`Wall ${segment.index+1} does not meet its checkpoint symmetrically.`);
    if(segment.type==='prism-tunnel'&&!segment.tunnelFrames.length)throw new Error(`Missing tunnel frames at wall ${segment.index+1}.`);
  }
  return true;
}
