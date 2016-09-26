const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.set('view engine', 'njk');

const env = nunjucks.configure('./templates',{
    autoescape:true,
    express: app
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