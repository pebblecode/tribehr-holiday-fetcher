'use strict';
var api = require('./lib/api-client')(require('./config/config.json'));

api.put({email:'mike@pebblecode.com', status:'Holiday'});
