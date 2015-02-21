'use strict';


module.exports = function(model) {
    return function(req, res) {
       var body = req.swagger.params.body.value;

       model.create(body).then(function(client) {
           res.json({
               id: client.dataValues.id
           });
       }).catch(function(err) {
            res.status(403).json({
                message: err.message,
                errors: err.errors,
                warnings: []
            });
       });
    };
};
