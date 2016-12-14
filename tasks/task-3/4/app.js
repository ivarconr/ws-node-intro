'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const expressWs = require('express-ws');
const { join } = require('path');
const createChatPerUser = require('./lib/chat');
const Cache = require('./lib/cache');

module.exports.makeApp = (config) => {
    const app = express();
    expressWs(app);

    // Configure
    app.set('view engine', 'njk');

    nunjucks.configure(join(__dirname, 'templates'), {
        autoescape: true,
        express: app,
    });

    app.use('/public', express.static(join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: false }));

    // routes
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.ws('/chat', createChatPerUser(new Cache(), config));

    return app;
};
