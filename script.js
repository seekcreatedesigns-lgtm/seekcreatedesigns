
// Smoothly scroll to a section within the horizontal hall
function scrollToSection(e, id){
  if(e) e.preventDefault();
  const el = document.getElementById(id);
  if(!el) return;
  const hall = document.querySelector('.hall');
  const offset = el.offsetLeft - (hall.clientWidth - el.clientWidth)/2;
  hall.scrollTo({left: offset, behavior:'smooth'});
}

// IntersectionObserver for subtle fade-in animations
function initObservers(){
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      }
    });
  },{threshold:0.15});
  cards.forEach(c=>observer.observe(c));
}

// keyboard navigation for gallery
document.addEventListener('keydown', (e)=>{
  const hall = document.querySelector('.hall');
  if(!hall) return;
  if(e.key === 'ArrowRight') hall.scrollBy({left: window.innerWidth*0.6, behavior:'smooth'});
  if(e.key === 'ArrowLeft') hall.scrollBy({left: -window.innerWidth*0.6, behavior:'smooth'});
});

// Lightbox: show a larger placeholder (or real image if present)
function zoomPlaceholder(ev, btn){
  ev && ev.preventDefault();
  const card = btn.closest('.card');
  const svg = card.querySelector('svg');
  const lightbox = document.getElementById('lightbox');
  const inner = document.getElementById('lightboxInner');
  inner.innerHTML = '';
  if(svg){
    const clone = svg.cloneNode(true);
    clone.setAttribute('width','100%');
    clone.setAttribute('height','100%');
    inner.appendChild(clone);
  } else {
    const img = card.querySelector('img');
    if(img){
      const copy = document.createElement('img');
      copy.src = img.src;
      copy.style.maxWidth='100%';copy.style.maxHeight='100%';
      inner.appendChild(copy);
    }
  }
  lightbox.style.display='flex';
}
function closeLightbox(){ document.getElementById('lightbox').style.display='none'; }

window.addEventListener('load', initObservers);
window.addEventListener('hashchange', ()=>{
  const id = location.hash.replace('#','');
  const el = document.getElementById(id);
  if(el) el.focus();
});
