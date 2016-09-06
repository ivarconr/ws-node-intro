'use strict';

const { EventEmitter } = require('events');
const amqp = require('amqplib');

function validateUrl (input) {
    if (!/amqp:\/\/.*/.test(input)) {
        throw new Error(`Invalid input ${input}`);
    }
}

function requiredQueue () {
    throw new Error('Missing queueName');
}

 class Queue extends EventEmitter {
    constructor (url, queueName = requiredQueue(), exchangeName = 'chat') {
        super();
        validateUrl(url);

        this.readyProm = amqp.connect(url)
            .then(connection => connection.createChannel())
            .then(channel => Promise.all([
                    channel.assertExchange(exchangeName, 'fanout', { durable: false }).then(() => {
                        this.exchange = exchangeName;
                    }),
                    channel.assertQueue(queueName).then((mq) => {
                        this.messageCount = mq.messageCount;
                        this.queueName = queueName;
                        this.channel = channel;
                    })
                ])
            )
            .then(() => this.startConsume())
            .then(() => this.emit('connected', this))
            .catch(e => this.emit('error', e));
    }

    startConsume() {
        this.channel.bindQueue(this.queueName, this.exchange, '');
        this.channel.consume(this.queueName, (message) => {
            this.emit('message',  JSON.parse(message.content.toString()));
        }, { noAck: true });
        return Promise.resolve();
}

    sendMessage (name, message, exchangeKey = '') {
        return this.readyProm.then(() => {
            return this.channel.publish(
                this.exchange, 
                exchangeKey, 
                new Buffer(JSON.stringify({ name, message }))
            );
        });
    }
};

module.exports = function createQueue (url, queueName, exchangeName) {
    return new Queue(url, queueName, exchangeName);
};

module.exports.Queue = Queue;