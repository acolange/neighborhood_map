var Point = function(data) {
  this.locationName = ko.observable(data.locationName),
  this.locationId = ko.observable(data.locationId),
  this.info = ko.observable(data.info),
  this.gpsLat = ko.observable(data.gpsLat),
  this.gpsLong = ko.observable(data.gpsLong),
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.gpsLat(), this.gpsLong()),
    title: this.locationName(),
    animation: google.maps.Animation.DROP
  })
};

var viewModel = function() {
  var self = this;

  this.pointList = ko.observableArray([]);
  this.mapMarkers = ko.observableArray([]);

  var DesertRidge = {lat: 33.676613, lng: -111.973716};

  var map = gmap.getMap(DesertRidge);

  initLocs.forEach( function(loc) {
    self.pointList.push(new Point(loc));
  });

  this.locSearch = ko.observable('');

  this.filterPoints = ko.computed( function() {
    var search = self.locSearch().toLowerCase();
    gmap.removeMarkers();
    ko.utils.arrayFilter(self.mapMarkers(), function(m) {
      if (m.title.toLowerCase().indexOf(search) >= 0) {
        gmap.addMarker(m, map);
      };
    });
    return ko.utils.arrayFilter(self.pointList(), function(location) {
      return location.locationName().toLowerCase().indexOf(search) >= 0;
    });
  });

  var bounds = new google.maps.LatLngBounds();

  pointList().forEach(function(loc) {
    loc.marker.setMap(map);
    yelp.getYelpInfo(loc);

    mapMarkers().push(loc.marker);

    loc.marker.addListener('click', function() {
      gmap.showInfo(loc);
    });

    bounds.extend(loc.marker.getPosition());

    map.fitBounds(bounds);
  });
};

ko.applyBindings(viewModel);
