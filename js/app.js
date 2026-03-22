// ============================================
//   TOTO REDA — CV v5 · Pop-up Windows
//   app.js
// ============================================

// ── PROGRESS + BACK TO TOP ──
const prog = document.getElementById('progress');
const btt  = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  prog.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  btt.classList.toggle('visible', window.scrollY > 300);
});

// ── NAVBAR ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

// ── BURGER ──
const burger = document.getElementById('burger');
const mob    = document.getElementById('mob');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mob.classList.toggle('open');
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mob.classList.remove('open');
}));

// ── TYPING EFFECT ──
const titles = ['Webmaster E-commerce', 'Rédacteur Fiches Produits', 'Spécialiste SEO', 'Gestionnaire de Contenu'];
let ti = 0, ci = 0, del = false;
function type() {
  const el = document.getElementById('typed-text'), w = titles[ti];
  if (!del) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; setTimeout(type, 1800); return; } }
  else       { el.textContent = w.slice(0, --ci); if (ci === 0) { del = false; ti = (ti + 1) % titles.length; } }
  setTimeout(type, del ? 35 : 75);
}
type();

// ── COUNTERS ──
function animCount(el) {
  const t = parseInt(el.dataset.target), sf = el.dataset.suffix || '';
  let c = 0; const inc = t / 65;
  const tm = setInterval(() => { c = Math.min(c + inc, t); el.textContent = Math.floor(c) + sf; if (c >= t) clearInterval(tm); }, 18);
}
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animCount(e.target); cObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cObs.observe(el));

// ── SCROLL REVEAL ──
const rObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('vis'), i * 80); rObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.tl, .sg, .edu-card, .lang-card, .int-pill').forEach(el => rObs.observe(el));

// ── SKILL BARS ──
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.s-fill').forEach(b => setTimeout(() => b.style.width = b.dataset.width, 200));
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sg').forEach(g => skObs.observe(g));

// ── WIN SKILL BARS (hero popup) ──
setTimeout(() => {
  document.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.width; });
}, 2400);

// ── POP-UP WINDOWS SEQUENCE ──
const winSequence = [
  { id: 'winBonjour', delay: 400  },
  { id: 'winExp',     delay: 950  },
  { id: 'winSkills',  delay: 1500 },
  { id: 'winAvail',   delay: 2000 },
];
winSequence.forEach(({ id, delay }) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
  }, delay);
});

// ── CLOSE BUTTON on windows ──
document.querySelectorAll('.win-close').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const win = btn.closest('.win');
    win.style.transition = 'opacity .25s, transform .25s';
    win.style.opacity = '0';
    win.style.transform += ' scale(.9)';
    setTimeout(() => win.remove(), 260);
  });
});

// ── DRAG windows ──
document.querySelectorAll('.win-bar').forEach(bar => {
  let startX, startY, startL, startT;
  bar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('wd') || e.target.classList.contains('win-close')) return;
    const win = bar.closest('.win');
    const rect = win.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY;
    startL = rect.left; startT = rect.top;
    win.style.position = 'fixed';
    win.style.left = startL + 'px';
    win.style.top  = startT + 'px';
    win.style.zIndex = '999';
    win.style.transition = 'none';

    function move(ev) {
      win.style.left = (startL + ev.clientX - startX) + 'px';
      win.style.top  = (startT + ev.clientY - startY) + 'px';
    }
    function up() {
      win.style.transition = '';
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  });
});

// ── PRINT ──
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.s-fill').forEach(b => b.style.width = b.dataset.width);
  document.querySelectorAll('.tl, .sg, .edu-card, .lang-card, .int-pill').forEach(el => el.classList.add('vis'));
});
