var Request = require('request');

module.exports = function(config) {
  return {
    getApprovedRequest: function(done) {
      Request.get('https://' + config.tribehr.url + '/leave_requests.json?status=approved', {
        auth: {
          user: config.tribehr.user,
          pass: config.tribehr.pass
        },
        headers: {
          'X-API-Version': '2.0.0'
        },
        json: true
      }, function (error, requestResult, body) {
        if (error) {
          return done(error);
        }

        return done(null, body);
      });
    }
  }
};


