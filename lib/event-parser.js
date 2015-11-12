'use strict';
var moment = require('moment');

module.exports = function(config) {

  return function(date, data) {

    date = moment(date.format('YYYY-MM-DD')); // remove time to ensure date compare

    var filteredEvents = data.filter(function(event) {

      if (date.isSame(event.date_start) || date.isSame(event.date_end)) {
        return true;
      }

      return date.isBetween(event.date_start, event.date_end);
    })
    .map(function(event) {
      return {
        email: event.user.email,
        status: (event.leave_type.name.toLowerCase() === 'sick' ? 'Sick' : 'Holiday')
      };
    });

    return filteredEvents;
  };
};
