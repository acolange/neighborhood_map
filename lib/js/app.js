(function () {

  var Point = function(data) {
    this.locationName = ko.observable(data.locationName),
    this.gpsLat = ko.observable(data.gpsLat),
    this.gpsLong = ko.observable(data.gpsLong)
    // this.latLng = ko.observable(data.latLng)
  };

  var viewModel = function() {
    var self = this;

    // gmap.initMap();

    this.pointList = ko.observableArray([]);

    initLocs.forEach(function(loc) {
      self.pointList.push(new Point(loc));
      console.log(loc);
      gmap.makeMarker(loc);
    });

    var initMap = function() {
      var DesertRidge = {lat: 33.678, lng: -111.976};

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: DesertRidge
      });

      var marker = new google.maps.Marker({
        position: DesertRidge,
        map: map
      });
    }

    var makeMarker = function(loc) {

      // var map = new google.maps.Map(document.getElementById('map'));
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        // center: {lat: loc.gpsLat, lng: loc.gpsLong}
      });

      console.log(loc.gpsLat, loc.gpsLong);

      var marker = new google.maps.Marker({
        // position: {lat: loc.gpsLat, lng: loc.gpsLong},
        position: new google.maps.LatLng(loc.gpsLat, loc.gpsLong),
        title: loc.locationName
        // setMap: map
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
    };


  };

  ko.applyBindings(viewModel);
}());
