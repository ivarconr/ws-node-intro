'use strict';

const request = require('supertest');
const assert = require('assert');

const { makeApp } = require('./app');
const app = makeApp();

request(app)
    .get('/')
    .expect(500)
    .end((err, res) => {
        if (err) {
            throw err;
        }
        assert.ok(res.text.indexOf('An error occ') > -1);
        console.log('Success!');
    });
