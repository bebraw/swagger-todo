'use strict';
var swaggerify = require('./swaggerify');

var Invoice = require('../models').Invoice;


module.exports = swaggerify('invoice', {
    get: function(req, res) {
        Invoice.findAll().then(function(invoices) {
            res.json(invoices);
        });
    },
    post: function(req, res) {
        var body = req.swagger.params.body.value;

        Invoice.create(body).then(function(invoice) {
            res.json({
                id: invoice.dataValues.id
            });
        });
    },
    put: function(req, res) {
        var body = req.swagger.params.body.value;
        var id = body.id;

        delete body.id;

        Invoice.update(body, {
            where: {
                id: id
            }
        }).then(function(ids) {
            var id = ids[0];

            if(id) {
                res.json({id: id});
            }
            else {
                // TODO: specify this case better
                res.status(403).json({
                    message: 'NOT_FOUND'
                });
            }
        });
    }
});
