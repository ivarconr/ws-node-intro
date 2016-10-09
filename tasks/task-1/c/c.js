'use strict';

const { queue, config } = require('../../../helpers');

queue(config.amqpUri, 'my-chat-$yourName')
    .on('connected', () => console.log('connected'))
    .on('message', console.log.bind(console, 'message:'))
    .on('error', console.error);
