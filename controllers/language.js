'use strict';
var swaggerify = require('./swaggerify');
var languageCodes = convertToArray(require('../spec/definitions/language'));


module.exports = swaggerify('language', {
    get: function(req, res) {
        res.json(languageCodes);
    }
});

function convertToArray(spec) {
    return spec.properties.code.enum.map(function(v) {
        return {
            code: v
        };
    });
}
