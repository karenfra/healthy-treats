const map = L.map('map').setView([-12.1614, -76.9715], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([-12.1614, -76.9715]).addTo(map).bindPopup("Pasteleria Healthy Treats").openPopup();