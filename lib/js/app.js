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
  this.mapMarkers = ko.observableArray([]);

  var DesertRidge = {lat: 33.676613, lng: -111.973716};

  var map = gmap.getMap(DesertRidge);

  gmap.makeMarker({locationName: ko.observable('Desert Ridge'),
                   gpsLat: ko.observable(33.676613),
                   gpsLong: ko.observable(-111.973716),
                   info: '<h3>Desert Ridge</h3>'}, map);

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


  pointList().forEach(function(loc) {
    gmap.makeMarker(loc, map);
    yelp.getYelpInfo(loc);
  });


  // console.log(filterPoints());

};

ko.applyBindings(viewModel);
