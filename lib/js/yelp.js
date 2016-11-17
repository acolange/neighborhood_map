yelp = {
  getYelpInfo: function(loc) {
    var apiUrl = "https://api.yelp.com/v2/search/" + loc.locationId;

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
    };

    var signature = oauthSignature.generate('GET', apiUrl, parameters, secret_key, secret_token);
    // console.log(signature);
    parameters.oauth_signature = signature;

    $.ajax({
      url: apiUrl,
      data: parameters,
      cache: true,
      dataType: 'jsonp'
    }).done( function(response) {
      // console.log(response.businesses[0]);
      d = response.businesses[0];
      console.log(d);
      loc.info = 'Reviews: ' + response.businesses[0].review_count;
      loc.info += '<img src="' + d.image_url + '" alt="">';
    }).fail( function(e) {
      $('#yelp-result').html('<h1>Failed</h1>');
    });

  }
}
