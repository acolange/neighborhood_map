var Point = function(data) {
  this.locationName = ko.observable(data.locationName),
  this.locationId = ko.observable(data.locationId),
  this.gpsLat = ko.observable(data.gpsLat),
  this.gpsLong = ko.observable(data.gpsLong)
};

var viewModel = function() {
  var self = this;

  this.pointList = ko.observableArray([]);

  var DesertRidge = {lat: 33.676613, lng: -111.973716};

  var map = gmap.getMap(DesertRidge);

  gmap.makeMarker({locationName: 'Desert Ridge',
                   gpsLat: 33.676613,
                   gpsLong: -111.973716}, map);


  initLocs.forEach( function(loc) {
    self.pointList.push(new Point(loc));
    var info = gmap.getYelpInfo(loc);
    console.log(info);
    gmap.makeMarker(loc, map, info);
  });

 // gmap.getYelpInfo(initLocs[5]);

};

ko.applyBindings(viewModel);
