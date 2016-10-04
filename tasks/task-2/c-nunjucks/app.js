const express = require('express');
const nunjucks = require('nunjucks');

module.exports.makeApp = () => {
    const app = express();

    app.set('view engine', 'njk');

    const env = nunjucks.configure('./templates',{
        autoescape: true,
        express: app
    });


    app.get('/home', (req, res) => {
        res.render('index', {
            "name": req.query.name,
        });
    });

    return app;
};