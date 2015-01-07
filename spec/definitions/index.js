'use strict';
var changeCase = require('change-case');
var upperCaseFirst = changeCase.upperCaseFirst;
var sentenceCase = changeCase.sentenceCase;

var fp = require('annofp');


module.exports = swaggerify(require('require-dir')('.', {recurse: true}));


function swaggerify(modules) {
    var ret = {};

    fp.each(function(module, definition) {
        var moduleName = upperCaseFirst(module);

        if(definition.index) {
            fp.each(function(name, def) {
                var key = name === 'index'? moduleName: moduleName + upperCaseFirst(name);

                if(def.properties) {
                    def.properties = generateDescriptions(key, def.properties);
                }

                ret[key] = def;
            }, definition);
        }
        else {
            ret[moduleName] = definition;
        }
    }, modules);

    return ret;
}

function generateDescriptions(moduleName, properties) {
    if(!properties) {
        return properties;
    }

    return fp.map(function(name, property) {
        if(!property.description) {
            property.description = upperCaseFirst(sentenceCase(name)) + ' of the ' +
                sentenceCase(moduleName);
        }

        return property;
    }, properties);
}
