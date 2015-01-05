'use strict';
var upperCaseFirst = require('change-case').upperCaseFirst;
var fp = require('annofp');


module.exports = swaggerify(require('require-dir')('.', {recurse: true}));


function swaggerify(modules) {
    var ret = {};

    fp.each(function(module, definition) {
        var moduleName = upperCaseFirst(module);

        if(definition.index) {
            fp.each(function(name, def) {
                if(name === 'index') {
                    ret[moduleName] = def;
                }
                else {
                    ret[moduleName + upperCaseFirst(name)] = def;
                }
            }, definition);
        }
        else {
            ret[moduleName] = definition;
        }
    }, modules);

    return ret;
}
