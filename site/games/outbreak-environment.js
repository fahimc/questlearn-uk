import * as THREE from 'three';
import { outbreakTileToWorld } from './outbreak-map.js';
import {
  outbreakBuildingPlans,
  outbreakEnvironmentPalette,
  outbreakRoadMarkings,
  outbreakShrubPlans,
  outbreakStreetLights,
  outbreakTreePlans,
} from './outbreak-environment-plan.js';

const worldAt=tile=>outbreakTileToWorld(tile);

function instancedBoxes(items,material,{castShadow=false,receiveShadow=false}={}){
  const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),material,items.length),dummy=new THREE.Object3D();
  items.forEach((item,index)=>{
    dummy.position.set(item.position.x,item.position.y,item.position.z);
    dummy.rotation.set(item.rotation?.x||0,item.rotation?.y||0,item.rotation?.z||0);
    dummy.scale.set(item.scale.x,item.scale.y,item.scale.z);
    dummy.updateMatrix();mesh.setMatrixAt(index,dummy.matrix);
    if(item.color!==undefined)mesh.setColorAt(index,new THREE.Color(item.color));
  });
  mesh.instanceMatrix.needsUpdate=true;
  if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
  mesh.castShadow=castShadow;mesh.receiveShadow=receiveShadow;
  return mesh;
}

function environmentSign(text,accent){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
  const context=canvas.getContext('2d');context.fillStyle='#f8fff8';context.roundRect(8,8,496,112,22);context.fill();context.strokeStyle=accent;context.lineWidth=9;context.stroke();
  context.fillStyle='#163644';context.font='900 42px Segoe UI';context.textAlign='center';context.textBaseline='middle';context.fillText(text,256,65);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true}));sprite.scale.set(5.5,1.38,1);return sprite;
}

function illustratedTile(text,{fill='#20c6c7',glow=0x20c6c7}={}){
  const group=new THREE.Group(),body=new THREE.Mesh(new THREE.BoxGeometry(1.35,1.35,.34),new THREE.MeshStandardMaterial({color:fill,emissive:glow,emissiveIntensity:.42,roughness:.28,metalness:.16}));
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const context=canvas.getContext('2d');
  context.fillStyle='rgba(255,255,255,.13)';context.roundRect(11,11,234,234,38);context.fill();context.strokeStyle='rgba(255,255,255,.9)';context.lineWidth=11;context.stroke();
  context.fillStyle='#fff';context.font='900 132px Segoe UI';context.textAlign='center';context.textBaseline='middle';context.fillText(text,128,132);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const face=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false}));face.position.z=.19;face.scale.set(1.18,1.18,1);group.add(body,face);return group;
}

function clockFace(){
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const context=canvas.getContext('2d');
  context.fillStyle='#ff8a42';context.beginPath();context.arc(128,128,115,0,Math.PI*2);context.fill();context.fillStyle='#fff4d2';context.beginPath();context.arc(128,128,92,0,Math.PI*2);context.fill();
  context.strokeStyle='#173c4d';context.lineCap='round';context.lineWidth=13;context.beginPath();context.moveTo(128,128);context.lineTo(128,69);context.moveTo(128,128);context.lineTo(168,142);context.stroke();
  context.fillStyle='#173c4d';context.beginPath();context.arc(128,128,10,0,Math.PI*2);context.fill();
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true}));sprite.scale.set(2.3,2.3,1);return sprite;
}

