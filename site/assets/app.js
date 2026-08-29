document.documentElement.classList.add('js');

const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')})},{threshold:.08});
document.querySelectorAll('[data-game]').forEach(item=>observer.observe(item));

const search=document.querySelector('[data-game-search]');
const categoryButtons=[...document.querySelectorAll('[data-category]')];
const railFilters=[...document.querySelectorAll('[data-filter]')];
const gameTiles=[...document.querySelectorAll('.game-tile[data-game]')];
const featured=document.querySelector('.featured-card[data-game]');
const featuredSection=document.querySelector('.featured-section');
const empty=document.querySelector('[data-empty-games]');
const rail=document.querySelector('[data-subject-rail]');
const menu=document.querySelector('[data-menu]');
let activeCategory='all';

function matches(game,query){const categories=game.dataset.categories.split(' ');const categoryMatch=activeCategory==='all'||categories.includes(activeCategory);const searchMatch=!query||game.dataset.search.includes(query);return categoryMatch&&searchMatch}
function applyFilters(){const query=search.value.trim().toLowerCase();gameTiles.forEach(game=>{game.hidden=!matches(game,query)});const featuredVisible=matches(featured,query);featured.hidden=!featuredVisible;featuredSection.hidden=!featuredVisible;empty.hidden=gameTiles.some(game=>!game.hidden)}
function chooseCategory(category){activeCategory=category;categoryButtons.forEach(button=>{const active=button.dataset.category===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});railFilters.forEach(link=>{const active=link.dataset.filter===category;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});applyFilters()}

search.addEventListener('input',applyFilters);
categoryButtons.forEach(button=>button.addEventListener('click',()=>chooseCategory(button.dataset.category)));
railFilters.forEach(link=>link.addEventListener('click',()=>{chooseCategory(link.dataset.filter);rail.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('[data-clear-search]').addEventListener('click',()=>{search.value='';chooseCategory('all');search.focus()});
menu.addEventListener('click',()=>{const open=rail.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){rail.classList.remove('open');menu.setAttribute('aria-expanded','false');document.activeElement?.blur()}});
