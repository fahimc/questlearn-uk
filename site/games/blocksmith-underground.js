export const DEFAULT_BEDROCK_Y=-48;

const FACE_OFFSETS=Object.freeze([
  Object.freeze({x:1,y:0,z:0}),
  Object.freeze({x:-1,y:0,z:0}),
  Object.freeze({x:0,y:1,z:0}),
  Object.freeze({x:0,y:-1,z:0}),
  Object.freeze({x:0,y:0,z:1}),
  Object.freeze({x:0,y:0,z:-1})
]);

function assertCell(cell){
  if(!cell||![cell.x,cell.y,cell.z].every(Number.isInteger))throw new TypeError('A voxel cell needs integer x, y and z coordinates.');
}

export function adjacentVoxelCells(cell){
  assertCell(cell);
  return FACE_OFFSETS.map(offset=>({x:cell.x+offset.x,y:cell.y+offset.y,z:cell.z+offset.z}));
}

export function undergroundBlockAt(cell,{surfaceY,bedrockY=DEFAULT_BEDROCK_Y,mined=false,deposit=null}={}){
  assertCell(cell);
  if(!Number.isInteger(surfaceY)||!Number.isInteger(bedrockY))return null;
  if(mined||cell.y>=surfaceY||cell.y<bedrockY)return null;
  if(deposit&&cell.y===surfaceY-deposit.depth)return{type:'letter',symbol:deposit.symbol};
  return{type:'stone',symbol:null};
}

export function exposedUndergroundCells(airCell,{surfaceYAt,isMined,inBounds,depositAt,bedrockY=DEFAULT_BEDROCK_Y}){
  assertCell(airCell);
  if(typeof surfaceYAt!=='function'||typeof isMined!=='function'||typeof inBounds!=='function')throw new TypeError('Underground exposure needs world lookup functions.');
  return adjacentVoxelCells(airCell).flatMap(cell=>{
    if(!inBounds(cell))return[];
    const block=undergroundBlockAt(cell,{surfaceY:surfaceYAt(cell.x,cell.z),bedrockY,mined:isMined(cell),deposit:depositAt?.(cell.x,cell.z)||null});
    return block?[{cell,...block}]:[];
  });
}
