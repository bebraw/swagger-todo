'use strict';


var host = '127.0.0.1';

module.exports = {
    port: 3000,
    ip: host,
    jwtSecret: 'replacethis',
    database: {
        development: {
            dialect: 'sqlite',
            storage: './db.development.sqlite'
        },
        test: {
            dialect: 'sqlite',
            storage: './db.test.sqlite'
        },
        production: {
            username: 'root',
            password: null,
            database: 'database_production',
            host: host,
            dialect: 'mysql'
        }
    }
};
