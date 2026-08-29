export const voxelAnimalSpawns=[
  {id:'sheep-northwest',kind:'sheep',x:-46,z:-43,phase:.4,radius:2.6,speed:.17},
  {id:'pig-southwest',kind:'pig',x:-44,z:36,phase:1.7,radius:2.2,speed:.2},
  {id:'cow-west-meadow',kind:'cow',x:-43,z:4,phase:3.1,radius:3,speed:.14},
  {id:'chicken-west-bank',kind:'chicken',x:-18,z:-43,phase:2.4,radius:2.1,speed:.24},
  {id:'cow-south-meadow',kind:'cow',x:-16,z:42,phase:4.2,radius:2.8,speed:.15},
  {id:'chicken-numberland',kind:'chicken',x:-18,z:1,phase:5.3,radius:2.2,speed:.22},
  {id:'pig-numberland',kind:'pig',x:18,z:1,phase:.9,radius:2.4,speed:.18},
  {id:'sheep-east-meadow',kind:'sheep',x:17,z:43,phase:2.8,radius:2.8,speed:.16},
  {id:'pig-east-hills',kind:'pig',x:18,z:-43,phase:4.8,radius:2.3,speed:.19},
  {id:'sheep-english',kind:'sheep',x:46,z:11,phase:1.2,radius:2.7,speed:.16},
  {id:'cow-northeast',kind:'cow',x:48,z:46,phase:3.8,radius:2.9,speed:.14},
  {id:'chicken-southeast',kind:'chicken',x:50,z:-48,phase:5.8,radius:2.1,speed:.23}
];

export function animalPositionAt(spawn,timeSeconds){
  if(!spawn||!Number.isFinite(timeSeconds))throw new TypeError('Animal spawn and finite time are required');
  const angle=timeSeconds*spawn.speed+spawn.phase;
  const x=spawn.x+Math.sin(angle)*spawn.radius;
  const z=spawn.z+Math.cos(angle)*spawn.radius*.72;
  const nextAngle=angle+.01;
  const nextX=spawn.x+Math.sin(nextAngle)*spawn.radius;
  const nextZ=spawn.z+Math.cos(nextAngle)*spawn.radius*.72;
  return{x,z,heading:Math.atan2(nextX-x,nextZ-z),gait:Math.sin(timeSeconds*spawn.speed*18+spawn.phase)};
}
