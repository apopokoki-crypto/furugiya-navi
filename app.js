const map = L.map('map').setView([35.6617, 139.7019], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const markers = {};

stores.forEach(store => {
  const marker = L.marker([store.lat, store.lng])
    .addTo(map)
    .bindPopup(`<b>${store.name}</b><br>${store.address}<br><small>${store.description}</small>`);

  markers[store.id] = marker;

  const card = document.createElement('div');
  card.className = 'store-card';
  card.innerHTML = `
    <h3>${store.name}</h3>
    <p>${store.address}</p>
    <p style="margin-top:6px;font-size:12px;color:#ccc">${store.description}</p>
    <span class="genre">${store.genre}</span>
  `;

  card.addEventListener('click', () => {
    map.setView([store.lat, store.lng], 16);
    marker.openPopup();
  });

  document.getElementById('store-list').appendChild(card);
});
