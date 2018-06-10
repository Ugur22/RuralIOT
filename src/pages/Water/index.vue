<template>
     <div id="map">

  </div>
</template>

<script>
var labelIndex = 0;
var imageUrl;
var imageFontSize;
var labelOriginValue;
var locations = [];
var markers = [];
var infowindow;
var turbidity;
import '../../js/libraries/markerclusterer';
import {db} from '../../js/database/firebase';

export default {
  name: "water",
  data() {
    return {};
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap: function() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.91194, lng: 4.48538 },
        zoom: 8,
        gestureHandling: "greedy",
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      map.data.setMap(null);

      //Create a node at firebase location to add locations as child keys
      var locationsRef = db.ref("measurements");
      var bounds = new google.maps.LatLngBounds();
      locationsRef.on("child_added", function(snapshot) {
        infowindow = new google.maps.InfoWindow();
        var data = snapshot.val();
        turbidity = data.payload_fields.turbidity.toFixed(2).toString();
        var dateMeasurement = data.metadata.time;
        var latLng = new google.maps.LatLng(
          data.payload_fields.location.lat,
          data.payload_fields.location.lng
        );

        if (turbidity < 4) {
          imageUrl = "http://worms2d.info/images/9/9a/Icon_Worm_128x128.png";
          labelOriginValue = new google.maps.Point(50, 33);
          imageFontSize = "18px";
        } else if (turbidity > 4) {
          imageUrl =
            "http://www.clker.com/cliparts/R/y/b/e/w/9/blue-rain-drop-hi.png";
          labelOriginValue = new google.maps.Point(20, 20);
          imageFontSize = "15px";
        }

        var markerIcon = {
          url: imageUrl,
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          labelOrigin: labelOriginValue
        };

        var marker = new google.maps.Marker({
          position: latLng,
          title:
            "This place has been measured on: " +
            dateMeasurement.slice(0, 10) +
            " at: " +
            dateMeasurement.slice(12, 16),
          label: {
            text: turbidity,
            color: "#000",
            fontSize: imageFontSize,
            fontWeight: "900"
          },
          icon: markerIcon,
          map: map
        });

        cluster.setCalculator(function(markers, numStyles) {
          var val = 0,
            index = 0,
            dv;

          for (let m = 0; m < markers.length; m++) {
            val += Number(markers[m].label.text) / markers.length;
          }

          dv = val;
          while (dv !== 0) {
            dv = parseInt(dv / 10, 10);
            index++;
          }

          index = Math.min(index, numStyles);
          return {
            text: val.toFixed(2),
            index: index
          };
        });

        cluster.addMarker(marker);

        bounds.extend(marker.getPosition());
        google.maps.event.addListener(
          marker,
          "click",
          (function(marker) {
            return function(e) {
              infowindow.setContent(
                "This place has been measured on: " +
                  dateMeasurement.slice(0, 10) +
                  " at: " +
                  dateMeasurement.slice(12, 16)
              );
              infowindow.open(map, this);
            };
          })(marker)
        );
        markers.push(marker);
        map.fitBounds(bounds);
      });

      var cluster = new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#map {
  width: 100%;
  height: 500px;
}
</style>
