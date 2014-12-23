'use strict';

var fp = require('annofp');

var spec = require('./spec.json');


module.exports = attachOperationIds(spec);

function attachOperationIds(spec) {
    var ret = fp.deepcopy(spec);

    ret.paths = fp.map(function(k, v) {
        return fp.map(function(k, v) {
            v.operationId = k + v.summary;

            return v;
        }, v);
    }, ret.paths);

    return ret;
}
