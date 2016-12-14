'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

module.exports.makeApp = () => {
    const app = express();

    // Configure
    app.set('view engine', 'njk');

    nunjucks.configure('./templates', {
        autoescape: true,
        express: app,
    });

    // register middlewares
    app.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`Request time ${duration} ms`, req.url);
        });

        next();
    });

    app.use(bodyParser.urlencoded({ extended: false }));

    // routes
    app.get('/', (req, res) => {
        res.render('index', {
            name: req.query.name,
        });
    });

    app.post('/new-message', (req, res) => {
        const name = req.body.name;
        const message = req.body.message;

        console.log(`Name: "${name}", message: "${message}"`);
        res.render('index', {
            name,
        });
    });

    return app;
};
