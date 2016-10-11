'use strict';

const AMQP_PORT = process.env.AMQP_PORT || 5672;
const AMQP_URI = process.env.AMQP_URI || `amqp://192.168.56.94:${AMQP_PORT}`;

module.exports = {
    amqpUri: AMQP_URI,
};
