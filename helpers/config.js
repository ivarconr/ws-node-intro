'use strict';

const AMQP_PORT = process.env.AMQP_PORT || 19901;
const AMQP_URI = process.env.AMQP_URI || `amqp://0.tcp.ngrok.io:${AMQP_PORT}`;

module.exports = {
    amqpUri: AMQP_URI,
};
