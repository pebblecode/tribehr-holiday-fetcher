'use strict';
var EventParser = require('./../lib/event-parser.js')({});
var data = require('./data/mock-leave-requests.json');
var moment = require('moment');

var expect = require('chai').expect;

describe('EventParser ', function() {

  it('should parse to expected structure for 2015-04-30', function() {

    var events = EventParser(moment('2015-04-30'), data);

    expect(events).to.deep.equal([
      { email: 'brian@pebblecode.com', status: 'Sick' },
      { email: 'stewie@pebblecode.com', status: 'Holiday' },
      { email: 'chris@pebblecode.com', status: 'Sick' }
    ]);
  });

  it('should parse to expected structure for 2015-11-12', function() {

    var events = EventParser(moment('2015-11-12'), data);

    expect(events).to.deep.equal([
      { email: 'jim@pebblecode.com', status: 'Holiday' },
      { email: 'brian@pebblecode.com', status: 'Holiday' }
    ]);
  });

  it('should parse to expected structure for 2015-11-19', function() {

    var events = EventParser(moment('2015-11-19'), data);

    expect(events).to.deep.equal([
      { email: 'brian@pebblecode.com', status: 'Holiday' }
    ]);
  });

  it('should parse to expected structure for 2015-11-20', function() {

    var events = EventParser(moment('2015-11-19'), data);

    expect(events).to.deep.equal([
      { email: 'brian@pebblecode.com', status: 'Holiday' }
    ]);
  });

  it('should not throw exception on empty data', function() {

    var events = EventParser(moment('2015-02-23'), []);

    expect(events).to.deep.equal([]);
  });
});

