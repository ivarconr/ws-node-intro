'use strict';

var express = require('express');

exports.create = function (app, config) {
    app.use('/', function(req, res, next) {
        var messages = config.repo.getMessages() || [];

        res.render('index', { 
            title: 'chat app!',
            messages: messages
        });
    });
};