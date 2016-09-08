const request = require('supertest');
const assert = require('assert');

const app = require('./app.js');

request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
        assert.strictEqual(res.text, "Hello World!")
        if (err) throw err;
    });