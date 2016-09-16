'use strict';

const queue = require('../../helpers/queue');
const config = require('./config');

queue(config.amqpUri, 'my-chat-$yourName')
    .on('connected', () => console.log('connected'))
    .on('message', console.log.bind(console, 'message:'))
    .on('error', console.error);
