export const TERRAIN_SEED=0x51ed270b;

function hash(x,z,seed=TERRAIN_SEED){let value=Math.imul(x,374761393)^Math.imul(z,668265263)^seed;value=(value^(value>>>13))*1274126177;return((value^(value>>>16))>>>0)/4294967295}
function fade(value){return value*value*(3-2*value)}
function noise(x,z,scale){const gx=Math.floor(x/scale),gz=Math.floor(z/scale),tx=fade((x/scale)-gx),tz=fade((z/scale)-gz);const a=hash(gx,gz),b=hash(gx+1,gz),c=hash(gx,gz+1),d=hash(gx+1,gz+1);const top=a+(b-a)*tx,bottom=c+(d-c)*tx;return top+(bottom-top)*tz}

export function terrainHeightAt(x,z){const broad=noise(x,z,13),detail=noise(x+91,z-47,6);return Math.max(-1,Math.min(4,Math.round((broad-.5)*5+(detail-.5)*2)))}
export function terrainColourAt(x,height){if(x>=34)return height>=2?0x7fa6b8:height<0?0x697f99:0x8497c9;return height>=2?0x4d9e54:height<0?0x6cab57:0x54b864}
