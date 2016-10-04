'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const service = require('./service');
const expressWs = require('express-ws');

module.exports.makeApp = (config) => {
    const app = express();
    expressWs(app);

    // Configure
    app.set('view engine', 'njk');

    nunjucks.configure('./templates', {
        autoescape: true,
        express: app,
    });

    app.use(bodyParser.urlencoded({ extended: false }));

    // routes
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.ws('/chat', (ws) => {
        console.log('connected client');
        const { getMessages, sendMessage, onMessage } = service(config, 'test');
        ws.send('init');
        onMessage(message => ws.send(JSON.stringify(message)));
    });


//    app.post('/', function (req, res) {
//         const name = req.body.name;
//         const message = req.body.message;

//         console.log(`Name: "${name}", message: "${message}"`);

//         sendMessage(name, message)
//             .then(getMessages)
//             .then(messages => res.render('index', { messages: messages.reverse() }))
//             .catch(error => res.render(500, error));
//     });

    return app;
};
