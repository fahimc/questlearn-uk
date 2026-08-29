export const EYE_HEIGHT=1.72;
export const GRAVITY=14;
export const JUMP_SPEED=5.4;
export const FLY_SPEED=7;

export function stepVertical(state,{delta,supportHeight,ascend=false,descend=false,minHeight=-2,maxHeight=28}){
  if(state.flying)return{height:Math.max(minHeight,Math.min(maxHeight,state.height+(Number(ascend)-Number(descend))*FLY_SPEED*delta)),velocity:0,grounded:false,flying:true};
  const velocity=state.velocity-GRAVITY*delta;const height=state.height+velocity*delta;if(height<=supportHeight)return{height:supportHeight,velocity:0,grounded:true,flying:false};return{height,velocity,grounded:false,flying:false};
}
