'use strict';
const request = require('supertest');
const assert = require('assert');

const { makeApp } = require('./app');
const app = makeApp();

const message = {
    name: 'marcus',
    message: 'message',
};

request(app)
    .post('/new-message')
    .type('form')
    .send(message)
    .expect(200)
    .end((err, res) => {
        if (err) {
            throw err;
        }
        assert.ok(res.text.indexOf('Takk, marcus') > -1);
        console.log('Success!');
    });
