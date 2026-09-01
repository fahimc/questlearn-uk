export const ONEBLOCK_PHASE_GOAL=10;

export const ONEBLOCK_PHASES=Object.freeze([
  Object.freeze({id:'seedling-sky',name:'Seedling Sky',accent:'#66df8a',blocks:Object.freeze([['moss',5],['earth',4],['wood',1]])}),
  Object.freeze({id:'stone-workshop',name:'Stone Workshop',accent:'#a8bbc3',blocks:Object.freeze([['stone',6],['earth',2],['wood',2]])}),
  Object.freeze({id:'frost-lab',name:'Frost Lab',accent:'#8fe8f4',blocks:Object.freeze([['ice',5],['glass',3],['stone',2]])}),
  Object.freeze({id:'river-cloud',name:'River Cloud',accent:'#5acbf2',blocks:Object.freeze([['glass',4],['moss',3],['clay',3]])}),
  Object.freeze({id:'canopy-camp',name:'Canopy Camp',accent:'#55cf73',blocks:Object.freeze([['wood',5],['moss',3],['earth',2]])}),
  Object.freeze({id:'sunstone-mesa',name:'Sunstone Mesa',accent:'#ffb94f',blocks:Object.freeze([['sand',5],['clay',3],['stone',2]])}),
  Object.freeze({id:'ember-works',name:'Ember Works',accent:'#ff765d',blocks:Object.freeze([['ember',4],['stone',4],['glass',2]])}),
  Object.freeze({id:'bloom-haven',name:'Bloom Haven',accent:'#ff83bd',blocks:Object.freeze([['moss',4],['wood',3],['crystal',3]])}),
  Object.freeze({id:'star-ruins',name:'Star Ruins',accent:'#aa91ff',blocks:Object.freeze([['stone',4],['crystal',4],['glass',2]])}),
  Object.freeze({id:'aurora-summit',name:'Aurora Summit',accent:'#72efe0',blocks:Object.freeze([['ice',3],['crystal',3],['glass',2],['ember',2]])})
]);

export const ONEBLOCK_BLOCK_IDS=Object.freeze(['moss','earth','wood','stone','glass','ice','clay','sand','ember','crystal']);
const afterglowBlocks=Object.freeze(ONEBLOCK_BLOCK_IDS.map(id=>Object.freeze([id,1])));

