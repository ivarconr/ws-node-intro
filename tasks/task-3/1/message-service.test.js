'use strict';

const assert = require('assert');
const { EventEmitter } = require('events');
const messagesService = require('./message-service');

const queue = new EventEmitter();

let mockCalled = false;
const mock = (url, appName) => {
    assert(url);
    assert(appName);
    mockCalled = true;
    return queue;
};

const mod = messagesService({ amqpUri: '...', appName: 'mock' }, mock);

assert(mockCalled);

const messages = mod.getMessages();

assert.equal(messages.length, 0);

queue.emit('ready');
queue.emit('message', {});

assert.equal(mod.getMessages().length, 1);

queue.emit('message', {});
queue.emit('message', {});

assert.equal(mod.getMessages().length, 3);

console.log('All tests done.');
