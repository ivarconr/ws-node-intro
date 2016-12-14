'use strict';

const { queue } = require('../../../helpers');

module.exports = (config, queueImpl = queue) => {
    const messages = [];

    queueImpl(config.amqpUri, config.appName)
        .on('connected', () => console.log('connected to queue'))
        .on('message', message => messages.push(message))
        .on('error', console.error);

    return {
        getMessages () {
            return messages;
        },
    };
};
