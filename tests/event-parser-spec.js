'use strict';
var EventParser = require('./../lib/event-parser.js')({});
var data = require('./data/approved-leave-requests.json');
var moment = require('moment');

var events = EventParser(moment('2015-02-23'), data);
