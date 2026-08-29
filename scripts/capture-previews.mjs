import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeServer } from './server-lib.mjs';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const site=resolve(root,'site');
const screenshotScript='C:\\Users\\fahim\\.agents\\skills\\browser-screenshot\\scripts\\screenshot.py';
const componentNames=['buttons','objective','answers','feedback','progress','mission','hud','touch','modal','profile','teacher','empty'];
const jobs=[
  ['index-mobile','index.html',320,800],['index-tablet','index.html',768,1024],['index-desktop','index.html',1440,900],
  ['blocksmith-mobile','games/blocksmith.html?preview=touch',390,844],['blocksmith-desktop','games/blocksmith.html?preview=world',1440,900],['blocksmith-quest-mobile','games/blocksmith.html?preview=quest',390,844],['skybound-short-landscape','games/skybound.html',844,390],['chronicle-desktop','games/chronicle.html',1280,720]
];
mkdirSync(resolve(root,'docs/images/components'),{recursive:true});mkdirSync(resolve(root,'docs/images/responsive'),{recursive:true});
function run(args){return new Promise((ok,fail)=>{const child=spawn('python',[screenshotScript,...args],{stdio:'inherit'});child.on('exit',(code)=>code===0?ok():fail(new Error(`Screenshot exited ${code}`)))});}
const server=makeServer(site);await new Promise((ok)=>server.listen(4174,'127.0.0.1',ok));
try{
  for(const name of componentNames){await run([`http://127.0.0.1:4174/components.html?component=${name}`,'-o',resolve(root,`docs/images/components/${name}.png`),'--width','760','--height','720','--wait','0.25']);}
  for(const [name,path,width,height] of jobs){await run([`http://127.0.0.1:4174/${path}`,'-o',resolve(root,`docs/images/responsive/${name}.png`),'--width',String(width),'--height',String(height),'--wait','0.35']);}
} finally { await new Promise((ok)=>server.close(ok)); }
console.log(`Captured ${componentNames.length+jobs.length} visual baselines.`);
