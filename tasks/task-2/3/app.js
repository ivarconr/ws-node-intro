'use strict';

const express = require('express');

module.exports.makeApp = () => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello World B!');
    });

    return app;
};
