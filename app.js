const map = L.map('map').setView([35.6700, 139.6900], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = {};
let activeGenre = 'すべて';

function renderStores(genre) {
  const list = document.getElementById('store-list');
  const countEl = document.getElementById('store-count');
  list.innerHTML = '';

  Object.values(markers).forEach(m => map.removeLayer(m));

  const filtered = genre === 'すべて' ? stores : stores.filter(s => s.genre === genre);
  countEl.textContent = `${filtered.length}件の店舗`;

  filtered.forEach(store => {
    const marker = L.marker([store.lat, store.lng])
      .addTo(map)
      .bindPopup(`<b>${store.name}</b><br><small>${store.address}</small><br><small>${store.description}</small>`);

    markers[store.id] = marker;

    const card = document.createElement('div');
    card.className = 'store-card';
    card.innerHTML = `
      <h3>${store.name}</h3>
      <p class="address">${store.address}</p>
      <p class="description">${store.description}</p>
      <span class="genre">${store.genre}</span>
    `;

    card.addEventListener('click', () => {
      map.setView([store.lat, store.lng], 16);
      marker.openPopup();
    });

    list.appendChild(card);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeGenre = btn.dataset.genre;
    renderStores(activeGenre);
  });
});

renderStores('すべて');
