const express = require('express');
const app = express();

app.set('port', 3000);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

module.exports = app;