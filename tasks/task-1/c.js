'use strict';

const queue = require('../../helpers/queue');

queue('amqp://10.200.228.112:8081', 'my-chat-$yourName')
    .on('connected', () => console.log('connected'))
    .on('message', console.log.bind(console, 'message:'))
    .on('error', console.error);
