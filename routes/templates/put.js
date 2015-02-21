'use strict';


module.exports = function(model) {
    return function(req, res) {
        var body = req.swagger.params.body.value;
        var id = body.id;

        delete body.id;

        model.update(body, {
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
        }).catch(function(err) {
            res.status(403).json({
                message: err.message,
                errors: err.errors,
                warnings: []
            });
       });
    };
};