function createKeyArtLandmark(group,materials,{lowPower=false}={}){
  const centre=worldAt({x:16,z:10}),boxes=[
    {position:{x:centre.x-4,y:4.65,z:centre.z},scale:{x:3.8,y:1.3,z:8.8},color:0xf18443},
    {position:{x:centre.x+4,y:4.65,z:centre.z},scale:{x:3.8,y:1.3,z:8.8},color:0xf18443},
    {position:{x:centre.x,y:5.15,z:centre.z},scale:{x:5.2,y:2.3,z:4.4},color:0x13a7a8},
    {position:{x:centre.x,y:7.2,z:centre.z},scale:{x:4.25,y:1.9,z:3.8},color:0x18b6ad},
    {position:{x:centre.x,y:8.65,z:centre.z},scale:{x:3.45,y:1,z:3.35},color:0x66bd4d},
  ],bands=[
    {position:{x:centre.x,y:4.15,z:centre.z+5.08},scale:{x:10.8,y:.32,z:.32},color:0xffbd63},
    {position:{x:centre.x,y:6.1,z:centre.z+2.28},scale:{x:6.1,y:.34,z:.34},color:0xff9b50},
    {position:{x:centre.x,y:8.05,z:centre.z+1.97},scale:{x:4.8,y:.32,z:.32},color:0xffb25d},
    {position:{x:centre.x,y:9.35,z:centre.z},scale:{x:4.4,y:.46,z:3.8},color:0x277c65},
    {position:{x:centre.x-2.05,y:2.15,z:centre.z+5.08},scale:{x:.58,y:4.3,z:.44},color:0xff9b50},
    {position:{x:centre.x+2.05,y:2.15,z:centre.z+5.08},scale:{x:.58,y:4.3,z:.44},color:0xff9b50},
    {position:{x:centre.x,y:4.15,z:centre.z+5.08},scale:{x:4.7,y:.58,z:.44},color:0xffb35a},
  ];
  group.add(instancedBoxes(boxes,materials.accent,{castShadow:!lowPower,receiveShadow:true}),instancedBoxes(bands,materials.accent,{castShadow:!lowPower}));
  const windows=[
    {position:{x:centre.x-4,y:4.92,z:centre.z+5.1},scale:{x:1.55,y:.72,z:.08}},
    {position:{x:centre.x+4,y:4.92,z:centre.z+5.1},scale:{x:1.55,y:.72,z:.08}},
    {position:{x:centre.x-1.15,y:6.62,z:centre.z+2.23},scale:{x:1.15,y:.82,z:.08}},
    {position:{x:centre.x+1.15,y:6.62,z:centre.z+2.23},scale:{x:1.15,y:.82,z:.08}},
  ];
  group.add(instancedBoxes(windows,materials.glass));const doorway=new THREE.Mesh(new THREE.BoxGeometry(2.6,2.9,.1),materials.dark);doorway.position.set(centre.x,1.45,centre.z+5.12);group.add(doorway);
  const clock=clockFace();clock.position.set(centre.x,7.28,centre.z+2.03);group.add(clock);
  const pole=new THREE.Mesh(new THREE.BoxGeometry(.13,3,.13),materials.dark);pole.position.set(centre.x,10.9,centre.z);const flag=new THREE.Mesh(new THREE.BoxGeometry(1.5,.65,.08),new THREE.MeshStandardMaterial({color:0xff6e4a,roughness:.55}));flag.position.set(centre.x+.75,11.7,centre.z);group.add(pole,flag);
  const tokens=[['+',0xffc329,-8,5.6,4],['×',0x19c8d5,8.5,5,-1],['7',0x76c943,5,3.7,10],['12',0xc24ee8,-5.5,2.8,12]].map(([symbol,color,x,y,z],index)=>{const tile=illustratedTile(symbol,{fill:`#${color.toString(16).padStart(6,'0')}`,glow:color});tile.position.set(x,y,z);tile.rotation.y=index%2?-.18:.18;tile.userData.baseY=y;tile.userData.phase=index*1.7;group.add(tile);return tile});
  return tokens;
}

function createSky(scene){
  const geometry=new THREE.SphereGeometry(88,24,14),material=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(outbreakEnvironmentPalette.skyTop)},horizon:{value:new THREE.Color(outbreakEnvironmentPalette.skyHorizon)}},vertexShader:'varying float vHeight;void main(){vec4 world=modelMatrix*vec4(position,1.0);vHeight=normalize(world.xyz).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 top;uniform vec3 horizon;varying float vHeight;void main(){float mixAmount=smoothstep(-0.08,0.68,vHeight);gl_FragColor=vec4(mix(horizon,top,mixAmount),1.0);}'});
  const sky=new THREE.Mesh(geometry,material);sky.frustumCulled=false;scene.add(sky);return sky;
}

