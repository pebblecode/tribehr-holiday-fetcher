var Request = require('request');

module.exports = function(config) {
  return {
    getApprovedRequest: function(done) {
      Request.get('https://' + (process.env.TRIBE_URL || config.tribehr.url) + '/leave_requests.json?status=approved', {
        auth: {
          user: process.env.TRIBE_USER || config.tribehr.user,
          pass: process.env.TRIBE_PASS || config.tribehr.pass
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


