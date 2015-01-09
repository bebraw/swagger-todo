'use strict';
var swaggerify = require('swaggerify').routes;

var Todo = require('../models').Todo;


module.exports = swaggerify('todo', {
    get: function(req, res) {
        Todo.findAll().then(function(todos) {
            res.json(todos);
        });
    },
    post: function(req, res) {
        var body = req.swagger.params.body.value;

        Todo.create(body).then(function(todo) {
            res.json({
                id: todo.dataValues.id
            });
        });
    },
    put: function(req, res) {
        var body = req.swagger.params.body.value;
        var id = body.id;

        delete body.id;

        Todo.update(body, {
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
