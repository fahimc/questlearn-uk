document.documentElement.classList.add('js');

const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')})},{threshold:.08});
document.querySelectorAll('[data-game]').forEach(item=>observer.observe(item));

const search=document.querySelector('[data-game-search]');
const categoryButtons=[...document.querySelectorAll('[data-category]')];
const railFilters=[...document.querySelectorAll('[data-filter]')];
const gameTiles=[...document.querySelectorAll('.game-tile[data-game]')];
const empty=document.querySelector('[data-empty-games]');
const rail=document.querySelector('[data-subject-rail]');
const menu=document.querySelector('[data-menu]');
let activeCategory='all';

const carousel=document.querySelector('[data-hero-carousel]');
const carouselSlides=[...carousel.querySelectorAll('[data-carousel-slide]')];
const carouselDots=carousel.querySelector('[data-carousel-dots]');
const carouselPause=carousel.querySelector('[data-carousel-pause]');
const carouselLive=carousel.querySelector('[data-carousel-live]');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let carouselIndex=0,carouselTimer=0,carouselPaused=reduceMotion.matches,carouselHover=false,carouselFocus=false,pointerStart=null,suppressCarouselClick=false;

const dotButtons=carouselSlides.map((slide,index)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Show ${slide.dataset.slideName}`);button.addEventListener('click',()=>showCarouselSlide(index,true));carouselDots.append(button);return button});
function carouselCanPlay(){return!carouselPaused&&!carouselHover&&!carouselFocus&&!document.hidden&&!reduceMotion.matches}
function updateCarouselPause(){carousel.dataset.autoplay=String(carouselCanPlay());carouselPause.classList.toggle('paused',carouselPaused);carouselPause.setAttribute('aria-pressed',String(carouselPaused));carouselPause.setAttribute('aria-label',carouselPaused?'Play carousel':'Pause carousel');carouselPause.querySelector('span').textContent=carouselPaused?'▶':'Ⅱ';carouselPause.querySelector('b').textContent=carouselPaused?'Play':'Pause';carouselLive.setAttribute('aria-live',carouselCanPlay()?'off':'polite')}
function scheduleCarousel(){clearTimeout(carouselTimer);updateCarouselPause();if(carouselCanPlay())carouselTimer=setTimeout(()=>showCarouselSlide(carouselIndex+1,false),6500)}
function showCarouselSlide(index,announce=false){carouselIndex=(index+carouselSlides.length)%carouselSlides.length;carouselSlides.forEach((slide,slideIndex)=>{const active=slideIndex===carouselIndex;slide.classList.toggle('active',active);slide.setAttribute('aria-hidden',String(!active));const link=slide.querySelector('a');if(link)link.tabIndex=active?0:-1});dotButtons.forEach((button,dotIndex)=>{const active=dotIndex===carouselIndex;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current')});carouselLive.textContent=`Showing ${carouselSlides[carouselIndex].dataset.slideName}`;if(announce)carouselLive.setAttribute('aria-live','polite');scheduleCarousel()}
carousel.querySelector('[data-carousel-prev]').addEventListener('click',()=>showCarouselSlide(carouselIndex-1,true));
carousel.querySelector('[data-carousel-next]').addEventListener('click',()=>showCarouselSlide(carouselIndex+1,true));
carouselPause.addEventListener('click',()=>{carouselPaused=!carouselPaused;scheduleCarousel()});
carousel.addEventListener('mouseenter',()=>{carouselHover=true;scheduleCarousel()});carousel.addEventListener('mouseleave',()=>{carouselHover=false;scheduleCarousel()});
carousel.addEventListener('focusin',()=>{carouselFocus=true;scheduleCarousel()});carousel.addEventListener('focusout',()=>setTimeout(()=>{carouselFocus=carousel.contains(document.activeElement);scheduleCarousel()}));
carousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showCarouselSlide(carouselIndex-1,true)}if(event.key==='ArrowRight'){event.preventDefault();showCarouselSlide(carouselIndex+1,true)}});
carousel.addEventListener('pointerdown',event=>{if(event.button!==0||event.target.closest('button'))return;pointerStart={id:event.pointerId,x:event.clientX};carousel.setPointerCapture?.(event.pointerId)});
carousel.addEventListener('pointerup',event=>{if(!pointerStart||pointerStart.id!==event.pointerId)return;const distance=event.clientX-pointerStart.x;pointerStart=null;if(Math.abs(distance)>45){suppressCarouselClick=true;showCarouselSlide(carouselIndex+(distance<0?1:-1),true);setTimeout(()=>suppressCarouselClick=false,400)}});
carousel.addEventListener('pointercancel',()=>pointerStart=null);carousel.addEventListener('click',event=>{if(suppressCarouselClick)event.preventDefault()});
document.addEventListener('visibilitychange',scheduleCarousel);reduceMotion.addEventListener?.('change',scheduleCarousel);showCarouselSlide(0,false);

function matches(game,query){const categories=game.dataset.categories.split(' ');const categoryMatch=activeCategory==='all'||categories.includes(activeCategory);const searchMatch=!query||game.dataset.search.includes(query);return categoryMatch&&searchMatch}
function applyFilters(){const query=search.value.trim().toLowerCase();gameTiles.forEach(game=>{game.hidden=!matches(game,query)});empty.hidden=gameTiles.some(game=>!game.hidden)}
function chooseCategory(category){activeCategory=category;categoryButtons.forEach(button=>{const active=button.dataset.category===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});railFilters.forEach(link=>{const active=link.dataset.filter===category;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});applyFilters()}

search.addEventListener('input',applyFilters);
categoryButtons.forEach(button=>button.addEventListener('click',()=>chooseCategory(button.dataset.category)));
railFilters.forEach(link=>link.addEventListener('click',()=>{chooseCategory(link.dataset.filter);rail.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('[data-clear-search]').addEventListener('click',()=>{search.value='';chooseCategory('all');search.focus()});
menu.addEventListener('click',()=>{const open=rail.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){rail.classList.remove('open');menu.setAttribute('aria-expanded','false');document.activeElement?.blur()}});
