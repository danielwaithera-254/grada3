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
  'Agromine 860 SL (2,4-D Amine)': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  '2,4-D Max': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Lumax': 'https://imaginecare.co.ke/wp-content/uploads/2021/05/60964861_2392119141072991_6061613135846965248_n.jpg',
  'Atrazine': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Agil 100 EC': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Bentagran': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Dual Gold': 'https://agroduka.com/images/product/lumax-5375_5l.png',
  'Stomp 330 EC': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Gardoprim Plus Gold': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Harness': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Banvel (Dicamba)': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Mustang': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Callisto': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Basagran': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',

  /* Insecticides */
  'Thunder 145 O-TEQ': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Karate 5 EC': 'https://agriplexindia.com/cdn/shop/products/syngenta-04.png?v=1743241972',
  'Karate Zeon 5 CS': 'https://agriplexindia.com/cdn/shop/products/syngenta-04.png?v=1743241972',
  'Actara 25 WG': 'https://imaginecare.co.ke/wp-content/uploads/2022/11/Actara-40g-Actara-25-WG.jpg',
  'Ampligo 150 ZC': 'https://imaginecare.co.ke/wp-content/uploads/2021/06/1.1579080806.Insecticides.jpg',
  'Voliam Targo 063 SC': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/Alpha-Degree-100EC.jpg',
  'Match 050 EC': 'https://imaginecare.co.ke/wp-content/uploads/2021/06/1.1579080806.Insecticides.jpg',
  'Cruiser 350 FS': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Engeo 247 SC': 'https://imaginecare.co.ke/wp-content/uploads/2022/10/Pentagon-50-EC.png',
  'Minecto Star': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Minecto One': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Vertimec 018 EC': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Proclaim 5 SG': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Tracer 480 SC': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Delegate 250 WG': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',

  /* Fungicides */
  'Ridomil Gold MZ 68 WG': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Mancozeb 80 WP': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Ortiva 250 SC': 'https://imaginecare.co.ke/wp-content/uploads/2023/07/Ortiva-250SC-20ml-1.png',
  'Nativo 300 SC': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Score 250 EC': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Milraz 76 WP': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Cabrio Top 60 WG': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Amistar Top 325 SC': 'https://cdn-ilefbpj.nitrocdn.com/nVUkTODffJPXDBXDLfosjwmcdJniVxsG/assets/images/optimized/rev-ac7b818/kilimokona.co.ke/wp-content/uploads/2026/03/Amistar-Top.png.png',
  'Melody Duo 66.8 WP': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Folicur 250 EW': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',

  /* Dewormers */
  'Albendazole': 'https://www.epharmacyke.com/wp-content/uploads/2020/04/abz-albendazole-400mg-kenya-deworming.jpg',
  'Fenbendazole': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Levamisole': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Ivermectin': 'https://vetmeds.org/wp-content/uploads/2020/03/IMG_0158-e1495029994588.jpg',
  'Closantel': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Oxyclozanide': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Triclabendazole': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Rafoxanide': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Piperazine': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Praziquantel': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',

  /* Vet Products */
  'Oxytetracycline Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Pen & Strep Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Tylosin Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Ivermectin Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Albendazole Suspension': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Multivitamin Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Calcium Borogluconate Injection': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Coccidiostat (Amprolium)': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Tick Grease': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Terramycin Eye Ointment': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',

  /* Fertilizers */
  'DAP (Diammonium Phosphate)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'CAN (Calcium Ammonium Nitrate)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'NPK 23:23:0': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'NPK 17:17:17': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'NPK 20:10:10': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Urea (46% Nitrogen)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Sulphate of Ammonia (SA)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'MOP (Muriate of Potash)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'SSP (Single Super Phosphate)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Foliar Fertilizer (e.g. Bayfolan or Easy Gro)': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',

  /* Seeds */
  'Maize Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2026/03/H-614D-Maize-Hybrid-Seed-2kg.png',
  'Bean Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2026/03/GLP-2-Rose-Coco-Beans-Seeds-2kg.png',
  'Tomato Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Onion Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Cabbage Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',
  'Kale (Sukuma Wiki) Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',
  'Spinach Seeds': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',
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
      container.innerHTML = `<img src="${imgUrl}" alt="${brandName}" loading="lazy">`;
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
