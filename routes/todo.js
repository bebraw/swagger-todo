'use strict';
var swaggerify = require('swaggerify').routes;


module.exports = function(imports) {
    var Todo = imports.models.Todo;

    return swaggerify('todo', {
        get: function(req, res) {
            var params = req.swagger.params;
            var sortBy = params.sortBy.value;
            var perPage = params.perPage.value;
            var page = params.page.value;

            Todo.findAndCount({
                order: convertToOrder(sortBy),
                limit: perPage,
                offset: page * perPage
            }).then(function(result) {
                res.header('Total-Count', result.count).json(convertToObjects(result.rows));
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
};

function convertToOrder(str) {
    if(!str) {
        return;
    }

    if(str.indexOf('-') === 0) {
        return '`' + str.slice(1) + '` DESC';
    }

    return str;
}

function convertToObjects(results) {
    return results.map(function(result) {
        return result.dataValues;
    });
}
