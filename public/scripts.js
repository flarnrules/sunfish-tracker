// Function to initialize the map
function initMap(apiKey) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initializeMap`;
    script.defer = true;
    document.head.appendChild(script);
}

function initializeMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 0, lng: 0 }, // Default center
    });

    // Fetch GPS data and plot on map
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const pathCoordinates = data.map(point => ({ lat: point.latitude, lng: point.longitude }));
            const path = new google.maps.Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            path.setMap(map);

            // Center map on the first coordinate
            if (pathCoordinates.length > 0) {
                map.setCenter(pathCoordinates[0]);
            }
        })
        .catch(error => console.error('Error fetching GPS data:', error));
}

// Fetch API key from the JSON file and load the map script
fetch('api-key.json')
    .then(response => response.json())
    .then(data => {
        if (data.apiKey) {
            initMap(data.apiKey);
        } else {
            console.error('API key not found');
        }
    })
    .catch(error => console.error('Error fetching API key:', error));
