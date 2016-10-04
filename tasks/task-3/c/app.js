'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const expressWs = require('express-ws');
const { join } = require('path');
const createChatPerUser = require('./chat');

class MessagesCache {
    constructor () {
        this.store = {};
    }

    pushTo (storeKey, value) {
        if (this.store[storeKey]) {
            this.store[storeKey].push(value);
        } else {
            this.store[storeKey] = [value];
        }
    }

    get (storeKey) {
        return this.store[storeKey];
    }
}

module.exports.makeApp = (config) => {
    const app = express();
    expressWs(app);

    // Configure
    app.set('view engine', 'njk');

    nunjucks.configure(join(__dirname, 'templates'), {
        autoescape: true,
        express: app,
    });

    app.use(bodyParser.urlencoded({ extended: false }));

    // routes
    app.get('/', (req, res) => {
        res.render('index');
    });

    const cache = new MessagesCache();
    app.ws('/chat', createChatPerUser(cache, config));

    return app;
};
