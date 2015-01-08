'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = function swaggerify(resource, operations) {
    var ret = {};

    fp.each(function(operation, fn) {
        ret[operation + upperCaseFirst(resource)] = fn;
    }, operations);

    return ret;
};
