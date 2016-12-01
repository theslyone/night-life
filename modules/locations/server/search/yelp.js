'use strict';

var Yelp = require('yelp');

//TODO: move secret keys to process.env
var yelp = new Yelp({
  consumer_key: 'FAqKyrmiGKh_WAsL7S30hQ',
  consumer_secret: 'dFvM_fy_7PYRn47qzyZ6V8d9czI',
  token: 'AaFuV9DaznYKIbkYhag5lA4zbg9gudY-',
  token_secret: 'pVAYWSCqWIyHdXWeHhUe04F6ocQ',

  /*
  consumer_key: process.env.YELP_COSUMER_KEY,
  consumer_secret: process.env.YELP_COSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TEKEN_SECRET,
  */
});

var YELP_ACCESS_TOKEN_URL = 'https://api.yelp.com/oauth2/token';

exports.search = function(location, callback) {
  yelp.search({ term: 'restaurant, bar', location: location })
  .then(function (data) {
    callback(null, data.businesses);
  })
  .catch(function (err) {
    callback(err);
  });
};

exports.business = function(business, callback) {
  yelp.business(business)
  .then(function (data) {
    callback(null, data);
  })
  .catch(function (err) {
    callback(err);
  });
};
