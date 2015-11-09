'use strict';
var config;
try {
  config = require('./config/config.json');
} catch (e) {
  config = {};
}

var tribe = require('./lib/tribe-fetcher.js')(config);
var eventParser = require('./lib/event-parser.js')(config);
var apiClient = require('./lib/api-client.js')(config);
var Q = require('q');

console.log('running');

tribe.getApprovedRequest(function(error, data) {
  if (error) {
    console.log(error);
    return process.exit(1);
  }

  var events = eventParser(Date.now(), data);

  events.forEach(function(event) {
    apiClient.put(event)
    .then(function(){
      console.log('Completed fetch from tribe');

      console.log('Number of Events: ', events.length);
    })
    .catch(function(err){
      console.log('Error - User In tribe may not be a working from home user', event.email);
      console.log(err);
    });
  });

});
