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

/* ── Brand image toggle ── */
const brandImages = {
  /* Animal Feeds */
  'Portland Feeds': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Unga Farm Care': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Mills & Co': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Dairy Meal': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Chick Mash': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Beef Concentrates': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Pig Grower': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',
  'Layers Mash': 'https://imaginecare.co.ke/wp-content/uploads/2023/09/DK-777-Hybrid-Maize-Seeds-2kg.jpg',

  /* Insecticides */
  'Duduthrin': 'https://imaginecare.co.ke/wp-content/uploads/2025/09/Duduthrin-1.75EC-1.jpg',
  'Ranger': 'https://imaginecare.co.ke/wp-content/uploads/2022/10/Pentagon-50-EC.png',
  'Bestox': 'https://imaginecare.co.ke/wp-content/uploads/2020/09/bestox-100-ec.jpg',
  'Lorsban': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/Alpha-Degree-100EC.jpg',
  'Thunder': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Polo': 'https://imaginecare.co.ke/wp-content/uploads/2022/10/Pentagon-50-EC.png',

  /* Herbicides */
  'Roundup': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Starane': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  '2,4-D Amine': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Atrazine': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Glyphosate': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',
  'Weedmaster': 'https://imaginecare.co.ke/wp-content/uploads/2019/08/roundup-360k.jpeg',

  /* Fungicides */
  'Amistar Top': 'https://cdn-ilefbpj.nitrocdn.com/nVUkTODffJPXDBXDLfosjwmcdJniVxsG/assets/images/optimized/rev-ac7b818/kilimokona.co.ke/wp-content/uploads/2026/03/Amistar-Top.png.png',
  'Mancozeb': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Ridomil': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Cosavet': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',
  'Mildex': 'https://imaginecare.co.ke/wp-content/uploads/2021/08/Ridomil-1kg-F.jpg',

  /* Dewormers */
  'Albendazole': 'https://www.epharmacyke.com/wp-content/uploads/2020/04/abz-albendazole-400mg-kenya-deworming.jpg',
  'Ivermectin': 'https://vetmeds.org/wp-content/uploads/2020/03/IMG_0158-e1495029994588.jpg',
  'Levamisole': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Fenbendazole': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Wormicid': 'https://uzapal.co.ke/wp-content/uploads/2025/03/wormicid-liquid-125ml.jpg',

  /* Seeds */
  'Hybrid Maize H614': 'https://imaginecare.co.ke/wp-content/uploads/2026/03/H-614D-Maize-Hybrid-Seed-2kg.png',
  'Hybrid Maize H621': 'https://imaginecare.co.ke/wp-content/uploads/2026/03/H-614D-Maize-Hybrid-Seed-2kg.png',
  'Rosecoco Beans': 'https://imaginecare.co.ke/wp-content/uploads/2026/03/GLP-2-Rose-Coco-Beans-Seeds-2kg.png',
  'Kales': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',
  'Tomato': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Onion': 'https://imaginecare.co.ke/wp-content/uploads/2024/01/122063637_2839209483030619_4842580950794913864_n.jpg',
  'Sukuma Wiki': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',
  'Spinach': 'https://imaginecare.co.ke/wp-content/uploads/2023/01/SC-Sungura-301-Hybrid-Maize-Seed-2kg.jpg',

  /* Vet Products */
  'Vaccines': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Antibiotics': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Multivitamins': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Wound Sprays': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Trypanocides': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',

  /* Fertilizers */
  'NPK 23:23:0': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'DAP': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'CAN': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Urea': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Mavuno': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',
  'Organic Compost': 'https://imaginecare.co.ke/wp-content/uploads/2023/08/Thabiti-DAP-Fertilizer-50kg.jpg',

  /* Acaricides */
  'Triatix': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Deltamethrin': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Ectomort': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Supacide': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',

  /* Poultry Equipment */
  'Drinkers': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Feeders': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Brooders': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Cages': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',

  /* Farm Tools */
  'Jembe': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Panga': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Fork': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Sprayer': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
  'Wheelbarrow': 'https://imaginecare.co.ke/wp-content/uploads/2023/04/Triatix-Stock-Spray.jpg',
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
