// ============================================
//   TOTO REDA — CV v6 · Fullscreen Windows
//   app.js
// ============================================

const slides     = document.querySelectorAll('.slide');
const pdots      = document.querySelectorAll('.pdot');
const tbIcons    = document.querySelectorAll('.tb-icon');
const btnPrev    = document.getElementById('btnPrev');
const btnNext    = document.getElementById('btnNext');
const slideCount = document.getElementById('slideCount');
let current = 0;

const slideTitles = [
  'Bonjour.app',
  'Profil.app',
  'Expérience.app',
  'Compétences.app',
  'Formation.app',
  'Contact.app',
];

// ── GO TO SLIDE ──
function goTo(index, dir = 'next') {
  if (index < 0 || index >= slides.length) return;

  const prev = slides[current];
  prev.classList.remove('active');
  prev.classList.add(dir === 'next' ? 'exit-left' : 'exit-right');
  setTimeout(() => prev.classList.remove('exit-left', 'exit-right'), 450);

  current = index;
  slides[current].classList.add('active');

  // Update dots & taskbar
  pdots.forEach((d, i) => d.classList.toggle('active', i === current));
  tbIcons.forEach((d, i) => d.classList.toggle('active-tab', i === current));

  // Update title bar
  document.querySelector('.bar-title').textContent = slideTitles[current];

  // Update counter
  slideCount.textContent = `${current + 1} / ${slides.length}`;

  // Update nav buttons
  btnPrev.classList.toggle('hidden', current === 0);
  if (current === slides.length - 1) {
    btnNext.textContent = '✓ Télécharger le CV';
    btnNext.classList.add('finish');
  } else {
    btnNext.textContent = 'Suivant →';
    btnNext.classList.remove('finish');
  }

  // Trigger skill bars when reaching skills slide
  if (slides[current].id === 'slide-skills') {
    setTimeout(() => {
      slides[current].querySelectorAll('.s-fill').forEach(b => {
        b.style.width = b.dataset.width;
      });
    }, 200);
  }

  // Trigger counters when reaching profil slide
  if (slides[current].id === 'slide-profil') {
    slides[current].querySelectorAll('[data-target]').forEach(el => animCount(el));
  }
}

// ── NEXT / PREV ──
btnNext.addEventListener('click', () => {
  if (current === slides.length - 1) { window.print(); return; }
  goTo(current + 1, 'next');
});
btnPrev.addEventListener('click', () => goTo(current - 1, 'prev'));

// ── DOT NAVIGATION ──
pdots.forEach((d, i) => d.addEventListener('click', () => goTo(i, i > current ? 'next' : 'prev')));

// ── TASKBAR NAVIGATION ──
tbIcons.forEach((icon, i) => icon.addEventListener('click', () => goTo(i, i > current ? 'next' : 'prev')));

// ── KEYBOARD ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1, 'next'); }
  if (e.key === 'ArrowLeft') goTo(current - 1, 'prev');
});

// ── SWIPE (mobile) ──
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1, 'next') : goTo(current - 1, 'prev');
});

// ── TYPING EFFECT ──
const titles = ['Webmaster E-commerce', 'Rédacteur Fiches Produits', 'Spécialiste SEO', 'Gestionnaire de Contenu'];
let ti = 0, ci = 0, del = false;
function type() {
  const el = document.getElementById('typed-text'), w = titles[ti];
  if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(type, 1800); return; } }
  else { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; ti = (ti + 1) % titles.length; } }
  setTimeout(type, del ? 35 : 75);
}
type();

// ── COUNTER ──
function animCount(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const t = parseInt(el.dataset.target), sf = el.dataset.suffix || '';
  let c = 0; const inc = t / 60;
  const tm = setInterval(() => { c = Math.min(c + inc, t); el.textContent = Math.floor(c) + sf; if (c >= t) clearInterval(tm); }, 18);
}

// ── INIT ──
goTo(0);
