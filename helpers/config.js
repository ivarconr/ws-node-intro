'use strict';

const AMQP_PORT = process.env.AMQP_PORT || 8081;
const AMQP_URI = process.env.AMQP_URI || `amqp://10.200.229.88:${AMQP_PORT}`;

module.exports = {
    amqpUri: AMQP_URI,
};
