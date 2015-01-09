'use strict';
var jwt = require('jsonwebtoken');


// adapted from express-jwt middleware
module.exports = function(secret, req, cb) {
    var authorization = req.headers.authorization;
    var token;

    if(authorization) {
        var parts = req.headers.authorization.split(' ');

        if(parts.length === 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if(/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
            else {
                cb(new Error('Format is Authorization: Bearer [token]'));
            }
        }
    }

    if(token) {
        jwt.verify(token, secret, {}, function(err) {
            if(err) {
                return cb(new Error('Invalid token'));
            }

            cb();
        });
    }
    else {
        cb(new Error('No authorization token was found'));
    }
};
