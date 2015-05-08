var Request = require('request');

module.exports = function(config) {

  return {
    post: function(event) {

      console.log(event.leave_type.name);

      var postStatus = event.leave_type.name.toLowerCase() === 'sick' ? 'Sick' : 'Holiday';
      var url = config.api.url + '/statuses/' + postStatus;
      console.log(url);

      Request.post(url, {
        json: true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: event.user.email, statusDetails: postStatus + ' from TribeHR'})
      }, function (error, response, body) {
        console.log(error, response.statusCode, body);
      });
    }
  }
};
