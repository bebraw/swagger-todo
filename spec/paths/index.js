'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = swaggerify(require('require-dir')());

function swaggerify(modules) {
    var ret = {};

    fp.each(function(name, paths) {
        ret['/' + name] = fp.map(function(path, definition) {
            definition.operationId = path + upperCaseFirst(name);

            return definition;
        }, paths);
    }, modules);

    return ret;
}
