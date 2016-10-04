'use strict';
const express = require('express');
const app = express();

module.exports.makeApp = () => {
    app.get('/', (req, res) => {
        res.send('Hello World B!');
    });

    return app;
};
