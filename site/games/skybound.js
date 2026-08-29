import { mathsChallenges } from '../assets/question-bank.js';
import { mountChallenge, toast } from '../assets/game-common.js';

const canvas = document.querySelector('#obbyCanvas');
const context = canvas.getContext('2d');
const player = { x: .5, y: .83, vx: 0, vy: 0, unlocked: 0 };
let stage = 1;
const platforms = [{x:.1,y:.9,w:.8},{x:.08,y:.72,w:.28},{x:.55,y:.58,w:.32},{x:.22,y:.43,w:.25},{x:.58,y:.28,w:.28},{x:.35,y:.12,w:.3}];

function resize() { const box=canvas.getBoundingClientRect(); const scale=Math.min(devicePixelRatio,2); canvas.width=box.width*scale; canvas.height=box.height*scale; context.setTransform(scale,0,0,scale,0,0); }
function draw() { const w=canvas.clientWidth,h=canvas.clientHeight; context.clearRect(0,0,w,h); context.fillStyle='#1b1439';context.fillRect(0,0,w,h);context.strokeStyle='rgba(157,123,255,.16)';for(let y=0;y<h;y+=32){context.beginPath();context.moveTo(0,y);context.lineTo(w,y);context.stroke()} platforms.forEach((p,i)=>{context.fillStyle=i<=player.unlocked?'#ff6b5e':'#574a78';context.fillRect(p.x*w,p.y*h,p.w*w,14);context.fillStyle='rgba(0,0,0,.18)';context.fillRect(p.x*w,p.y*h+14,p.w*w,7)}); context.fillStyle='#41d9d0';context.fillRect(player.x*w-13,player.y*h-28,26,28);context.fillStyle='#071226';context.fillRect(player.x*w-7,player.y*h-20,4,4);context.fillRect(player.x*w+3,player.y*h-20,4,4);context.fillStyle='#ffd166';context.font='bold 22px sans-serif';context.fillText('★',w*.49,h*.08); requestAnimationFrame(draw); }
function move(type){if(type==='left')player.x=Math.max(.05,player.x-.06);if(type==='right')player.x=Math.min(.95,player.x+.06);if(type==='jump'&&player.unlocked>0){player.y=Math.max(.11,platforms[player.unlocked].y);toast('Route reached!')}}
document.querySelectorAll('[data-move]').forEach((button)=>button.addEventListener('click',()=>move(button.dataset.move)));
document.addEventListener('keydown',(event)=>{if(event.key==='ArrowLeft')move('left');if(event.key==='ArrowRight')move('right');if(['ArrowUp',' '].includes(event.key))move('jump')});
mountChallenge({challenges:mathsChallenges,subject:'maths',onCorrect:()=>{player.unlocked=Math.min(5,player.unlocked+1);stage=Math.min(5,stage+1);player.y=platforms[player.unlocked].y;document.querySelector('[data-height]').textContent=`${player.unlocked*12} m`;document.querySelector('[data-stage]').textContent=`${stage} / 5`;toast('Safe route unlocked')}});
window.addEventListener('resize',resize);resize();draw();

