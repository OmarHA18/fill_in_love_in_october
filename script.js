const pages = [...document.querySelectorAll('.page')];
const dots = document.getElementById('dots');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const restart = document.getElementById('restart');
let current = 0;

pages.forEach((_, i) => { const d = document.createElement('span'); d.className = 'dot' + (i === 0 ? ' active' : ''); dots.appendChild(d) });
const dotEls = [...dots.children];
function showPage(index) {
  current = Math.max(0, Math.min(pages.length - 1, index));
  pages.forEach((p, i) => p.classList.toggle('active', i === current));
  dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  prev.style.opacity = current === 0 ? .35 : 1; next.style.opacity = current === pages.length - 1 ? .35 : 1;
  restart.classList.toggle('show', current > 0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
next.addEventListener('click', () => showPage(current + 1));
prev.addEventListener('click', () => showPage(current - 1));
dotEls.forEach((d, i) => d.addEventListener('click', () => showPage(i)));
document.getElementById('openBook').addEventListener('click', () => showPage(1));
restart.addEventListener('click', () => showPage(0));
document.addEventListener('keydown', e => { if (e.key === 'ArrowRight') showPage(current + 1); if (e.key === 'ArrowLeft') showPage(current - 1) });
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX }, { passive: true });
document.addEventListener('touchend', e => { const dx = e.changedTouches[0].screenX - touchStartX; if (Math.abs(dx) > 55) showPage(current + (dx < 0 ? 1 : -1)) }, { passive: true });
showPage(0);
