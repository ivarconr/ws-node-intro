const express = require('express');
const nunjucks = require('nunjucks');
const service = require('./service');

module.exports.makeApp = (config) => {
    const { getMessages } = service(config);
    const app = express();

    // Configure
    app.set('view engine', 'njk');
    
    const env = nunjucks.configure('./templates',{
        autoescape: true,
        express: app,
    });

    // routes
    app.get('/', (req, res) => {
        getMessages()
            .then(messages => res.render('index', { messages }))
            .catch(error => res.render(500, error));
    });

    return app;
};
