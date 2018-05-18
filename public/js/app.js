
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
var imageUrl;
var turbidity

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

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: 51.91194, lng: 4.48538 }
  });

}



function addMarkerWithTimeout(position, timeout) {
  var markerIcon = {
    url: '',
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(50, 33)
  };

  window.setTimeout(function () {
    markers.push(new google.maps.Marker({
      position: position,
      label: {
        text: measurelabels[labelIndex++ % measurelabels.length],
        color: "#000",
        fontSize: "18px",
        fontWeight: "900"
      },
      icon: markerIcon,
      map: map,
      animation: google.maps.Animation.DROP
    }));
    for (var i = 0; i < markers.length; i++) {  
      if (markers[i].label.text < 4) {
        markers[i].icon.url = 'http://worms2d.info/images/9/9a/Icon_Worm_128x128.png';
      } else {
        markers[i].icon.url = 'http://www.clker.com/cliparts/R/y/b/e/w/9/blue-rain-drop-hi.png';
        markers[i].icon.labelOrigin = new google.maps.Point(20, 20)
        markers[i].label.fontSize = '15px';
      }
    }

  }, timeout);


}


function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);

  }
  markers = [];
}