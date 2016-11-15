// google maps AIP key: AIzaSyB3p7qqSBoO8I6HzWiZo0alAO93lOqIcOw
gmap = {
  getMap: function(center) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:16,
      center: center
    });
    return map;
  },
  makeMarker: function(loc, map, info) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(loc.gpsLat, loc.gpsLong),
      title: loc.locationName,
      map: map
    });

    var infoWindow = new google.maps.InfoWindow({
      content: loc.locationName + ' ' + info
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  },
  getYelpInfo: function(loc) {
    var apiUrl = "https://api.yelp.com/v2/search/";

    secret_key = "xPYlGJZzjU0k1N0-Dm7Nq6rjCsk";
    secret_token = "mOQp_pGaEx5BGp62FE4AnuKHqpc";
    parameters = {
      oauth_consumer_key: "y29eY1XNH9dybIdqOCTNTg",
      oauth_token: "vIRjaetn-_T8uv8EC1266KRyrYzZHS7W",
      oauth_nonce: Math.floor(Math.random() * 1e12).toString(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: "HMAC-SHA1",
      oauth_version: "1.0",
      callback: 'cb',
      location: "85050",
      cll: loc.gpsLat + ',' + loc.gpsLong,
      term: loc.locationName,
      limit: 10
    }

    var signature = oauthSignature.generate('GET', apiUrl, parameters, secret_key, secret_token);
    console.log(signature);
    parameters.oauth_signature = signature;

    var yelpRes = $.ajax({
      url: apiUrl,
      data: parameters,
      cache: true,
      dataType: 'jsonp'
    }).done( function(response) {
      // console.log(response.businesses);
      // response.businesses.forEach( function(d) {
      //   console.log('---');
      //   console.log(d.id);
      //   console.log(d.name);
      //   console.log(d.location.address[0]+', '+d.location.city+', '+d.location.state_code);
      //   console.log('---');
      // });
      $('#yelp-result').append('<p>' + response.businesses[0].name + '</p>');
      $('#yelp-result').append('<p>'+response.businesses[0].location.address[0]+', '+response.businesses[0].location.city+', '+response.businesses[0].location.state_code+'</p>');
      // $('#yelp-result').html(response.businesses[0].name);
      console.log('<p>' + response.businesses[0].name + '</p><p>'+response.businesses[0].location.address[0]+', '+response.businesses[0].location.city+', '+response.businesses[0].location.state_code+'</p>');
      return '<p>' + response.businesses[0].name + '</p><p>'+response.businesses[0].location.address[0]+', '+response.businesses[0].location.city+', '+response.businesses[0].location.state_code+'</p>';
    }).fail( function(e) {
      $('#yelp-result').html('<h1>Failed</h1>');
    });
    // console.log(yelpRes);
  }
};
