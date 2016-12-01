'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  yelp = require(path.resolve('./modules/locations/server/search/yelp')),
  moment = require('moment');


exports.search = function(req, res){
  //console.log(req.query.query);
  yelp.search(req.query.query, function(err, data) {
    if(err){
      res.jsonp([]);
    }
    else{
      res.jsonp(data);
    }
  });
};

exports.details = function(req, res){
  var location = req.location ? req.location : {};
  var today = moment().startOf('day');
  var tomorrow = moment(today).add(1, 'days');

  Location.count({ name: location.name, created: { $gte: today.toDate(), $lt: tomorrow.toDate() } }, function(err, count) {
    if(err){
      console.log(err);
      location.goingCount = 0;
    }
    else{
      location.goingCount = count;
    }

    if(location && req.user){
      Location.findOne({ name: location.name, user: req.user._id, created: { $gte: today.toDate(), $lt: tomorrow.toDate() } })
      .populate('user', 'displayName')
      .exec(function (err, found) {
        if(err){
          console.log(err);
        }
        if (found) {
          location.isGoing = true;
          location._id = found._id;
        }
        res.jsonp(location);
      });
    }
    else{
      res.jsonp(location);
    }
  });
};

exports.create = function(req, res) {
  var location = new Location(req.body);
  location.user = req.user;
  //console.log("saving " + location);
  var today = moment().startOf('day');
  var tomorrow = moment(today).add(1, 'days');

  location.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      Location.count({ name: location.name, created: { $gte: today.toDate(), $lt: tomorrow.toDate() } }, function(err, count) {
        location = req.body;
        if(err){
          console.log(err);
          location.goingCount = 0;
        }
        else{
          location.goingCount = count;
        }
        location.isGoing = true;
        res.jsonp(location);
      });
    }
  });
};

exports.update = function(req, res) {
  var location = req.location;

  location = _.extend(location, req.body);

  location.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(location);
    }
  });
};

exports.delete = function(req, res) {
  var location = req.location;
  //console.log("deleting: " + location);
  var today = moment().startOf('day');
  var tomorrow = moment(today).add(1, 'days');

  Location.find({ name: location.name, user: req.user._id, created: { $gte: today.toDate(), $lt: tomorrow.toDate() } })
  .remove().exec(function(err, ok) {
    Location.count({ name: location.name, created: { $gte: today.toDate(), $lt: tomorrow.toDate() } }, function(err, count) {
      if(err){
        console.log(err);
        location.goingCount = 0;
      }
      else{
        location.goingCount = count;
      }
      location.isGoing = false;
      res.jsonp(location);
    });
  });
};

/**
 * Location middleware
 */
exports.locationByID = function(req, res, next, id) {
  console.log("getting: " + id);
  yelp.business(id, function(err, data) {
    if(err){
      return next(err);
    }
    else{
      req.location = data;
      console.log("location found: " + req.location.name);
    }
    next();
  });
};
