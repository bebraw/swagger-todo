'use strict';
var url = require('url');

var axios = require('axios');


tests();

function tests() {
    var root = 'http://localhost:3000/';

    authenticate(root).then(testGetTodos.bind(null, root), function(err) {
        console.error('failed to authenticate', err);
    });
}

function authenticate(root) {
    return axios.post(url.resolve(root, 'authenticate'));
}

function testGetTodos(root, res) {
    var u = url.resolve(root, 'v1/todos');
    var token = res.data && res.data.token;

    axios.get(u, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function(res) {
        console.log('todos', res.data);
    }, function(err) {
        console.error('failed to get todos', err);
    });
}
