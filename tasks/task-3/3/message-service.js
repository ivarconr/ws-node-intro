'use strict';

const { queue } = require('../../../helpers');

module.exports = (config) => {
    const messages = [];

    const q = queue(config.amqpUri, 'my-chat-$yourName')
        .on('connected', () => console.log('connected to queue'))
        .on('message', message => messages.push(message))
        .on('error', console.error);

    return {
        getMessages () {
            return Promise.resolve(messages);
        },
        sendMessage (name, message) {
            return q.sendMessage(name, message);
        },
    };
};
