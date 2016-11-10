var Point = function(data) {
  this.locationName = ko.observable(data.locationName),
  this.gpsLat = ko.observable(data.gpsLat),
  this.gpsLong = ko.observable(data.gpsLong)
};

var viewModel = function() {
  var self = this;

  this.pointList = ko.observableArray([]);

  var DesertRidge = {lat: 33.678, lng: -111.976};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: DesertRidge
  });

  var marker = new google.maps.Marker({
    position: DesertRidge,
    map: map
  });

  this.makeMarker = function(loc) {
    var marker = new google.maps.Marker({
      position: {lat: loc.gpsLat, lng: loc.gpsLong},
      title: loc.locationName,
      map: map
    });
  };

  initLocs.forEach( function(loc) {
    self.pointList.push(new Point(loc));
    self.makeMarker(loc);
  });
};

ko.applyBindings(viewModel);
