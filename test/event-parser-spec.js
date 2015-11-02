'use strict';
var EventParser = require('./../lib/event-parser.js')({});
var data = require('./data/approved-leave-requests.json');
var moment = require('moment');

var expect = require('chai').expect;

describe('EventParser ', function() {
  it('should parse to expected structure', function() {

    var events = EventParser(moment('2015-02-23'), data);

    expect(events).to.deep.equal([
      { email: 'joseph@pebblecode.com', status: 'Holiday' },
      { email: 'cheng@pebblecode.com', status: 'Holiday' },
      { email: 'mark@pebblecode.com', status: 'Sick' }
    ]);
  });
});

