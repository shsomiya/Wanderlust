let carousel = document.getElementById("carousel");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop > 100) {
    carousel.classList.add("sticky-carousel");
  } else {
    carousel.classList.remove("sticky-carousel");
  }
});





  // Wait for the page to load
  document.addEventListener('DOMContentLoaded', function () {
    const mapDiv = document.getElementById('map');

    // Get data from attributes
    const lat = parseFloat(mapDiv.dataset.lat);
    const lng = parseFloat(mapDiv.dataset.lng);
    const zoom = parseInt(mapDiv.dataset.zoom);
    const title = mapDiv.dataset.title || 'Location';
    const location = mapDiv.dataset.location || '';
    const country = mapDiv.dataset.country || '';

    // Initialize the map
    const map = L.map('map').setView([lat, lng], zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${title}</b><br>${location}, ${country}`)
      .openPopup();
  });
