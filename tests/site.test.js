import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read=(path)=>readFileSync(new URL(`../site/${path}`,import.meta.url),'utf8');
test('all public pages declare responsive viewport and British English',()=>{for(const path of ['index.html','components.html','architecture.html','games/blocksmith.html','games/skybound.html','games/chronicle.html']){const html=read(path);assert.match(html,/lang="en-GB"/);assert.match(html,/name="viewport"/)}});
test('game pages expose a pause control and live feedback',()=>{for(const path of ['games/blocksmith.html','games/skybound.html','games/chronicle.html']){const html=read(path);assert.match(html,/aria-label="Pause game"/);assert.match(html,/aria-live="polite"/)}});
test('component library contains twelve previewable components',()=>{assert.equal([...read('components.html').matchAll(/data-component="[^"]+"/g)].length,12)});
test('reduced motion and short landscape layouts exist',()=>{const css=read('assets/styles.css')+read('assets/game.css');assert.match(css,/prefers-reduced-motion/);assert.match(css,/max-height:\s*560px/)});
test('Blocksmith mobile controls cannot select text or open touch callouts',()=>{const css=read('games/blocksmith.css');assert.match(css,/\.voxel-touch,\.voxel-touch \*\{[^}]*-webkit-user-select:none;[^}]*user-select:none;[^}]*-webkit-touch-callout:none/);assert.match(css,/\.voxel-touch button\{[^}]*touch-action:none/)});
test('Blocksmith exposes four material counts and an explicit dig control',()=>{const html=read('games/blocksmith.html');assert.equal([...html.matchAll(/data-count-for="(moss|wood|stone|glass)"/g)].length,4);assert.match(html,/aria-label="Dig or collect block"/);assert.match(read('games/blocksmith.js'),/addResourceWorld\(\)/)});
test('Blocksmith short landscape removes the portrait height floor',()=>{assert.match(read('games/blocksmith.css'),/@media\(max-height:520px\)[^{]*\{\.voxel-game\{min-height:0\}/)});
