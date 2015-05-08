'use strict';
var _ = require('lodash');
var moment = require('moment');

module.exports = function(config) {

  return function(dateToCheck, data) {

    if (!dateToCheck._isAMomentObject) {
      dateToCheck = moment(dateToCheck);
    }

    var filteredEvents = _.map(_.filter(data, function(event) {

      if (event.date_start === event.date_end) {
        return dateToCheck.isSame(event.date_start);
      }

      return dateToCheck.isBetween(event.date_start, event.date_end);
    }), function(event) {
      return {
        email: event.user.email,
        statusDetails: (event.leave_type.name.toLowerCase() === 'sick' ? 'Sick' : 'Holiday') + ' from TribeHR'
      }
    });

    return filteredEvents;
  }
};
