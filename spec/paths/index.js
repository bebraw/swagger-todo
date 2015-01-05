'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = swaggerify(require('require-dir')());

function swaggerify(modules) {
    var ret = {};

    fp.each(function(name, paths) {
        ret['/' + name] = fp.map(function(path, definition) {
            var upperName = upperCaseFirst(name);

            definition['x-swagger-router-controller'] = upperName;
            definition.operationId = path + upperName;

            return definition;
        }, paths);
    }, modules);

    return ret;
}
