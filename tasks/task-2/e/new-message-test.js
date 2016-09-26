const request = require('supertest');
const assert = require('assert');

const app = require('./app-nunjucks').makeApp();

var message = { name : 'marcus', message : 'message'};

request(app)
    .post('/new-message')
    .type('form')
    .send(message)
    .expect(200)
    .end(function (err, res) {
        assert.ok(res.text.indexOf("Takk, marcus") > -1);
        if (err) throw err;
    });
