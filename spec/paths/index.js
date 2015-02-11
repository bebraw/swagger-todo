'use strict';
var swaggerify = require('swaggerify').paths;


module.exports = swaggerify(require('require-dir')('.', {
    recurse: true
}));
