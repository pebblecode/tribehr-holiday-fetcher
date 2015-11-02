'use strict';

var http = require('http');
var url = require('url');
var qs = require('qs');

module.exports = function(config) {

  var TribeFetcher = require('./tribe-fetcher.js')(config);
  var EventParser = require('./event-parser.js')(config);
  var APIClient = require('./api-client.js')(config);

  var server = http.createServer(function(request, response) {
    if (request.url.indexOf('trigger') !== -1) {

      var parsedUrl = url.parse(request.url);
      var query;
      if (parsedUrl.query) {
        query = qs.parse(parsedUrl.query);
      }

      TribeFetcher.getApprovedRequest(function(error, data) {
        if (error) {
          response.writeHead(200, {'content-type': 'text/html, level=1'});
          return response.end(error);
        }

        var events = EventParser(query.date || Date.now(), data);

        events.forEach(function(event) {
          APIClient.post(event);
        });

        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(events));

      }.bind(this));
    } else {
      response.writeHead(404, {'content-type': 'text/html, level=1'});
      response.end('404 Not Found');
    }
  });

  server.listen(process.env.port || 3001);
};
