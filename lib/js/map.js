// google maps AIP key: AIzaSyB3p7qqSBoO8I6HzWiZo0alAO93lOqIcOw
gmap = {
  initMap: function() {
    var DesertRidge = {lat: 33.678, lng: -111.976};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: DesertRidge
    });

    var marker = new google.maps.Marker({
      position: DesertRidge,
      map: map
    });
  },
  makeMarker: function(loc) {
    console.log("make mark: " + loc.locationName);
    // var map = new google.maps.Map(document.getElementById('map'));
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: loc.gpsLat, lng: loc.gpsLong}
    });

    var marker = new google.maps.Marker({
      // position: {lat: loc.gpsLat, lng: loc.gpsLong},
      position: new google.maps.LatLng(loc.gpsLat, loc.gpsLong),
      title: loc.locationName,
      setMap: map
    });

    // To add the marker to the map, call setMap();
    // marker.setMap(map);
  }
};
// var initMap = function() {
//   var DesertRidge = {lat: 33.678, lng: -111.976};
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 16,
//     center: DesertRidge
//   });
//
//   var marker = new google.maps.Marker({
//     position: DesertRidge,
//     map: map
//   });
// }
//
// var makeMarker = function(loc) {
//
//   // var map = new google.maps.Map(document.getElementById('map'));
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 16,
//     // center: {lat: loc.gpsLat, lng: loc.gpsLong}
//   });
//
//   console.log(loc.gpsLat, loc.gpsLong);
//
//   var marker = new google.maps.Marker({
//     // position: {lat: loc.gpsLat, lng: loc.gpsLong},
//     position: new google.maps.LatLng(loc.gpsLat, loc.gpsLong),
//     title: loc.locationName
//     // setMap: map
//   });
//
//   // To add the marker to the map, call setMap();
//   marker.setMap(map);
// };
