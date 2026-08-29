export const WORLD_MIN=-20;
export const WORLD_MAX=20;

export const RIVER={x:1,z:WORLD_MIN,width:5,depth:WORLD_MAX-WORLD_MIN+1};
export const RIVER_BANK_COLUMNS=[0,6];
export const SPAWN_ZONE={x:-3,z:4,width:3,depth:3};

export const RESOURCE_PATCHES=[
  {type:'moss',label:'Moss meadow',origin:{x:-18,z:13},width:4,depth:4,upper:[[1,1],[2,1],[1,2],[2,2]],sign:{x:-14,z:11}},
  {type:'wood',label:'Timber pile',origin:{x:13,z:14},width:6,depth:4,upper:[[2,1],[3,1],[2,2],[3,2]],sign:{x:15,z:12}},
  {type:'stone',label:'Stone quarry',origin:{x:13,z:-18},width:6,depth:4,upper:[[2,1],[3,1],[2,2],[3,2]],sign:{x:11,z:-16}},
  {type:'glass',label:'Crystal hollow',origin:{x:-18,z:-6},width:4,depth:3,upper:[[1,1],[2,1]],sign:{x:-13,z:-5}},
];

export const TREE_SPOTS=[[-16,-15],[-13,13],[-4,16],[11,12],[17,-13],[-16,-2],[8,17],[-15,8],[17,6]];
export const ROCK_CLUSTERS=[
  [[-18,5],[-17,5]],
  [[-14,-7]],
  [[8,-17],[9,-17],[8,-16]],
  [[17,-5],[18,-5]],
  [[18,10]],
];

export function columnKey(x,z){return `${x}|${z}`}
export function rectangleColumns(rect){const cells=[];for(let x=rect.x;x<rect.x+rect.width;x+=1)for(let z=rect.z;z<rect.z+rect.depth;z+=1)cells.push([x,z]);return cells}

function treeColumns(x,z,index){const cells=[[x,z],[x-1,z],[x+1,z],[x,z-1],[x,z+1]];cells.push(index%2?[x+1,z+1]:[x-1,z-1]);return cells}

export function createWorldReservations(quests){
  const columns=new Map();const conflicts=[];
  const reserve=(owner,cells)=>{for(const [x,z] of cells){const key=columnKey(x,z);const existing=columns.get(key);if(existing&&existing!==owner)conflicts.push({key,existing,incoming:owner});else columns.set(key,owner)}};

  reserve('river',rectangleColumns(RIVER));
  for(const x of RIVER_BANK_COLUMNS)reserve('river-bank',Array.from({length:RIVER.depth},(_,index)=>[x,RIVER.z+index]));
  const hedge=[];for(let coordinate=WORLD_MIN;coordinate<=WORLD_MAX;coordinate+=1){if((coordinate<RIVER.x||coordinate>=RIVER.x+RIVER.width)&&!RIVER_BANK_COLUMNS.includes(coordinate)){hedge.push([coordinate,WORLD_MIN],[coordinate,WORLD_MAX])}hedge.push([WORLD_MIN,coordinate],[WORLD_MAX,coordinate])}reserve('hedge',hedge);
  reserve('spawn',rectangleColumns(SPAWN_ZONE));

  quests.forEach(quest=>{reserve(`quest-pad:${quest.id}`,rectangleColumns(quest.zone));reserve(`quest-beacon:${quest.id}`,[[quest.position.x,quest.position.z]])});
  RESOURCE_PATCHES.forEach(patch=>{reserve(`resource:${patch.type}`,rectangleColumns({x:patch.origin.x,z:patch.origin.z,width:patch.width,depth:patch.depth}));reserve(`resource-sign:${patch.type}`,[[patch.sign.x,patch.sign.z]])});
  TREE_SPOTS.forEach(([x,z],index)=>reserve(`tree:${index}`,treeColumns(x,z,index)));
  ROCK_CLUSTERS.forEach((cluster,index)=>reserve(`rock:${index}`,cluster));

  return{columns,conflicts};
}
