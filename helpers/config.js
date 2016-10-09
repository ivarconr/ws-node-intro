'use strict';

const AMQP_PORT = process.env.AMQP_PORT || 5672;
const AMQP_URI = process.env.AMQP_URI || `amqp://localhost:${AMQP_PORT}`;

module.exports = {
    amqpUri: AMQP_URI,
};
