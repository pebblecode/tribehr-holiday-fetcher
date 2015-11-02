'use strict';
var Request = require('request');

module.exports = function(config) {

  return {
    post: function(event) {
      var url = (process.env.API_URL || config.api.url) + '/workers';

      Request.put(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }, function(error, response, body) {
        if (error) {
          console.log(error);
          return;
        }

        if (response.statusCode !== 200) {
          console.log('Not 200 OK, response for email: ' + event.email + ', status: ' + event.status);
          console.log('Response:', body);
        } else {
          console.log('Updated Status for email: ' + event.email + ', status: ' + event.status);
        }
      });
    }
  };
};
