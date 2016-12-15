'use strict';

const request = require('supertest');
const assert = require('assert');

const { makeApp } = require('./app');
const app = makeApp();

request(app)
    .get('/?name=Node')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((err, res) => {
        if (err) {
            throw err;
        }
        assert.ok(res.text.indexOf('Hei Node') > -1);
        console.log('Success!');
    });