function hashText(value){let hash=2166136261;for(const character of String(value)){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return hash>>>0}
function cleanSeed(seed){const value=Math.floor(Number(seed));return Number.isFinite(value)?value:7319}
function cleanInventory(source={}){return Object.fromEntries(ONEBLOCK_BLOCK_IDS.map(id=>[id,Math.max(0,Math.floor(Number(source[id])||0))]))}

export function oneBlockMaterialAt({phaseIndex=0,totalMined=0,seed=7319}={}){
  const phase=ONEBLOCK_PHASES[phaseIndex],weights=phase?.blocks||afterglowBlocks,total=weights.reduce((sum,[,weight])=>sum+weight,0),roll=hashText(`${cleanSeed(seed)}:${phaseIndex}:${Math.max(0,Math.floor(totalMined))}`)%total;let cursor=0;
  for(const [id,weight] of weights){cursor+=weight;if(roll<cursor)return id}
  return weights.at(-1)[0];
}

export function oneBlockPhase(run){return ONEBLOCK_PHASES[run.phaseIndex]||Object.freeze({id:'afterglow',name:'Afterglow',accent:'#ffe36c',blocks:afterglowBlocks})}

export function resolveOneBlockPlacement({source,normal,hitPoint,yaw=0}={}){
  if(!source||!normal)return null;
  const cell={x:Math.round(Number(source.x)||0),y:Math.round(Number(source.y)||0),z:Math.round(Number(source.z)||0)},face={x:Number(normal.x)||0,y:Number(normal.y)||0,z:Number(normal.z)||0};
  if(Math.abs(face.x)>.5)return Object.freeze({...cell,x:cell.x+Math.sign(face.x)});
  if(Math.abs(face.z)>.5)return Object.freeze({...cell,z:cell.z+Math.sign(face.z)});
  if(face.y<-.5)return Object.freeze({...cell,y:cell.y-1});
  const offsetX=(Number(hitPoint?.x)||cell.x)-cell.x,offsetZ=(Number(hitPoint?.z)||cell.z)-cell.z;
  if(Math.max(Math.abs(offsetX),Math.abs(offsetZ))>.16){
    if(Math.abs(offsetX)>Math.abs(offsetZ))return Object.freeze({...cell,x:cell.x+(offsetX>=0?1:-1)});
    return Object.freeze({...cell,z:cell.z+(offsetZ>=0?1:-1)});
  }
  const forwardX=-Math.sin(Number(yaw)||0),forwardZ=-Math.cos(Number(yaw)||0);
  if(Math.abs(forwardX)>Math.abs(forwardZ))return Object.freeze({...cell,x:cell.x+(forwardX>=0?1:-1)});
  return Object.freeze({...cell,z:cell.z+(forwardZ>=0?1:-1)});
}

export function oneBlockSneakAllowsStep({grounded=true,nextSupport=-100,feetHeight=0}={}){
  if(!grounded)return true;
  const support=Number(nextSupport),feet=Number(feetHeight);
  return Number.isFinite(support)&&Number.isFinite(feet)&&support>-50&&support>=feet-.65;
}

export function createOneBlockRun({seed=7319,inventory,phaseIndex=0,totalMined=0,minedInPhase=0,challengePending=false,completed=false,attempts=0}={}){
  const safePhase=Math.max(0,Math.min(ONEBLOCK_PHASES.length,Math.floor(Number(phaseIndex)||0))),safeTotal=Math.max(0,Math.floor(Number(totalMined)||0));
  return Object.freeze({version:1,seed:cleanSeed(seed),phaseIndex:safePhase,totalMined:safeTotal,minedInPhase:safePhase>=ONEBLOCK_PHASES.length?Math.max(0,Math.floor(Number(minedInPhase)||0)):Math.max(0,Math.min(ONEBLOCK_PHASE_GOAL,Math.floor(Number(minedInPhase)||0))),challengePending:Boolean(challengePending)&&safePhase<ONEBLOCK_PHASES.length,completed:Boolean(completed)||safePhase>=ONEBLOCK_PHASES.length,attempts:Math.max(0,Math.floor(Number(attempts)||0)),inventory:Object.freeze(cleanInventory(inventory)),currentBlock:oneBlockMaterialAt({phaseIndex:safePhase,totalMined:safeTotal,seed})});
}

export function mineOneBlock(run){
  if(run.challengePending)return Object.freeze({state:run,event:Object.freeze({kind:'locked'})});
  const collected=run.currentBlock,inventory={...run.inventory,[collected]:(run.inventory[collected]||0)+1},totalMined=run.totalMined+1,minedInPhase=run.phaseIndex>=ONEBLOCK_PHASES.length?run.minedInPhase+1:run.minedInPhase+1,challengePending=run.phaseIndex<ONEBLOCK_PHASES.length&&minedInPhase>=ONEBLOCK_PHASE_GOAL;
  const state=createOneBlockRun({...run,inventory,totalMined,minedInPhase,challengePending});
  return Object.freeze({state,event:Object.freeze({kind:challengePending?'challenge':'collected',block:collected,phaseIndex:run.phaseIndex,totalMined})});
}

export function answerOneBlockChallenge(run,{selected,answer}={}){
  if(!run.challengePending)return Object.freeze({state:run,event:Object.freeze({kind:'ignored'})});
  if(String(selected)!==String(answer)){const state=createOneBlockRun({...run,attempts:run.attempts+1});return Object.freeze({state,event:Object.freeze({kind:'incorrect',attempts:state.attempts})})}
  const finished=run.phaseIndex===ONEBLOCK_PHASES.length-1,nextPhase=finished?ONEBLOCK_PHASES.length:run.phaseIndex+1,rewardIds=(ONEBLOCK_PHASES[nextPhase]?.blocks||afterglowBlocks).map(([id])=>id),inventory={...run.inventory};for(const id of new Set(rewardIds))inventory[id]=(inventory[id]||0)+2;
  const state=createOneBlockRun({...run,phaseIndex:nextPhase,minedInPhase:0,challengePending:false,completed:finished||run.completed,inventory});
  return Object.freeze({state,event:Object.freeze({kind:finished?'completed':'advanced',phaseIndex:nextPhase,reward:Object.freeze([...new Set(rewardIds)])})});
}

export function spendOneBlockInventory(run,blockId,amount=1){const count=Math.max(1,Math.floor(Number(amount)||1));if(!ONEBLOCK_BLOCK_IDS.includes(blockId)||run.inventory[blockId]<count)return Object.freeze({state:run,spent:false});const inventory={...run.inventory,[blockId]:run.inventory[blockId]-count};return Object.freeze({state:createOneBlockRun({...run,inventory}),spent:true})}
export function returnOneBlockInventory(run,blockId,amount=1){if(!ONEBLOCK_BLOCK_IDS.includes(blockId))return run;const count=Math.max(1,Math.floor(Number(amount)||1)),inventory={...run.inventory,[blockId]:(run.inventory[blockId]||0)+count};return createOneBlockRun({...run,inventory})}

export function serializeOneBlockRun(run){return JSON.stringify(run)}
export function deserializeOneBlockRun(value,{seed=7319}={}){try{const parsed=typeof value==='string'?JSON.parse(value):value;return createOneBlockRun({...parsed,seed:parsed?.seed??seed})}catch{return createOneBlockRun({seed})}}
