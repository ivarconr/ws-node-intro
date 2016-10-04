'use strict';
const queue = require('../../../helpers/queue');

module.exports = (config) => {
    const messages = [];

    queue(config.amqpUri, 'my-application-name')
        .on('connected', () => console.log('connected to queue'))
        .on('message', message => messages.push(message))
        .on('error', console.error);

    return {
        getMessages () {
            return Promise.resolve(messages);
        },
    };
};
