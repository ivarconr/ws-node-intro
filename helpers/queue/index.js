'use strict';

const { EventEmitter } = require('events');
const amqp = require('amqplib');

function validateUrl (input) {
    if (!/amqp:\/\/.*/.test(input)) {
        throw new Error(`Invalid input ${input}`);
    }
}

function validateNumber (input) {
    if (typeof input !== 'number' || input <= 0) {
        throw new Error(`Invalid input, expected number: ${input}`);
    }
}

function requiredQueue () {
    throw new Error('Missing queueName');
}

class Queue extends EventEmitter {
    constructor (url, queueName = requiredQueue(), exchangeName = 'chat', queueLength = 200) {
        super();
        validateUrl(url);
        validateNumber(queueLength);

        // decorate queue with queuelength because non-queue-length created queues will break
        // if queue length is provided later
        queueName = `${queueName}-${queueLength}`;

        this.readyProm = amqp.connect(url)
            .then(connection => connection.createChannel())
            .then(channel => Promise.all([
                channel.assertExchange(exchangeName, 'fanout', { durable: false }).then(() => {
                    this.exchange = exchangeName;
                }),
                channel.assertQueue(queueName, { arguments: { 'x-max-length': queueLength } }).then((mq) => {
                    this.messageCount = mq.messageCount;
                    this.queueName = queueName;
                    this.channel = channel;
                }),
            ])
            )
            .then(() => this.startConsume())
            .then(() => this.emit('connected', this))
            .catch(e => this.emit('error', e));
    }

    startConsume () {
        this.channel.bindQueue(this.queueName, this.exchange, '');
        this.channel.consume(this.queueName, (message) => {
            this.emit('message', JSON.parse(message.content.toString()));
        }, { noAck: true });
        return Promise.resolve();
    }

    sendMessage (name, message, exchangeKey = '') {
        return this.readyProm.then(() => this.channel.publish(
            this.exchange,
            exchangeKey,
            new Buffer(JSON.stringify({ name, message }))
        ));
    }

    stop () {
        return this.channel.close().then(() => {
            console.log('closed');
        });
    }
};

module.exports = function createQueue (url, queueName, exchangeName, queueLength) {
    return new Queue(url, queueName, exchangeName, queueLength);
};

module.exports.Queue = Queue;
