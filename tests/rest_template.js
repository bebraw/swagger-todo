'use strict';
var Promise = require('bluebird');
var generators = require('annogenerate');
var schema2object = require('schema2object');
var waterfall = require('promise-waterfall');
var extend = require('xtend');
var fp = require('annofp');


module.exports = function(resourceName) {
    return function(assert, client) {
        var resource = client[resourceName + 's'];
        var postSchema = resource.post.parameters[0].schema;

        return {
            get: function() {
                return resource.get().then(function(res) {
                    assert(res.data.length === 0, 'Failed to get ' + resourceName + 's as expected');
                }).catch(function() {
                    assert(true, 'Failed to get ' + resourceName + 's as expected');
                });
            },
            postInvalid: function() {
                return resource.post().then(function() {
                    assert(false, 'Posted ' + resourceName + ' even though shouldn\'t');
                }).catch(function(res) {
                    var data = res.data;

                    assert(true, 'Failed to post ' + resourceName + ' as expected');

                    assert.equal(res.status, 422);
                    assert(data.message, 'Error message exists');
                    assert(data.errors, 'Errors exist');
                    assert(data.warnings, 'Warnings exist');
                });
            },
            postValid: function() {
                return resource.post(getParameters(postSchema)).then(function() {
                    assert(true, 'Posted ' + resourceName + ' as expected');
                }).catch(function(err) {
                    assert(false, 'Failed to post ' + resourceName, err);
                });
            },
            put: function() {
                return resource.put().then(function() {
                    assert(false, 'Updated ' + resourceName + ' even though shouldn\'t');
                }).catch(function() {
                    assert(true, 'Failed to update ' + resourceName + ' as expected');
                });
            },
            postAndPut: function() {
                var putParameters = getParameters(postSchema);

                return waterfall([
                    resource.post.bind(null, getParameters(postSchema)),
                    attachData.bind(null, putParameters),
                    resource.put.bind(null),
                    resource.get.bind(null)
                ]).then(function(res) {
                    var item = res.data[0];

                    fp.each(function(k, v) {
                        assert.equal(v, item[k], k + ' fields are equal');
                    }, putParameters);

                    assert(true, 'Updated ' + resourceName + ' as expected');
                }).catch(function() {
                    assert(false, 'Didn\'t update ' + resourceName + ' even though should have');
                });
            },
            ascendingSort: function() {
                var firstItem = getParameters(postSchema);
                var secondItem = getParameters(postSchema);

                firstItem.name = 'b';
                secondItem.name = 'a';

                return waterfall([
                    resource.post.bind(null, firstItem),
                    resource.post.bind(null, secondItem),
                    resource.get.bind(null, {
                        sortBy: 'name'
                    })
                ]).then(function(res) {
                    var data = res.data;

                    assert.equal(data.length, 2, 'Received the right amount of items');
                    assert.equal(data[0].name, secondItem.name, 'Received the right first name');
                    assert.equal(data[1].name, firstItem.name, 'Received the right second name');
                }).catch(function() {
                    assert(false, 'Didn\'t get ascending sort');
                });
            },
            descendingSort: function() {
                var firstItem = getParameters(postSchema);
                var secondItem = getParameters(postSchema);

                firstItem.name = 'a';
                secondItem.name = 'b';

                return waterfall([
                    resource.post.bind(null, firstItem),
                    resource.post.bind(null, secondItem),
                    resource.get.bind(null, {
                        sortBy: '-name'
                    })
                ]).then(function(res) {
                    var data = res.data;

                    assert.equal(data.length, 2, 'Received the right amount of items');
                    assert.equal(data[0].name, secondItem.name, 'Received the right first name');
                    assert.equal(data[1].name, firstItem.name, 'Received the right second name');
                }).catch(function() {
                    assert(false, 'Didn\'t get descending sort');
                });
            },
            zeroCount: function() {
                return resource.get().then(function(res) {
                    assert.equal(res.headers['total-count'], 0, 'Received the right count');
                }).catch(function() {
                    assert(false, 'Didn\'t get count');
                });
            },
            count: function() {
                return waterfall([
                    resource.post.bind(null, getParameters(postSchema)),
                    resource.post.bind(null, getParameters(postSchema)),
                    resource.get.bind(null)
                ]).then(function(res) {
                    assert.equal(res.headers['total-count'], 2, 'Received the right count');
                }).catch(function() {
                    assert(false, 'Didn\'t get count');
                });
            },
            pagination: function() {
                var firstItem = getParameters(postSchema);
                var secondItem = getParameters(postSchema);

                firstItem.name = 'b';
                secondItem.name = 'a';

                return waterfall([
                    resource.post.bind(null, firstItem),
                    resource.post.bind(null, secondItem),
                    resource.get.bind(null, {
                        page: 0,
                        perPage: 1
                    })
                ]).then(function(res) {
                    var data = res.data;

                    assert.equal(data.length, 1, 'Received the right amount of items');
                    assert.equal(data[0].name, firstItem.name, 'Received the right first name');
                }).catch(function() {
                    assert(false, 'Didn\'t get paginated items');
                });
            },
        };
    };
};

function attachData(initialData, res) {
    return new Promise(function(resolve) {
        resolve(extend({
            id: res.data.id
        }, initialData));
    });
}

function getParameters(schema) {
    return schema2object.properties2object({
        generators: generators,
        properties: schema2object.getRequiredProperties(schema)
    });
}
