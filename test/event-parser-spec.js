'use strict';
var EventParser = require('./../lib/event-parser.js')({});
var data = require('./data/approved-leave-requests.json');
var moment = require('moment');

var expect = require('chai').expect;

describe('EventParser ', function() {
  it('should parse to expected structure for 2015-02-23', function() {

    var events = EventParser(moment('2015-02-23'), data);

    expect(events).to.deep.equal([
      { email: 'joseph@pebblecode.com', status: 'Holiday' },
      { email: 'cheng@pebblecode.com', status: 'Holiday' },
      { email: 'mark@pebblecode.com', status: 'Sick' }
    ]);
  });

  it('should parse to expected structure for 2015-04-30', function() {

    var events = EventParser(moment('2015-04-30'), data);

    expect(events).to.deep.equal([
      { email: 'ian.black@pebblecode.com', status: 'Holiday' },
      { email: 'vincent@pebblecode.com', status: 'Holiday' },
      { email: 'simon.dickson@pebblecode.com', status: 'Sick' }
    ]);
  });

  it('should not throw exception on empty data', function() {

    var events = EventParser(moment('2015-02-23'), []);

    expect(events).to.deep.equal([]);
  });
});

