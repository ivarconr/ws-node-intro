const request = require('supertest');
const assert = require('assert');

const app = require('./../app').makeapp();

request(app)
    .get('/home?name=Node')
    .expect(200)
    .expect('content-type','text/html; charset=utf-8')
    .end(function (err, res) {
        assert.ok(res.text.indexOf("Node") > -1);
        if (err) throw err;
    });