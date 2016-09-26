const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const requestTimer = require('./requestTimer');
const app = express();

app.set('view engine', 'njk');

app.use(requestTimer);
app.use(bodyParser.urlencoded({ extended: false }));

const env = nunjucks.configure('./templates',{
    autoescape:true,
    express: app
});


app.post('/new-message', function (req, res) {    
    const name = req.body.name;
    const message = req.body.message;

    console.log(`Name: "${name}", message: "${message}"`);
    res.render('index', {
        name
    });
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