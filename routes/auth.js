'use strict';
var express = require('express');
var jwt = require('jsonwebtoken');

var secret = require('../config').jwtSecret;


module.exports = function() {
    return function() {
        // http://stackoverflow.com/a/20804905/228885
        var router = express.Router();

        router.post('/authenticate', function(req, res) {
            // TODO: validate req.body.username and req.body.password
            //var body = req.body;
            // if not ok, give 401

            // TODO: this should go to database
            var profile = {
                first_name: 'John',
                last_name: 'Foo',
                email: 'foo@bar.com',
                id: 123
            };

            var token = jwt.sign(profile, secret, {
                expiresInMinutes: 60*5
            });

            res.json({
                token: token
            });
        });

        return router;
    };
};
