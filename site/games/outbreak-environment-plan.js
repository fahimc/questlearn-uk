export const OUTBREAK_ENVIRONMENT_SEED='gridlock-garden-keyart-v2';

export const outbreakEnvironmentPalette=Object.freeze({
  skyTop:0x168fff,
  skyHorizon:0xbdeeff,
  sun:0xfff1b2,
  streetA:0xe9aa68,
  streetB:0x55c4c1,
  pavementA:0xf1d2a3,
  pavementB:0x72d6cf,
  westFloor:0xf3bb73,
  eastFloor:0x71d7d0,
  grassA:0x65bd55,
  grassB:0x8bd268,
  boundary:0xf1c47f,
  westWall:0xf0803f,
  eastWall:0x18aeb2,
  courtWall:0x21a7a5,
  accent:0xffd13b,
  window:0x76eeff,
  roof:0x11697b,
  trim:0xffd28a,
  foliage:0x3ead46,
  foliageLight:0x82d65c,
});

const freezeItems=items=>Object.freeze(items.map(item=>Object.freeze({...item,tile:item.tile?Object.freeze({...item.tile}):undefined})));

export const outbreakBuildingPlans=freezeItems([
  {id:'number-works',label:'NUMBER WORKS',tile:{x:6,z:9.5},widthTiles:9,depthTiles:10,wall:'westWall',accent:0xffd84e},
  {id:'puzzle-depot',label:'PUZZLE DEPOT',tile:{x:25,z:9.5},widthTiles:9,depthTiles:10,wall:'eastWall',accent:0x74ffd5},
]);

export const outbreakStreetLights=freezeItems([
  {tile:{x:2,z:5}},{tile:{x:10,z:14}},{tile:{x:21,z:14}},{tile:{x:29,z:5}},
  {tile:{x:0,z:18}},{tile:{x:31,z:18}},{tile:{x:0,z:27}},{tile:{x:31,z:27}},{tile:{x:16,z:0}},
]);

export const outbreakRoadMarkings=freezeItems([
  {tile:{x:12,z:25},widthTiles:4,depthTiles:.12,color:0xfff2a0},
  {tile:{x:20,z:25},widthTiles:4,depthTiles:.12,color:0xfff2a0},
  {tile:{x:12,z:17},widthTiles:3,depthTiles:.12,color:0xffffff},
  {tile:{x:20,z:17},widthTiles:3,depthTiles:.12,color:0xffffff},
  {tile:{x:16,z:6},widthTiles:.12,depthTiles:3,color:0xffe052},
]);

export const outbreakTreePlans=freezeItems([
  {tile:{x:-3,z:4},scale:1.2},{tile:{x:-4,z:12},scale:.9},{tile:{x:-3,z:23},scale:1.1},
  {tile:{x:35,z:5},scale:1},{tile:{x:36,z:15},scale:1.25},{tile:{x:35,z:27},scale:.95},
  {tile:{x:5,z:-4},scale:1.1},{tile:{x:14,z:-5},scale:.9},{tile:{x:25,z:-4},scale:1.2},
]);

export const outbreakShrubPlans=freezeItems([
  {tile:{x:5.5,z:20.5}},{tile:{x:9.5,z:23.5}},{tile:{x:14.5,z:20.5}},{tile:{x:20.5,z:23.5}},
  {tile:{x:25.5,z:20.5}},{tile:{x:12.5,z:3.5}},{tile:{x:18.5,z:3.5}},
]);

export function outbreakSurfaceForCell({x,z}){
  if(x===0||z===0||x===31||z===31)return{kind:'boundary',color:outbreakEnvironmentPalette.boundary};
  const westWarehouse=x>=2&&x<=10&&z>=5&&z<=14,eastWarehouse=x>=21&&x<=29&&z>=5&&z<=14;
  if(westWarehouse)return{kind:'west-workshop',color:((x+z)&1)?outbreakEnvironmentPalette.westFloor:0xffd29a};
  if(eastWarehouse)return{kind:'east-workshop',color:((x+z)&1)?outbreakEnvironmentPalette.eastFloor:0x9cece2};
  const garden=(z>=15&&z<=19&&(x<=10||x>=21));
  if(garden)return{kind:'garden',color:((x+z)&1)?outbreakEnvironmentPalette.grassA:outbreakEnvironmentPalette.grassB};
  const northCourt=z<=7&&x>=10&&x<=21;
  if(northCourt)return{kind:'north-court',color:((x+z)&1)?outbreakEnvironmentPalette.pavementA:outbreakEnvironmentPalette.pavementB};
  return{kind:'street',color:((x+z)&1)?outbreakEnvironmentPalette.streetA:outbreakEnvironmentPalette.streetB};
}

export function outbreakWallColour(cell){
  if(cell.x>=2&&cell.x<=10&&cell.z>=5&&cell.z<=14)return(cell.x+cell.z)%5===0?0xffb05c:outbreakEnvironmentPalette.westWall;
  if(cell.x>=21&&cell.x<=29&&cell.z>=5&&cell.z<=14)return(cell.x+cell.z)%5===0?0x69e2d7:outbreakEnvironmentPalette.eastWall;
  if(cell.x>=13&&cell.x<=18&&cell.z>=8&&cell.z<=12)return(cell.x+cell.z)%3===0?0xf18443:outbreakEnvironmentPalette.courtWall;
  return outbreakEnvironmentPalette.boundary;
}

export function validateOutbreakEnvironmentPlan(){
  const ids=new Set();
  for(const building of outbreakBuildingPlans){
    if(!building.id||ids.has(building.id)||building.widthTiles<4||building.depthTiles<4)throw new TypeError('Invalid Outbreak building plan.');
    ids.add(building.id);
  }
  if(outbreakStreetLights.length<8||outbreakRoadMarkings.length<4||outbreakTreePlans.length<8||outbreakShrubPlans.length<4)throw new TypeError('The Outbreak environment is missing its visual layers.');
  return true;
}

validateOutbreakEnvironmentPlan();
