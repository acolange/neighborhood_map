yelp = {
  getYelpInfo: function(loc) {
    // Yelp utilizes Oauth with no officially supported API for javascript
    // so to utilize the API the Oauth Signature package needs to be used to
    // simplify the login process.
    // Since the places for the map are set we use the direct access from the
    // stored location ID's that Yelp uses to identify these locations
    var apiUrl = "https://api.yelp.com/v2/search/" + loc.locationId();

    secret_key = "xPYlGJZzjU0k1N0-Dm7Nq6rjCsk";
    secret_token = "mOQp_pGaEx5BGp62FE4AnuKHqpc";
    parameters = {
      oauth_consumer_key: "y29eY1XNH9dybIdqOCTNTg",
      oauth_token: "vIRjaetn-_T8uv8EC1266KRyrYzZHS7W",
      oauth_nonce: Math.floor(Math.random() * 1e12).toString(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: "HMAC-SHA1",
      oauth_version: "1.0",
      callback: 'yelpcb',
      location: "85050",
      cll: loc.gpsLat() + ',' + loc.gpsLong(),
      term: loc.locationName(),
      limit: 10
    };

    var signature = oauthSignature.generate('GET', apiUrl, parameters,
                                            secret_key, secret_token);

    parameters.oauth_signature = signature;

    $.ajax({
      url: apiUrl,
      data: parameters,
      cache: true,
      dataType: 'jsonp'
    }).done( function(response) {
      d = response.businesses[0];
      // Setting the infowindow contents should be changed to use a knockout template
      // Since we aren't using an extenuous amount of data that will be done later
      loc.info = '<h3>' + response.businesses[0].name + '</h3>';
      loc.info += '<a href="' + d.url + '" target="_blank">Yelp Page</a>';
      loc.info += '<p class="rating">Yelp Rating: <img src="' + d.rating_img_url + '" alt="Yelp Rating"></p>';
    }).fail( function(e) {
      loc.info = '<h3>' + loc.locationName() + '</h3>';
      loc.info += 'Yelp API Unavailable';
    });

  }
}
