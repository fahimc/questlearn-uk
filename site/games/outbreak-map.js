export const OUTBREAK_TILE_SIZE=2;
export const OUTBREAK_MAP_SIZE=32;
export const OUTBREAK_MAP_NAME='Gridlock Courtyard';

const key=(x,z)=>`${x}|${z}`;
const walls=new Set(),lowClearance=new Set(),cover=new Set();
const addRect=(set,x,z,width,depth)=>{for(let dx=0;dx<width;dx+=1)for(let dz=0;dz<depth;dz+=1)set.add(key(x+dx,z+dz))};
const addFrame=(set,x,z,width,depth,doors=[])=>{for(let dx=0;dx<width;dx+=1){set.add(key(x+dx,z));set.add(key(x+dx,z+depth-1))}for(let dz=0;dz<depth;dz+=1){set.add(key(x,z+dz));set.add(key(x+width-1,z+dz))}doors.forEach(([doorX,doorZ])=>set.delete(key(doorX,doorZ)))};

for(let i=0;i<OUTBREAK_MAP_SIZE;i+=1){walls.add(key(i,0));walls.add(key(i,OUTBREAK_MAP_SIZE-1));walls.add(key(0,i));walls.add(key(OUTBREAK_MAP_SIZE-1,i))}
addFrame(walls,2,5,9,10,[[6,5],[10,10],[6,14]]);addFrame(walls,21,5,9,10,[[25,5],[21,10],[25,14]]);
addRect(walls,13,8,2,5);addRect(walls,17,8,2,5);addRect(walls,14,10,4,2);
addRect(cover,5,20,2,2);addRect(cover,9,23,2,2);addRect(cover,14,20,2,2);addRect(cover,20,23,2,2);addRect(cover,25,20,2,2);
addRect(cover,4,8,2,2);addRect(cover,8,11,2,2);addRect(cover,22,11,2,2);addRect(cover,26,8,2,2);
addRect(cover,12,3,2,2);addRect(cover,18,3,2,2);addRect(cover,14,27,4,1);
for(const cell of cover)walls.add(cell);
addRect(lowClearance,11,17,5,2);addRect(lowClearance,17,17,5,2);

export const outbreakCheckpoints=Object.freeze([
  {id:'south-spawn',name:'South Safe Room',tile:{x:19,z:28},heading:.46},
  {id:'west-yard',name:'West Yard',tile:{x:5,z:23},heading:0.7},
  {id:'west-warehouse',name:'West Warehouse',tile:{x:6,z:9},heading:0},
  {id:'north-court',name:'North Court',tile:{x:16,z:3},heading:Math.PI},
  {id:'east-warehouse',name:'East Warehouse',tile:{x:25,z:9},heading:Math.PI},
  {id:'east-yard',name:'Extraction Yard',tile:{x:27,z:24},heading:Math.PI}
]);

export function outbreakTileKey(x,z){return key(x,z)}
export function outbreakTileToWorld(tile){return{x:(tile.x-(OUTBREAK_MAP_SIZE-1)/2)*OUTBREAK_TILE_SIZE,z:(tile.z-(OUTBREAK_MAP_SIZE-1)/2)*OUTBREAK_TILE_SIZE}}
export function outbreakWorldToTile(position){return{x:Math.floor(position.x/OUTBREAK_TILE_SIZE+(OUTBREAK_MAP_SIZE-1)/2+.5),z:Math.floor(position.z/OUTBREAK_TILE_SIZE+(OUTBREAK_MAP_SIZE-1)/2+.5)}}
export function isOutbreakTileInside(x,z){return x>=0&&z>=0&&x<OUTBREAK_MAP_SIZE&&z<OUTBREAK_MAP_SIZE}
export function isOutbreakTileSolid(x,z){return!isOutbreakTileInside(x,z)||walls.has(key(x,z))}
export function isOutbreakLowClearance(x,z){return lowClearance.has(key(x,z))}
export function outbreakMapCells(){const floor=[],wall=[],low=[],coverCells=[];for(let x=0;x<OUTBREAK_MAP_SIZE;x+=1)for(let z=0;z<OUTBREAK_MAP_SIZE;z+=1){const cell={x,z};floor.push(cell);if(walls.has(key(x,z)))wall.push(cell);if(lowClearance.has(key(x,z)))low.push(cell);if(cover.has(key(x,z)))coverCells.push(cell)}return{floor,wall,low,cover:coverCells}}
export function canOccupyOutbreakWorld(position,{radius=.3,crouched=false}={}){for(const dx of[-radius,radius])for(const dz of[-radius,radius]){const tile=outbreakWorldToTile({x:position.x+dx,z:position.z+dz});if(isOutbreakTileSolid(tile.x,tile.z)||(!crouched&&isOutbreakLowClearance(tile.x,tile.z)))return false}return true}
export function hasOutbreakLineOfSight(from,to){const a=outbreakWorldToTile(from),b=outbreakWorldToTile(to),steps=Math.max(Math.abs(b.x-a.x),Math.abs(b.z-a.z))*2||1;for(let i=1;i<steps;i+=1){const t=i/steps,x=Math.round(a.x+(b.x-a.x)*t),z=Math.round(a.z+(b.z-a.z)*t);if(isOutbreakTileSolid(x,z))return false}return true}
export function findOutbreakPath(start,end){const queue=[start],cameFrom=new Map([[key(start.x,start.z),null]]);while(queue.length){const current=queue.shift();if(current.x===end.x&&current.z===end.z){const path=[];let cursor=current;while(cursor){path.push(cursor);cursor=cameFrom.get(key(cursor.x,cursor.z))}return path.reverse()}for(const [dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const next={x:current.x+dx,z:current.z+dz},nextKey=key(next.x,next.z);if(isOutbreakTileSolid(next.x,next.z)||cameFrom.has(nextKey))continue;cameFrom.set(nextKey,current);queue.push(next)}}return[]}

export const outbreakMapPlan=Object.freeze({name:OUTBREAK_MAP_NAME,size:OUTBREAK_MAP_SIZE,tileSize:OUTBREAK_TILE_SIZE,checkpoints:outbreakCheckpoints,cells:outbreakMapCells()});
