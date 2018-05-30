var labelIndex = 0;
var imageUrl;
var imageFontSize;
var labelOriginValue;
var locations = [];

function initialize() {
  var infowindow = new google.maps.InfoWindow();
  var map = new google.maps.Map(
    document.getElementById("map"), {
      center: { lat: 51.91194, lng: 4.48538 },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxvjKhkhrrvHQ1YH4Ob9I80SZ-kXrqI-s",
    authDomain: "ruralit-1620a.firebaseapp.com",
    databaseURL: "https://ruralit-1620a.firebaseio.com",
    projectId: "ruralit-1620a",
    storageBucket: "ruralit-1620a.appspot.com",
    messagingSenderId: "687154250117"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }


  //Create a node at firebase location to add locations as child keys
  var locationsRef = firebase.database().ref("measurements");
  var bounds = new google.maps.LatLngBounds();
  locationsRef.on('child_added', function (snapshot) {

    var data = snapshot.val();
    var turbidity = data.payload_fields.turbidity.toFixed(2).toString();



    if (turbidity < 4) {
      imageUrl = 'http://worms2d.info/images/9/9a/Icon_Worm_128x128.png';
      labelOriginValue = new google.maps.Point(50, 33)
      imageFontSize = '18px';
    } else if (turbidity > 4) {
      imageUrl = 'http://www.clker.com/cliparts/R/y/b/e/w/9/blue-rain-drop-hi.png';
      labelOriginValue = new google.maps.Point(20, 20)
      imageFontSize = '15px';
    }

    var markerIcon = {
      url: imageUrl,
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      labelOrigin: labelOriginValue
    };

    locations.push({
      lat: data.payload_fields.location.lat,
      lng: data.payload_fields.location.lng
    });



    var marker = new google.maps.Marker({
      position: {
        lat: data.payload_fields.location.lat,
        lng: data.payload_fields.location.lng
      },
      label: {
        text: turbidity,
        color: "#000",
        fontSize: imageFontSize,
        fontWeight: "900"
      },
      icon: markerIcon,
      map: map
    });



    bounds.extend(marker.getPosition());
    marker.addListener('click', (function (data) {
      return function (e) {
        infowindow.setContent(turbidity);
        infowindow.open(map, this);
      }
    }(data)));
    map.fitBounds(bounds);
  });

}
google.maps.event.addDomListener(window, "load", initialize);
