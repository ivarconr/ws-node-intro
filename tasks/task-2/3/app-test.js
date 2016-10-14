'use strict';
const request = require('supertest');
const assert = require('assert');

const { makeApp } = require('./app');
const app = makeApp();

request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) {
            throw err;
        }
        assert.strictEqual(res.text, 'Hello World B!');
        console.log('Success!');
    });
