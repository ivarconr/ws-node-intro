const exphbs  = require('express-handlebars');
const express= require('express');
const app = express();

module.exports.makeapp = function() {
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'c/views/layouts'
    }));
    app.set('view engine', 'handlebars');
    app.set('views', 'c/views');

    app.get('/home', function (req, res) {
        res.render('home',{
            "name":req.query.name
        });
    });

    return app;
};