export function createOutbreakEnvironment(scene,{renderer,lowPower=false}={}){
  scene.background=new THREE.Color(outbreakEnvironmentPalette.skyHorizon);scene.fog=new THREE.Fog(0xbdeeff,52,108);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
  const group=new THREE.Group();group.name='Gridlock Garden visual environment';scene.add(group);createSky(group);

  const ambient=new THREE.AmbientLight(0xffffff,.72),hemisphere=new THREE.HemisphereLight(0xe9fbff,0x5f8f50,1.42),sun=new THREE.DirectionalLight(outbreakEnvironmentPalette.sun,3.25);
  sun.position.set(-24,38,18);sun.castShadow=!lowPower;sun.shadow.mapSize.set(lowPower?256:768,lowPower?256:768);sun.shadow.camera.left=-38;sun.shadow.camera.right=38;sun.shadow.camera.top=38;sun.shadow.camera.bottom=-38;sun.shadow.camera.near=1;sun.shadow.camera.far=80;group.add(ambient,hemisphere,sun);

  const materials={
    roof:new THREE.MeshStandardMaterial({color:outbreakEnvironmentPalette.roof,roughness:.72,metalness:.18}),
    trim:new THREE.MeshStandardMaterial({color:outbreakEnvironmentPalette.trim,roughness:.78}),
    accent:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.58}),
    glass:new THREE.MeshStandardMaterial({color:outbreakEnvironmentPalette.window,emissive:0x3a8398,emissiveIntensity:.55,roughness:.22,metalness:.1}),
    equipment:new THREE.MeshStandardMaterial({color:0x596e78,roughness:.62,metalness:.42}),
    dark:new THREE.MeshStandardMaterial({color:0x2d4651,roughness:.68,metalness:.25}),
    glow:new THREE.MeshBasicMaterial({color:0xffef9c}),
    bark:new THREE.MeshStandardMaterial({color:0x785438,roughness:.95}),
    foliage:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.92}),
    marking:new THREE.MeshBasicMaterial({color:0xffffff}),
    cloud:new THREE.MeshBasicMaterial({color:0xf5fdff,transparent:true,opacity:.92,depthWrite:false}),
    flower:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.7,emissive:0x39102f,emissiveIntensity:.15}),
  };

  const roofs=[],trims=[],windows=[],awnings=[],equipment=[],upperWalls=[];
  for(const building of outbreakBuildingPlans){
    const centre=worldAt(building.tile),width=building.widthTiles*2,depth=building.depthTiles*2;
    roofs.push({position:{x:centre.x,y:4.14,z:centre.z},scale:{x:width+.7,y:.34,z:depth+.7}});
    trims.push(
      {position:{x:centre.x,y:3.55,z:centre.z-depth/2},scale:{x:width+.45,y:.42,z:.28}},
      {position:{x:centre.x,y:3.55,z:centre.z+depth/2},scale:{x:width+.45,y:.42,z:.28}},
      {position:{x:centre.x-width/2,y:3.55,z:centre.z},scale:{x:.28,y:.42,z:depth}},
      {position:{x:centre.x+width/2,y:3.55,z:centre.z},scale:{x:.28,y:.42,z:depth}},
    );
    for(let offset=-depth/2+2;offset<=depth/2-2;offset+=3.2){
      windows.push({position:{x:centre.x-width/2-.03,y:2.25,z:centre.z+offset},scale:{x:.11,y:1.05,z:1.45}});
      windows.push({position:{x:centre.x+width/2+.03,y:2.25,z:centre.z+offset},scale:{x:.11,y:1.05,z:1.45}});
    }
    for(let offset=-width/2+2;offset<=width/2-2;offset+=3.2){
      windows.push({position:{x:centre.x+offset,y:2.25,z:centre.z-depth/2-.03},scale:{x:1.45,y:1.05,z:.11}});
      if(Math.abs(offset)>.8)windows.push({position:{x:centre.x+offset,y:2.25,z:centre.z+depth/2+.03},scale:{x:1.45,y:1.05,z:.11}});
    }
    const entrance=worldAt({x:building.tile.x,z:14.35});
    awnings.push({position:{x:entrance.x,y:3.05,z:entrance.z},scale:{x:4.2,y:.2,z:1.35},color:building.accent});
    equipment.push({position:{x:centre.x-3.3,y:4.72,z:centre.z},scale:{x:2.6,y:.8,z:1.65}},{position:{x:centre.x+3.2,y:4.52,z:centre.z-2.8},scale:{x:1.3,y:.42,z:2.1}});
    for(const xOffset of[-4.5,0,4.5])windows.push({position:{x:centre.x+xOffset,y:4.38,z:centre.z},scale:{x:2.6,y:.08,z:3.7}});
    upperWalls.push({position:{x:centre.x,y:5.15,z:centre.z},scale:{x:width*.62,y:2.1,z:depth*.58},color:building.id==='number-works'?0xf0803f:0x18aeb2});
    roofs.push({position:{x:centre.x,y:6.32,z:centre.z},scale:{x:width*.67,y:.38,z:depth*.63}});
    for(const xOffset of[-3.2,0,3.2])windows.push({position:{x:centre.x+xOffset,y:5.25,z:centre.z+depth*.295+.04},scale:{x:1.55,y:.72,z:.1}});
    const sign=environmentSign(building.label,`#${building.accent.toString(16).padStart(6,'0')}`);sign.position.set(entrance.x,2.25,entrance.z+.78);group.add(sign);
  }
  group.add(instancedBoxes(upperWalls,materials.accent,{castShadow:!lowPower,receiveShadow:true}),instancedBoxes(roofs,materials.roof,{castShadow:!lowPower,receiveShadow:true}),instancedBoxes(trims,materials.trim,{castShadow:!lowPower}),instancedBoxes(windows,materials.glass),instancedBoxes(awnings,materials.accent,{castShadow:!lowPower}),instancedBoxes(equipment,materials.equipment,{castShadow:!lowPower}));

  const court=worldAt({x:16,z:9.5}),courtBands=[
    {position:{x:court.x,y:3.65,z:court.z-3.9},scale:{x:12,y:.45,z:.3}},
    {position:{x:court.x,y:3.65,z:court.z+3.9},scale:{x:12,y:.45,z:.3}},
  ];
  group.add(instancedBoxes(courtBands,materials.trim,{castShadow:!lowPower}));
  const courtSign=environmentSign('COUNT COURT','#a58bff');courtSign.position.set(court.x,3.05,court.z+4.25);group.add(courtSign);
  const keyArtTokens=createKeyArtLandmark(group,materials,{lowPower});

  const clouds=[
    {position:{x:-24,y:13,z:-28},scale:{x:5.8,y:1.25,z:2.1}},{position:{x:-18,y:13.6,z:-28},scale:{x:4.3,y:1.65,z:2.2}},
    {position:{x:20,y:15,z:-36},scale:{x:6.4,y:1.35,z:2.3}},{position:{x:27,y:15.4,z:-36},scale:{x:4.8,y:1.8,z:2.4}},
    {position:{x:35,y:11.5,z:2},scale:{x:5.4,y:1.3,z:2}},{position:{x:40,y:12,z:2},scale:{x:3.8,y:1.55,z:2.1}},
  ];
  group.add(instancedBoxes(clouds,materials.cloud));

  const poleItems=[],lampItems=[];
  for(const light of outbreakStreetLights){const world=worldAt(light.tile);poleItems.push({position:{x:world.x,y:2.15,z:world.z},scale:{x:.13,y:4.3,z:.13}},{position:{x:world.x+.45,y:4.22,z:world.z},scale:{x:1,y:.12,z:.12}});lampItems.push({position:{x:world.x+.88,y:4.16,z:world.z},scale:{x:.5,y:.22,z:.38}})}
  group.add(instancedBoxes(poleItems,materials.dark,{castShadow:!lowPower}),instancedBoxes(lampItems,materials.glow));

  const markings=outbreakRoadMarkings.map(mark=>{const world=worldAt(mark.tile);return{position:{x:world.x,y:.022,z:world.z},scale:{x:mark.widthTiles*2,y:.028,z:mark.depthTiles*2},color:mark.color}});
  group.add(instancedBoxes(markings,materials.marking));

  const treeItems=(lowPower?outbreakTreePlans.filter((_,index)=>index%2===0):outbreakTreePlans),trunks=[],crowns=[];
  treeItems.forEach((tree,index)=>{const world=worldAt(tree.tile),scale=tree.scale;trunks.push({position:{x:world.x,y:1.75*scale,z:world.z},scale:{x:.65*scale,y:3.5*scale,z:.65*scale}});crowns.push({position:{x:world.x,y:4.15*scale,z:world.z},scale:{x:2.7*scale,y:2.6*scale,z:2.7*scale},color:index%2?outbreakEnvironmentPalette.foliage:outbreakEnvironmentPalette.foliageLight})});
  const trunkMesh=instancedBoxes(trunks,materials.bark,{castShadow:!lowPower}),crownMesh=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),materials.foliage,crowns.length),dummy=new THREE.Object3D();crowns.forEach((c,index)=>{dummy.position.set(c.position.x,c.position.y,c.position.z);dummy.scale.set(c.scale.x,c.scale.y,c.scale.z);dummy.rotation.y=index*.83;dummy.updateMatrix();crownMesh.setMatrixAt(index,dummy.matrix);crownMesh.setColorAt(index,new THREE.Color(c.color))});crownMesh.instanceMatrix.needsUpdate=true;crownMesh.instanceColor.needsUpdate=true;crownMesh.castShadow=!lowPower;group.add(trunkMesh,crownMesh);

  const shrubs=outbreakShrubPlans.map((shrub,index)=>{const world=worldAt(shrub.tile);return{position:{x:world.x,y:1.7,z:world.z},scale:{x:1.25,y:.75,z:1.25},color:index%2?outbreakEnvironmentPalette.foliage:outbreakEnvironmentPalette.foliageLight}}),shrubMesh=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),materials.foliage,shrubs.length);shrubs.forEach((shrub,index)=>{dummy.position.set(shrub.position.x,shrub.position.y,shrub.position.z);dummy.scale.set(shrub.scale.x,shrub.scale.y,shrub.scale.z);dummy.rotation.y=index*.71;dummy.updateMatrix();shrubMesh.setMatrixAt(index,dummy.matrix);shrubMesh.setColorAt(index,new THREE.Color(shrub.color))});shrubMesh.instanceMatrix.needsUpdate=true;shrubMesh.instanceColor.needsUpdate=true;shrubMesh.castShadow=!lowPower;group.add(shrubMesh);

  const flowerSeeds=(lowPower?outbreakShrubPlans.slice(0,4):outbreakShrubPlans),stems=[],blooms=[];flowerSeeds.forEach((seed,index)=>{const world=worldAt(seed.tile);for(let petal=0;petal<(lowPower?2:3);petal+=1){const angle=index*1.9+petal*2.1,x=world.x+Math.cos(angle)*1.1,z=world.z+Math.sin(angle)*1.1;stems.push({position:{x,y:.32,z},scale:{x:.08,y:.64,z:.08}});blooms.push({position:{x,y:.69,z},scale:{x:.36,y:.22,z:.36},color:[0xff5ba7,0xffd33d,0x9e6dff][(index+petal)%3]})}});group.add(instancedBoxes(stems,new THREE.MeshStandardMaterial({color:0x3fa948,roughness:.9})),instancedBoxes(blooms,materials.flower));

  const stats=Object.freeze({buildings:outbreakBuildingPlans.length+1,windows:windows.length,streetLights:outbreakStreetLights.length,trees:treeItems.length,shrubs:shrubs.length,mathTiles:keyArtTokens.length,flowers:blooms.length});
  group.userData.outbreakEnvironmentStats=stats;return{group,sun,stats,update(time=0){keyArtTokens.forEach(tile=>{tile.position.y=tile.userData.baseY+Math.sin(time*1.7+tile.userData.phase)*.18;tile.rotation.y+=.003})}};
}
