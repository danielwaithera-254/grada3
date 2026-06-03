// Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.product-card,.testimonial-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorRing.style.width = '60px';
    cursorRing.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
  });
});

// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
reveals.forEach(r => revealObs.observe(r));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let cur = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(timer); }
    el.textContent = Math.floor(cur) + (target >= 100 ? '' : '+');
  }, 25);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-wrap').forEach(c => counterObs.observe(c));

// Horizontal process scroll
const track = document.getElementById('processTrack');
const steps = track.querySelectorAll('.process-step');
const dotsContainer = document.getElementById('scrollDots');
let currentStep = 0;
const stepWidth = 336;

steps.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToStep(i));
  dotsContainer.appendChild(dot);
});

function goToStep(idx) {
  currentStep = Math.max(0, Math.min(idx, steps.length - 1));
  track.style.transform = `translateX(-${currentStep * stepWidth}px)`;
  steps.forEach((s, i) => s.classList.toggle('active-step', i === currentStep));
  dotsContainer.querySelectorAll('.progress-dot').forEach((d, i) => d.classList.toggle('active', i === currentStep));
}

document.getElementById('prevBtn').addEventListener('click', () => goToStep(currentStep - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToStep(currentStep + 1));

// Touch/drag swipe on process
let dragStart = null;
track.addEventListener('mousedown', e => { dragStart = e.clientX; });
document.addEventListener('mouseup', e => {
  if (dragStart !== null) {
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 50) goToStep(currentStep + (diff > 0 ? 1 : -1));
    dragStart = null;
  }
});

// Parallax hero orbs on scroll
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (0.1 + i * 0.05)}px)`;
  });
});

// Smooth stats reveal with stagger
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-item').forEach((s, i) => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        setTimeout(() => {
          s.style.transition = 'all 0.5s ease';
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        }, i * 150);
      });
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);