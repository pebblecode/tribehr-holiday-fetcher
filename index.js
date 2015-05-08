var CronJob = require('cron').CronJob;
var config = require('./config/config.json');

var TribeFetcher = require('./lib/tribe-fetcher.js')(config);
var EventParser = require('./lib/event-parser.js')(config);

var job = new CronJob({

  /*
   * Runs every weekday (Monday through Friday)
   * at 07:00:00 AM. It does not run on Saturday
   * or Sunday.
   */
  cronTime: '00 00 07 * * 1-5',
  onTick: function () {

  },
  start: true,
  timeZone: 'Europe/London'
});

job.start();
