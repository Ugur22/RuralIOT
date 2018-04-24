
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


measurementsRef.on("value", function (snapshot) {
  measurementsLength = snapshot.numChildren();
  if (measurementsLength > 0) {
    measurementsRef.on('value', getData);
  }

});

function getData(data) {

  // measureList = document.getElementById("measureList");
  // measureList.innerHTML = '';
  let measurements = data.val();
  var geoData = [];

  var keys = Object.keys(measurements);

  for (let i = 0; i < keys.length; i++) {
    var k = keys[i];
    geoData.push({
      geo: [
        {
          lat: measurements[k].metadata.gateways[0].latitude,
          lng: measurements[k].metadata.gateways[0].longitude
        }
      ],
    }
    );
    var phValue = measurements[k].payload_fields.phValue;
    measurelabels.push(measurements[k].payload_fields.phValue.toString());
    // var latitude = measurements[k].metadata.gateways[0].latitude;
    // var longitude = measurements[k].metadata.gateways[0].longitude;
    // var li = createDomElement({ tagName: 'li', attributes: { class: 'measurelisting' }, content: "PHvalue: " + phValue + ' latitude ' + latitude + ' longitudes ' + longitude });

    // measureList.appendChild(li);

  }
  console.log(geoData);

  clearMarkers();
  for (var i = 0; i < geoData.length; i++) {
    addMarkerWithTimeout(geoData[i]['geo'][0], i * 200);
  }

}

/**
 * Generic function to create new DOM elements
 *
 * @param properties
 * @returns {Element}
 */
function createDomElement(properties) {
  //Create the element
  var domElement = document.createElement(properties.tagName);

  //Loop through the attributes to set them on the element
  var attributes = properties.attributes;
  for (var prop in attributes) {
    domElement.setAttribute(prop, attributes[prop]);
  }

  //If any content, set the inner HTML
  if (properties.content) {
    domElement.innerHTML = properties.content;
  }

  //Return to use in other functions
  return domElement;
}




// Google Maps
var markers = [];
var map;
var labelIndex = 0;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: 51.9314, lng: 4.5137 }
  });

}

function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function () {
    markers.push(new google.maps.Marker({
      position: position,
      label: measurelabels[labelIndex++ % measurelabels.length],
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