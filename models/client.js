'use strict';

module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define('Client', {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            postalCode: DataTypes.STRING,
            phone: DataTypes.STRING,
            companyId: DataTypes.STRING,
            iban: DataTypes.STRING,
            bic: DataTypes.STRING
            // TODO: language association
        }
    );

    return Client;
};
