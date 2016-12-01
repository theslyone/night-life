'use strict';

/**
 * Module dependencies
 */
var locationsPolicy = require('../policies/locations.server.policy'),
  locations = require('../controllers/locations.server.controller');

module.exports = function(app) {
  // Locations Routes
  //app.get('/api/locations/search', locations.search);
  //app.get('/api/locations/:locationId', locations.details);

  app.route('/api/locations').all(locationsPolicy.isAllowed)
    .get(locations.search)
    .post(locations.create);

  app.route('/api/locations/:locationId').all(locationsPolicy.isAllowed)
    .get(locations.details)
    .put(locations.update)
    .delete(locations.delete);

  // Finish by binding the Location middleware
  app.param('locationId', locations.locationByID);
};
