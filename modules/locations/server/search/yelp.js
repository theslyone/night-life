'use strict';

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
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
