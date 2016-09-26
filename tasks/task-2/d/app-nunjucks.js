const express = require('express');
const nunjucks = require('nunjucks');
const requestTimer = require('./requestTimer');
const app = express();

app.set('view engine', 'njk');

app.use(requestTimer);

const env = nunjucks.configure('./../c-nunjucks/templates',{
    autoescape:true,
    express: app
});


app.get('/timer', function (req, res) {
    setTimeout(function() {
        res.send(200);
    },2000);
});

app.get('/home', function (req, res) {

    const names = [];
    [1, 2, 3, 4, 6, 7].forEach(function (val, i) {
        names.push({
            "name": i + "- Name"
        });
    });

    res.render('index', {
        "name": req.query.name,
        "items": names
    });
});

module.exports.makeApp = function() {
  return app;
};