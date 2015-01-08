'use strict';

module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
            name: DataTypes.STRING,
            done: DataTypes.BOOLEAN
        }
    );

    return Todo;
};
