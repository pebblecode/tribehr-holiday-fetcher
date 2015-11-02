'use strict';
var moment = require('moment');

module.exports = function(config) {

  return function(dateToCheck, data) {

    if (!dateToCheck._isAMomentObject) {
      dateToCheck = moment(dateToCheck);
    }

    var filteredEvents = data.filter(function(event) {

      if (event.date_start === event.date_end) {
        return dateToCheck.isSame(event.date_start);
      }

      return dateToCheck.isBetween(event.date_start, event.date_end);
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
