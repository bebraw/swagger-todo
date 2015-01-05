'use strict';
var swaggerify = require('./swaggerify');


module.exports = swaggerify('Clients', {
    get: function(req, res) {
        res.json({id: 1});
    },
    post: function(req, res) {
        var body = req.swagger.params.body.value;

        console.log('at post client', body);

        res.json({id: 1});
    },
    put: function(req, res) {
        var body = req.swagger.params.body.value;

        console.log('at put client', body);

        res.json({id: 1});
    }
});
