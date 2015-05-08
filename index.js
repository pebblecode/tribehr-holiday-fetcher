var moment = require('moment');
var _ = require('lodash');
var CronJob = require('cron').CronJob;
var config = require('./config/config.json');

var TribeFetcher = require('./lib/tribe-fetcher.js')(config);
var EventParser = require('./lib/event-parser.js')(config);
var APIClient = require('./lib/api-client.js')(config);

//var job = new CronJob({
//
//  /*
//   * Runs every weekday (Monday through Friday)
//   * at 07:00:00 AM and 13:00:00 PM. It does not run on Saturday
//   * or Sunday.
//   */
//  cronTime: '00 00 7,13 * * 1-5',
//  onTick: function () {
//    console.log('running');
//
//    TribeFetcher.getApprovedRequest(function(error, data) {
//      if (error) {
//        console.log(error);
//        this.stop();
//        return process.exit(1);
//      }
//
//      var events = EventParser(Date.now(), data);
//
//      _.each(events, function(event) {
//        APIClient.post(event);
//      });
//
//      console.log(events);
//
//    }.bind(this));
//  },
//  startNow: true,
//  timeZone: 'Europe/London'
//});
//
//job.start();


//TribeFetcher.getApprovedRequest(function(error, data) {
//
//  if (error) {
//    console.log(error);
//    this.stop();
//    return process.exit(1);
//  }

  var data = require('./tests/data/approved-leave-requests.json');

  var events = EventParser('2015-02-23', data);

  _.each(events, function(event) {
    APIClient.post(event);
  });

  //console.log(events);

//}.bind(this));
