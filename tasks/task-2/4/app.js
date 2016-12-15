'use strict';

const express = require('express');
const nunjucks = require('nunjucks');

module.exports.makeApp = () => {
    const app = express();

    app.set('view engine', 'njk');

    nunjucks.configure('./templates', {
        autoescape: true,
        express: app,
    });


    app.get('/', (req, res) => {
        res.render('index', {
            name: req.query.name,
        });
    });

    return app;
};
