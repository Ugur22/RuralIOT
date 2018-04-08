
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBnOws7IHhgRU_RxbG7yN8xygp0DPRsXy0",
  authDomain: "ruralit-c379a.firebaseapp.com",
  databaseURL: "https://ruralit-c379a.firebaseio.com",
  projectId: "ruralit-c379a",
  storageBucket: "",
  messagingSenderId: "438134732513"
};
firebase.initializeApp(config);

var measurementsRef = firebase.database().ref('measurements');
var measurelabels = [];
measurementsRef.on('value', getData);

function getData(data) {
  // measureList = document.getElementById("measureList");
  // measureList.innerHTML = '';
  let measurements = data.val();
  var geoData = [];
  var keys = Object.keys(measurements);
  for (let i = 0; i < keys.length; i++) {
    var k = keys[i];
    geoData.push(measurements[k].geo);
    var phValue = measurements[k].phValue;
    measurelabels.push(measurements[k].phValue.toString());
    var latitude = measurements[k].geo.lat;
    var longitude = measurements[k].geo.lng;

    // var li = createDomElement({ tagName: 'li', attributes: { class: 'measurelisting' }, content: "PHvalue: " + phValue + ' latitude ' + latitude + ' longitudes ' + longitude });

    // measureList.appendChild(li);

  }
  console.log(measurelabels);

  clearMarkers();
  for (var i = 0; i < geoData.length; i++) {
    addMarkerWithTimeout(geoData[i], i * 200);
  }
}




document.getElementById('measureForm').addEventListener('submit',
  submitForm);

function submitForm(e) {
  e.preventDefault();

  var phValue = getInputVal('phMeterBar');
  var lat = parseFloat(getInputVal('lat'));
  var lng = parseFloat(getInputVal('lng'));
  saveMeasurements(phValue, lat, lng);
  // console.log(phValue);
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

// save measurements
function saveMeasurements(phValue, lat, lng) {

  let waterQuality = "";
  if (phValue > 50) {
    waterQuality = "unhealthy";
  } else {
    waterQuality = "healthy";
  }
  let newMeasurementref = measurementsRef.push();
  newMeasurementref.set({
    phValue: phValue,
    geo: {
      lat: lat,
      lng: lng
    },
    waterQuality: waterQuality

  });
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
      map: map,
      label: measurelabels[labelIndex++ % measurelabels.length],
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