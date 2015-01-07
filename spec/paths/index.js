'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = swaggerify(require('require-dir')());

function swaggerify(modules) {
    var ret = {};

    fp.each(function(name, paths) {
        ret['/' + name + 's'] = fp.map(function(path, definition) {
            definition['x-swagger-router-controller'] = name;
            definition.operationId = path + upperCaseFirst(name);
            definition.tags = [name];

            return definition;
        }, paths);
    }, modules);

    return ret;
}
