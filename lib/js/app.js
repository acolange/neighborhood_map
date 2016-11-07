var Point = function(data) {
  this.locationName = ko.observable(data.locationName),
  this.gpsLong = ko.observable(data.gpsLong),
  this.gpsLat = ko.observable(data.gpsLat)
  // this.latLng = ko.observable(data.latLng)
};

var initLocs = [
  {
    locationName: "BJ's Restaurant",
    gpsLat: 33.678,
    gpsLong: -111.975
  },
  {
    locationName: "Sandbar",
    gpsLat: 33.677,
    gpsLong: -111.976
  },
  {
    locationName: "Yard House",
    gpsLat: 33.678,
    gpsLong: -111.970
  }
];

var viewModel = function() {
  var self = this;

  gmap.initMap();

  this.pointList = ko.observableArray([]);

  initLocs.forEach(function(loc) {
    self.pointList.push(new Point(loc));
    console.log(loc);
    makeMarker(loc);
  });

};

ko.applyBindings(viewModel);
