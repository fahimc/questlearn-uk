export const mathsChallenges = [
  { id:'m1', subject:'maths', objectiveId:'ENG-M-Y3-NPV-01', prompt:'A wall is 8 blocks long and 4 blocks high. How many blocks are needed?', options:['12','24','32'], answer:'32', hint:'Think of 4 equal rows of 8.', success:'8 × 4 = 32. You used multiplication as repeated addition.' },
  { id:'m2', subject:'maths', objectiveId:'ENG-M-Y3-FRA-01', prompt:'Half of the 24 garden plots need water. How many plots is that?', options:['10','12','14'], answer:'12', hint:'Split 24 into two equal groups.', success:'24 ÷ 2 = 12. One half means one of two equal parts.' },
  { id:'m3', subject:'maths', objectiveId:'ENG-M-Y4-MEA-02', prompt:'A path is 2.5 m long. How many centimetres is that?', options:['25 cm','250 cm','2,500 cm'], answer:'250 cm', hint:'One metre equals 100 centimetres.', success:'2.5 × 100 = 250 centimetres.' },
  { id:'m4', subject:'maths', objectiveId:'ENG-M-Y4-MUL-01', prompt:'Choose the factor pair that makes 36.', options:['4 × 9','5 × 7','3 × 11'], answer:'4 × 9', hint:'Use a known multiplication fact and check each product.', success:'4 × 9 = 36. Both 4 and 9 are factors of 36.' },
  { id:'m5', subject:'maths', objectiveId:'ENG-M-Y5-FRA-02', prompt:'Which is equivalent to 3/4?', options:['6/8','4/6','9/16'], answer:'6/8', hint:'Multiply the numerator and denominator by the same number.', success:'3/4 × 2/2 = 6/8, so the fractions are equivalent.' }
];

export const literacyChallenges = [
  { id:'e1', subject:'english', objectiveId:'ENG-E-LKS2-RC-01', prompt:'The corridor “gloomed beneath a single trembling lamp”. What mood is created?', options:['Cheerful','Uneasy','Sleepy'], answer:'Uneasy', hint:'Look at the words “gloomed” and “trembling”.', success:'Those word choices suggest darkness and uncertainty, creating an uneasy mood.' },
  { id:'e2', subject:'english', objectiveId:'ENG-E-Y3-VGP-02', prompt:'Choose the best conjunction: “Mina kept climbing ___ the wind grew stronger.”', options:['although','because','before'], answer:'although', hint:'The two ideas contrast with each other.', success:'“Although” links two contrasting ideas.' },
  { id:'e3', subject:'english', objectiveId:'ENG-E-LKS2-INF-01', prompt:'Idris hid the map when footsteps approached. What can we infer?', options:['He wanted it found','He thought it was valuable','He had finished reading'], answer:'He thought it was valuable', hint:'Why would someone hide an object when another person arrives?', success:'His action suggests the map is important and he wants to protect it.' },
  { id:'e4', subject:'history', objectiveId:'ENG-H-KS2-EVI-01', prompt:'Which source best shows what a Roman soldier was officially issued?', options:['A modern film','An army equipment list','A legend retold later'], answer:'An army equipment list', hint:'Prefer a source made for the purpose at the time.', success:'An official list is direct evidence, though historians would still check its origin and context.' }
];

export const scienceChallenges = [
  { id:'s1', subject:'science', objectiveId:'ENG-S-Y3-PLANTS-01', prompt:'Which part carries water from roots to leaves?', options:['Stem','Flower','Seed'], answer:'Stem', hint:'It also supports the plant above ground.', success:'The stem supports the plant and transports water towards the leaves.' },
  { id:'s2', subject:'science', objectiveId:'ENG-S-Y3-ROCKS-01', prompt:'Which test helps compare how easily rocks wear away?', options:['Rub equal samples equally','Only look at colour','Measure the weather'], answer:'Rub equal samples equally', hint:'A fair comparison changes one thing and keeps the rest controlled.', success:'Using the same method on equal samples makes the test more comparable.' },
  { id:'s3', subject:'science', objectiveId:'ENG-S-Y4-HAB-01', prompt:'A pond dries up. Which living thing is most directly affected first?', options:['A frog','A desert cactus','An oak tree far away'], answer:'A frog', hint:'Consider which organism depends on the pond habitat.', success:'Frogs depend on pond habitats, especially for breeding and early life.' }
];

export const allChallenges = [...mathsChallenges, ...literacyChallenges, ...scienceChallenges];

