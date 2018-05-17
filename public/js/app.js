
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCxvjKhkhrrvHQ1YH4Ob9I80SZ-kXrqI-s",
  authDomain: "ruralit-1620a.firebaseapp.com",
  databaseURL: "https://ruralit-1620a.firebaseio.com",
  projectId: "ruralit-1620a",
  storageBucket: "ruralit-1620a.appspot.com",
  messagingSenderId: "687154250117"
};
firebase.initializeApp(config);
var measurementsLength;
var measurementsRef = firebase.database().ref('measurements');

var measurelabels = [];
var gatewayIds = [];


measurementsRef.on("value", function (snapshot) {
  measurementsLength = snapshot.numChildren();
  if (measurementsLength > 0) {
    measurementsRef.on('value', getData);
  }

});

var measurelabels = [];

function getData(data) {

  // measureList = document.getElementById("measureList");
  // measureList.innerHTML = '';
  let measurements = data.val();
  var geoData = [];
  var previousgatewayId = '';
  var gateways = [];
  var keys = Object.keys(measurements);

  for (let i = 0; i < keys.length; i++) {
    var k = keys[i];
    geoData.push({
      geo: [
        {
          lat: measurements[k].payload_fields.location.lat,
          lng: measurements[k].payload_fields.location.lng
        }
      ],
    });
    var turbidity = measurements[k].payload_fields.turbidity.toFixed(2);
    measurelabels.push(turbidity.toString());
  };





  clearMarkers();
  for (var i = 0; i < geoData.length; i++) {
    addMarkerWithTimeout(geoData[i]['geo'][0], i * 200);
  }

}



// Google Maps
var markers = [];
var map;
var labelIndex = 0;
console.log(measurelabels);

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 51.8742258, lng: 4.4807875 }
  });

}


function addMarkerWithTimeout(position, timeout) {

  var markerIcon = {
    url: 'http://www.clker.com/cliparts/R/y/b/e/w/9/blue-rain-drop-hi.png',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(25,33)
  };

  window.setTimeout(function () {
    markers.push(new google.maps.Marker({
      position: position,
      label: {
        text: measurelabels[labelIndex++ % measurelabels.length],
        color: "#000",
        fontSize: "12px",
        fontWeight: "bold"
      },
      icon: markerIcon,
      map: map,
      animation: google.maps.Animation.DROP
    }));
  }, timeout);
}



function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}