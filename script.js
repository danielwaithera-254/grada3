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
  'Poultry feeds', 'Dairy and cattle feeds', 'Pig feeds', 'Rabbit feeds', 'Fish feeds', 'Goat and sheep feeds',
  'Herbicides', 'Insecticides', 'Fungicides', 'Dewormers', 'Vet products', 'Fertilizers', 'Seeds'
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

/* ── Brand image toggle ── */
const brandImages = {
  /* Poultry Feeds */
  'Chick Mash': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
  'Growers Mash': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
  'Layers Mash': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
  'Broiler Starter': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
  'Broiler Finisher': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',
  'Kienyeji Mash': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop',

  /* Dairy & Cattle Feeds */
  'Dairy Meal': 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',
  'Calf Pellets': 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',
  'Beef Fattening Meal': 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',
  'Mineral Licks': 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',

  /* Pig Feeds */
  'Pig Creep Feed': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
  'Pig Starter': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
  'Pig Grower': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
  'Pig Finisher': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
  'Sow & Weaner Meal': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',

  /* Rabbit Feeds */
  'Rabbit Pellets': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',

  /* Fish Feeds */
  'Tilapia Feed': 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
  'Catfish Feed': 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
  'Fish Starter, Grower, and Finisher Pellets': 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',

  /* Goat & Sheep Feeds */
  'Goat Meal': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Sheep Meal': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Mineral Supplements': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',

  /* Herbicides */
  'Agromine 860 SL (2,4-D Amine)': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  '2,4-D Max': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Lumax': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Atrazine': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Agil 100 EC': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Bentagran': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Dual Gold': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Stomp 330 EC': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Gardoprim Plus Gold': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Harness': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Banvel (Dicamba)': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Mustang': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Callisto': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
  'Basagran': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',

  /* Insecticides */
  'Thunder 145 O-TEQ': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Karate 5 EC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Karate Zeon 5 CS': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Actara 25 WG': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Ampligo 150 ZC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Voliam Targo 063 SC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Match 050 EC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Cruiser 350 FS': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Engeo 247 SC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Minecto Star': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Minecto One': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Vertimec 018 EC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Proclaim 5 SG': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Tracer 480 SC': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',
  'Delegate 250 WG': 'https://images.unsplash.com/photo-1628359355624-855775b5c9c4?w=400&h=300&fit=crop',

  /* Fungicides */
  'Ridomil Gold MZ 68 WG': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Mancozeb 80 WP': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Ortiva 250 SC': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Nativo 300 SC': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Score 250 EC': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Milraz 76 WP': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Cabrio Top 60 WG': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Amistar Top 325 SC': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Melody Duo 66.8 WP': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
  'Folicur 250 EW': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',

  /* Dewormers */
  'Albendazole': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Fenbendazole': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Levamisole': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Ivermectin': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Closantel': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Oxyclozanide': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Triclabendazole': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Rafoxanide': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Piperazine': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
  'Praziquantel': 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',

  /* Vet Products */
  'Oxytetracycline Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Pen & Strep Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Tylosin Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Ivermectin Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Albendazole Suspension': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Multivitamin Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Calcium Borogluconate Injection': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Coccidiostat (Amprolium)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Tick Grease': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Terramycin Eye Ointment': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',

  /* Fertilizers */
  'DAP (Diammonium Phosphate)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'CAN (Calcium Ammonium Nitrate)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'NPK 23:23:0': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'NPK 17:17:17': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'NPK 20:10:10': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Urea (46% Nitrogen)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Sulphate of Ammonia (SA)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'MOP (Muriate of Potash)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'SSP (Single Super Phosphate)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
  'Foliar Fertilizer (e.g. Bayfolan or Easy Gro)': 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',

  /* Seeds */
  'Maize Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Bean Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Tomato Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Onion Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Cabbage Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Kale (Sukuma Wiki) Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
  'Spinach Seeds': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
};

document.querySelectorAll('.brand-tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    e.stopPropagation();
    const card = this.closest('.product-card');
    const brandName = this.textContent.trim();
    let container = card.querySelector('.brand-image-container');

    // Toggle if already exists
    if (container) {
      container.classList.toggle('visible');
      this.classList.toggle('active');
      return;
    }

    // Create brand image container
    container = document.createElement('div');
    container.className = 'brand-image-container';

    const imgUrl = brandImages[brandName];
    if (imgUrl) {
      container.innerHTML = `<img src="${imgUrl}" alt="${brandName}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML='<div class=\\'brand-image-placeholder\\'>📷 ${brandName}</div>'">`;
    } else {
      container.innerHTML = `<div class="brand-image-placeholder">📷 ${brandName}</div>`;
    }

    card.querySelector('.product-card-body').appendChild(container);
    this.classList.add('active');

    requestAnimationFrame(() => { container.classList.add('visible'); });
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
