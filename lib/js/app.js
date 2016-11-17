var Point = function(data) {
  this.locationName = ko.observable(data.locationName),
  this.locationId = ko.observable(data.locationId),
  this.info = ko.observable(data.info),
  this.gpsLat = ko.observable(data.gpsLat),
  this.gpsLong = ko.observable(data.gpsLong)
};

var viewModel = function() {
  var self = this;

  this.pointList = ko.observableArray([]);
  // this.yelpResult = ko.observableArray([]);

  var DesertRidge = {lat: 33.676613, lng: -111.973716};

  var map = gmap.getMap(DesertRidge);

  gmap.makeMarker({locationName: 'Desert Ridge',
                   gpsLat: 33.676613,
                   gpsLong: -111.973716}, map);


  initLocs.forEach( function(loc) {
    self.pointList.push(new Point(loc));
    gmap.makeMarker(loc, map);
    yelp.getYelpInfo(loc);
  });

  initLocs.forEach( function(loc) {
    // self.yelpResult.push(loc);
  });

};

ko.applyBindings(viewModel);
