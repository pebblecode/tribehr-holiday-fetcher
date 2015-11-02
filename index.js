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

require('./lib/trigger-client.js')(config);

console.log('running');

tribe.getApprovedRequest(function(error, data) {
  if (error) {
    console.log(error);
    return process.exit(1);
  }

  var events = eventParser(Date.now(), data);

  events.forEach(function(event) {
    apiClient.post(event);
  });

  console.log('Completed fetch from tribe');

  console.log('Number of Events: ', events.length);
  process.exit(0);
});
