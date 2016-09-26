const express = require('express');
const app = express();


module.exports.makeApp  = function() {
    app.set('port', 3000);

    app.get('/', function (req, res) {
        res.send('Hello World B!');
    });

    return app;
};