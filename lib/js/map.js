// google maps AIP key: AIzaSyB3p7qqSBoO8I6HzWiZo0alAO93lOqIcOw
gmap = {
  getMap: function(center) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:16,
      center: center,
      mapTypeId: 'satellite'
    });
    map.setTilt(45);
    return map;
  },
  makeMarker: function(loc, map) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(loc.gpsLat(), loc.gpsLong()),
      title: loc.locationName(),
      animation: google.maps.Animation.DROP,
      map: map
    });

    mapMarkers().push(marker);

    marker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content: loc.info
      });
      infoWindow.open(map, marker);

      marker.setAnimation(google.maps.Animation.BOUNCE);
      window.setTimeout(function() {
        marker.setAnimation(null);
      }, 1450);
    });
    return marker;
  },
  removeMarkers: function() {
    mapMarkers().forEach(function(d) {
      d.setMap(null);
    })
  },
  addMarker: function(marker, map) {
    marker.setMap(map);
  },
  showInfo: function(loc) {
    var infoWindow = new google.maps.InfoWindow({
      content: loc.info
    });
    infoWindow.open(map, loc.marker);
    loc.marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function() {
      loc.marker.setAnimation(null);
    }, 1450);
  }
};
