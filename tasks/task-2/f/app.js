'use strict';
const express = require('express');
const errorHandler = require('./middlewares/express-error');

module.exports.makeApp = () => {
    const app = express();

    // routes
    app.get('/', (req, res, next) => {
        next(new Error('Hey! Error invoked in route'));
    });

    app.use(errorHandler());

    return app;
};
