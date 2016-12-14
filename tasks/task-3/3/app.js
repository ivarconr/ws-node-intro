'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const service = require('./message-service');
const { join } = require('path');

module.exports.makeApp = (config) => {
    const { getMessages, sendMessage } = service(config);
    const app = express();

    // Configure
    app.set('view engine', 'njk');

    nunjucks.configure(join(__dirname, 'templates'), {
        autoescape: true,
        express: app,
    });

    app.use(bodyParser.urlencoded({ extended: false }));

    // routes
    app.get('/', (req, res) => {
        getMessages()
            .then(messages => res.render('index', { messages: messages.reverse() }))
            .catch(error => res.render(500, error));
    });

    app.post('/', (req, res) => {
        const name = req.body.name;
        const message = req.body.message;

        console.log(`Name: "${name}", message: "${message}"`);

        sendMessage(name, message)
            .then(getMessages)
            .then(messages => res.render('index', { messages: messages.reverse() }))
            .catch(error => res.render(500, error));
    });

    return app;
};
