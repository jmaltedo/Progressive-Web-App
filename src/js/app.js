if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}


// const start = document.querySelector("#start");
// const stop = document.querySelector("#stop");
//
// const coordinates = [];
//
// var displayCoordinates = "";
//
// start.addEventListener("click", () => {
//   navigator.geolocation.watchPosition(
//     data => {
//       console.log(data);
//       coordinates.push([data.coords.latitude, data.coords.longitude, data.timestamp]);
//       displayCoordinates = data.coords.latitude + ", " + data.coords.longitude + ", " + data.timestamp + "<b>";
//       document.getElementById('coordinates').textContent = displayCoordinates;
//       // window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
//     },
//     error => console.log(error), {
//       enableHighAccuracy: true
//     }
//   );
// });



let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Start Tracking";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
