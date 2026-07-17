if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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
document.querySelectorAll('a,button,.product-card').forEach(el => {
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

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
reveals.forEach(r => revealObs.observe(r));

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

const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');
const productCards = document.querySelectorAll('.product-card');
const productsSection = document.getElementById('products');

const productNames = [
  'Animal feeds', 'Insecticides', 'Herbicides', 'Fungicides',
  'Dewormers', 'Seeds (maize, beans, vegetables)', 'Vet products', 'Fertilizers',
  'Acaricides', 'Poultry equipment', 'Farm tools'
];

function renderDropdown(filter) {
  const q = filter.toLowerCase();
  const matches = productNames.filter(n => n.toLowerCase().includes(q));
  if (!matches.length || !q) {
    searchDropdown.classList.remove('visible');
    return;
  }
  searchDropdown.innerHTML = matches.map(name =>
    `<div class="search-dropdown-item" data-name="${name}">${name}</div>`
  ).join('');
  searchDropdown.classList.add('visible');
}

if (searchInput && searchDropdown && productCards.length) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    renderDropdown(query);
    productCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(query) ? '' : 'none';
    });
    const productsTop = productsSection.offsetTop - 100;
    window.scrollTo({ top: productsTop, behavior: 'smooth' });
  });

  searchDropdown.addEventListener('click', function(e) {
    const item = e.target.closest('.search-dropdown-item');
    if (!item) return;
    const name = item.dataset.name;
    searchInput.value = name;
    searchDropdown.classList.remove('visible');
    productCards.forEach(card => {
      card.style.display = card.dataset.name.toLowerCase() === name.toLowerCase() ? '' : 'none';
    });
    const productsTop = productsSection.offsetTop - 100;
    window.scrollTo({ top: productsTop, behavior: 'smooth' });
  });

  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove('visible');
    }
  });

  searchInput.addEventListener('focus', function() {
    if (this.value.trim()) renderDropdown(this.value);
  });
}

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${y * (0.1 + i * 0.05)}px)`;
  });
});

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
