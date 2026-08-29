export const blocksmithQuests = [
  { id:'half-24', number:'01', title:'The Halfway Garden', objectiveId:'ENG-M-Y3-FRA-01', prompt:'Build a shape using half of 24 blocks.', targetBlocks:12, reward:12, hint:'Half means split the whole into two equal groups.', success:'24 ÷ 2 = 12. Your 12-block shape shows one half of the whole.', position:{x:-9,z:4}, zone:{x:-12,z:1,width:6,depth:6}, colour:0x45e0d5 },
  { id:'third-18', number:'02', title:'Three Equal Camps', objectiveId:'ENG-M-Y3-FRA-02', prompt:'Build one third of an 18-block camp.', targetBlocks:6, reward:8, hint:'A third means one of three equal groups.', success:'18 ÷ 3 = 6. One equal camp needs 6 blocks.', position:{x:8,z:8}, zone:{x:5,z:5,width:6,depth:6}, colour:0xffd166 },
  { id:'quarter-28', number:'03', title:'Quarter of the Quarry', objectiveId:'ENG-M-Y4-FRA-01', prompt:'Build a sculpture using one quarter of 28 blocks.', targetBlocks:7, reward:9, hint:'Divide 28 into four equal groups.', success:'28 ÷ 4 = 7. Your sculpture is one quarter of 28.', position:{x:10,z:-7}, zone:{x:7,z:-10,width:6,depth:6}, colour:0xff7a66 },
  { id:'array-15', number:'04', title:'The Orchard Array', objectiveId:'ENG-M-Y3-MUL-01', prompt:'Build an array with 3 rows of 5 blocks.', targetBlocks:15, reward:15, hint:'Each of the 3 rows needs 5 blocks.', success:'3 × 5 = 15. The whole array contains 15 blocks.', position:{x:-8,z:-9}, zone:{x:-11,z:-12,width:6,depth:6}, colour:0x9d7bff },
  { id:'double-8', number:'05', title:'Twin Lookout', objectiveId:'ENG-M-Y3-MUL-02', prompt:'Build a lookout using double 8 blocks.', targetBlocks:16, reward:16, hint:'Double means two equal groups of the same amount.', success:'8 + 8 = 16. Double 8 is 16 blocks.', position:{x:1,z:-13}, zone:{x:-2,z:-16,width:6,depth:6}, colour:0x71dc83 },
  { id:'difference-20-7', number:'06', title:'Bridge Difference', objectiveId:'ENG-M-Y3-AS-01', prompt:'A bridge starts with 20 blocks. Seven wash away. Build the number that remain.', targetBlocks:13, reward:13, hint:'Find the difference between 20 and 7.', success:'20 − 7 = 13. Your bridge uses the 13 blocks that remain.', position:{x:14,z:1}, zone:{x:11,z:-2,width:6,depth:6}, colour:0x5eb6ff }
];

export function isInsideQuestZone(quest, x, z) {
  return x >= quest.zone.x && x < quest.zone.x + quest.zone.width && z >= quest.zone.z && z < quest.zone.z + quest.zone.depth;
}

export function validateQuestBuild(quest, blockCount) {
  if (!quest || !Number.isInteger(blockCount) || blockCount < 0) throw new TypeError('Quest and non-negative integer block count are required');
  const difference = blockCount - quest.targetBlocks;
  if (difference === 0) return { complete:true, difference:0, message:quest.success };
  if (difference < 0) return { complete:false, difference, message:`You have placed ${blockCount}. Add ${Math.abs(difference)} more ${Math.abs(difference) === 1 ? 'block' : 'blocks'}. ${quest.hint}` };
  return { complete:false, difference, message:`You have placed ${blockCount}. Remove ${difference} ${difference === 1 ? 'block' : 'blocks'}. ${quest.hint}` };
}

