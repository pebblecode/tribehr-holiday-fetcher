'use strict';
var Request = require('request');
var Q = require('q');

module.exports = function(config) {

  return {
    put: function(event) {

      return Q.Promise(function(resolve, reject) {

        var url = (process.env.API_URL || config.api.url) + '/workers';

        Request.put(url, {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }, function(error, response, body) {
          if (error) {
            return reject(error);
          }

          if (response.statusCode !== 200) {
            console.log('Response:', body);
            reject('Not 200 OK, response for email: ' + event.email + ', status: ' + event.status);
          } else {
            console.log('Updated Status for email: ' + event.email + ', status: ' + event.status);
            resolve();
          }
        });
      });

    }
  };
};
