// google maps AIP key: AIzaSyB3p7qqSBoO8I6HzWiZo0alAO93lOqIcOw
gmap = {
  getMap: function(center) {
    // Create the map instance
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:14,
      center: center,
      mapTypeId: 'satellite'
    });

    return map;
  },
  removeMarkers: function() {
    // used to clear the markers on the map to allow resetting as the list is filtered
    mapMarkers().forEach(function(d) {
      d.setMap(null);
    })
  },
  showInfo: function(loc) {
    // Sets the infowindow and controls the animation for them.
    if (loc.infoShown) {
      loc.marker.setAnimation(google.maps.Animation.BOUNCE);
    } else {
      var infoWindow = new google.maps.InfoWindow({
        content: loc.info
      });
      google.maps.event.addListener(infoWindow, 'closeclick', function() {
        loc.infoShown = false;
      })
      loc.infoShown = true;
      infoWindow.open(map, loc.marker);
    }
    loc.marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function() {
      loc.marker.setAnimation(null);
    }, 1450);
  }
};
