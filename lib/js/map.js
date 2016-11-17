// google maps AIP key: AIzaSyB3p7qqSBoO8I6HzWiZo0alAO93lOqIcOw
gmap = {
  getMap: function(center) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:16,
      center: center
    });
    return map;
  },
  makeMarker: function(loc, map) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(loc.gpsLat, loc.gpsLong),
      title: loc.locationName,
      map: map
    });

    marker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content: loc.locationName + ' ' + loc.info
      });
      infoWindow.open(map, marker);
    });
  }
};
