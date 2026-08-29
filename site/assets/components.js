const select=document.querySelector('[data-preview-select]');const cards=[...document.querySelectorAll('[data-component]')];
function show(value){cards.forEach((card)=>card.hidden=value!=='all'&&card.dataset.component!==value);document.body.dataset.preview=value;const url=new URL(location.href);if(value==='all')url.searchParams.delete('component');else url.searchParams.set('component',value);history.replaceState({},'',url)}
select.addEventListener('change',()=>show(select.value));const initial=new URLSearchParams(location.search).get('component')||'all';select.value=initial;show(initial);

