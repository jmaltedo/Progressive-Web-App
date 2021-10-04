if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}


const start = document.querySelector("#start");
const stop = document.querySelector("#stop");

const coordinates = [];

var displayCoordinates = "";

start.addEventListener("click", () => {
  navigator.geolocation.watchPosition(
    data => {
      console.log(data);
      coordinates.push([data.coords.latitude, data.coords.longitude, data.timestamp]);
      displayCoordinates = data.coords.latitude + ", " + data.coords.longitude + ", " + data.timestamp + "<b>";
      document.getElementById('coordinates').textContent = displayCoordinates;
      // window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
    },
    error => console.log(error), {
      enableHighAccuracy: true
    }
  );
});
