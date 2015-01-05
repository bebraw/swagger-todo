'use strict';
var swaggerify = require('./swaggerify');


module.exports = swaggerify('Invoices', {
    get: function(req, res) {
        res.json({id: 1});
    },
    post: function(req, res) {
        res.json({id: 1});
    },
    put: function(req, res) {
        res.json({id: 1});
    }
});
