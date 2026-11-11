const menu=document.querySelector('.menu');const nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open',!expanded);menu.textContent=expanded?'Menu +':'Close −'});
const dialog=document.querySelector('dialog');let trigger;document.querySelectorAll('.video-trigger').forEach(button=>button.addEventListener('click',()=>{trigger=button;const id=button.dataset.video;if(!/^[\w-]{11}$/.test(id))return;document.querySelector('#player-title').textContent=button.dataset.title;const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;iframe.title=button.dataset.title;iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;document.querySelector('#player').replaceChildren(iframe);document.querySelector('#youtube-fallback').href=`https://www.youtube.com/watch?v=${id}`;dialog.showModal();document.body.classList.add('modal-open')}));dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.querySelector('#player').replaceChildren();document.body.classList.remove('modal-open');trigger?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const search = document.querySelector('#search');
const sort = document.querySelector('#film-sort');
const filters = [...document.querySelectorAll('[data-filter]')];
const grid = document.querySelector('#film-grid');
let category = 'all';
function updateFilms() {
  if (!grid) return;
  const query = search.value.trim().toLowerCase();
  const cards = [...grid.querySelectorAll('.film')];
  cards.sort((a, b) => sort.value === 'title' ? a.dataset.title.localeCompare(b.dataset.title) : Number(b.dataset.views) - Number(a.dataset.views) || Number(a.dataset.order) - Number(b.dataset.order));
  let count = 0;
  for (const card of cards) {
    card.hidden = !(category === 'all' || card.dataset.category === category) || !card.dataset.search.includes(query);
    if (!card.hidden) count++;
    grid.append(card);
  }
  document.querySelector('#results').textContent = count + ' film' + (count === 1 ? '' : 's');
  document.querySelector('#no-results').hidden = count !== 0;
}
search?.addEventListener('input', updateFilms);
sort?.addEventListener('change', updateFilms);
for (const button of filters) button.addEventListener('click', () => {
  category = button.dataset.filter;
  for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
  updateFilms();
});
