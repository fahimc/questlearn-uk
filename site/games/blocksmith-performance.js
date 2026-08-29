export function selectBlocksmithQuality({
  coarsePointer=false,
  hardwareConcurrency=8,
  deviceMemory=8,
  userAgent='',
  devicePixelRatio=1,
  forcedTier=null
}={}){
  const constrained=forcedTier==='low'||(forcedTier!=='high'&&(
    coarsePointer||/CrOS|Android|iPad|iPhone/i.test(userAgent)||
    hardwareConcurrency<=4||deviceMemory<=4
  ));
  return constrained?{
    tier:'low',pixelRatio:Math.min(devicePixelRatio,.85),renderDistance:34,
    farPlane:54,shadows:false,antialias:false,targetFps:60,terrainChunkSize:16
  }:{
    tier:'high',pixelRatio:Math.min(devicePixelRatio,1.35),renderDistance:62,
    farPlane:88,shadows:true,antialias:true,targetFps:60,terrainChunkSize:16
  };
}
