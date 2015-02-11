'use strict';
var swaggerify = require('swaggerify').definitions;

module.exports = swaggerify(require('require-dir')('.', {recurse: true}));
