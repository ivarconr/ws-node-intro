const express = require('express');
const nunjucks = require('nunjucks');

module.exports.makeApp = () => {
    const app = express();

    // Configure
    app.set('view engine', 'njk');
    
    const env = nunjucks.configure('./templates',{
        autoescape: true,
        express: app
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

    // routes
    app.get('/timer', (req, res) => {
        setTimeout(() => {
            res.send(200);
        }, 2000);
    });

    app.get('/', (req, res) => {
        res.render('index', {
            "name": req.query.name
        });
    });

    return app;
};