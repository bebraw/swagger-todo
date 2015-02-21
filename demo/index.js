'use strict';
/*
1. npm start
2. node index.js
 */
var api = require('./api');


main();

function main() {
    var url = 'http://127.0.0.1:3000';

    api(url).then(function(client) {
        console.log(client);
    }).catch(function(err) {
        console.error(err);
    });
}
