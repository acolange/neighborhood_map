// Define the data model for each point of interest
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
  }),
  this.infoShown = false
};

// Construct the Knockout view model
var viewModel = function() {
  var self = this;

  this.pointList = ko.observableArray([]);
  this.mapMarkers = ko.observableArray([]);

  var DesertRidge = {lat: 33.676613, lng: -111.973716};


  // Used to initiate the locations as Knockout objects.
  initLocs.forEach( function(loc) {
    self.pointList.push(new Point(loc));
  });

  var map = gmap.getMap(DesertRidge);
  // Initialize the search string for the filterable location array
  this.locSearch = ko.observable('');

  // This function filters the locations based on the search box innput
  // It also controls redrawing the markers to correlate with the filtered search results.
  this.filterPoints = ko.computed( function() {
    var search = self.locSearch().toLowerCase();
    gmap.removeMarkers();
    ko.utils.arrayFilter(self.mapMarkers(), function(m) {
      if (m.title.toLowerCase().indexOf(search) >= 0) {
        m.setMap(map);
      };
    });
    return ko.utils.arrayFilter(self.pointList(), function(location) {
      return location.locationName().toLowerCase().indexOf(search) >= 0;
    });
  });

  // Create the list of points and their markers, along with the click events to
  // open the info windows.
  // Use the marker locations to update the boundaries of the map to try to set
  // the zoom level to a good height on both mobile and desktop form factors.
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

function initMap() {
  var map = gmap.getMap({lat: 33.676613, lng: -111.973716});
  ko.applyBindings(viewModel);
};

function mapFail() {
  $('.loadError').show();
  $('.loadError').append('Error loading Google Maps<p>Try again later</p>');
};
