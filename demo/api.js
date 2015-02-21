'use strict';
var Promise = require('es6-promise').Promise;
var axios = require('axios');
var swaggerClient = require('swagger2client');


module.exports = function(url) {
    return new Promise(function(resolve, reject) {
        axios.all([
            axios.get(url + '/v1/schema'),
            axios.post(url + '/authenticate'),
        ]).then(axios.spread(function(schema, token) {
            resolve(swaggerClient({
                url: url,
                schema: schema.data,
                headers: {
                    'Authorization': 'Bearer ' + token.data.token
                }
            }));
        })).catch(function(res) {
            reject(res);
        });
    });
};
