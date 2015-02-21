/* global -Promise */
'use strict';
var assert = require('assert');
var url = require('url');

var async = require('async');
var fp = require('annofp');
var is = require('annois');
var axios = require('axios');
var Promise = require('bluebird');
var zip = require('annozip');
var clc = require('cli-color');

var config = require('../config');

config.database.test.logging = fp.noop;

var models = require('../models')(config.database.test);
var server = require('../server');
var swaggerClient = require('swagger2client');

var suites = require('require-dir')();


main();

function main() {
    var port = 1351;
    var root = 'http://localhost:' + port;

    server({
        models: models
    }, function(app) {
        var s = app.listen(port);

        Promise.join(
            getData(url.resolve(root, 'v1/schema')),
            getToken(url.resolve(root, 'authenticate')),
        function(schema, token) {
            var client = swaggerClient({
                url: root,
                schema: schema,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            var testSuites = getTestSuites({
                suites: suites,
                client: client,
                assert: assert
            });

            async.eachSeries(zip(testSuites), function(suite, cb) {
                var suiteName = suite[0];
                var tests = suite[1];

                async.eachSeries(zip(tests), function(test, cb) {
                    var name = suiteName + '.' + test[0];
                    var fn = test[1];

                    Promise.using(models.sequelize.sync({
                        force: true
                    }), fn).then(function() {
                        console.log(clc.green(name + ' ' + 'PASSED'));

                        cb();
                    }).catch(function() {
                        console.error(clc.red(name + ' ' + 'FAILED'));

                        cb();
                    });
                }, cb);
            }, function() {
                s.close();
            });
        }).catch(function(err) {
            console.error(err);

            s.close();
        });
    });
}

function getTestSuites(o) {
    // TODO: assert against possibly missing values (-> annotate)
    var suites = o.suites;
    var client = o.client;
    var assert = o.assert;

    return fp.filter(function(name, value) {
        return value;
    }, fp.map(function(name, suite) {
        if(name.indexOf('test_') === 0 && is.fn(suite)) {
            return suite(assert, client);
        }
    }, suites));
}

function getData(url, o) {
    return new Promise(function(resolve, reject) {
        axios.get(url, o).then(function(res) {
            resolve(res.data);
        }).catch(reject);
    });
}

function getToken(url) {
    return new Promise(function(resolve, reject) {
        axios.post(url).then(function(res) {
            resolve(res.data.token);
        }).catch(reject);
    });
}
