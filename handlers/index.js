'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = swaggerify(require('require-dir')());

function swaggerify(modules) {
    var ret = {};

    fp.each(function(resource, operations) {
        fp.each(function(operation, fn) {
            ret[operation + upperCaseFirst(resource)] = fn;
        }, operations);
    }, modules);

    return ret;
}
