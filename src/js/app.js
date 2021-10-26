
// Mobile Menu

document.getElementById("mobile-nav-button").onclick = function() {
  document.getElementById("mobile-nav").style.right = "0";
}

document.getElementById("mobile-nav-close-button").onclick = function() {
  document.getElementById("mobile-nav").style.right = "-320px";
}

// Geolocation


var route = [];
var watchId;
function start() {
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    watchId = navigator.geolocation.watchPosition(position => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var timest = position.timestamp.toLocaleString();
      const pos = {
        latitude: lat,
        longitude: lon,
        timestamp: timest
      };
      route.push(pos);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
      console.log(position);
    });
  }
  else {
    console.log('geolocation not available');
  }
}

function stop() {
  navigator.geolocation.clearWatch(watchId);
  var parsed = "";
  for (i=0; i < route.length; i++) {
    var object = route[i];
    for (var property in object) {
      parsed += property + ": " + object[property] + "; ";
    };
    parsed += "<br />";
  }
  document.getElementById('display').innerHTML = parsed;
  if (document.getElementById('display').innerHTML !== "") {
    document.getElementById('deletebutton').style.display = "block";
  }
}

function deleteroute() {
  route = [];
  document.getElementById('display').innerHTML = "";
  document.getElementById('deletebutton').style.display = "none";
}
