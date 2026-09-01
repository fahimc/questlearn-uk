export const OUTBREAK_LOOK_PITCH_LIMIT=Math.PI/2-.12;

export function normaliseOutbreakYaw(yaw){const value=Number(yaw);return Number.isFinite(value)?Math.atan2(Math.sin(value),Math.cos(value)):0}
export function clampOutbreakPitch(pitch){const value=Number(pitch);return Math.max(-OUTBREAK_LOOK_PITCH_LIMIT,Math.min(OUTBREAK_LOOK_PITCH_LIMIT,Number.isFinite(value)?value:0))}
export function updateOutbreakLook(look,{deltaX=0,deltaY=0,sensitivity=.0022}={}){const safeSensitivity=Number.isFinite(Number(sensitivity))?Math.abs(Number(sensitivity)):.0022,safeX=Number.isFinite(Number(deltaX))?Number(deltaX):0,safeY=Number.isFinite(Number(deltaY))?Number(deltaY):0;return{yaw:normaliseOutbreakYaw((Number(look?.yaw)||0)-safeX*safeSensitivity),pitch:clampOutbreakPitch((Number(look?.pitch)||0)-safeY*safeSensitivity)}}
