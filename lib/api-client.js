'use strict';
var Request = require('request');

module.exports = function(config) {

  return {
    post: function(event) {
      var postStatus = event.statusDetails.toLowerCase().indexOf('sick') !== -1 ? 'Sick' : 'Holiday';
      var url = (process.env.API_URL || config.api.url) + '/workers/';

      Request.post(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        }
      });
    }
  };
};
